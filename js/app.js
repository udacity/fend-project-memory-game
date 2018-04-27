let symbol = [
  "diamond",
  "paper-plane-o",
  "anchor",
  "bolt",
  "cube",
  "leaf",
  "bomb",
  "bicycle",
];
let symbols = [...symbol, ...symbol];
const deck = document.querySelector(".deck");
const cards = deck.getElementsByTagName("li");
const stars = document.querySelector(".stars");
const restart = document.querySelector(".restart");
const timer = document.querySelector(".timer");
let starRating = 3;
let seconds = 0;
let opened = [];
let moves = 0;
let matches = 0;
const totalMatches = symbols.length / 2;
let counter;

function initGame() {
  runGame();
  cardListener();
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Function to re-run game
function runGame() {
  // Remove cards from previous game if any
  while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
  }

  // Shuffle symbols
  let shuffleDeck = shuffle(symbols);

  // Reset Stats Function call
  resetStats();

  // Loop through symbols and add cards to deck w/ icons
  for (let i = 0; i < shuffleDeck.length; i++) {
    let card = document.createElement("li");
    card.className = "card";
    let icon = document.createElement("i");
    icon.className = "fa fa-" + shuffleDeck[i];
    card.appendChild(icon);
    deck.appendChild(card);
  }

  resetTimer(counter);
  seconds = 0;
  startTimer();
}


// Function for star ratings
function starRater(moves) {
  starRating = 3;
  if (moves >= 12 && moves < 18) {
    document.querySelector("#star_1").className = "fa fa-star-o";
    starRating = 2;
  } else if (moves >= 18 && moves < 25) {
    document.querySelector("#star_2").className = "fa fa-star-o";
    starRating = 1;
  } else if (moves >= 25) {
    document.querySelector("#star_3").className = "fa fa-star-o";
    starRating = 0;
  }
}

// Function to reset stats
function resetStats() {
  // Start all moves and card-matches at a default value of 0
  matches = 0;
  moves = 0;
  document.querySelector(".moves").innerText = moves;

  // Replace any stars lost in previous games and give starRating default value of 3
  starRating = 3;
  document.querySelector("#star_1").className = "fa fa-star";
  document.querySelector("#star_2").className = "fa fa-star";
  document.querySelector("#star_3").className = "fa fa-star";
}

// Create function to add event listener to deck and delegate events to all cards
const cardListener = function() {
  deck.addEventListener("click", function(e) {
    let card = e.target;

    // Makes sure that target can only be a card
    if (card.tagName != "LI") return;

    // If card has class name show or match return true
    if (
      card.className === "card open show" ||
      card.className === "card match"
    ) {
      return true;
    }

    // If card is true then push into opened array
    if (card) {
      card.className = "card open show animated flipInY";
      opened.push(card);
    }
    // Conditional that if opened has two items in array then run conditional to see if they match
    if (opened.length > 1) {
      // If the items match then iterate through the cards in deck and change class names to card match
      if (card.firstChild.className === opened[0].firstChild.className) {
        setTimeout(function() {
          for (let x = 0; x < cards.length; x++) {
            if (cards[x].className === "card open show animated flipInY") {
              cards[x].className = "card match animated pulse";
            }
          }
        }, 1000);
        matches++;
        // If the items do not match iterate through the cards and change class names back to just card add a delay so the user can see the second card they click on for a moment
      } else {
        setTimeout(function() {
          for (let x = 0; x < cards.length; x++) {
            if (cards[x].className === "card open show animated flipInY") {
              cards[x].className = "card animated flipInX";
              setTimeout(function(){
                cards[x].className = "card";
              }, 200);
            };
          }
        }, 1000);
      };
      moves++;
      document.querySelector(".moves").innerText = moves;
      starRater(moves);
      opened = [];
    }

    // Conditional to check to see if it's the end of the game
    if (totalMatches === matches) {
      endGame(moves, starRating);
    }
  });
};

// Reset Game Logic
restart.addEventListener("click", function() {
  swal({
    title: "Do you want to restart the game?",
    text: "The clock is ticking!",
    buttons: ["Nope!", "Restart!"],
    dangerMode: true
  }).then(function(isConfirm) {
    if (isConfirm) {
      runGame();
    }
  });
});

// Function to start timer
function startTimer() {
  counter = setInterval(function() {
    timer.innerText = seconds;
    seconds += 1;
  }, 1000);
}

// Function to reset timer
function resetTimer(counter) {
  if (counter) {
    clearInterval(counter);
  }
}

// // Function to reset cards
// function resetCards(){
//
// }

// End game function
function endGame(moves, starRating) {
  swal({
    icon: "success",
    title: "You did it!!",
    text:
      "It took " +
      moves +
      " moves and you got a " +
      starRating +
      " Star Rating in " +
      seconds +
      " seconds.\n Party on Garth. Do you want to play again?",
    buttons: ["Nope!", "Play Again!"]
  }).then(function(isConfirm) {
    if (isConfirm) {
      runGame();
    }
  });
  resetTimer(counter);
}

// Initialize game
initGame();
