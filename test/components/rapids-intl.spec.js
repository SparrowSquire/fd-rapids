// import winston from 'winston';
import {
    dateStrictFormat,
    // dateIntlFormat,
    getNewDate,
} from '../../src/rapids-intl';

// jest.spyOn(winston, 'debug');

describe('dateTimeConstructor utility:', () => {
    describe('dateStrictFormat():', () => {
        // test('It logs a problem when given an invalid date/ time format', done => {
        //     dateStrictFormat('i-am-not-valid', 'DD/MM/YYYY');
        //     expect(winston.debug).toHaveBeenCalledWith('[Util error] i-am-not-valid is an invalid Date object');
        //     done();
        // });
        test('It creates a fallback given an invalid date/ time format', done => {
            const inTwoDays = getNewDate(new Date(), 2);
            expect(dateStrictFormat('i-am-not-valid', 'DD/MM/YYYY')).toBe(inTwoDays);
            done();
        });
        test.each([
            ['DD/MMMM/YYYY', '2020/02/20 14:30', '20/February/2020'],
            ['DDD/MMM/YY', '2020/02/20 14:30', 'Thu/Feb/20'],
            ['DDDD/MM/YY', '2020/02/20 14:30', 'Thursday/02/20'],
            // ['DD-MM-YYYY', '2020/02/20 14:30', '20-02-2020'],
            ['DD.MM.YYYY', '2020/02/20 14:30', '20.02.2020'],
            ['DD MM YY', '2020/02/20 14:30', '20 02 20'],
            // ['DD/MM/YYYY HH:mm', '2020/02/20 14:30', '20/02/2020 14:30'],
            // ['HH:mm', '2020/02/20 14:30', '14:30'],
            ['setDate', '2020/02/20 14:30', '22/02/2020'],
        ])('It formats dates given a valid date. Accepted format: %s', (format, date, expectedValue) => {
            expect(dateStrictFormat(date, format)).toBe(expectedValue);
        });
        test('It formats 12hr time', () => {
            expect(dateStrictFormat('2020/02/20 14:30', '12h')).toBe('2:30 PM');
        });
        test('It formats 24hr time', () => {
            expect(dateStrictFormat('2020/02/20 14:30', '24h')).toBe('14:30');
        });
        test('It defaults to British format', () => {
            expect(
                dateStrictFormat('2020/02/20 14:30', 'DD/MM/YYYY'),
            ).toBe('20/02/2020');
        });

        test('It allows international formats given a language code', () => {
            expect(
                dateStrictFormat('2020/02/20 14:30', 'DD/MM/YYYY HH:mm', 'bg-bg'),
            ).toBe('20.02.2020 г., 14:30');
        });

        test('It fallsback to British format given an invalid language code', () => {
            expect(
                dateStrictFormat('2020/02/20 14:30', 'DD/MM/YYYY', 'no-rl'),
            ).toBe('20/02/2020');
        });
    });
    describe('International settings:', () => {
    });
    test('dateIntlFormat: International date format given a valid language code', () => {
        const dateIntlFormat = (date, locale) => new Intl.DateTimeFormat(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
        const intlDate = dateIntlFormat('2020/02/20 14:30', 'bg-BG');
        expect(intlDate).toBe('20.02.2020 г., 14:30');
    });
});
