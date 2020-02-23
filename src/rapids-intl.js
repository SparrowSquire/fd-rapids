// import winston from 'winston'; // TODO:
// import Intl from 'intl'; // FIXME: issue with Intl.Date in Node projects

export const errorCheck = dateString => {
    return dateString.toString() === 'Invalid Date';
};

export const twoDigitDay = (date, locale = 'en-GB') => new Intl.DateTimeFormat(locale, {
    day: '2-digit',
}).format(date);

export const shortDay = (date, locale = 'en-GB') => new Intl.DateTimeFormat(locale, {
    weekday: 'short',
}).format(date);

export const longDay = (date, locale = 'en-GB') => new Intl.DateTimeFormat(locale, {
    weekday: 'long',
}).format(date);

export const twoDigitMonth = (date, locale = 'en-GB') => new Intl.DateTimeFormat(locale, {
    month: '2-digit',
}).format(date);

export const shortMonth = (date, locale = 'en-GB') => new Intl.DateTimeFormat(locale, {
    month: 'short',
}).format(date);

export const longMonth = (date, locale = 'en-GB') => new Intl.DateTimeFormat(locale, {
    month: 'long',
}).format(date);

export const twoDigitYear = (date, locale = 'en-GB') => new Intl.DateTimeFormat(locale, {
    year: '2-digit',
}).format(date);

export const fullYear = (date, locale = 'en-GB') => new Intl.DateTimeFormat(locale, {
    year: 'numeric',
}).format(date);

export const getHour = (date, locale = 'en-GB') => new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
}).format(date);

export const getMinute = (date, locale = 'en-GB') => new Intl.DateTimeFormat(locale, {
    minute: 'numeric',
}).format(date);

export const getNewDate = (date, addition) => {
    date.setDate(date.getDate() + addition);
    const DD = twoDigitDay(date);
    const MM = twoDigitMonth(date);
    const YYYY = fullYear(date);
    return `${DD}/${MM}/${YYYY}`;
};

export const getTime = (date, format = 'h24', locale = 'en-GB') => {
    return new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: format,
    }).format(date);
};

export const dateIntlFormat = (date, locale) => new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
}).format(new Date(date));

export const dateStrictFormat = (
    dateString,
    format,
    locale = 'en-GB',
    addDays = 2,
) => {
    let date = new Date(dateString);

    if (errorCheck(date) === true) {
        // winston.debug(`[Util error] ${dateString} is an invalid Date object`);
        date = new Date();
        format = 'setDate';
    }

    const checkFormat = {
        GMT: date,
        ISO: date.toISOString(),
        DD: twoDigitDay(date, locale),
        DDD: shortDay(date, locale),
        DDDD: longDay(date, locale),
        MM: twoDigitMonth(date, locale),
        MMM: shortMonth(date, locale),
        MMMM: longMonth(date, locale),
        YY: twoDigitYear(date, locale),
        YYYY: fullYear(date, locale),
        HH: getHour(date, locale),
        mm: getMinute(date, locale),
        '24h': getTime(date, 'h24', locale),
        '12h': getTime(date, 'h12', locale),
        setDate: getNewDate(date, addDays),
    };

    // const checkFormat = {
    //     GMT: date,
    //     ISO: date.toISOString(),
    //     DD: new Intl.DateTimeFormat(locale, {
    //         day: '2-digit',
    //     }).format(date),
    //     DDD: new Intl.DateTimeFormat(locale, {
    //         weekday: 'short',
    //     }).format(date),
    //     DDDD: new Intl.DateTimeFormat(locale, {
    //         weekday: 'long',
    //     }).format(date),
    //     MM: new Intl.DateTimeFormat(locale, {
    //         month: '2-digit',
    //     }).format(date),
    //     MMM: new Intl.DateTimeFormat(locale, {
    //         month: 'short',
    //     }).format(date),
    //     MMMM: new Intl.DateTimeFormat(locale, {
    //         month: 'long',
    //     }).format(date),
    //     YY: new Intl.DateTimeFormat(locale, {
    //         year: '2-digit',
    //     }).format(date),
    //     YYYY: new Intl.DateTimeFormat(locale, {
    //         year: 'numeric',
    //     }).format(date),
    //     HH: new Intl.DateTimeFormat(locale, {
    //         hour: '2-digit',
    //     }).format(date),
    //     mm: new Intl.DateTimeFormat(locale, {
    //         minute: '2-digit',
    //     }).format(date),
    // };

    const straightMatch = checkFormat[format];
    if (straightMatch) {
        return straightMatch;
    }

    return format
        .split(/([/.-: ])/g)
        .map(x => checkFormat[x] || x)
        .join('');
};
