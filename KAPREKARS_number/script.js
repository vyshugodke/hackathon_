function createColumn(element, className, id = '') {
    var col = document.createElement(element)
    col.setAttribute('class', className)
    col.id = id
    return col;
}

var container = createColumn('div', 'container');
var div2 = document.createElement('div');
div2.id = 'box';
var small = createColumn('h2', 'small');
small.innerHTML = "Kaprekar's Constant";
var p = createColumn('p', 'small');
var strong = document.createElement('strong');
var u = document.createElement('u');
u.innerHTML = "Instruction:"
strong.appendChild(u);
p.append(strong);
p.innerHTML = "Enter any four non-identical digit number with at least two distinct digits e.g: 1234 or 7711 in the box below and click the green button to get the steps it takes the number to become a kaprekar's constant (6174)"

var div3 = document.createElement('div');
var div4 = createColumn('div', 'small');
var input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Enter a valid four digit number here');
input.required = true;
input.id = 'userInput';

div4.appendChild(input);
div3.appendChild(div4);
var div5 = document.createElement('div');
div5.id = "error"
var div6 = createColumn('div', 'small');
var btn = createColumn('button', 'computestep');
btn.id = 'computeStep';
btn.setAttribute('name', 'computeStep')
btn.innerHTML = "Generate Steps";
div6.appendChild(btn);
div2.append(small, p, div3, div5, div6);

var div7 = document.createElement('div')
div7.id = 'box';
var result = createColumn('div', 'result');
result.id = 'result';
div7.appendChild(result)

container.append(div2, div7);
document.body.append(container);


// js code starts here 

btn.addEventListener('click', KaprekarsConstant);


function kaprekarUnique(number) {
    number = number.toString();
    number = number.split('');
    for (let i = 0; i < number.length; i++) {
        let distinctDigit = 0;
        for (let j = 0; j < number.length; j++) {
            if (number[i] === number[j]) {
                distinctDigit += 1;
            }
        }
        if (distinctDigit > 2) {
            return false;
        }
    }
    return true;
}

let number;
let dummy = [];

function KaprekarsConstant(number) {
    let error;
    number = document.getElementById('userInput').value;
    let originalNumber = number;
    let result;
    let count = 0;

    let validInput = /^[0-9]{4}$/;
    let validate = validInput.test(number);
    if (!validate) {
        error = `Kindly enter a valid 4-digit number to proceed`;
        document.getElementById('result').innerHTML = '';
        return document.getElementById('error').innerHTML = error;
    }


    if (!kaprekarUnique(number)) {
        error = "The number you entered does not meet the Kaprekar's Constant uniqueness requirement";
        document.getElementById('result').innerHTML = '';
        return document.getElementById('error').innerHTML = error;
    }

    while (result !== 6174) {
        number = number.toString();
        number = number.split('');

        if (!error) {
            document.getElementById('error').innerHTML = '';
        }

        let smallest = [];
        let biggest = [];

        for (let i = 0; i < number.length; i++) {
            number[i] = parseInt(number[i]);
        }


        for (let i = 0; i < number.length; i++) {
            for (j = 0; j < number.length; j++) {
                if (number[i] > number[j]) {
                    let temp = number[i];
                    number[i] = number[j];
                    number[j] = temp;
                }
            }
        }


        biggest = number;
        smallest = number.slice().reverse();


        biggest = biggest.join('');
        smallest = smallest.join('');


        result = parseInt(biggest - smallest);
        count += 1;
        dummy.push(result);
        number = result;

        document.getElementById('result').innerHTML +=
            (biggest + " - " + smallest + " = " + result + "<br>");

    }
}