interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    covertToUtc(date: Date): string;
    dateNow()
}

export { IDateProvider }