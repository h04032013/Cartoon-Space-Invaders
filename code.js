var ShipReady = true;
var score;
var elapsed;
var startTime = 0;

onEvent("PlayScreen", "keydown", function(event) {
  var shipX = getXPosition("Image_Ship");
  var shipY = getYPosition("Image_Ship");
  var distance = 12;
  if(event.key == "Up") {
    shipY = shipY - distance;
  }
  if(event.key == "Down"){
    shipY = shipY + distance;
  }
  if(event.key == "Enter") {
    GetPickle();
    ShootPickle();
  }
  setPosition("Image_Ship", shipX, shipY);
  TurnScreen("Image_Ship");
});
function TurnScreen(object) {
  var objectX = getXPosition(object);
  var objectY = getYPosition(object);
  var objectHeight = getProperty(object, "height");
  if(objectY < 0 - (objectHeight / 2)) {
    objectY = 450 - (objectHeight / 2);
  } else if (objectY > 450 - (objectHeight / 2)) {
  objectY = 0 - (objectHeight / 2);
  }
  setPosition(object, objectX, objectY);
}
function GetPickle() {
  var shipX = getXPosition("Image_Ship");
  var shipY = getYPosition("Image_Ship");
  var shipHeight = getProperty("Image_Ship", "height");
  var shipWidth = getProperty("Image_Ship", "width");
  var PickleX = shipX + shipWidth / 2;
  var PickleY = shipY + shipHeight / 2;
  setPosition("image_Pickle", PickleX, PickleY);
  }
onEvent("playbutton", "click", function( ) {
  setScreen("InstructionScreen");
  restart();
});
onEvent("IntroPlay", "click", function( ) {
  restart();
  setScreen("PlayScreen");
  Timer();
  FullMoveEnemy();
  UpdateScore();
});
onEvent("Image_Portal", "click", function( ) {
  score = score + 100;
  UpdateScore();
  setScreen("WinScreen");
  stopTimedLoop();
});
onEvent("Exit", "click", function( ) {
  setScreen("welcomescreen");
  restart();
});
onEvent("LosePlayAgain", "click", function( ) {
  setScreen("welcomescreen");
  restart();
});
onEvent("playagain", "click", function( ) {
  restart();
  setScreen("welcomescreen");
});
function ShootPickle() {
  showElement("image_Pickle");
  timedLoop(40, function() {
    var PickleX = getXPosition("image_Pickle");
    var PickleY = getYPosition("image_Pickle");
    setPosition("image_Pickle", PickleX + 12, PickleY);
    if (PickleX >= 320) {
      stopTimedLoop(40);
      GetPickle();
      hideElement("image_Pickle");
    }
  });
}
function Timer(){
  startTime = getTime();
  timedLoop(1000, function() {
    var currentTime = getTime();
    elapsed = currentTime - startTime;
    elapsed = Math.round(elapsed/1000);
    setNumber("DisplayTime", elapsed);
    if (elapsed == 30) {
      setScreen("GAmeOver");
      stopTimedLoop(1000);
    }
  });
}
function restart() {
  stopTimedLoop();
  score = 0;
  startTime = 0;
  elapsed = 0;
  hideElement("Image_Portal");
  setPosition("Image_ToxicRick", 220, 0);
  setPosition("Image_Supernova", 220, 112.5);
  setPosition("Image_RickDevil", 220, 225);
  setPosition("Image_SoldierRick", 220, 337.5);
  hideElement("image_Pickle");
  showElement("Image_RickDevil");
  showElement("Image_SoldierRick");
  showElement("Image_Supernova");
  showElement("Image_ToxicRick");
}
function PreMoveEnemy(object, xStep, yStep) {
  var newX = getXPosition(object) + xStep;
  var newY = getYPosition(object) + yStep;
  setPosition(object, newX, newY);
  TurnScreen(object);
}
function FullMoveEnemy() {
  timedLoop(50, function() {
    PreMoveEnemy("Image_RickDevil", 0, 5);
    PreMoveEnemy("Image_ToxicRick", 0, 5);
    PreMoveEnemy("Image_Supernova", 0, 5);
    PreMoveEnemy("Image_SoldierRick", 0, 5);
    Crashing("Image_RickDevil");
    Crashing("Image_ToxicRick");
    Crashing("Image_Supernova");
    Crashing("Image_SoldierRick");
  });
}
function Crashing(object) {
  var pickleY = getYPosition("image_Pickle");
  var pickleX = getXPosition("image_Pickle");
  var objectX = getXPosition( object );
  var objectY = getYPosition( object );
  var pickleWidth = getProperty( "image_Pickle", "width");
  var pickleHeight = getProperty("image_Pickle", "height");
  var objectWidth = getProperty( object , "width");
  var objectHeight = getProperty( object , "height");
  if (pickleX + pickleWidth >= objectX && pickleX <= objectX + objectWidth)
  {
    if (pickleY + pickleHeight >= objectY && pickleY <= objectY + objectHeight) {
      if (!getProperty(object, "hidden")&&(!getProperty("image_Pickle","hidden"))) {
        hideElement(object);
        score = score + 100;
        UpdateScore();
      }
    }
  }
}
function UpdateScore() {
  setNumber("LoseScoreDisplay", score);
  setNumber("PlayScoreupdate", score);
  setNumber("WinScoreDisplay", score);
  if (score == 400) {
    showElement("Image_Portal");
  }
}
