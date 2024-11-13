let accountBalance = 10000;  // Initial account balance
let portfolio = {};  // Object to store stocks and their shares
let transactions = [];  // Array to record transactions

// Function to update the account balance display
function updateBalance() {
    document.getElementById("account-balance").textContent = `$${accountBalance.toFixed(2)}`;
}

// Function to update the portfolio display
function updatePortfolio() {
    const portfolioList = document.getElementById("portfolio-list");
    portfolioList.innerHTML = "";  // Clear the portfolio list

    let totalPortfolioValue = 0;  // Total portfolio value

    for (const stock in portfolio) {
        const stockValue = portfolio[stock] * 100;  // Mock price
        totalPortfolioValue += stockValue;
        const li = document.createElement("li");
        li.textContent = `${stock}: ${portfolio[stock]} shares (Value: $${stockValue})`;

        // Add a remove button to each stock item
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.onclick = () => removeStock(stock);

        li.appendChild(removeButton);
        portfolioList.appendChild(li);
    }

    // Update portfolio summary (total value)
    const portfolioSummary = document.getElementById("portfolio-summary");
    portfolioSummary.innerHTML = `<p>Total Portfolio Value: $${totalPortfolioValue.toFixed(2)}</p>`;
}

// Function to remove stock from the portfolio
function removeStock(stock) {
    delete portfolio[stock];
    updatePortfolio();
}

// Function to handle buying stocks
function buyStock() {
    const stockSymbol = document.getElementById("stock-symbol").value.toUpperCase();
    const shares = parseInt(document.getElementById("shares").value);
    const pricePerShare = 100;  // Mock price per share

    if (!stockSymbol || isNaN(shares) || shares <= 0) {
        alert("Please enter a valid stock symbol and number of shares.");
        return;
    }

    const totalCost = shares * pricePerShare;

    if (totalCost > accountBalance) {
        alert("Insufficient balance to complete the purchase.");
        return;
    }

    accountBalance -= totalCost;

    if (portfolio[stockSymbol]) {
        portfolio[stockSymbol] += shares;
    } else {
        portfolio[stockSymbol] = shares;
    }

    transactions.push({
        type: "Bought",
        stockSymbol: stockSymbol,
        shares: shares,
        pricePerShare: pricePerShare,
        date: new Date()
    });

    updateBalance();
    updatePortfolio();
}

// Function to handle selling stocks
function sellStock() {
    const stockSymbol = document.getElementById("stock-symbol").value.toUpperCase();
    const shares = parseInt(document.getElementById("shares").value);
    const pricePerShare = 100;  // Mock price per share

    if (!stockSymbol || isNaN(shares) || shares <= 0) {
        alert("Please enter a valid stock symbol and number of shares.");
        return;
    }

    if (!portfolio[stockSymbol] || portfolio[stockSymbol] < shares) {
        alert("Insufficient shares to complete the sale.");
        return;
    }

    const totalSale = shares * pricePerShare;
    accountBalance += totalSale;
    portfolio[stockSymbol] -= shares;

    if (portfolio[stockSymbol] === 0) {
        delete portfolio[stockSymbol];
    }

    transactions.push({
        type: "Sold",
        stockSymbol: stockSymbol,
        shares: shares,
        pricePerShare: pricePerShare,
        date: new Date()
    });

    updateBalance();
    updatePortfolio();
}

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

// Initialize the app
updateBalance();
updatePortfolio();
