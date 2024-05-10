export const getTotalAmount = (transactions: any[]) => {
    let total = 0;
    transactions.forEach(transaction => {
        total += transaction.amount;
    });
    return total;
}