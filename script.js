// ===============================
// SELECT ELEMENTS
// ===============================

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const savingsEl = document.getElementById("savings");

const form = document.getElementById("transaction-form");
const amountEl = document.getElementById("amount");
const typeEl = document.getElementById("type");
const categoryEl = document.getElementById("category");

const list = document.getElementById("transaction-list");

let totalIncome = 0;
let totalExpense = 0;


// ===============================
// FORM SUBMIT EVENT
// ===============================

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = parseFloat(amountEl.value);
    const type = typeEl.value;
    const category = categoryEl.value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    const now = new Date();
    const dateTime = now.toLocaleString();

    if (type === "income") {
        totalIncome += amount;
    } else if (type === "expense") {
        totalExpense += amount;
    }

    updateSummary();
    addTransactionToHistory(type, category, amount, dateTime);

    form.reset();
});


// ===============================
// UPDATE SUMMARY
// ===============================

function updateSummary() {
    const savings = totalIncome - totalExpense;

    incomeEl.innerText = totalIncome.toFixed(2);
    expenseEl.innerText = totalExpense.toFixed(2);
    savingsEl.innerText = savings.toFixed(2);
}


// ===============================
// ADD TO TRANSACTION HISTORY
// ===============================

function addTransactionToHistory(type, category, amount, dateTime) {
    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${type.toUpperCase()}</strong> 
        <span style="color:lightgray;">(${category})</span>
        - ₹${amount.toFixed(2)}
        <br>
        <small>${dateTime}</small>
    `;

    list.prepend(li); // newest transaction on top
}
