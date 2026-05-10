$(document).ready(function () {
    $("#animateBtn").click(function () {
        $("#box").animate({
            left: "400px",
            top: "400px"
        }, 1000);

        $("#box").animate({
            left: "0px",
            top: "0px"
        }, 1000);
    });
});