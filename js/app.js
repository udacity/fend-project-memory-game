/*
 * Create a list that holds all of your cards
 */

let shapes = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-star", "fa fa-star", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-anchor", "fa fa-anchor", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle"  ];

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

 newGame = shuffle(shapes);
    let openCards = [];

    let tiles = document.querySelectorAll('li.card').forEach(function(card){
        card.addEventListener('click', function(e){
                      openCards.push(card);
                      card.classList.add('open', 'show', 'disable');

                    if (openCards.length === 2) {
                      console.log('start comparing');
                      let match = openCards[0].querySelector('i').className ===
                      openCards[1].querySelector('i').className;
                      let firstCard = openCards [0];
                      let secondCard = openCards [1];
                     if(!match) {
                         // flip back
                         setTimeout(function() {
                    firstCard.classList.remove('show', 'open', 'disable')
                     secondCard.classList.remove('show', 'open', 'disable')
                       }, 1000);
                     }else {
                        setTimeout(function() {
                       firstCard.classList.add('match')
                       secondCard.classList.add('match')
                   }, 1000);
                     }

                     //clear the array
                     openCards = []
                    }

                })
             })

     const restart = () => {
 let tiles = document.querySelectorAll('li.card')
 let shuffledArray = shuffle(shapes);
 tiles.forEach((card, index, array) => {
     card.classList.remove('match', 'open', 'show', 'clicked')
     card.querySelector('i').className = shuffledArray[index]
 })
}
document.querySelector('.restart').addEventListener('click', (e)=>{
     restart();
})
const stopTimer = () => {
    clearInterval(timer);
};
const formatTimer = () => {
    let sec = seconds > 9 ? String(seconds) : '0' + String(seconds);
    let mins = minutes > 9 ? String(minutes) : '0' + String(minutes);
    return mins + ':' + sec;
}


   var timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('#basicUsage').html(timer.getTimeValues().toString());
})


function isOver () {
    if(match.length === shapes.length) {
        alert('Game Over');
    }
}

const movesContainer = document.querySelector('.moves');
let moves = 0;
()=> addMove()
    moves++;
    movesContainer.innerHTML = moves;














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
