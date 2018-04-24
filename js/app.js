let symbols = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'anchor', 'leaf', 'bicycle', 'diamond', 'bomb', 'leaf', 'bomb', 'bolt', 'bicycle', 'paper-plane-o', 'cube'];
const deck = document.querySelector('.deck');
const cards = deck.getElementsByTagName('li');
const stars = document.querySelector('.stars')
const restart = document.querySelector('.restart')
const timer = document.querySelector('.timer')
let seconds = 0;
let opened = [];
let moves = 0;
let matches = 0;
const totalMatches = symbols.length / 2;
let counter;

function startGame(){
  // Remove cards from previous game if any
  while (deck.firstChild){
    deck.removeChild(deck.firstChild);
  }

  // Start all moves and card-matches at a default value of 0
  matches = 0;
  moves = 0;


  // Shuffle symbols
  let shuffleDeck = shuffle(symbols);


  // Loop through symbols and add cards to deck w/ icons
  for (let i = 0; i < shuffleDeck.length; i++) {
    let card = document.createElement('li');
    card.className = "card";
    let icon = document.createElement('i');
    icon.className = "fa fa-" + shuffleDeck[i];
    card.appendChild(icon);
    deck.appendChild(card);
  }

  cardListener();

  resetTimer(counter);
  seconds = 0;
  startTimer();

}

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

// Function for star ratings
function starRating(moves) {
  if (moves >= 10 && moves < 15) {
    document.querySelector('#star_1').className = "fa fa-star-o";
  } else if (moves >= 15 && moves < 20) {
    document.querySelector('#star_2').className = "fa fa-star-o";
  } else if (moves >= 20) {
    document.querySelector('#star_3').className = "fa fa-star-o";
  }
}

// Create function to add event listener to deck and delegate events to all cards and only cards
const cardListener = function(){
  deck.addEventListener('click', function(e){
    let card = e.target;

    if (card.tagName != 'LI') return;

    // If card has class name show or match return true
    if (card.className === 'card open show' || card.className === 'card match' ) {
      return true;
    }

    // If card is true then push into opened array
    if (card) {
        card.className += ' open show';
        opened.push(card);
    }
    // Conditional that if opened has two items in array then run conditional to see if they match
    if (opened.length > 1){
      // If the items match then iterate through the cards in deck and change class names to card match
      if (card.firstChild.className === opened[0].firstChild.className) {
        for (let x = 0; x < cards.length; x++) {
          if (cards[x].className === 'card open show') {
            cards[x].className = 'card match';
          }
        }
        matches++;
      // If the items do not match iterate through the cards and change class names back to just card add a delay so the user can see the second card they click on for a moment
      } else {
        setTimeout(function (){
          for (let x = 0; x < cards.length; x++) {
            if (cards[x].className === 'card open show') {
              cards[x].className = 'card';
            }
          }
        }, 500);
      };
      opened = [];
      moves++;
      document.querySelector('.moves').innerText = moves;
      starRating(moves);
    }

    // Conditional to check to see if it's the end of the game
    if (totalMatches === matches) {
      alert("You've Won!");
    }
  });
}

// Reset Game
restart.addEventListener('click', function(){
  const confirmation = confirm("Click OK to restart your game");
  if (confirmation) {
      startGame();
  }
});

// Function to start timer
function startTimer(){
  counter = setInterval(function(){
    timer.innerText = seconds;
    seconds += 1;
  }, 1000)
}

// Function to reset timer
function resetTimer(counter){
  if (counter) {
    clearInterval(counter);
  }
}


// Initialize game
startGame();
