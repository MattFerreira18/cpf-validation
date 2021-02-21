// cpf ex: 412.876.640-24

/*
1 - Multiply and Sum
4 * 10 = 40
1 * 9  =  9
2 * 8  = 16
8 * 7  = 56
7 * 6  = 42
6 * 5  = 30
6 * 4  = 24
4 * 3  = 12
0 * 2  =  0
sum    = 229

2 - First digit
11 - (229 % 11) = 2 (if number > 9 => 0);

3 - Multiply and Sum
4 * 11 = 44
1 * 10 = 10
2 * 9  = 18
8 * 8  = 64
7 * 7  = 49
6 * 6  = 36
6 * 5  = 30
4 * 4  = 16
0 * 3  =  0
2 * 2  =  4
sum    = 271

4 - Second digit
11 - (271 % 11) = 4 (if number > 9 => 0);

5 - Compare CPF original with CPF calculated
*/

function removeCharacter(cpf) {
  // regular expression
  const clear = cpf.replace(/\D+/g, '');
  return clear;
}

function toArr(cpf) {
  return Array.from(cpf);
}

function removeDigits(cpfArr) {
  cpfArr.pop();
  cpfArr.pop();
  return cpfArr;
}

function multiplyAndSum(arr) {
  const multiplies = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  const multipliedArr = [];

  arr.forEach((el, index) => {
    let number;
    if (arr.length === 10) {
      number = multiplies[index];
    } else {
      number = multiplies[index + 1];
    }
    multipliedArr.push(el * number);
  });

  const sum = multipliedArr.reduce((accumulator, value) => {
    accumulator += value;
    return accumulator;
  }, 0);
  return sum;
}

function createDigit(sum) {
  let digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  return digit;
}

function addDigit(arr, digit) {
  return [...arr, digit];
}

function isValid(cpf, calculated) {
  if (
    toString(cpf[9]) === toString(calculated[9]) &&
    toString(cpf[10]) === toString(calculated[10])
  ) {
    return 'this CPF is valid';
  }
  return 'this CPF is not valid';
}

function controller(cpf) {
  const clear = removeCharacter(cpf);
  const cpfArr = toArr(clear);
  const copyCpfArr = [...cpfArr];
  const restArr = removeDigits(cpfArr);

  // first digit
  const resultOne = multiplyAndSum(restArr);
  const digit = createDigit(resultOne);
  const withFirstDigit = addDigit(restArr, digit);

  // second digit
  const resultTwo = multiplyAndSum(withFirstDigit);
  const secondDigit = createDigit(resultTwo);
  const cpfCalc = addDigit(withFirstDigit, secondDigit);
  const resp = isValid(copyCpfArr, cpfCalc);
  console.log(resp);
}

const cpf = '412.876.640-24';

controller(cpf);
