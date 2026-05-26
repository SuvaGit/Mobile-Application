let bankBalance = 10000;
let correctPIN = "1234";

function updateBalance() {
  document.getElementById("balance").innerHTML = bankBalance;
}

function checkAmount(amount) {
  if (amount <= 0 || isNaN(amount)) {
    alert("Please enter a valid amount.");
    return false;
  }

  if (amount % 100 !== 0) {
    alert("Amount must be a multiple of 100.");
    return false;
  }

  return true;
}

function withdrawMoney() {
  let amount = Number(document.getElementById("amount").value);

  if (!checkAmount(amount)) {
    return;
  }

  let pin = prompt("Enter your PIN:");

  if (pin !== correctPIN) {
    alert("Incorrect PIN.");
    return;
  }

  if (amount > bankBalance) {
    alert("Insufficient balance.");
    return;
  }

  bankBalance = bankBalance - amount;
  updateBalance();

  document.getElementById("result").innerHTML =
    "Withdraw successful. Current bank balance is $" + bankBalance;
}

function depositMoney() {
  let amount = Number(document.getElementById("amount").value);

  if (!checkAmount(amount)) {
    return;
  }

  let pin = prompt("Enter your PIN:");

  if (pin !== correctPIN) {
    alert("Incorrect PIN.");
    return;
  }

  bankBalance = bankBalance + amount;
  updateBalance();

  document.getElementById("result").innerHTML =
    "Deposit successful. Current bank balance is $" + bankBalance;
}