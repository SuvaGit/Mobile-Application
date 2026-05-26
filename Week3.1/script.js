$(document).ready(function () {

  $("#startBtn").click(function () {

    $("#box")
      .css("background-color", "red")
      .animate({
        left: "320px",
        top: "0px",
        opacity: 0.4
      }, 1000, function () {
        $(this).css("background-color", "blue");
      })

      .animate({
        left: "320px",
        top: "220px",
        opacity: 1
      }, 1000, function () {
        $(this).css("background-color", "green");
      })

      .animate({
        left: "0px",
        top: "220px",
        opacity: 0.3
      }, 1000, function () {
        $(this).css("background-color", "orange");
      })

      .animate({
        left: "0px",
        top: "0px",
        opacity: 1
      }, 1000, function () {
        $(this).css("background-color", "purple");
      });

  });

});