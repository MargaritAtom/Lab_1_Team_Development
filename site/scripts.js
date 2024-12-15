// script.js
let total = 0;
let isPlaying = false;
const music = document.getElementById('music');

document.getElementById('addExpense').addEventListener('click', function() {
    const expenseInput = document.getElementById('expense');
    const expenseNameInput = document.getElementById('expenseName');
    const expenseValue = parseFloat(expenseInput.value);
    const expenseName = expenseNameInput.value.trim();

    if (!isNaN(expenseValue) && expenseValue > 0 && expenseName) {
        total += expenseValue;
        updateTotal();
        addExpenseToList(expenseName, expenseValue);
        expenseInput.value = ''; // Очистить поле ввода суммы
        expenseNameInput.value = ''; // Очистить поле ввода названия
    } else {
        alert('Пожалуйста, введите корректное название и сумму.');
    }
});

function updateTotal() {
    document.getElementById('totalAmount').innerText = total.toFixed(2);
}

function addExpenseToList(name, expense) {
    const expenseList = document.getElementById('expenseList');
    const listItem = document.createElement('li');
    listItem.innerText = `${name}: ${expense.toFixed(2)} ₽`;
    
    // Создаем кнопку удаления
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '✖'; // Крестик для удаления
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function() {
        total -= expense; // Уменьшаем общую сумму
        updateTotal();
        expenseList.removeChild(listItem); // Удаляем элемент списка
    };

    listItem.appendChild(deleteButton);
    expenseList.appendChild(listItem);
}

// Включение/выключение музыки
document.getElementById('musicToggle').addEventListener('click', function() {
    if (isPlaying) {
        music.pause();
        this.innerText = '🎵 Включить музыку';
    } else {
        music.play();
        this.innerText = '🎵 Остановить музыку';
    }
    isPlaying = !isPlaying;
});

// Переход на другую страницу
document.getElementById('navigateButton').addEventListener('click', function() {
    window.location.href = 'index.html'; // Переход на вторую страницу
});
