/*
 * Create a list that holds all of your cards
 */

/*first query all elements we need */
let container = document.querySelector(".container");
let stars = document.querySelectorAll(".stars i");
let gameTime = document.querySelector(".timernumber");
let gameover = document.querySelector(".gameover");
let moveCounter = document.querySelector(".moves");
let reStart = document.querySelector(".restart i");
let playAgainButton = document.querySelector(".gameover button");
let cards = document.querySelectorAll(".deck .card");
var cardsList = document.querySelectorAll(".card .fa");

/* init variables we need  */
let gameBegin = 0;
let counter = 0;
let starsNumber = 3;
let called = false;
let openCardList = [];
let matchedCardList = [];
var cardsListArray = [];

/* definitions without init */
let interval;

/* conversion because arrays are necessary  */
let starArray = Array.from(stars);
let cardsArray = Array.from(cards);

/* set the counter for moves */
moveCounter.innerHTML = counter;

/*
    copy cards to array
    copy to ensure they are 2 separate memory spaces
*/
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

/* create event listener for cards */
var handler = function (event) {
    var target = event.target;
    show(target);
}
/* Add eventlistener to every card item */
cardsArray.forEach(e => e.addEventListener("click", handler));

/*
 * Add eventlistener to playagain button
 * function definition is at end of file
 */
playAgainButton.addEventListener("click", gameStart);

/*
 * add restart functionality
 */
reStart.addEventListener("click", gameStart);

/*
 * Add eventlistener to document When the DOM is loaded,all cards will be not showed.
 * */
document.addEventListener("DOMContentLoaded", function () {
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains("match") || cards[i].classList.contains("open")) {
            if (cards[i].classList.contains("open")) {
                cards[i].className = "card";
            }
            else {
                cards[i].className = "card";
            }
        }
    }
})
/*
 * magical function from stackoveerflow which shuffle an arry
 * Shuffle function from http://stackoverflow.com/a/2450976
 * */
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
 * when the card is clicked, this function will be called
 * this function will show the card symbol to player, start the timer
 * if there are 2 cards opened,the 2 cards will be tested with function checkCards,
 * and test if the game will immediately finish and call the gameover function.
 * */
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
 * this function will be called,when there are 2 cards opened
 * it test if the 2 cards have the same symbol
 * also increase the number of moves
 * if the number of the moves reach specific point,the function RatingGame will be called.
 * when the card's symbol are the same,the click eventlistener will be removed.
 * when the card's symbol are not the same,the function cardsNotMatch will be called.
 * */
function checkCards(cardsList) {
    if (cardsList[0].children[0].className === cardsList[1].children[0].className) {
        for (var i = openCardList.length - 1; i >= 0; i--) {
            openCardList[i].className = "card match";
            matchedCardList.push(openCardList[i]);
            openCardList.pop();
        }
        /* remove listener since cards matched already */
        for (var i = 0; i < matchedCardList.length; i++) {
            let index = cardsArray.indexOf(matchedCardList[i]);
            if (index > -1) {
                cardsArray[index].removeEventListener("click", handler);
                cardsArray.splice(index, 1);
            }
        }
    }
    else {
        for (var i = 0; i < openCardList.length; i++) {
            openCardList[i].className = "card open show notMatch";
        }
        setTimeout(CardsNotMatch, 300);
    }
    /* +1 move and update the moves */
    counter += 1;
    moveCounter.innerHTML = counter;
    /* 3 stars until 16, 2 stars until 24, 1 star until 32 - view update in RatingGame() */
    if (counter === 16 || counter === 24 || counter === 32) {
        RatingGame();
    }
}
/*
 * update star view
 * function reduce the showed stars at some point and decrease the number of the stars.
 * */
function RatingGame() {
    if (counter === 16) {
        starArray[2].className = "fa fa-star-o";
        starsNumber = 2;
    }
    else if (counter === 24) {
        starArray[1].className = "fa fa-star-o";
        starsNumber = 1;
    }
    else {
        starArray[0].className = "fa fa-star-o";
        starsNumber = 0;
    }
}
/*
 * when the 2 card's symbol are not the same ,this function will be called,
 * with this function the opened cards will be not showed any more.
 */
function CardsNotMatch() {
    for (var i = openCardList.length - 1; i >= 0; i--) {

        openCardList[i].className = "card";
        openCardList.pop();

    }
}
/*
 * when the player wins the game,this function will be called.
 * the congratulation page will appear with how much time it took to win the game
 * and what the star rating was and the number of the moves the player has made .
 * and ask the player if he wants to play again
 * */
function gameOver() {
    container.style.display = "none";
    gameover.style.display = "block";
    let gameOverTime = document.querySelector(".gameover .time");
    gameOverTime.innerHTML = gameBegin;
    let gameovercounter = document.querySelector(".gameover .moves");
    gameovercounter.innerHTML = counter;
    let stars = document.querySelector(".gameover .star");
    if (starsNumber === 1) {
        stars.innerHTML = starsNumber + " Star."
    }
    else {
        stars.innerHTML = starsNumber + " Stars.";
    }
}

/* when the playagain button is clicked or the restart button is clicked ,
 this function will be called. */
function gameStart() {
    window.location.reload();
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
