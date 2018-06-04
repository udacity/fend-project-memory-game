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
let cardClickCounter = 0;
let firstCard = '';
let secondCard = '';
let firstCardSymbol = '';
let secondCardSymbol = '';
let isReady = true;
const card = document.querySelector('.card');
const deck = document.querySelector('.deck');
const reset = document.querySelector('.restart');
const stars = document.querySelector('.stars');


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
	cardClickCounter = 0;
	stopTimer = true;
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
reset.addEventListener("click", newGame);


// make move function defined

function makeMove(event){

	if(event.target.className == "card" && isReady == true){
		
		if(cardClickCounter == 0){
			
			if(moves.innerHTML == 0){
				stopTimer = false;
				timerStart();
			}
			
			event.target.className += " open show"
			firstCard = event.target;
			firstCardSymbol = event.target.firstElementChild.className;
			cardClickCounter++;
			
		} else if (cardClickCounter == 1){

			event.target.className += " open show"
			cardClickCounter = 0;
			secondCard = event.target;
			secondCardSymbol = event.target.firstElementChild.className;
			moves.innerHTML ++;
			compareCards();

		}
	}
}



// Comaparing the cards

function compareCards(){


	if(firstCardSymbol === secondCardSymbol){
		firstCard.className += " animated wobble match";
		secondCard.className += " animated wobble match";
		
		//reset values
		firstCard = '';
		secondCard = '';
		firstCardSymbol = '';
		secondCardSymbol = '';
	} else {

			isReady = false;

		setTimeout(function(){

			firstCard.className += " animated shake"
			secondCard.className += " animated shake"}
			, 300);

		setTimeout(function(){

			firstCard.className = "card"
			secondCard.className = "card"
			isReady = true;

		}, 1600)
	}

}



function ratingStar(){
	let movesMade = moves.innerHTML;

	if(movesMade > 7){
		
	}
}



// Timer

function timerStart() {
		var timer = 0;
		var hour = 0;
		var minute = 0;
		var second = 0;
		window.setInterval (function() {
		  ++timer;
		  hour = Math.floor(timer / 3600);
		  minute = Math.floor((timer - hour * 3600) / 60);
		  second = timer - hour * 3600 - minute * 60;
		  if (hour < 10) hour = '0' + hour;
		  if (minute < 10) minute = '0' + minute;
		  if (second < 10) second = '0' + second;
		  document.querySelector('#timer').innerHTML = hour + ':' + minute + ':' + second;
		  if(stopTimer) {
			document.querySelector('#timer').innerHTML = "00:00:00";
			timer = 0;
			hour = 0;
			minute = 0;
			second = 0;
			return;
		  }
		}, 1000);
}





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
