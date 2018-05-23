/*
 * Create a list that holds all of your cards
 */

var list = document.querySelector('.deck');
var restart = document.getElementsByClassName('restart');
restart[0].addEventListener('click', function(event) {
    nodes = Array.prototype.slice.call(list.children);
    nodes = shuffle(nodes);
    //    number = 0;
    var i = 0;
    while(i < nodes.length)
    {
        list.appendChild(nodes[i]);
        //Flip all cards upside down1
                 nodes[i].classList.remove('open');
                 nodes[i].classList.remove('show');
                 nodes[i].classList.remove('incorrect');
                 nodes[i].classList.remove('match');
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

//var number = 0;
var firstCard = "";
var cards = document.querySelectorAll(".card");
for(var x = 0; x < cards.length; x++) {
    cards[x].addEventListener('click', function(event) {
//    number += 1;
//    count(number);
    var open = document.querySelectorAll(".open").length;
    if(open != 0 && open % 2 == 0) {
      // DO noting 
      } else {
        event.path[0].className += (' open show');
        if(document.querySelectorAll(".show").length > 1) {
            if(firstCard.path[0].childNodes[1].className == event.path[0].childNodes[1].className) {
              event.path[0].className += (' match');
              firstCard.path[0].className += (' match');
              firstCard.path[0].classList.remove('open');
              firstCard.path[0].classList.remove('show');
              event.path[0].classList.remove('show');
              event.path[0].classList.remove('open');
            }
            else {
                 event.path[0].className += (' incorrect');
                 event.path[0].className += (' incorrect');
                 firstCard.path[0].className += (' incorrect');
                 firstCard.path[0].className += (' incorrect');
                 setTimeout(function(){
                 event.path[0].classList.remove('open');
                 event.path[0].classList.remove('show');
                 event.path[0].classList.remove('incorrect');
                 firstCard.path[0].classList.remove('open');
                 firstCard.path[0].classList.remove('show');
                 firstCard.path[0].classList.remove('incorrect');
                 }, 800)
             }
        } else {
          firstCard = event
        }
      }
  })
}
    /*function count(num) {
    var moves = document.getElementsByClassName('moves')[0]
    moves.innerHTML = num 
    console.log(moves)
}
(function (event) {
    var stars = document.getElementsByClassName('stars');
    console.log(stars[0].lastChild.previousElementSibling.style.cssText = 'color: white; background-color: black')
})();*/
