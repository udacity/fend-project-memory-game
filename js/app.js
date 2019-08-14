// Michaels Memory Game


/*
 * Create a list that holds all of your cards
 */
// let cardList = document.querySelectorAll('.card');



// Resets all cards when refresh button hit
// const refreshButton = document.querySelector('.restart');
//
// refreshButton.addEventListener('click', function resetCards() {
//     for (i = 0; i <= 15; i++) {
//         cardList[i].classList.remove('open', 'show', 'match');
//     }
//   })

  // Testing different list with i tags

  // let newCardList = document.getElementsByTagName('i');




// Adding event listener for a card to change CSS class

// cardList[0].addEventListener('click', function flipCard() {
//   cardList[0].classList.add('open', 'show');
// })
//
// cardList[1].addEventListener('click', function flipCard() {
//   cardList[1].classList.add('open', 'show');
// })
//
// cardList[2].addEventListener('click', function flipCard() {
//   cardList[2].classList.add('open', 'show');
// })
//
// cardList[3].addEventListener('click', function flipCard() {
//   cardList[3].classList.add('open', 'show');
// })
//
// cardList[4].addEventListener('click', function flipCard() {
//   cardList[4].classList.add('open', 'show');
// })
//
// cardList[5].addEventListener('click', function flipCard() {
//   cardList[5].classList.add('open', 'show');
// })
//
// cardList[6].addEventListener('click', function flipCard() {
//   cardList[6].classList.add('open', 'show');
// })
//
// cardList[7].addEventListener('click', function flipCard() {
//   cardList[7].classList.add('open', 'show');
// })
//
// cardList[8].addEventListener('click', function flipCard() {
//   cardList[8].classList.add('open', 'show');
// })
//
// cardList[9].addEventListener('click', function flipCard() {
//   cardList[9].classList.add('open', 'show');
// })
//
// cardList[10].addEventListener('click', function flipCard() {
//   cardList[10].classList.add('open', 'show');
// })
//
// cardList[11].addEventListener('click', function flipCard() {
//   cardList[11].classList.add('open', 'show');
// })
//
// cardList[12].addEventListener('click', function flipCard() {
//   cardList[12].classList.add('open', 'show');
// })
//
// cardList[13].addEventListener('click', function flipCard() {
//   cardList[13].classList.add('open', 'show');
// })
//
// cardList[14].addEventListener('click', function flipCard() {
//   cardList[14].classList.add('open', 'show');
// })
//
// cardList[15].addEventListener('click', function flipCard() {
//   cardList[15].classList.add('open', 'show');
// })

//******************************************

const deck = document.querySelector('.deck');

deck.addEventListener('click', function(e) {
  console.log(e.target.children);
});






//*********************************************


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
