import { IDateProvider } from "../IDateProvider";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';


class DayJsDateProvider implements IDateProvider {


    compareInHours(start_date: Date, end_date: Date): number {
        return dayjs(end_date).diff(start_date, 'hours');
    }

    covertToUtc(date: Date): string {
       return dayjs(date)
      .utc()
      .local()
      .format();
    }
}

export { DayJsDateProvider }