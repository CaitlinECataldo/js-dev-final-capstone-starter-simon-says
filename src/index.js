/**
 * DOM SELECTORS
 */

const startButton = document.querySelector(".js-start-button");
// TODO: Add the missing query selectors:
const statusSpan = document.querySelector(".js-status"); // Use querySelector() to get the status element
const heading = document.querySelector(".js-heading"); // Use querySelector() to get the heading element
const padContainer = document.querySelector(".js-pad-container"); // Use querySelector() to get the heading element
const levelSelector = document.querySelectorAll(".level");
/**
* VARIABLES
*/
let computerSequence = []; // track the computer-generated sequence of pad presses
let playerSequence = []; // track the player-generated sequence of pad presses
let maxRoundCount = 0; // the max number of rounds, varies with the chosen level
let roundCount = 0; // track the number of rounds that have been played so far
let level = 0; //  this is the level set by the human player
let playing = ""; // tracks if the human or computer played last
let successMusic = new Audio(".../assets/cartoon_success_fanfair.mp3"); // sound played when all rounds are successfully completed (Sound from Zapsplat.com)
let failureMusic = new Audio(".../assets/multimedia_game_sound_synth_tone_bold_fail_52993.mp3"); // sound played when the game is lost (Sound from Zapsplat.com)
let arrowIcons = document.querySelectorAll(".arrowIcon");
let totalPoints = 0; // tracks the total number of points (correct clicks)
let scoreSelector = document.querySelector(".score");


/**
*
* The `pads` array contains an array of pad objects.
*
* Each pad object contains the data related to a pad: `color`, `sound`, and `selector`.
* - The `color` property is set to the color of the pad (e.g., "red", "blue").
* - The `selector` property is set to the DOM selector for the pad.
* - The `sound` property is set to an audio file using the Audio() constructor.
*
* Audio file for the green pad: "../assets/simon-says-sound-2.mp3"
* Audio file for the blue pad: "../assets/simon-says-sound-3.mp3"
* Audio file for the yellow pad: "../assets/simon-says-sound-4.mp3"
*
*/


const pads = [
 {
   color: "red",
   selector: document.querySelector(".js-pad-red"),
   sound: new Audio("../assets/simon-says-sound-1.mp3"),
 },
 // TODO: Add the objects for the green, blue, and yellow pads. Use object for the red pad above as an example.
 {
   color: "green",
   selector: document.querySelector(".js-pad-green"),
   sound: new Audio("../assets/simon-says-sound-2.mp3"),
 },
 {
   color: "blue",
   selector: document.querySelector(".js-pad-blue"),
   sound: new Audio("../assets/simon-says-sound-3.mp3"),
 },
 {
   color: "yellow",
   selector: document.querySelector(".js-pad-yellow"),
   sound: new Audio("../assets/simon-says-sound-4.mp3"),
 }
];

// Holds all of the values for arrow keys and icons

let arrows = [
  {
    direction: "left",
    keyCode: 37,
    button: document.querySelector(".js-pad-yellow"),
    color: "#09814A",
    holdColor: "#0C9759",
    class: ".js-pad-yellow"}, 
  {
    direction: "top",
    keyCode: 38, 
    button: document.querySelector(".js-pad-red"),
    color: "#235789",
    holdColor: "#7DAFDE",
    class: ".js-pad-red"},
  {
    direction: "right",
    keyCode: 39,
    button: document.querySelector(".js-pad-blue"),
    color: "#A01A7D",
    holdColor: "#E561C2",
    class: ".js-pad-blue"}, 
  {
    direction: "down",
    keyCode: 40,
    button: document.querySelector(".js-pad-green"),
    color: "#C1292E",
    holdColor: "#E7888C",
    class: ".js-pad-green"}];


/**
* EVENT LISTENERSs
*/

padContainer.addEventListener("click", padHandler);
// TODO: Add an event listener `startButtonHandler()` to startButton.
startButton.addEventListener("click",startButtonHandler);

padContainer.addEventListener("click", levelHandler);

document.addEventListener('keyup', keyClick);
document.addEventListener('keydown', holdPad);


//  * EVENT HANDLERS
//  */ 

/**
* Called when the start button is clicked.
*
* 1. Call setLevel() to set the level of the game
*
* 2. Increment the roundCount from 0 to 1
*
* 3. Hide the start button by adding the `.hidden` class to the start button
*
* 4. Unhide the status element, which displays the status messages, by removing the `.hidden` class
*
* 5. Call `playComputerTurn()` to start the game with the computer going first.
*
*/


