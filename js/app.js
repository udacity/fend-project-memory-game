/*
 * Create a list that holds all of your cards
 */
/*var cardsArray = ['fa-diamond', 'fa-paper-plane-o',
                  'fa fa-anchor','fa fa-bolt',
                  'fa fa-cube', 'fa-anchor',
                  'fa-leaf','fa-bicycle',
                  'fa-diamond','fa-bomb',
                  'fa-leaf', 'fa-bomb',
                  'fa-bolt', 'fa-bicycle',
                  'fa-paper-plane-o','fa-cube'];
function cardsGenerator (cards){
     var gener = `<li class="card"><i class="fa ${cards}"></i></li>`;
     return gener;

function htmlCode(htmlCodeCards){
const cardHtml = `<li class="card"><i class="fa ${cards}"></i></li>`;
return cardHtml;
}





}*/

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


 var faElements = document.getElementsByClassName('fa');
 var fa=[];
 for(i=0; i<faElements.length; i++){
   fa[i]= faElements[i].className;
 }
 console.log(fa);

fa =shuffle(fa);
console.log(fa);
for (i=0; i<faElements.length; i++){
  faElements[i].className=fa[i];
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


function game(){
  var htmlCards = shuffle(arrCards);

}
/*function game(){
  var deck = document.querySelector('.deck');
  var htmlCards = shuffle(cardsArray).forEach(function(cards) {
    return cardsGenerator (cards);
    deck.innerHTML=htmlCards.join('');
  });
}*/

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
var clickCounter=0;
const allCards=document.querySelectorAll ('.card');
var openCards = [];
allCards.forEach(function(cards){
   cards.addEventListener('click',function(){
      clickCounter++;
      cards.classList.add('open','show');
      console.log(clickCounter);
      if (clickCounter>2){
        cards.classList.remove('open','show');
      }

  });

});
