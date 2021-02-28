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

class cpfValidation {
  constructor(cpf) {
    this.cpf = cpf;
  }


  static verification = (cpf) => {
    if(typeof cpf != 'string' || typeof cpf != 'number') return false;
    if(cpf.legth !== 11) return false;
    if(this.isSequence()) return false;
  }

  static isSequence = (cpf) => {
    return cpf.charAt(0).repeat(11) === cpf;
  }

  static removeCharacter = (cpf) => cpf.replace(/\D+/g, '');

  static toArr = (cpf) => Array.from(cpf);

  static removeDigits = (cpf) => cpf.splice(0, 9);

  static multiplyAndSum = (arr) => {
    const multiplies = [11, 10,9,8,7,6,5,4,3,2];
    const multiplieds = [];
    let number = 0;

    arr.forEach((el, index) => {
      arr.length === 10 ? (number = multiplies[index]) : (number = multiplies[index + 1]);
      multiplieds.push(el * number);
    });

    const sum = multiplieds.reduce((accumulator, value) => (accumulator += value), 0);

    return sum;
  }

  static createDigit = (sum) => {
    const digit = 11 - (sum % 11);
    return digit > 9 ? 0 : digit;
  }

  static addDigit = (arr, digit) => [...arr, digit];

  static isValid = (cpf, complete) =>  cpf[9] == complete[9] && cpf[10] == complete[10] ? true : false;

  controller = () => {

    if(cpfValidation.verification()) return false;

    const cpfClr = cpfValidation.removeCharacter(this.cpf);
    const cpfArr = cpfValidation.toArr(cpfClr);

    const cpfWithoutDigits = cpfValidation.removeDigits(cpfArr);
    const cpfSum1 = cpfValidation.multiplyAndSum(cpfWithoutDigits);
    const digit1 = cpfValidation.createDigit(cpfSum1);
    const cpfWithFirstDigit = cpfValidation.addDigit(cpfWithoutDigits, digit1);

    const cpfSum2 = cpfValidation.multiplyAndSum(cpfWithFirstDigit);
    const digit2 = cpfValidation.createDigit(cpfSum2);

    const cpfComplete = cpfValidation.addDigit(cpfWithFirstDigit, digit2);
    const resp = cpfValidation.isValid(cpfClr, cpfComplete);
    return resp;
  }

}

// const cpf = new cpfValidation('412.876.640-24');
// console.log(cpf.controller());

function showToUser(validationResp) {

   const container = document.querySelector('.result');
  const pTag = [
    document.querySelector('.p__valid'),
    document.querySelector('.p__not-valid')
  ];

  for(const p of pTag) {
    if(p.style.display !== 'none') p.style.display = 'none';
  }

  let resp;

  if(validationResp) {
    container.style.background = 'rgb(150, 224, 38)'
    resp = pTag[0];
  } else {
    container.style.background = '#e24e4e';
    resp = pTag[1];
  }

  resp.style.display = 'block';
}

function userController() {
  const cpf = document.querySelector('.cpf-input').value;
  const validation = new cpfValidation(cpf);
  const resp = validation.controller();
  showToUser(resp);

}

document.addEventListener('click', (e) => {
  e.preventDefault();
  if(e.target.classList.contains('validate')) userController();
})