function startButtonHandler() {
 // TODO: Write your code here.
 playing = "human";
 gameOver = false;
 levelSelector.forEach((level) => {
  level.classList.remove("hidden");
 });
startButton.classList.add("hidden");
padContainer.classList.remove("unclickable");


 return { startButton, statusSpan };
}

// Allows pads to be selected by key
function keyClick(event) {
  let key = event.keyCode;
  arrows.forEach((arrow) => {
  if(parseFloat(arrow.keyCode) === key) {
    arrow.button.classList.remove("activated");
    arrow.button.click();
  }
  });
}

// This function is called when an arrow is held down. It will change the hover color of the selected pad.
function holdPad(event) {
  let key = event.keyCode;
  arrows.forEach((arrow) => {
    if (parseFloat(arrow.keyCode) === key) {
      arrow.button.classList.add("activated");
      // arrow.button.style.backgroundColor = arrow.holdColor;
    }
  });
};


// Called when a pad is clicked. Sets the level chosen by the human after start.
function levelHandler(event) {
  if (playing === "human") {
    statusSpan.classList.remove("hidden");
    
    if (level === 0) {
      level = parseFloat(event.target.innerText);
  setLevel(level);
  levelSelector.forEach((selector) => {
    selector.classList.add("hidden");
  }
  );
  roundCount++;
  showArrowIcons();
  totalPoints = 0;
  scoreSelector.classList.remove("hidden");
  playComputerTurn();
  playing = "computer";
    }
  }
}


/**
* Called when one of the pads is clicked.
*
* 1. (Done) `const { color } = event.target.dataset;` extracts the value of `data-color`
* attribute on the element that was clicked and stores it in the `color` variable
*
* 2. (Done) `if (!color) return;` exits the function if the `color` variable is falsy
*
* 3. (Done) Use the `.find()` method to retrieve the pad from the `pads` array and store it
* in a variable called `pad`
*
* 4. (Sound will not play) Play the sound for the pad by calling `pad.sound.play()`
*
* 5. (Done) Call `checkPress(color)` to verify the player's selection
*
* 6. (Done) Return the `color` variable as the output
*/

// Why does the function below yield the following error: "DOMException: The element has no supported sources." ?

function padHandler(event) {
let selectedLevel = parseFloat(event.target.innerText);
if (level === 0) { 
  setLevel(selectedLevel);
  levelHandler; } 

  
if (level > 0) {
    const { color } = event.target.dataset;
  if (!color) return;
  // TODO: Write your code here.
  let pad = pads.find(pad => pad.color === color);
  if (pad) {
    pad.sound.play();
    checkPress(color);
  }
  return color;
  }
}

// This function shows the arrow icons on the pads
function showArrowIcons() {
  arrowIcons.forEach((arrow) => {
   arrow.classList.remove("hidden");
   console.log(arrow);
  })
}


/**
* HELPER FUNCTIONS
*/

/**
* Sets the level of the game given a `level` parameter.
* Returns the length of the sequence for a valid `level` parameter (1 - 4) or an error message otherwise.
*
* Each skill level will require the player to complete a different number of rounds, as follows:
* Skill level 1: 8 rounds
* Skill level 2: 14 rounds
* Skill level 3: 20 rounds
* Skill level 4: 31 rounds
*
*
* Example:
* setLevel() //> returns 8
* setLevel(1) //> returns 8
* setLevel(2) //> returns 14
* setLevel(3) //> returns 20
* setLevel(4) //> returns 31
* setLevel(5) //> returns "Please enter level 1, 2, 3, or 4";
* setLevel(8) //> returns "Please enter level 1, 2, 3, or 4";
*
*/
function setLevel(level) {
 // TODO: Write your code here. 

 if (level > 4 || level < 0) {
   return "Please enter level 1, 2, 3, or 4";
 } else if (!level || level === 1) {
   maxRoundCount = 8;
   return 8;
 } else if (level === 2) {
   maxRoundCount = 14;
   return 14;
 } else if (level === 3) {
   maxRoundCount = 20;
   return 20;
 } else if (level === 4) {
   maxRoundCount = 31;
   return 31;
 } 
}

