/*
 * Create a list that holds all of your cards
 */

const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');

let flippedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

deck.addEventListener('click', e => {
  const clicked = e.target;
  if (clicked.classList.contains('card') && flippedCards.length < 2) {
    flipCard(clicked);
    addFlippedCard(clicked);
    if (flippedCards.length === 2) {
      checkMatch(clicked);
    }
  }
});

function flipCard(clicked) {
  clicked.classList.add('open', 'show');
}

function addFlippedCard(clicked) {
  flippedCards.push(clicked);
}

function checkMatch() {
  if (flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className) {
    console.log('match');
  } else {
    console.log('no match');
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