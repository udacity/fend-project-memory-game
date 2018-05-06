/*
 * Create a list that holds all of your cards
 */
let cards = document.querySelectorAll(".deck .card");
let cardsArray = Array.from(cards);
var cardsList = document.querySelectorAll(".card .fa");
var cardsListArray = [];
// All cards appear randomly
for(var i = 0;i < cardsList.length;i++)
{
    cardsListArray.push(cardsList[i].className);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let newCardList = shuffle(cardsListArray);
for(var i = 0;i < cardsList.length;i++)
{
   cardsList[i].className = newCardList[i];
    
}
// All cards appear randomly
// Add eventlistener to every card item
var handler = function (event) {
    var target = event.target;
    show(target);
}
cardsArray.forEach(e => e.addEventListener("click", handler));
// Add eventlistener to every card item
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
// when the card is clicked, this function will be called,this function will show the card symbol to player,
//  start the timer,if there are 2 cards opened,the 2 cards will be tested with function checkCards,
//  test if the game will immediately finish and call the gameover function. 
function show(element) {
    if (called === false) {
        called = true;
        interval = setInterval(function () {
            gameBegin = ++gameBegin
            gameTime.innerHTML =
                gameBegin;
        }, 1000);

    }
    element.className += " open";
    element.className += " show";
    openCardList.push(element);
    if (matchedCardList.length === 14) {
        matchedCardList.push(element);
    }
    else if (matchedCardList.length === 15) {
        setTimeout(checkCards, 400, openCardList);
        clearInterval(interval);
        setTimeout(gameOver, 1000);


    }
    else if (openCardList.length === 2) {
        setTimeout(checkCards, 300, openCardList);
    }
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
