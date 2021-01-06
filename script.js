'use strict';

const play0El = document.querySelector('.player--0');
const play1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePly, playing;
let pot = ['', ''];
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePly = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  play0El.classList.remove('player--winner');
  play1El.classList.remove('player--winner');
  play0El.classList.add('player--active');
  play1El.classList.remove('player--active');

  pot[0] = prompt('Enter Player 1 Name');
  pot[1] = prompt('Enter Player 2 Name');

  document.querySelector('#name--0').textContent = pot[0];

  document.querySelector('#name--1').textContent = pot[1];

  document.querySelector('.btn--roll').classList.remove('hidden');
  document.querySelector('.btn--hold').classList.remove('hidden');
};
init();
const switchplay = function () {
  document.getElementById(`current--${activePly}`).textContent = 0;
  currentScore = 0;
  activePly = activePly === 0 ? 1 : 0;
  play0El.classList.toggle('player--active');
  play1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePly}`
      ).textContent = currentScore;
    } else {
      switchplay();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePly] += currentScore;
    document.getElementById(`score--${activePly}`).textContent =
      scores[activePly];

    if (scores[activePly] >= 20) {
      playing = false;

      diceEl.classList.add('hidden');
      document.querySelector('.btn--roll').classList.add('hidden');
      document.querySelector('.btn--hold').classList.add('hidden');
      document
        .querySelector(`.player--${activePly}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePly}`)
        .classList.remove('player--active');

      document.querySelector(`#name--${activePly}`).textContent =
        pot[activePly] + '\tWINNER';
      activePly = activePly === 0 ? 1 : 0;
      document.querySelector(`#name--${activePly}`).textContent =
        pot[activePly] + `\tLOOSER`;
    } else {
      switchplay();
    }
  }
});

btnNew.addEventListener('click', init);
