/*
 * Create a list that holds all of your cards
 */

const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
let time = 0;


let flippedCards = [];
let turns = 0;
let timerOff = true;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// event listener for clicking cards

deck.addEventListener('click', e => {
  const clicked = e.target;
  if (checkFlip(clicked)) {
    if (timerOff) {
      startTimer();

      timerOff = false;
    }

    flipCard(clicked);
    addFlippedCard(clicked);
    if (flippedCards.length === 2) {
      checkMatch(clicked);
      countTurns();
      loseStars();
    }
  }
});

// check if flip is valid
function checkFlip(clicked) {
  return (clicked.classList.contains('card') && !clicked.classList.contains('match') &&
    flippedCards.length < 2 && !flippedCards.includes(clicked));
}

// flips card
function flipCard(clicked) {
  clicked.classList.add('open', 'show');
}

// shows matched cards
function matchedCards() {
  flippedCards[0].classList.add('match');
  flippedCards[1].classList.add('match');
  flippedCards = [];
}

// adds flipped cards to array
function addFlippedCard(clicked) {
  flippedCards.push(clicked);
}

// unflip card if no match
function unFlipCard(clicked) {
  clicked.classList.remove('open', 'show');
}

// checks for match
function checkMatch() {
  if (flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className) {
    matchedCards();
    flippedCards = [];
  } else {
    setTimeout(() => {

      unFlipCard(flippedCards[0]);
      unFlipCard(flippedCards[1]);
      flippedCards = [];
    }, 1000);
  }
}

// shuffles deck
function shuffleCards() {
  const cardsInDeck = Array.from(document.querySelectorAll('.deck li'));
  const cardsShuffled = shuffle(cardsInDeck);
  for (card of cardsShuffled) {
    deck.appendChild(card);
  }
}

shuffleCards();

// count turns
function countTurns() {
  turns++;
  const counter = document.querySelector('.moves');
  counter.innerHTML = turns;
}

// stars
function loseStars() {
  if (turns === 10 || turns === 20) {
    takeAwayStar();
  }
}

// take away star
function takeAwayStar() {
  const stars = document.querySelectorAll('.stars li');
  for (star of stars) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}

// start timer
function startTimer() {
  let timerVar = setInterval(() => {
    time++;
    showTimer();
  }, 1000);
}


// show timer
function showTimer() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  // clock.innerHTML = time;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */