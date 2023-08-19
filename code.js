var playing = false;
var score;
var liferemaining;
var fruit = ["applef", "orange", "pinaple", "oniuon"];
var step;
var action;

$(function () {
  $("#startreset").click(function () {
    if (playing == true) {
      location.reload();
    } else {
      playing = true;
      score = 0;
      $("#scorevalue").html(score);
      $("#liferemaining").show();
      liferemaining = 3;
      addHearts();
      $("#gameover").hide();
      $("#startreset").html("Reset Game");
      startFruits();
    }
  });

  $("#fruit").mouseover(function () {
    score++; 
    $("#scorevalue").html(score); 
    $("#slice")[0].play(); 
    clearInterval(action);
    $("#fruit").hide("explode", 100);
    setTimeout(startFruits, 500);
  });

  function addHearts() {
    $("#liferemaining").empty();
    // $("#liferemaining")
    for (i = 0; i < liferemaining; i++) {
      $("#liferemaining").append('<img src="images/heart.png" class="love">');
    }
  }

  function startFruits() {
    $("#fruit").show();
    chooseFruits();
    $("#fruit").css({ left: Math.round(600 * Math.random()), top: -100 });
    step = 1 + Math.fround(5 * Math.random());
    action = setInterval(function () {
      $("#fruit").css("top", $("#fruit").position().top + step);
      if ($("#fruit").position().top > $("#playarea").height()) {
        if (liferemaining > 1) {
          $("#fruit").show();
          chooseFruits();
          $("#fruit").css({ left: Math.round(600 * Math.random()), top: -100 });
          step = 1 + Math.fround(5 * Math.random());
          liferemaining--;
          addHearts();
        } else {
          playing = false;
          $("#startreset").html("Start Game");
          $("#gameover").show();
          $("#gameover").html(
            "<p>game over !</p><p>Your score is : " + score + "</p>"
          );
          $("#liferemaining").hide();
          stopAction();
        }
      }
    }, 10);
  }
  function chooseFruits() {
    $("#fruit").attr(
      "src",
      "images/" + fruit[Math.round(3 * Math.random())] + ".png"
    );
  }

  function stopAction() {
    clearInterval(action);
    $("#fruit").hide();
  }
});
