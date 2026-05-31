const root =
ReactDOM.createRoot(
document.getElementById("expenseRoot")
);

const summaryRoot =
ReactDOM.createRoot(
document.getElementById("summaryRoot")
);

function ExpenseList({expenses}){

    const search =
    document.getElementById("searchInput")?.value
    ?.toLowerCase() || "";

    const filter =
    document.getElementById("filterCategory")?.value
    || "All";

    let filtered = expenses.filter(expense=>{

        const nameMatch =
        expense.name.toLowerCase()
        .includes(search);

        const categoryMatch =
        filter==="All" ||
        expense.category===filter;

        return nameMatch && categoryMatch;
    });

    if(filtered.length===0){

        return(
            <div className="empty">
                No Expenses Found
            </div>
        );
    }

    return(

        <div>

            {filtered.map(expense=>(

                <div
                    className="expense-item"
                    key={expense.id}
                >

                    <div className="expense-info">

                        <strong>
                            {expense.name}
                        </strong>

                        <span>
                            ₹{expense.amount}
                        </span>

                        <span>
                            {expense.category}
                        </span>

                        <span>
                            {expense.date}
                        </span>

                    </div>

                    <button
                        className="delete-btn"
                        onClick={()=>
                            deleteExpense(expense.id)
                        }
                    >
                        Delete
                    </button>

                </div>

            ))}

        </div>
    );
}

function Summary({expenses}){

    const totalAmount =
    expenses.reduce(
        (sum,item)=>
        sum + item.amount,
        0
    );

    const categories={};

    expenses.forEach(expense=>{

        categories[expense.category] =
        (categories[expense.category] || 0)
        + expense.amount;
    });

    return(

        <div>

            <div className="summary-grid">

                <div className="summary-box">

                    <h3>
                        {expenses.length}
                    </h3>

                    <p>
                        Total Expenses
                    </p>

                </div>

                <div className="summary-box">

                    <h3>
                        ₹{totalAmount}
                    </h3>

                    <p>
                        Total Spent
                    </p>

                </div>

            </div>

            <div className="category-summary">

                <h3>
                    Category Totals
                </h3>

                {

                    Object.entries(categories)
                    .map(([cat,total])=>(

                        <div key={cat}>
                            {cat}: ₹{total}
                        </div>

                    ))

                }

            </div>

        </div>
    );
}

function updateUI(expenses){

    root.render(
        <ExpenseList expenses={expenses}/>
    );

    summaryRoot.render(
        <Summary expenses={expenses}/>
    );
}

window.addEventListener(
    "expensesUpdated",
    event=>{

        updateUI(event.detail);
    }
);

document
.getElementById("searchInput")
.addEventListener("input",()=>{

    updateUI(expenses);
});

document
.getElementById("filterCategory")
.addEventListener("change",()=>{

    updateUI(expenses);
});

updateUI(expenses);