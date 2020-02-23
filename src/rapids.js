export const dateError = date => {
    const newDate = new Date(date);
    return newDate.toString() === "Invalid Date";
};

export const addDays = (date, int) => {
    const startDate = new Date(date);
    const setDate = startDate.setDate(
        startDate.getDate() + int,
    );
    return new Date(setDate);
};

export const subtractDays = (date, int) => {
    const startDate = new Date(date);
    return new Date(startDate.setDate(
        startDate.getDate() - int,
    ));
}; 