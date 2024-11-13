let transactions = [];  // Array to record transactions

// Function to display transaction history
function viewTransactions() {
    const transactionsList = document.getElementById("transactions-list");
    transactionsList.innerHTML = "";

    if (transactions.length === 0) {
        transactionsList.innerHTML = "<li>No transactions yet.</li>";
    } else {
        transactions.forEach(transaction => {
            const li = document.createElement("li");
            li.textContent = `${transaction.type} ${transaction.shares} shares of ${transaction.stockSymbol} at $${transaction.pricePerShare} each on ${transaction.date.toLocaleString()}`;
            transactionsList.appendChild(li);
        });
    }
}

// Function to sort transactions by date
function sortTransactions() {
    transactions.sort((a, b) => b.date - a.date);
    viewTransactions();
}

// Function to search transactions
function searchTransactions() {
    const searchQuery = document.getElementById("transaction-search").value.toLowerCase();
    const filteredTransactions = transactions.filter(transaction => {
        return transaction.stockSymbol.toLowerCase().includes(searchQuery);
    });

    const transactionsList = document.getElementById("transactions-list");
    transactionsList.innerHTML = "";

    if (filteredTransactions.length === 0) {
        transactionsList.innerHTML = "<li>No transactions found.</li>";
    } else {
        filteredTransactions.forEach(transaction => {
            const li = document.createElement("li");
            li.textContent = `${transaction.type} ${transaction.shares} shares of ${transaction.stockSymbol} at $${transaction.pricePerShare} each on ${transaction.date.toLocaleString()}`;
            transactionsList.appendChild(li);
        });
    }
}

// Example to push a transaction for testing
transactions.push({
    type: "Bought",
    stockSymbol: "AAPL",
    shares: 10,
    pricePerShare: 150,
    date: new Date()
});

// Initialize the transaction page
viewTransactions();