/**
* Returns a randomly selected item from a given array.
*
* 1. `Math.random()` returns a floating-point, pseudo-random number in the range 0 to less than 1
*
* 2. Multiplying the value from `Math.random()` with the length of the array ensures that the range
* of the random number is less than the length of the array. So if the length of the array is 4,
* the random number returned will be between 0 and 4 (exclusive)
*
* 3. Math.floor() rounds the numbers down to the largest integer less than or equal the given value
*
* Example:
* getRandomItem([1, 2, 3, 4]) //> returns 2
* getRandomItem([1, 2, 3, 4]) //> returns 1
*/
function getRandomItem(collection) {
 if (collection.length === 0) return null;
 const randomIndex = Math.floor(Math.random() * collection.length);
 return collection[randomIndex];

}


/**
* Sets the status text of a given HTML element with a given a message
*/
function setText(element, text) {
 // TODO: Write your code here.
 element.innerText = text;
 return element;
}

/**
* Activates a pad of a given color by playing its sound and light
*
* 1. (Did not use `.find() method`) Use the `.find()` method to retrieve the pad from the `pads` array and store it in
* a variable called `pad`
*
* 2. (Done) Add the `"activated"` class to the selected pad
*
* 3. (Do not know how to play sound) Play the sound associated with the pad
*
* 4. (Done) After 500ms, remove the `"activated"` class from the pad
*/

function activatePad(color) {
 // TODO: Write your code here.
 let pad = pads.find(pad => pad.color === color);
 // let padClass = document.querySelector(`.pad-${pad.color}`);
 pad.selector.classList.add("activated"); 
 pad.sound.play();
 setTimeout(() => {
   pad.selector.classList.remove("activated");
 }, 500);
}


/**
* Activates a sequence of colors passed as an array to the function
*
* 1. (Done) Iterate over the `sequence` array using `.forEach()`
*
* 2. (Done) For each element in `sequence`, use `setTimeout()` to call `activatePad()`, adding
* a delay (in milliseconds) between each pad press. Without it, the pads in the sequence
* will be activated all at once
*
* 3. (Done) The delay between each pad press, passed as a second argument to `setTimeout()`, needs
* to change on each iteration. The first button in the sequence is activated after 600ms,
* the next one after 1200ms (600ms after the first), the third one after 1800ms, and so on.
*/


function activatePads(sequence) {
 // TODO: Write your code here.
 let delay = 600;
 sequence.forEach((color, index) => {
   setTimeout(() => {
     activatePad(color);
   }, delay * index); // Multiply delay by index to stagger the activation of pads
 });
   
}

/**
* Allows the computer to play its turn.
*
* 1. (Done) Add the `"unclickable"` class to `padContainer` to prevent the user from pressing
* any of the pads
*
* 2. (Done) The status should display a message that says "The computer's turn..."
*
* 3. (Done) The heading should display a message that lets the player know how many rounds are left
* (e.g., "`Round ${roundCount} of ${maxRoundCount}`")
*
* 4. (Done) Push a randomly selected color into the `computerSequence` array
*
* 5. (Done) Call `activatePads(computerSequence)` to light up each pad according to order defined in
* `computerSequence`
*
* 6. (Done) The playHumanTurn() function needs to be called after the computer’s turn is over, so
* we need to add a delay and calculate when the computer will be done with the sequence of
* pad presses. The `setTimeout()` function executes `playHumanTurn(roundCount)` one second
* after the last pad in the sequence is activated. The total duration of the sequence corresponds
* to the current round (roundCount) multiplied by 600ms which is the duration for each pad in the
* sequence.
*/
function playComputerTurn() {
 // TODO: Write your code here.


 if (level > 0) {
  padContainer.classList.add("unclickable");
  setText(statusSpan,"The computer's turn...");
  setText(heading, `Round ${roundCount} of ${maxRoundCount}` );
  
  
    computerSequence.push(getRandomItem(pads).color);
  
  
  
  activatePads(computerSequence);

  setTimeout(() => playHumanTurn(roundCount), roundCount * 600 + 1000); // 5
 }

 playing = "human";
}
// Displays the correct version of press or presses within the statusSpan based on how many clicks are left
function pressGrammar(pressesLeft) {
 let pressGrammar = "Presses";
 if (pressesLeft === 1) {
   pressGrammar = "Press"
 }
 return pressGrammar;
}


/**
* Allows the player to play their turn.
*
* 1. (Done) Remove the "unclickable" class from the pad container so that each pad is clickable again
*
* 2. (Done) Display a status message showing the player how many presses are left in the round
*/
function playHumanTurn() {
 // TODO: Write your code here.
 let clicksLeft = roundCount; // tracks the starting number of clicks allowed in a round
 padContainer.classList.remove("unclickable");
 setText(statusSpan, `Players Turn: ${clicksLeft} ${pressGrammar(clicksLeft)} Left`);
 clicksLeft = clicksLeft - 1;
 playing = "computer"; 
}

