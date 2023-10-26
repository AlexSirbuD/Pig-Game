'use strict';

let points = document.querySelector('.points');

let roll;
let playerIsPlaing1;
let playerIsPlaing2;
let gameEnd;
let current;
let score;
let currentPlayer;
let maxPoints = 100;
let lockPoints;

const init = () => {
  maxPoints = 100;
  points.value = '0';
  roll = document.querySelector('.btn--roll');
  playerIsPlaing1 = document.querySelector('.player--0');
  playerIsPlaing2 = document.querySelector('.player--1');
  gameEnd = true;
  lockPoints = false;
  current = 0;
  score = [0, 0];
  currentPlayer = 0;
  let zeroScore = document.querySelectorAll(".score");
  let winner = document.querySelectorAll(`.player`);
  document.getElementById(`current--0`).textContent = current;
  document.getElementById(`current--1`).textContent = current;
  zeroScore.forEach(item => item.textContent = '0');
  document.querySelector('.dice').src = `dice-0.png`;
  playerIsPlaing2.classList.remove('player--active');
  playerIsPlaing1.classList.add('player--active');
  winner.forEach(item => item.classList.remove('player--winner'))
}

init();


document.querySelector('.btn--assign').addEventListener('click', () => {

  maxPoints = Number(points.value)
  lockPoints = true;
})

const swichPlayer = () => {
  current = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = current;
  playerIsPlaing1.classList.toggle('player--active');
  playerIsPlaing2.classList.toggle('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  document.querySelector('.dice').src = `dice-0.png`;
}

roll.addEventListener('click', () => {
  points.value = maxPoints;
  if (gameEnd) {
    document.querySelector('.dice').classList.remove('hidden');
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    if (randomNumber !== 1) {
      document.querySelector('.dice').src = `dice-${randomNumber}.png`;
      current += randomNumber;
      document.getElementById(`current--${currentPlayer}`).textContent = current;
    } else {
      swichPlayer();

    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', () => {
  if (gameEnd) {
    score[currentPlayer] += current;
    document.querySelector(`#score--${currentPlayer}`).textContent = score[currentPlayer];

    if (score[currentPlayer] >= maxPoints) {
      console.log(maxPoints)
      gameEnd = false;
      document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
      document.querySelector('.dice').classList.add('hidden')
    } else {
      swichPlayer()
    }
  }
})

document.querySelector('.btn--new').addEventListener('click', init)




