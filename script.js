'use strict';

let answer = Math.floor(Math.random() * 20) + 1;
let userScore = 20;
const losingMessage = 'GAME OVER! TT'; 
const winningMessage = 'You got it right! xD';
const noInputMessage = 'No number found! :(';
const shakeButton = document.querySelector(".check");
const shakeElement = document.querySelector("body");
let guessedRight = false;


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


const shakePage = function (guess, correct) {
  if (guess !== correct) {
    shakeElement.classList.add("animate");
    setTimeout(function () {
    shakeElement.classList.remove("animate");
    }, 1000); 
  }
}


const logger = function () {
  const userGuess = Number(document.querySelector('.guess').value);
  if (!guessedRight) {
    if (!userGuess) {
      document.querySelector('.message').textContent = noInputMessage;
    } else if (userScore < 1) {
    } else if (userGuess === answer) {
      document.querySelector('.number').textContent = answer;
      document.querySelector('.message').textContent = winningMessage;
      let score = document.querySelector('.score').textContent; 
      let highScore = document.querySelector('.highscore').textContent;
      if (highScore < score) {
        document.querySelector('.highscore').textContent = score;
      };
      document.querySelector('body').style.backgroundColor = '#60b347';
      guessedRight = true;
    } else if (userGuess > answer) {
      shakePage(userGuess, answer);
      document.querySelector('body').style.backgroundColor = 'rgb(243, 44, 44)'
      document.querySelector('.message').textContent = 'Too high!';
      subtractTurn()
    } else if (userGuess < answer) {
      shakePage(userGuess, answer);
      document.querySelector('body').style.backgroundColor = 'rgb(80, 80, 240)'
      document.querySelector('.message').textContent = 'Too low!';
      subtractTurn()
    }
  }
}
const reset = function () {
  guessedRight = false;
  document.querySelector('.message').textContent = 'Keep guessing...';
  document.querySelector('.guess').value = '';
  userScore = 20;
  document.querySelector('.score').textContent = userScore;
  document.querySelector('body').style.backgroundColor = '#222';
  answer = Math.floor(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?'
}


document.querySelector('.check').addEventListener('click', logger);
document.querySelector('.again').addEventListener('click', reset);
