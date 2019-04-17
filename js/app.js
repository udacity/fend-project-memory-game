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

let cardList = document.querySelectorAll('li.card');
let openCardList = [];
let moves = 0; //move counter

/**Event Listeners */

Array.from(cardList).forEach(function(element){
    element.addEventListener('click', onClick)
});

/**Functions */

//main functionality function
function onClick(trigger){
    let card = trigger.currentTarget;

    //this check is supposed to prevent selecting more than two cards
    if (pushCard(card)){
        displayCard(card);
    }

    //if openCardList.length > 1
    if (openCardList.length == 2)
    {
        if (openCardList[0].firstElementChild.classList == openCardList[1].firstElementChild.classList){
            cardMatch(openCardList);
        }
        else
        cardNoMatch(openCardList);        
    }

    moveCount();
    gameOver();
}

// display the card's symbol
function displayCard(card){
    card.classList.add('open', 'show');
}

// add the card to a *list* of "open" cards 
function pushCard(card){
    // we only want to add the card if there is only one other card selected
    if (!(openCardList.length >= 2)){
        openCardList.push(card);
        return true;    
    }
    else return false;
}


// if the cards do match, lock the cards in the open position    
function cardMatch(cards){
    cards.forEach(function(card){
        card.classList.add('match');
    })
    cards = [];
}
    
    // must be called after the open function

//if the cards do not match, remove the cards from the list and hide the card's symbol
function cardNoMatch(cards){
    cards.forEach(function(card){
        card.classList.remove('open', 'show')
    })
    cards = [];
    
}

//Increment move counter
function moveCount(){
    moves += 1;
    let el = document.querySelector('.moves');
    el.innerText = moves;
}

//Checks to see if the game is over
function gameOver(){
    //Set this bool to false if any card does not match
    let allMatch = true;
    cardList.forEach(card => {
        if (!(card.classList.contains('match'))){
            allMatch = false;
        }
    });

    if (allMatch){
        //display win
        console.log('You win!');
    }
}




/**function onClick(card)
1. call displayCard(card)
2. call addCard
3. Compare if the list already has another card, check to see if the two cards match
    1. if match
        1. call cardMatch
    2. if no match
        1. call cardNoMatch
    3. call moveCount
    4. if all matched
        call gameOver

// display the card's symbol
function displayCard(card)
    change css to show the card
    card.
    classList = card open show

// add the card to a *list* of "open" cards 
function addCard
    add thisCard to openCardList



// increment the move counter and display it on the page
function moveCount
    moves + 1
    moveElement text = moves


// if all cards have matched, display a message with the final score 
function gameOver
    Display screen (lots of changes?  Notification?)
 */