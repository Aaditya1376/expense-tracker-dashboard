let expenses =
JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses(){
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    renderApp();
}

function addExpense(){

    const name =
    document.getElementById("expenseName").value.trim();

    const amount =
    Number(
        document.getElementById("expenseAmount").value
    );

    const category =
    document.getElementById("expenseCategory").value;

    const error =
    document.getElementById("errorMessage");

    if(name === ""){
        error.textContent =
        "Expense name is required";
        return;
    }

    if(amount <= 0){
        error.textContent =
        "Amount must be greater than zero";
        return;
    }

    error.textContent = "";

    expenses.push({
        id:Date.now(),
        name,
        amount,
        category,
        date:new Date().toLocaleDateString()
    });

    document.getElementById("expenseName").value="";
    document.getElementById("expenseAmount").value="";
    document.getElementById("expenseCategory").value="";

    saveExpenses();
}

function deleteExpense(id){

    expenses =
    expenses.filter(expense =>
        expense.id !== id
    );

    saveExpenses();
}

function clearAll(){

    if(confirm("Delete all expenses?")){

        expenses=[];

        saveExpenses();
    }
}

document
.getElementById("addExpenseBtn")
.addEventListener("click",addExpense);

document
.getElementById("clearAllBtn")
.addEventListener("click",clearAll);

document
.getElementById("themeToggle")
.addEventListener("click",()=>{

    document.body.classList.toggle("dark");
});

document.getElementById("currentDate")
.textContent =
new Date().toDateString();

function renderApp(){

    window.dispatchEvent(
        new CustomEvent(
            "expensesUpdated",
            {
                detail:expenses
            }
        )
    );
}

renderApp();