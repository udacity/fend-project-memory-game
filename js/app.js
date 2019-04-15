/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

  // variables to help with comparing
  let doEvaluate = false;
  let compare;
  
  // get all the card elements
  let card = document.getElementsByClassName("card");
 
  // main function that deals with card flip
  function flip (event) {
     // returns the element that was clicked
      let element = event.currentTarget;
 
     // reveal the card by udating the css list
      element.classList.add("open");
      element.classList.add("show");
 
      if (doEvaluate && compare != null && !(element === compare))
      {
       
       
         // variables to check
         let a = element.childNodes[1].classList.item(1);
         let b = compare.childNodes[1].classList.item(1);
         //check if child has the same class
         if (a == b) 
         {
           setTimeout(rmOpen, 750);
           compare.classList.add("match");
           element.classList.add("match");
         }
         //if not we flip both cards back
         else
         {
           setTimeout(rmOpen, 750);
           element.classList.remove("flip-vertical-right");
           element.classList.add("flip-vertical-left");
         }
       }
      else
      {
        //set to evalutate on next click
        doEvaluate = true;
        compare = element;
      }
 
     // Remove open, need to pass a function to timout and these steps are repeated
     function rmOpen () {
       compare.classList.remove("open");
       compare.classList.remove("show");
       element.classList.remove("open");
       element.classList.remove("show");
       element.classList.add("flip-vertical-right");
       doEvaluate = false;
     }
  }

  Array.from(card).forEach(function(element)
  {
    element.addEventListener('click', flip);
  });