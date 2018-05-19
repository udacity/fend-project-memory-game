/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let symbols = Array.prototype.slice.call(document.querySelectorAll('.card'));
let moves = document.querySelector('.moves');
let cardClickCounter = 1;
let card1 = '';
let card2 = '';
const card = document.querySelector('.card');
const deck = document.querySelector('.deck');
console.log(symbols)


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

// New game start will reset all the classes , shuffle the cards and reset the moves
function newGame(){
	resetClasses();
	shuffleCards();
	resetMoves();
}

// function for reseting the classes
function resetClasses(){
	for(let i = 0 ; i < symbols.length ; i++){
		symbols[i].className = "card";
	}
}

// function for shuffling the cards
function shuffleCards(){
	let shuffled = shuffle(symbols);
	for(let i = 0 ; i < symbols.length ; i++){
		deck.appendChild(symbols[i]);
	}
}

//function for resetting moves
function resetMoves(){
	moves.innerHTML = 0;
}


//event listeners

deck.addEventListener("click", makeMove);


// make move function defined

function makeMove(event){

	if(event.target.className == "card"){
		
		if(cardClickCounter < 2){

			event.target.className += " open show"
			card1 = event.target.firstElementChild.className;
			cardClickCounter++;
			
		} else if (cardClickCounter == 2){

			event.target.className += " open show"
			cardClickCounter = 1;
			card2 = event.target.firstElementChild.className;
			moves.innerHTML ++;
			compareCards();

		}
	}
}


function compareCards(){


	if(card1 === card2){
		event.target.className = "card open match show"
	} else {
		setTimeout(resetClasses(), 3000)
	}

}


/*function cardOpened(){
	if (card.hasClass('open')){
		return true;
	} 
}



//check if element has class src http://sonnyt.com/blog/development/javascript-check-if-element-has-class

Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};
*/
newGame();

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
