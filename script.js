var timer = 100; // Start with 100 seconds
var myScore = 0;
var hit_Random = 0;
var pannel2 = document.querySelector("#pannel2");
var currentLevel = 1; // Initialize at level 1

function getScore() {
  var score = document.querySelector("#score");
  myScore += 10;
  score.innerHTML = myScore;

  // Check if the score enters a new level range
  if (myScore >= 0 && myScore <= 200 && currentLevel !== 1) {
    currentLevel = 1;
    updateLevelDisplay();
    updateTimer(100);
  } else if (myScore >= 210 && myScore <= 410 && currentLevel !== 2) {
    currentLevel = 2;
    updateLevelDisplay();
    updateTimer(60);
  } else if (myScore >= 420 && myScore <= 700 && currentLevel !== 3) {
    currentLevel = 3;
    updateLevelDisplay();
    updateTimer(30);
  } else if (myScore > 700) {
    pannel2.innerHTML = `<h1>You won the game!</h1>`;
    clearInterval(timerint); // Stop the timer
  }
}

function updateLevelDisplay() {
  var levelDisplay = document.querySelector("#level");
  levelDisplay.innerHTML = `${currentLevel}`;
}

function updateTimer(seconds) {
  timer = seconds;
  var timmerclock = document.querySelector("#timmerclock");
  timmerclock.innerHTML = timer;
}

function hitBubble() {
  var hit = document.querySelector("#hit");
  hit_Random = Math.floor(Math.random() * 10);
  hit.innerHTML = hit_Random;
}

function runTimmer() {
  var timmerclock = document.querySelector("#timmerclock");
  var timerint = setInterval(function () {
    if (timer > 0) {
      timer--;
      timmerclock.innerHTML = timer;
    } else {
      clearInterval(timerint);
      pannel2.innerHTML = `<h1>Game Over!</h1>`;
    }
  }, 1000);
}

function makeBubble() {
  pannel2.innerHTML = "";

  // Calculate the number of bubbles based on the screen size
  var maxBubbles = window.innerWidth < 420 ? 40 : 112;

  for (let i = 1; i <= maxBubbles; i++) {
    var random_no = Math.floor(Math.random() * 10);
    pannel2.innerHTML += `<div class="bubble">${random_no}</div>`;
  }
}

pannel2.addEventListener("click", function (dets) {
  var clk_rand = Number(dets.target.textContent);
  //   console.log(dets.target.textContent);
  if (clk_rand === hit_Random) {
    getScore();
    makeBubble();
    hitBubble();
  }
});

// Call makeBubble initially and when the window is resized
window.addEventListener("resize", makeBubble);

updateLevelDisplay(); // Initialize level display
makeBubble();
runTimmer();
hitBubble();
