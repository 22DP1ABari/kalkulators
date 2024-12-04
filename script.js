let history = JSON.parse(localStorage.getItem('history')) || [];

function addToInput(value) {
  document.getElementById('display').value += value;
}

function clearInput() {
  document.getElementById('display').value = '';
}

function calculate() {
  const display = document.getElementById('display');
  try {
    const result = eval(display.value);
    history.push(`${display.value} = ${result}`);
    localStorage.setItem('history', JSON.stringify(history));
    display.value = result;
    updateHistory();
  } catch {
    display.value = 'Error';
  }
}

function updateHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  history.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Dzēst';
    deleteButton.onclick = () => deleteHistory(index);
    li.appendChild(deleteButton);
    historyList.appendChild(li);
  });
}

function deleteHistory(index) {
  history.splice(index, 1);
  localStorage.setItem('history', JSON.stringify(history));
  updateHistory();
}

function clearHistory() {
  history = [];
  localStorage.removeItem('history');
  updateHistory();
}

// Inicializē vēsturi, kad lapa tiek ielādēta
document.addEventListener('DOMContentLoaded', updateHistory);
