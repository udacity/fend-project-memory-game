/*
 * Create a list that holds all of your cards
 */

var list = document.querySelector('.deck');
var restart = document.getElementsByClassName('restart');
restart[0].addEventListener('click', function() {
    nodes = Array.prototype.slice.call(list.children);
    console.log(nodes);
    nodes = shuffle(nodes);
    var i = 0;
    while(i < nodes.length)
    {
        list.appendChild(nodes[i]);
        ++i;
    }
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
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
var list = "";
var cards = document.querySelectorAll(".card");
for(var x = 0; x < cards.length; x++) {
    cards[x].addEventListener('click', function(event) {
        var x = event.path[0].className += (' open show');
        if(document.querySelectorAll(".show").length > 1) {
            if(list == event.path[0].childNodes[1].className) {
              event.path[0].className += (' match');
            }
            else {
                 setTimeout(function(){
                 event.path[0].classList.remove('open');
                 event.path[0].classList.remove('show');
                 }, 1500)
             }
        }
        else{
          list = event.path[0].childNodes[1].className;
        }
  })
}
