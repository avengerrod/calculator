const input = document.getElementById('result');
const result = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');
const clear = document.querySelector('clr');
let currentNum = '';
let expression = [];
let lastWasOperator = false;
buttons.forEach(button => {
  button.addEventListener('click', () => handleInput(button.value));
});
document.addEventListener('keydown', (event) => {
  event.preventDefault();
  const key = event.key;
  const mapped = key === 'Enter' ? '=' :
                 key === 'Backspace' ? 'back' :
                 key === 'Escape' ? 'clear' :
                 key;
  const button = [...buttons].find(btn => btn.value === mapped);
  if (button) button.click();
});
function handleInput(value) {
  let notEmpty = !isNaN(value);
  let opChoice = ['+', '-', '*', '/'].includes(value);
  if (notEmpty) {
    currentNum += value;
    input.value = currentNum;
    console.log(input.value);
    lastWasOperator = false;
  }
  else if (value === '.') {
    if (currentNum === '') {
      currentNum = '0.';
    }
    else if (!currentNum.includes('.')) {
      currentNum += '.';
    }
    input.value = currentNum;
  }
  else if (opChoice) {
    if (currentNum !== '' && !lastWasOperator) {
      expression.push(currentNum);
      expression.push(value);
      input.value = currentNum;
      currentNum = '';
      lastWasOperator = true;
      console.log(value);
    }
  }
  else if (value === '=') {
    if (currentNum !== '') {
      expression.push(currentNum);
    }
      const result = evaluateExpression(expression); 
    input.value = result;
    currentNum = result.toString();
    expression = [];
    console.log("= "+input.value);
  }
  else if (value === 'back') {
    currentNum = currentNum.slice(0, -1);
    input.value = currentNum || '0';
  }
  else if (value === 'clear') {
    currentNum = '';
    expression = [];
    input.value = '0';
    lastWasOperator = false;
    console.log("cleared");
  }
  else if (value === 'pn') {
    if (currentNum !== '') {
      if (currentNum.startsWith('-')) {
        currentNum = currentNum.slice(1);
      } else {
        currentNum = '-' + currentNum;
      }
      input.value = currentNum;
    }
  }
  else {
    currentNum = '';
    expression = [];
    input.value = 'Error';
    lastWasOperator = false;
    console.log("Error");
  }
}
function add(a, b) {
	return a += b;
};
function subtract(a, b) {
  return a -= b;
};
function multiply(a, b) {
  return a *= b;
};
function divide(a, b) {
  return a /= b;
};
function evaluateExpression(expr) {
  let total = parseFloat(expr[0]);
  for (let i = 1; i < expr.length; i += 2) {
    const operator = expr[i];
    const nextNum = parseFloat(expr[i + 1]);
    switch (operator) {
      case '+': total = add(total, nextNum); break;
      case '-': total = subtract(total, nextNum); break;
      case '*': total = multiply(total, nextNum); break;
      case '/': total = divide(total, nextNum); break;
    }
  }
  return Number.isInteger(total) ? total : parseFloat(total.toFixed(2));
}