const display = document.querySelector("#result-display");
const buttonsContainer = document.querySelector(".buttons");
let number1 = '';
let number2 = '';
let result = '';
let operator = '';

document.addEventListener('DOMContentLoaded', () => {
  display.contentEditable = "true";

  display.addEventListener('input', (e) => {
    display.textContent = display.textContent.replace(/[^0-9]/g, '');
  });
});

buttonsContainer.addEventListener('click', (e) => {
  const button = e.target.closest('button');

  if (button) {
    const action = button.dataset.action;
    handleAction(action);
  }
});

function clearDisplay() {
  number1 = '';
  number2 = '';
  action = '';
  display.textContent = '';
}

function displayNumbers(action) {
  if (operator === '') {
    number1 += action;
    display.textContent = number1;
  } else {
    number2 += action;
    display.textContent = number2;
  }
}

function calculate() {
  if (number1 !== '' && number2 !== '' && operator !== '') {
    result = operate(+number1, +number2, operator);
    if (typeof result === "number") {
      result = result.toFixed(2);
    }

    if (result.length > 20) {
      result = result.substring(0, 20) + '...';
    }
    display.textContent = result;
    number1 = result;
    number2 = '';
    operator = '';
  }
}

function addDecimal() {
  if (operator === '') {
    if (number1.indexOf('.') === -1) {
      number1 += '.';
      // display.textContent = number1;
    }
  } else {
    if (number2.indexOf('.') === -1) {
      number2 += '.';
      // display.textContent = number2;
    }
  }
}

function removeNumber() {
  if (operator === '') {
    number1 = number1.slice(0, -1);
    display.textContent = number1 || '0';
  } else {
    number2 = number2.slice(0, -1);
    display.textContent = number2 || '0';
  }
}

function handleAction(action) {
  if (/^\d+$/.test(Number(action))) {
    displayNumbers(action);
  } else if (action === '=') {
    calculate();
  } else if (action === 'clear') {
    clearDisplay();
  } else if (action === 'period') {
    addDecimal();
  } else if (action === 'backspace') {
    removeNumber();
  } else {
    if (number1 !== '') {
      if (number2 !== '') {
        calculate();
      }
      operator = action;
      display.textContent = number1;
    }
  }
}

function operate(number1, number2, operator) {
  const calculate = {
    '+': () => number1 + number2,
    '-': () => number1 - number2,
    '*': () => number1 * number2,
    '/': () => {
      if (number2 === 0) {
        return "Error: Division by zero is not allowed."
      }
      return number1 / number2;
    },
  };

  return calculate[operator]();
}
