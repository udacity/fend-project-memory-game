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

/*
 * Create a list that holds all of your cards
 */
var cards = [
  'fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-cube', 'fa-cube',
  'fa-leaf', 'fa-leaf',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb'
];

//Create html for game cards using cards array
function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

function startTimer() {
  let sec = 0;

  alert('Match all of the tiles to win the game! Click OK to start the timer.');

  function pad(val) {
    return val > 9 ? val : "0" + val;
  }
  timer = setInterval(function() {
    document.getElementById("seconds").innerHTML = pad(++sec % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
  }, 1000);
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

//set restart button to refresh page
let restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function(e) {
  location.reload();
});

let matches = 0; //track number of matches made
let moves = 0; //1 move = clicking two seperate tiles
let moveCounter = document.querySelector('.moves');
let stars = 3; //Start with 3 star rating
let starCount = document.querySelector('.stars');
let timer = 0;
let minutes = 0; //placeholder @// TODO: store time to print at end game
let seconds = 0;

//initial game board creation
function initGame() {
  let deck = document.querySelector('.deck');
  //shuffle cards array and iterate over the array to create game board
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });

  deck.innerHTML = cardHTML.join('');
  moves = 0;
  moveCounter.innerText = moves;

  setTimeout(startTimer, 500);

}

//remove star from the page when certain move thresholds are reached
function removeStar() {
  let li = document.querySelector('.star');
  let star = document.querySelector('.fa-star');

  li.removeChild(star);
  starCount.removeChild(li);
  //decrease global scope count for final message
  stars -= 1;
}

//reset the open card tracker, increase moves, write moves to page
function nextMove() {
  openCards = [];
  moves += 1;
  moveCounter.innerText = moves;
  if (moves === 18) {
    removeStar();
  }
  if (moves === 12) {
    removeStar();
  }
}

function endGame() {
  moves += 1;
  moveCounter.innerText = moves;
  //stop timer and store time in global vars for end message
  clearInterval(timer);
  minutes = document.getElementById('minutes').innerHTML;
  seconds = document.getElementById('seconds').innerHTML;

  alert(`Congrats! You won the game in ${moves} moves.\nYou got a ${stars} star rating.\nYou completed the game in ${minutes}:${seconds}!`);

  alert('Press OK to play again.')
  location.reload();
}

initGame();

let allCards = document.querySelectorAll('.card');
//Where face up cards are stored and tracked
let openCards = [];

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    //prevent clicking on cards that are open, shown, or matched
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card);
      card.classList.add('open', 'show');

      //when 2 cards are clicked
      if (openCards.length === 2) {
        //if cards match
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add('match', 'open', 'show');
          openCards[1].classList.add('match', 'open', 'show');
          matches += 1;
          //it takes 8 matches to win the game
          if (matches == 8) {
            setTimeout(endGame, 1000);

          } else { //keep going if less than 8 matches
            nextMove();
          }
        } else {
          //If no match, hide
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show');
            });
            nextMove();
          }, 400);
        }
      }
    }
  });
});
