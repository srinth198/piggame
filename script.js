'use strict';

let currentScore = 0;
let currentPlayer;
const scores = [0, 0];
let isPlaying = true;

const initialize = function () {
  currentPlayer = 0;
  document.querySelector('.dice').classList.add('hidden');
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
};

initialize();

const switchPlayer = function () {
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (isPlaying) {
    const randomDiceRoll = Math.trunc(Math.random() * 6) + 1;
    document.querySelector('.dice').classList.remove('hidden');
    document.querySelector('.dice').src = `dice-${randomDiceRoll}.png`;

    if (randomDiceRoll !== 1) {
      currentScore += randomDiceRoll;
      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  initialize();
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (isPlaying) {
    scores[currentPlayer] += currentScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    if (scores[currentPlayer] >= 100) {
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
      document.querySelector('.dice').classList.add('hidden');
      isPlaying = false;
    } else {
      switchPlayer();
    }
  }
});
