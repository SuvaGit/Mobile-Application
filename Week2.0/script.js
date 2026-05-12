function calculateResult() {
    let m1 = Number(document.getElementById("m1").value);
    let m2 = Number(document.getElementById("m2").value);
    let m3 = Number(document.getElementById("m3").value);
    let m4 = Number(document.getElementById("m4").value);
    let m5 = Number(document.getElementById("m5").value);
    let m6 = Number(document.getElementById("m6").value);
    let m7 = Number(document.getElementById("m7").value);
    let m8 = Number(document.getElementById("m8").value);

    let total = m1 + m2 + m3 + m4 + m5 + m6 + m7 + m8;
    let percentage = total / 8;

    document.getElementById("total").innerHTML = "Total Marks: " + total;

    if (percentage >= 40) {
        document.getElementById("result").innerHTML = "Result: Pass";
    } else {
        document.getElementById("result").innerHTML = "Result: Fail";
    }
}

function calculate(operator) {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let result;

    if (operator === "+") {
        result = num1 + num2;
    } else if (operator === "-") {
        result = num1 - num2;
    } else if (operator === "*") {
        result = num1 * num2;
    } else if (operator === "/") {
        if (num2 === 0) {
            result = "Cannot divide by zero";
        } else {
            result = num1 / num2;
        }
    }

    document.getElementById("calcResult").innerHTML = "Result: " + result;
}