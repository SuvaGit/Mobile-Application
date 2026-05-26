$(document).ready(function () {
  let balance = 5000;
  let currentAction = "";

  $("#showEye").click(function () {
    $("#balanceText").text("$" + balance);

    $("#showEye").hide();
    $("#hideEye").show();
  });

  $("#hideEye").click(function () {
    $("#balanceText").text("******");

    $("#hideEye").hide();
    $("#showEye").show();
  });

  $("#depositBtn").click(function () {
    currentAction = "deposit";

    $("#amountBox").show();
    $("#actionTitle").text("Deposit Amount");
    $("#amountInput").val("");
    $("#message").text("");
  });

  $("#withdrawBtn").click(function () {
    currentAction = "withdraw";

    $("#amountBox").show();
    $("#actionTitle").text("Withdraw Amount");
    $("#amountInput").val("");
    $("#message").text("");
  });

  $("#submitBtn").click(function () {
    let amount = Number($("#amountInput").val());

    if (amount <= 0 || isNaN(amount)) {
      $("#message").text("Please enter a valid amount.");
      $("#message").css("color", "red");
      return;
    }

    if (currentAction === "deposit") {
      balance = balance + amount;
      $("#message").text("Amount deposited successfully.");
      $("#message").css("color", "green");
    }

    if (currentAction === "withdraw") {
      if (amount > balance) {
        $("#message").text("Insufficient balance.");
        $("#message").css("color", "red");
        return;
      }

      balance = balance - amount;
      $("#message").text("Amount withdrawn successfully.");
      $("#message").css("color", "green");
    }

    if ($("#hideEye").is(":visible")) {
      $("#balanceText").text("$" + balance);
    }

    $("#amountInput").val("");
  });
});