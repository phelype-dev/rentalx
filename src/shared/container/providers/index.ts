import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { container } from 'tsyringe';

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider,
);
