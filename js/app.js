/*jshint esversion: 6 */

/*
 * Create a list that holds all the cards
 */
const baseSet = ['fa-anchor',
                  'fa-bicycle',
                  'fa-bomb',
                  'fa-bolt',
                  'fa-cube',
                  'fa-diamond',
                  'fa-leaf',
                  'fa-paper-plane-o'];
/**
 * Cards need to be doubled - this is memory!
 */
const allCards = [...baseSet, ...baseSet];


let counter = 0;
let openCards = [];
let lockedCards = [];
const gameboard = document.querySelector('#gameboard');
const movesDisplay = document.querySelector('#moves');
const ratingDisplay = document.querySelector('#rating');
let move = 0;
let rating = 3;
let deltaTime = 0;
let lastCard = '';
let match = false;


function moveCounter() {
  move++;
}

function renderMoveCounter() {
  movesDisplay.textContent = move;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayCards () {
    for (card of allCards) {
        const card = document.createElement('li');
        const cardIcon = document.createElement('i');
        const cardString = this.card;

        card.classList.add('card');
        cardIcon.classList.add('fa', cardString);
        card.appendChild(cardIcon);
        gameboard.appendChild(card);
        card.addEventListener('click', cardClicked);
    }
}

/**
 * This section is setting up the board
 */

restartIcon = document.querySelector('#restart');
restartIcon.addEventListener('click', restart);
shuffle(allCards);
displayCards();
let timerStart = new Date();
const cards = document.querySelectorAll('.card');



function cardClicked() {
    card = this;
    showCard(card);
    addOpenCards(card.innerHTML);
    if (openCards.length === 2) {
      matchCards(card);
    }
    else if (openCards.length === 1) {
      lastCard = this;
    }
    else {
      removeOpenCards();
    }
    checkWinCondition();
}

function checkWinCondition() {
  if (lockedCards.length === 8){
    calculateDeltaTime();
    delayStep(200, showScoreboard());
  }
}

function delayStep(func, time) {
  timeoutID = window.setTimeout(func, time);
}

function lockCards() {
    lockedCards.push(openCards);
}

function matchCards() {
  //To find if a value or element exists in an array
  if (openCards[0] === openCards[1] && card !== lastCard) {
    isMatch();
  }
  //To find if a value or element DOES NOT exist in an array
  else if (openCards[0] != openCards[1] && card != lastCard) {
    delayStep(isNotMatch, 200);
  }
}

function isMatch() {
  console.log('Match!');
  lastCard.classList.add('match');
  card.classList.add('match');
  lockCards();
  removeOpenCards(lastCard);
  removeOpenCards(card);
  lastCard.removeEventListener('click', cardClicked);
  card.removeEventListener('click', cardClicked);
  moveCounter();
  renderMoveCounter();
  updateRating();
}

function isNotMatch() {
  console.log('No Match!');
  removeOpenCards(lastCard);
  removeOpenCards(card);
  hideCard(lastCard);
  hideCard(card);
  moveCounter();
  renderMoveCounter();
  updateRating();
}

function addOpenCards(card) {
  openCards.push(card);
}

function removeOpenCards(card) {
  openCards = [];
}

function hideCard(card) {
  card.classList.remove('open', 'show');
  lastCard.classList.remove('open', 'show');
  card.addEventListener('click', cardClicked);
}


function showCard(card) {
  card.classList.add('open', 'show');
  card.removeEventListener('click', cardClicked);
}

function calculateDeltaTime() {
    let timerStop = new Date() - timerStart;
    deltaTime = timerStop/1000;
    return deltaTime;
}

function updateRating() {
  if (move < 5) {
    rating = 3;
    ratingDisplay.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
  }
  else if (move < 10) {
    rating = 2;
    ratingDisplay.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
  }
  else if (move < 20) {
    rating = 1;
    ratingDisplay.innerHTML = '<li><i class="fa fa-star"></i></li>';
  }
  else if (move >= 20) {
    rating = 0;
    ratingDisplay.innerHTML = '';
  }
}

function resetRating() {
  rating = 3;
  ratingDisplay.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
}

function showScoreboard() {
  if (window.confirm('You have won! Moves needed: ' + move + '. Time to clear board: ' + deltaTime + ' seconds.')) {
  restart();
}
}

function clearGameboard() {
  gameboard.innerHTML = '';
}

function restart() {
  counter = 0;
  openCards = [];
  lockedCards = [];
  move = 0;
  deltaTime = 0;
  lastCard = '';
  match = false;

  resetRating();
  clearGameboard();
  renderMoveCounter();
  shuffle(allCards);
  displayCards();
  timerStart = new Date();
}
