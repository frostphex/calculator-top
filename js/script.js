const display = document.querySelector("#result-display");
const buttonsContainer = document.querySelector(".buttons");
let number1 = '';

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

function handleAction(action) {
  if (/^\d+$/.test(Number(action))) {
    number1 += action;
    display.textContent = number1;
  } else if (action) {
    console.log(action);
  }

}

function operate(number1, number2, operator) {
  const calculate = {
    add: number1 + number2,
    subtract: number1 - number2,
    multiply: number1 * number2,
    divide: number1 / number2,
  };

  return calculate[operator];
}
