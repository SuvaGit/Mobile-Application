function getNumbers() {
    let number1 = parseFloat(document.getElementById("num1").value);
    let number2 = parseFloat(document.getElementById("num2").value);

    return [number1, number2];
}

function add() {
    let [number1, number2] = getNumbers();
    let result = number1 + number2;

    document.getElementById("result").innerHTML = "Addition Result: " + result;
}

function subtract() {
    let [number1, number2] = getNumbers();
    let result = number1 - number2;

    document.getElementById("result").innerHTML = "Subtraction Result: " + result;
}

function multiply() {
    let [number1, number2] = getNumbers();
    let result = number1 * number2;

    document.getElementById("result").innerHTML = "Multiplication Result: " + result;
}

function divide() {
    let [number1, number2] = getNumbers();

    if (number2 === 0) {
        document.getElementById("result").innerHTML = "Cannot divide by zero";
    } else {
        let result = number1 / number2;
        document.getElementById("result").innerHTML = "Division Result: " + result;
    }
}