/**
* Checks the player's selection every time the player presses on a pad during
* the player's turn
*
* 1. (Done) Add the `color` variable to the end of the `playerSequence` array
*
* 2. (Done) Store the index of the `color` variable in a variable called `index`
*
* 3. (Done) Calculate how many presses are left in the round using
* `computerSequence.length - playerSequence.length` and store the result in
* a variable called `remainingPresses`
*
* 4. (Done) Set the status to let the player know how many presses are left in the round
*
* 5. Check whether the elements at the `index` position in `computerSequence`
* and `playerSequence` match. If they don't match, it means the player made
* a wrong turn, so call `resetGame()` with a failure message and exit the function
*
* 6. If there are no presses left (i.e., `remainingPresses === 0`), it means the round
* is over, so call `checkRound()` instead to check the results of the round
**/
function checkPress(color) {
 // TODO: Write your code here.

 let index = 0;
 let buttonsPressed = playerSequence.length;
 playerSequence.push(color);

 let remainingPresses = computerSequence.length - playerSequence.length;
 setText(statusSpan,  `Players Turn: ${remainingPresses} ${pressGrammar(remainingPresses)} Left`);
 for (let i = 0; i < pads.length; i++) {
   if (color === pads[i].color) {
     index = i;
   }
 }

 for (let i = 0; i <= buttonsPressed; i++) {
 
   if (computerSequence[i] != playerSequence[i]) {
    failureMusic.play();
    resetGame("Wrong!!!");
   } 
 }

 console.log(totalPoints);

 


 if (remainingPresses === 0) {
   checkRound()
 }
 totalPoints = totalPoints + 1;
 scoreSelector.innerText = `Total Points: ${totalPoints}`;
}

/**
* Checks each round to see if the player has completed all the rounds of the game * or advance to the next round if the game has not finished.
*
* 1. If the length of the `playerSequence` array matches `maxRoundCount`, it means that
* the player has completed all the rounds so call `resetGame()` with a success message
*
* 2. Else, the `roundCount` variable is incremented by 1 and the `playerSequence` array
* is reset to an empty array.
* - And the status text is updated to let the player know to keep playing (e.g., "Nice! Keep going!")
* - And `playComputerTurn()` is called after 1000 ms (using setTimeout()). The delay
* is to allow the user to see the success message. Otherwise, it will not appear at
* all because it will get overwritten.
*
*/

function checkRound() {
 // TODO: Write your code here.

 if (playerSequence.length === maxRoundCount) {
  successMusic.play();
   resetGame("You crushed this game! Congrats!!");
 } else if (gameOver === true ) {
  return
 } else {
   (statusSpan, `Nice! Keep going!`);
   roundCount ++;
   playerSequence = [];
   setTimeout(() => {playComputerTurn()}, 1000);
 }
}

/**
* Resets the game. Called when either the player makes a mistake or wins the game.
*
* 1. Reset `computerSequence` to an empty array
*
* 2. Reset `playerSequence` to an empty array
*
* 3. Reset `roundCount` to an empty array
*/
function resetGame(text) {
 // TODO: Write your code here.
 computerSequence = [];
 playerSequence = [];
 roundCount = [];
 level = 0;
//  totalPoints = 0;
 // Uncomment the code below:
 alert(text);
 setText(heading, "Simon Says");
 padContainer.classList.add("unclickable");
 statusSpan.classList.add("hidden");
 startButton.classList.remove("hidden");
 arrowIcons.forEach((arrow) => {arrow.classList.add("hidden")});
 totalPoints = 0;
 scoreSelector.classList.add("hidden");
 gameOver = true;
}

/**
* Please do not modify the code below.
* Used for testing purposes.
*
*/
window.statusSpan = statusSpan;
window.heading = heading;
window.padContainer = padContainer;
window.pads = pads;
window.computerSequence = computerSequence;
window.playerSequence = playerSequence;
window.maxRoundCount = maxRoundCount;
window.roundCount = roundCount;
window.startButtonHandler = startButtonHandler;
window.padHandler = padHandler;
window.setLevel = setLevel;
window.getRandomItem = getRandomItem;
window.setText = setText;
window.activatePad = activatePad;
window.activatePads = activatePads;
window.playComputerTurn = playComputerTurn;
window.playHumanTurn = playHumanTurn;
window.checkPress = checkPress;
window.checkRound = checkRound;
window.resetGame = resetGame;
window.successMusic = successMusic;
window.failureMusic = failureMusic;