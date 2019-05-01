/*jQuery Implementation*/

$(document).ready(function(){

/*
 * Create a list that holds all of your cards
 */

let cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];

let totalCards = cards.length / 2;
var deck = $('.deck');
let deckCards = $('.card');
let cardsTry = [];

let moves = 0;

let counter = $('.count');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

deckCards.click(function(){
	showCard($(this));
});

deckCards.click(cardShowed);

window.onLoad = startGame();

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

function startGame() {
	
	let deckCards = shuffle(cards);

	for(let i = 0; i < cards.length; i++) {

		aClass = deck.find('i').eq(i).attr('class');
		deck.find('i').eq(i).removeClass(aClass).addClass('fa fa-' + cards[i]);
	}
}

function showCard(card) {

		var $card = $(card);
		$card.addClass('open show disable');

		if(cardsTry.length < 2) {

		var showedClass = $card.find('i').attr('class');
		cardsTry.push(showedClass);
		
		} else {
			cardsTry = [];
		}
}

function cardShowed() {

	if (cardsTry.length === 2) {

		if(cardsTry[0] === cardsTry[1]) {
			moves++;
			counter.html(moves);
			matchCards();
			cardsTry = [];
		} else {
			moves++;
			counter.html(moves);
			unmatchCards();
		}
	};
}

function matchCards() {
	deck.find('.open').addClass('match disable').removeClass('open show');
}

function unmatchCards() {
	deck.find('.open').addClass('unmatch').removeClass('open show');
	disableCards();
	setTimeout(function() {
		deck.find('.unmatch').removeClass('unmatch');
		activeCards();
		cardsTry = [];
	}, 1000);
}

function disableCards(){
	deck.find('.card').addClass('disable');
}

function activeCards() {
	var aCards = deck.find('.card');

		for(let i = 0; i < cards.length; i++) {

			if(!aCards.eq(i).hasClass('match')) {
				aCards.eq(i).removeClass('disable');
		};
	}
}

});
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
