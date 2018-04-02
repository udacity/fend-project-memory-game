let deck = [
    'diamond', 'diamond',
    'paper-plane-o', 'paper-plane-o',
    'anchor', 'anchor',
    'bolt', 'bolt',
    'cube', 'cube',
    'leaf', 'leaf',
    'bicycle', 'bicycle',
    'bomb', 'bomb'
];

let firstCardSelected;

let moves = 0;

let remainingMatches = 8;

let stars = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



function startGame() {
    startTime = undefined;
    deck = shuffle(deck);
    const deckElement = document.getElementById('deck');
    // clear cards incase the reresh button is used

    deckElement.innerHTML = '';
    for (var index = 0; index < deck.length; index++) {

        const card = document.createElement('li');
        card.addEventListener('click', openCard);
        card.className = 'card';
        const cardType = document.createElement('i');
        cardType.className = 'fa fa-' + deck[index];
        card.append(cardType);
        deckElement.append(card);
    }
    //rests move conter
    moves = 0;
    rating();
    document.getElementById('moves').textContent = moves;
    remainingMatches = 8;

    document.getElementById('game').style.display = 'block';
    document.getElementById('completed').style.display = 'none';
}
let timer = setInterval(function () {
    startTimer();
}, 1000);
let startTime;
let duration = 0;

function startTimer() {
    if (startTime !== undefined) {
        const currentTime = new Date().getTime();
        duration = (currentTime - startTime) / 1000 ;
       
        document.getElementById('timer').innerHTML = Math.round(duration);
    }else{
        document.getElementById('timer').innerHTML = '0';
    }
}

function stopTimer() {
    clearInterval(timer);
}

function openCard(event) {
    event.currentTarget.className = 'card open show';
    if (firstCardSelected === undefined) {
        //firstCardSelected = event.currentTarget.childNodes[0].className;
        firstCardSelected = event.currentTarget;
    } else {
        checkMatch(firstCardSelected, event.currentTarget);
        firstCardSelected = undefined;
    }

}

// this function checks if both cards are correct or not correct
function checkMatch(firstCard, secondCard) {
    if (startTime=== undefined) {
        // if duration is zero the timer hansent started yet
        startTime = new Date().getTime();
    }

    // disabled clicks before antoher card is chosen
    document.getElementById('deck').className = 'disable-clicks deck';
    const firstCardType = firstCard.childNodes[0].className;
    const secondCardType = secondCard.childNodes[0].className;
    if (firstCard !== secondCard) {
        moves = moves + 1;
        rating();
        document.getElementById('moves').textContent = moves;
    }
    setTimeout(function () {
        if (firstCardType === secondCardType && firstCard !== secondCard) {

            firstCard.className = 'card match';
            secondCard.className = 'card match';
            firstCard.removeEventListener('click', openCard);
            secondCard.removeEventListener('click', openCard);
            remainingMatches--;
            // another card can be picked again
            document.getElementById('deck').className = 'deck';
            if (remainingMatches === 0) {
                gameEnd();
            }
        } else {
            firstCard.className = 'card not-match';
            secondCard.className = 'card not-match';
            setTimeout(function () {
                firstCard.className = 'card';
                secondCard.className = 'card';
                // another card can be picked again
                document.getElementById('deck').className = 'deck';
            }, 500);

        }
    }, 700);

}

// this function calls the final results to be shown 

function gameEnd() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('completed').style.display = 'block';
    document.getElementById('tally').textContent = moves;
    document.getElementById('stars').textContent = stars;
    document.getElementById('finaltime').textContent =Math.round(duration);
}

// this controls the starts on the page 
function rating() {

    if (moves > 50) {
        document.getElementById('star1').className = 'fa fa-star-o';
        document.getElementById('star2').className = 'fa fa-star-o';
        document.getElementById('star3').className = 'fa fa-star-o';
        stars = 0;
    } else if (moves > 32) {
        document.getElementById('star1').className = 'fa fa-star';
        document.getElementById('star2').className = 'fa fa-star-o';
        document.getElementById('star3').className = 'fa fa-star-o';
        stars = 1;
    } else if (moves > 16) {
        document.getElementById('star1').className = 'fa fa-star';
        document.getElementById('star2').className = 'fa fa-star';
        document.getElementById('star3').className = 'fa fa-star-o';
        stars = 2;
    } else {
        document.getElementById('star1').className = 'fa fa-star';
        document.getElementById('star2').className = 'fa fa-star';
        document.getElementById('star3').className = 'fa fa-star';
        stars = 3;
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
document.getElementById('restart').addEventListener('click', startGame);
startGame();

document.getElementById('replay').addEventListener('click', startGame);
startGame();