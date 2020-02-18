export default function getDates() {
    const dateOfToday = Date.now()
    const dayOfToday = (new Date().getDay() + 7 - 1) % 7
    const daysOfThisWeek = Array.from(new Array(7))
        .map((_, i) => {
            const date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24)
            // return date.getFullYear() +
            //     '-' +
            //     String(date.getMonth() + 1).padStart(2, '0') +
            //     '-' +
            //     String(date.getDate()).padStart(2, '0')
            return date.getDate();
        });
    const daysOfWeekForRequest = Array.from(new Array(7))
        .map((_, i) => {
            const date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24)
            return date.getFullYear() +
                '-' +
                String(date.getMonth() + 1).padStart(2, '0') +
                '-' +
                String(date.getDate()).padStart(2, '0')
        });
    const daysOfWeek = Array.from(new Array(7))
        .map((_, i) => {
            const date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24)

            return date.getDay();
        })
    return { currentWeek: daysOfThisWeek, today: new Date().getDate(), weeks: daysOfWeek, requestWeeks: daysOfWeekForRequest };
}