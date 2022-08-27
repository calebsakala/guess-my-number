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
let guessedRight = false;


// this function subtracts one from the user's score
// if it isn't already 0
const subtractTurn = function () {
  if (userScore > 1) {
    userScore--;
    document.querySelector('.score').textContent = userScore;
  } else if (userScore == 1){
    userScore--;
    document.querySelector('.score').textContent = userScore;
    document.querySelector('.message').textContent = losingMessage;
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
  if (!guessedRight) {
    
    // and if the userGuess value is not empty
    if (!userGuess) {
      document.querySelector('.message').textContent = noInputMessage;
    } else if (userScore < 1) {
      // if the user's score is less than 1
      // nothing should occur
      
      // if the user wins
    } else if (userGuess === answer) {
      document.querySelector('.number').textContent = answer;
      document.querySelector('.message').textContent = winningMessage;
      document.querySelector('.number').style.width = '30rem';
      
      let score = document.querySelector('.score').textContent; 
      let highScore = document.querySelector('.highscore').textContent;
      
      if (highScore < score) {
        document.querySelector('.highscore').textContent = score;
      };
      document.querySelector('body').style.backgroundColor = '#60b347';
      guessedRight = true;
    
    // if the user guesses too high
    } else if (userGuess > answer) {
      shakePage(userGuess, answer);
      document.querySelector('body').style.backgroundColor = 'rgb(243, 44, 44)'
      document.querySelector('.message').textContent = 'Too high!';
      subtractTurn()
    
    // if the user guessess too low
    } else if (userGuess < answer) {
      shakePage(userGuess, answer);
      document.querySelector('body').style.backgroundColor = '#8daed9'
      document.querySelector('.message').textContent = 'Too low!';
      subtractTurn()
    }
  }
}


// the function to allow the user to restart the game without restarting the browser
// so high scores can be kept
const reset = function () {
  guessedRight = false;
  document.querySelector('.message').textContent = 'Keep guessing...';
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
