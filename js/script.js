// const incomeArea = document.querySelector('.income-area');
// const tempAdd = document.querySelector('.additions');
// const expensesArea = document.querySelector('.expenses-area');
// const tempShopping = document.querySelector('.shopping');
// const tempFood = document.querySelector('.food');
// const tempCinema = document.querySelector('.cinema');
// const payChek = () => {
//     const cash = '1001 zl';
//     const addTest = tempAdd.content.firstElementChild.cloneNode(true)
//     addTest.querySelector('.transaction-amount').textContent = `${cash}`
//     incomeArea.appendChild(addTest)
// }
// const shopping = () => {
//     const cash = '100 zl';
//     const shop = tempShopping.content.cloneNode(true)
//     shop.querySelector('.transaction-amount').textContent = `${cash}`
//     expensesArea.appendChild(shop)
// }
// shopping();
// payChek();


const incomeSection = document.querySelector('.income-area');
const expensesSection = document.querySelector('.expenses-area');
const avaliableMoney = document.querySelector('.avaliable-money');
const addTransactionPanel = document.querySelector('.add-transaction-panel');

const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');

const addTransactionBtn = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.save');
const cancleBtn = document.querySelector('.cancel');
const deleteBtn = document.querySelector('.delete');
const deleteAllBtn = document.querySelector('.delete-all');
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');

let root = document.documentElement;
let Id = 0;
let categoryIcon;
let selectedCategory;
let monneyArr = [0];


const showPanel = () => {
    addTransactionPanel.style.display = 'flex';
}
const closePanel = () => {
    addTransactionPanel.style.display = 'none';
    clearInputs();
}

const checkForm = () => {
    if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
        createNewTransaction();
    } else {
        alert('Wypelni wszystkie pola!');
    }
}
const clearInputs = () => {
    nameInput.value = '';
    amountInput.value = '';
    categorySelect.selectedIndex = 0;
}

const createNewTransaction = () => {
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', Id);

    selectCategory();
    chekCategory(selectedCategory);

    newTransaction.innerHTML = `
    <p class="transaction-name"> ${categoryIcon} ${nameInput.value} </p>
    <p class="transaction-amount"> ${amountInput.value} zl <button class="delete" onclick="deleteTransaction(${Id})">
    <i class="fas fa-times"></i></button></p>`

    amountInput.value > 0 ? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income') : expensesSection.appendChild(newTransaction) && newTransaction.classList.add('expense');

    monneyArr.push(parseFloat(amountInput.value));
    bilance(monneyArr);
    closePanel();
    Id++;
    clearInputs();


}
const selectCategory = () => {
    selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
}

const chekCategory = transaction => {
    switch (transaction) {
        case '[+] Przychod':
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
            break;
        case '[-] Zakupy':
            categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
            break;
        case '[-] Jedzenie':
            categoryIcon = '<i class="fas fa-hamburger"></i>';
            break;
        case '[-] Kino':
            categoryIcon = '<i class="fas fa-film"></i>';
            break;
    }
}

const bilance = money => {
    const count = money.reduce((a, b) => a + b);
    avaliableMoney.textContent = `${count} zl`
}

const deleteTransaction = id => {
    const transactionToDelete = document.getElementById(id);
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
    const indexOfTransaction = monneyArr.indexOf(transactionAmount);

    monneyArr.splice(indexOfTransaction, 1);

    transactionToDelete.classList.contains('income') ? incomeSection.removeChild(transactionToDelete) : expensesSection.removeChild(transactionToDelete);
    bilance(monneyArr);
}

const deleteAllTransactions = () => {
    incomeSection.innerHTML = '<h3>Przychod:</h3>';
    expensesSection.innerHTML = '<h3>Wydatki:</h3>';
    avaliableMoney.textContent = '0zl';
    monneyArr = [0];
}

const changeStyleLigth = () => {
    root.style.setProperty('--first-color', '#f9f9f9');
    root.style.setProperty('--second-color', '#14161f');
    root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)');
}
const changeStyleDark = () => {
    root.style.setProperty('--first-color', '#14161f');
    root.style.setProperty('--second-color', '#f9f9f9');
    root.style.setProperty('--border-color', 'rgba(255, 255, 255, .4)');
}

addTransactionBtn.addEventListener('click', showPanel);
cancleBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAllTransactions);
lightBtn.addEventListener('click', changeStyleLigth);
darkBtn.addEventListener('click', changeStyleDark);