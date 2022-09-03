'use strict';

// generates a random number between 1 and 20
let answer = Math.floor(Math.random() * 20) + 1;

// initialising useful variables
let userScore = 20;
const losingMessage = 'GAME OVER! TT'; 
const winningMessage = 'You got it right! xD';
const noInputMessage = 'No number found! :(';
const shakeButton = document.querySelector(".check");
const shakeElement = document.querySelector("body");
let alreadyGuessedRight = false;


// this function displays a message to the screen
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message
}


// this function gets executed if the user's guess is too high
const guessedHigh = function () {
  document.querySelector('body').style.backgroundColor = 'rgb(243, 44, 44)'
  displayMessage('Too high!');
  subtractTurn();
}


// this function gets executed if the user's guess is too low
const guessedLow = function () {
  document.querySelector('body').style.backgroundColor = '#8daed9'
  displayMessage('Too low!');
  subtractTurn();
}


// this function gets executed is the user guesses correctly
const guessedRight = function () {
  document.querySelector('.number').textContent = answer;
  displayMessage(winningMessage);
  document.querySelector('.number').style.width = '100%';
}


// this function subtracts one from the user's score
// if it isn't already 0
const subtractTurn = function () {
  if (userScore > 1) {
    userScore--;
    document.querySelector('.score').textContent = userScore;
  } else if (userScore == 1){
    userScore--;
    document.querySelector('.score').textContent = userScore;
    displayMessage(losingMessage);
  }
}


// this function is meant to shake the page
// when the user gets the answer wrong
const shakePage = function (guess, correct) {
  if (guess !== correct) {
    shakeElement.classList.add("animate");
    setTimeout(function () {
    shakeElement.classList.remove("animate");
    }, 1000); 
  }
}


// the logger function processes the user's response 
// and logs it to the screen 
const logger = function () {
  const userGuess = Number(document.querySelector('.guess').value);
  
  // action is only taken if the user hasn't already guessed the answer correctly 
  if (!alreadyGuessedRight) {
    
    // and if the userGuess value is not empty
    if (!userGuess) {
      displayMessage(noInputMessage);
    } else if (userScore < 1) {
      // if the user's score is less than 1
      // nothing should occur
      
      // if the user wins
    } else if (userGuess === answer) {
      guessedRight()
      let score = document.querySelector('.score').textContent; 
      let highScore = document.querySelector('.highscore').textContent;
      
      if (highScore < score) {
        document.querySelector('.highscore').textContent = score;
      };
      document.querySelector('body').style.backgroundColor = '#60b347';
      alreadyGuessedRight = true;
    
    // if the user guesses too high
    } else if (userGuess > answer) {
      shakePage(userGuess, answer);
      guessedHigh()
    
    // if the user guessess too low
    } else if (userGuess < answer) {
      shakePage(userGuess, answer);
      guessedLow()
    }
  }
}


// the function to allow the user to restart the game without restarting the browser
// so high scores can be kept
const reset = function () {
  alreadyGuessedRight = false;
  displayMessage("Let's gooo!");
  document.querySelector('.guess').value = '';
  userScore = 20;
  document.querySelector('.score').textContent = userScore;
  document.querySelector('body').style.backgroundColor = '#222';
  answer = Math.floor(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
}

// event listeners are added to the buttons the user will use to either 
// check their answer or reset the whole page
document.querySelector('.check').addEventListener('click', logger);
document.querySelector('.again').addEventListener('click', reset);
