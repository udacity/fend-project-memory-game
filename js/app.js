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
let moves = 0;
let icons = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];

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

function restart(evt){
  moves = 0;
  icons = shuffle(icons);
  document.querySelector('.moves').textContent = moves;
  cardElement = document.querySelectorAll('.card');
  for (var i = 0 ; i < 16; i++){
    cardElement[i].classList.value = "card show";
    cardElement[i].firstElementChild.classList.value = "fa " + icons[i];
  }
  setTimeout(function() {
    for (var i = 0 ; i < 16; i++){
      cardElement[i].classList.value = "card";
    }
  }, 3000);
}

document.addEventListener('DOMContentLoaded', restart); 

document.querySelector('.restart').addEventListener('click', restart);

document.querySelector('.deck').addEventListener('click', function (evt) {
  if(evt.target.nodeName == 'LI'){
      
      if (evt.target.classList.contains('show')){
          evt.target.classList.value = "card";
      }
      else if (document.querySelector('.show') == null){
          evt.target.classList.add('show', 'open');
      }
      else if(!evt.target.classList.contains('match')){
          var opened_icon = document.querySelector('.show').classList;
          if(evt.target.firstElementChild.classList.value === document.querySelector('.show').firstElementChild.classList.value){
              evt.target.classList.add('match');
              opened_icon.add('match');
              opened_icon.remove('open','show');
          } else {
              opened_icon.value = "card wrong show";
              evt.target.classList.add('wrong', 'show');

              setTimeout(function() {
                  evt.target.classList.remove('show', 'wrong');
                  opened_icon.value = "card";
              }, 800);

          }
          document.querySelector('.moves').textContent = ++moves;
      }
   }
});
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