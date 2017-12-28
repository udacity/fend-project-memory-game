/*
 * Create a list that holds all of your cards - because this is a memory game, all cards exist twice
 */
const allCards = ['fa-anchor',
                  'fa-bicycle',
                  'fa-bomb',
                  'fa-bolt',
                  'fa-cube',
                  'fa-diamond',
                  'fa-leaf',
                  'fa-paper-plane-o',
                  'fa-anchor',
                  'fa-bicycle',
                  'fa-bomb',
                  'fa-bolt',
                  'fa-cube',
                  'fa-diamond',
                  'fa-leaf',
                  'fa-paper-plane-o'];

let counter = 0;
const openCards = [];
const gameboard = document.querySelector('#gameboard');
const timerStart = new Date();
let card1;
let card2;

function moveCounter() {
  const halfmoves = 0;
  const moves = 0;
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
const cards = document.querySelectorAll('.card');

function cardClicked() {
            this.classList.add('open', 'show');
            addOpenCards(this.firstChild.className);
            counter += 1;
            card1 = this.firstChild;
        }
        else if (counter === 1) {
            this.classList.add('open', 'show');
            addOpenCards(this.firstChild.className);
            card2 = this.firstChild;
            counter = 0;

        }
}

function matchCards() {
  if (card1.className == card2.className && card1 != card2) {
      console.log('Hussah');
  }

  else {
    card1.classList.remove('open', 'show');
    removeOpenCards(card1);
    removeOpenCards(card2);
  }
}

function addOpenCards(card) {
  openCards.push(card);
}

function removeOpenCards(card) {
  openCards.pop(card);
}

shuffle(allCards);
displayCards();

/*
var myCustomDiv = document.createElement('div');

function respondToTheClick() {
    console.log('A paragraph was clicked.');
}

for (var i = 1; i <= 200; i++) {
    var newElement = document.createElement('p');
    newElement.textContent = 'This is paragraph number ' + i;

    myCustomDiv.appendChild(newElement);
}

myCustomDiv.addEventListener('click', respondToTheClick);

document.body.appendChild(myCustomDiv);
*/
