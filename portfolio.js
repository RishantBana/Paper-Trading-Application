let portfolio = {};  // Object to store stocks and their shares

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

// Initialize the portfolio page
updatePortfolio();
