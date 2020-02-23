import {
    dateError,
    addDays
} from '../../src/rapids';

const validFormatExamples = [
    '03 25 2020',
    '03/25/2020',
    '03-25-2020',
    '03.25.2020',
    '03.25.20',
    '03-25-2020 14:30',
    'Wed Mar 25 2020 00:00:00 GMT+0000 (Greenwich Mean Time)',
    'Wed, 25 Mar 2020 00:00:00 GMT',
    'Mar 25 2020',
    '2020-03-25T00:00:00.000Z',
    1585094400000,
];
const invalidFormatExamples = [
    'example',
    '1585094400000',
    '25-03-2020',
    '25/03/2020',
    '25.03.2020',
    '03-25-2020 2:30pm',
];
describe('Rapids dateError()', () => {
    describe('Given a valid date, it will not return truthy.', () => {
        test.each([...validFormatExamples])('I.e. %s', date => {
            expect(
                dateError(date),
            ).toBe(false);
        });
    });
    describe('Given an invalid date, it will return truthy.', () => {
        test.each([...invalidFormatExamples])('I.e. %s', date => {
            expect(
                dateError(date),
            ).toBe(true);
        });
    });
});

describe('Rapids addDays()', () => { // FIXME: Fails as Date object vs string
    test('Given a valid date and increment, it will add days', () => {
        expect(
            addDays('03-25-2020', 5),
        ).toBe(new Date('2020-03-29T23:00:00.000Z'));
    });
    test('Given a valid datetime and increment, it will add days', () => {
        expect(
            addDays('03-25-2020 14:30', 5),
        ).toBe(new Date('2020-03-30T13:30:00.000Z'));
    });
});
