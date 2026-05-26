$(document).ready(function () {

  // # GET & SET CODE

  $("#show-name").click(function () {
    let name = $("#student-name").text();
    $("#output").text(name);
  });

  $("#change-name").click(function () {
    $("#student-name").text("Suva Bhattarai");
  });

  $("#show-bio").click(function () {
    let bio = $("#student-bio").html();
    $("#output").text(bio);
  });

  $("#get-input").click(function () {
    let nickname = $("#nickname-input").val();
    $("#output").text(nickname);
  });

  $("#set-input").click(function () {
    $("#nickname-input").val("jQuery Pro");
  });


  // # CSS CLASSES CODE

  $("#highlight-card").click(function () {
    $("#profile-card").addClass("highlighted");
  });

  $("#remove-highlight").click(function () {
    $("#profile-card").removeClass("highlighted");
  });

  $("#toggle-dark").click(function () {
    $("#profile-card").toggleClass("dark-mode");
  });

  $("#toggle-rounded").click(function () {
    $("#profile-photo").toggleClass("rounded");
  });


  // # CSS METHOD CODE

  $("#red-bg").click(function () {
    $("#profile-card").css("background", "#e74c3c");
  });

  $("#reset-bg").click(function () {
    $("#profile-card").css("background", "white");
  });


  // # HIDE & SHOW CODE

  $("#hide-photo").click(function () {
    $("#profile-photo").hide("slow");
  });

  $("#show-photo").click(function () {
    $("#profile-photo").show("slow");
  });

  $("#toggle-bio").click(function () {
    $("#student-bio").toggle();
  });


  // # FADE CODE

  $("#fade-out-card").click(function () {
    $("#profile-card").fadeOut();
  });

  $("#fade-in-card").click(function () {
    $("#profile-card").fadeIn();
  });

  $("#fade-to-half").click(function () {
    $("#profile-card").fadeTo("slow", 0.5);
  });


  // # SLIDE CODE

  $("#slide-up-skills").click(function () {
    $("#skills-list").slideUp();
  });

  $("#slide-down-skills").click(function () {
    $("#skills-list").slideDown();
  });

  $("#slide-toggle-skills").click(function () {
    $("#skills-list").slideToggle();
  });


  // # ANIMATE CODE

  $("#animate-card").click(function () {
    $("#profile-card")
      .animate({ marginLeft: "200px" }, 1000)
      .animate({ marginLeft: "0px" }, 1000);
  });


  // # EVENTS CODE

  $("#profile-photo").mouseenter(function () {
    $("#profile-photo").addClass("shadow");
  });

  $("#profile-photo").mouseleave(function () {
    $("#profile-photo").removeClass("shadow");
  });

  $("#nickname-input").keypress(function (event) {
    $("#output").text("Pressed key: " + event.key);
  });

});