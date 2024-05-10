export const getAmountOfMonth = (transactions: any[], month: string, type: string) => {
    let total = 0;
    transactions.forEach(transaction => {
        if (transaction.month === month && transaction.type === type) {
            total += transaction.amount;
        }
    });
    return total;
}

export const getPreviousMonth = (month: string) => {
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    const index = months.indexOf(month);
    return index === 0 ? months[11] : months[index - 1];
}

export const generateComment = (previous: number, current: number) => {
    if (previous === 0) {
        return 'Previous data does not exist'
    }
    // get diff of % unit between two months
    const diff = ((current - previous) / previous) * 100;
    if (diff > 0) {
        return ` ${diff}% from the previous month`;
    } else if (diff < 0) {
        return `${Math.abs(diff)}% from the previous month`;
    } else {
        return 'Your total amount of transactions is the same as the previous month';
    }
}