/*
 * Create a list that holds all of your cards
 */
const container = document.getElementById("container");
const ul = document.getElementById("ul");
let cards = document.getElementsByClassName("card");
let deck = Array.from(cards);
let matchingCardsObject = document.getElementsByClassName("match");
let matchingCardsArray = Array.from(matchingCardsObject);


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function(array) {
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
};

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

ul.addEventListener("click", cardClicked);

let clickCounter = 0;
let openCardsArray = [];

function cardClicked(e) {

  function openCard() {

    if(e.target.classList.contains("card")) {

      // UPDATE NUMBER OF MOVES/CLICKS

      function moveCounterFunc() {

        clickCounter++;
        document.getElementById("num-of-moves").textContent = clickCounter;

        if (clickCounter === 1) {
          document.getElementById("moves").textContent = "Move";
        }

        else {
          document.getElementById("moves").textContent = "Moves";
        }

      }
      moveCounterFunc();
      
      // MATCH THE CARDS

      function matchCardsFunc() {

        // ADD CLASSNAME OF CLICKED CARDS SYMBOL TO AN ARRAY
        openCardsArray.unshift(e.target.children[0].classList[1]);

        // SHOW THE CLICKED CARD OBVIOUSLY
        e.target.classList.add("show");

        // SAVE CLASSNAME OF CLICKED CARD SYMBOL TO VARIABLE FOR COMPARISON
        let matchingCardClass = openCardsArray[1];
        // SAVE ELEMENTS WITH MATCHING CARDS TO VARIABLE
        let matchingElements = document.getElementsByClassName(matchingCardClass);

        // TO KEEP THE ARRAY MAX LENGTH = 2
        if (openCardsArray.length >= 2) {
          openCardsArray.length = 2;

          // CONDITION FOR FIRST AND SECOND CLICK MATCH

          if (openCardsArray[0] === openCardsArray[1]) {

            // ADD MATCH CLASS IF CARDS MATCH
            for (let i = 0; i < matchingElements.length; i++) {
              matchingElements[i].parentElement.classList.add("match");

              // THIS FOR GETTING ARRAY LENGTH TO SEE IF ALL CARDS MATCH AND SHOWING A MODAL
              matchingCardsArray.push(matchingElements[i].parentElement);
            }
            console.log("Cards Matched!");
          }

          // IF FIRST AND SECOND CLICK DONT MATCH, REMOVE MATCH CLASS
          else {
            for (let i = 0; i < matchingElements.length; i++) {
              matchingElements[i].parentElement.classList.remove("show");
            }
          }
        }
      }
      matchCardsFunc();
      
    }
    
  }
  openCard();
  // https://review.udacity.com/#!/rubrics/591/view
  // https://www.w3schools.com/howto/howto_css_modals.asp
  // ADD ANIMATIONS TOO!
  // IF ALL ELEMENTS ARE SAME AND IF TOTAL NO OF SAME ELEMS IS 16 SOMETHING LIKE THAT
  if (matchingCardsArray.length === 16) {
    // MODAL - SHOW STAR RATING IN MODAL
    // STAR RATING
    // 14 moves - 3 stars
    // 20 moves - 2 stars
    // 20+ moves - 1 star
    console.log("Congrats!")
  }

}










// MAKE THE SHUFFLE FUNCTION RUN ON EACH REFRESH OR PAGE LOAD

// RESTART & SHUFFLE PART ALL WORKING!
container.addEventListener("click", shuffleFunc);

function shuffleFunc(e) {

  //  REMOVE ANIMATE ROTATE 360deg
  document.querySelector(".restart").classList.remove("rotate");

  //  ADD ANIMATE ROTATE 360deg
  document.querySelector(".restart").classList.add("rotate");

  

  if (e.target.parentElement.classList.contains("restart")) {
    //  TO REMOVE ALL THE CARDS
    while (ul.lastChild) {
      ul.removeChild(ul.lastChild);
    }

    //  SET CLICK COUNTER TO 0
    clickCounter = 0;

    //  VARIABLE TO HOLD SHUFFLED ARRAY
    let newShuffledArray = shuffle(deck);

    //  TO ADD THE SHUFFLED ARRAY ELEMENTS BACK TO THE PAGE
    for (let i = 0; i < newShuffledArray.length; i++) {
      newShuffledArray[i].classList.remove("match", "show");
      ul.appendChild(newShuffledArray[i]);
    }
  }

  // REMOVE SHOW CLASS FROM ALL CARDS

}
