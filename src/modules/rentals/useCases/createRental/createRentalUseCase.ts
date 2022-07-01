import { inject, injectable } from 'tsyringe';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarRepository,
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHours = 24;

    const carUnavailable =
      await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError('car is unavailable');
    }

    const rentalOpenToUse =
      await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (rentalOpenToUse) {
      throw new AppError(" There's a rental progress for user!");
    }

    /*const expectedReturnDateFormat = this.dateProvider.convertToUtc(
      expected_return_date,
    );*/

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compare < minimumHours) {
      throw new AppError('Invalid return time');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
