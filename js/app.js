/*jQuery Implementation*/

$(document).ready(function(){

/*
 * Create a list that holds all of your cards
 */

 /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

/*Global variables declarations*/

let cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];

let totalCards = cards.length / 2;
var deck = $('.deck');
let deckCards = $('.card');
let cardsTry = [];

let moves = 0;
let clickCard = 0;
let counter = $('.count');
let rating = $('.stars');
let starsNumber = 3;

let matches = 0;
const modal = $('#win-modal');

let timer = $('div.timer');
let minutes = $('.minutes');
let seconds = $('.seconds');
let clocker;

let second = {
	value: 0,
	label: " secs"
};

let minute = {
	value: 0,
	label: " mins "
};

 let restartButton = $('.restart');

 /*Event listener that starts time counter, catch the card clicked*/

deckCards.click(function(){
	clickCard++;
	beginTimer();
	showCard($(this));
});


/*Event listener that verify if the cards can be compared*/

deckCards.click(cardShowed);

/*Event listener that listen mouse behavior on the reset button*/

restartButton.click(startGame);

/*Start game function called when all elements of the page are loaded*/

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

/*start function that shuffle the cards*/

function startGame() {
	
	let deckCards = shuffle(cards);

	for(let i = 0; i < cards.length; i++) {

		aClass = deck.find('i').eq(i).attr('class');
		deck.find('i').eq(i).removeClass(aClass).addClass('fa fa-' + cards[i]);
	}
	restartSession();
}

/*Function  that reset all variables that influence the game behaviors*/

function restartSession() {

	for(let i=0; i<cards.length; i++)  {
		deckCards.eq(i).removeClass('match disable show open');
	}

	for (i=0; i<starsNumber; i++){
		rating.find('i').eq(i).removeClass('lost')
	}

	cardsTry = [];
	moves = 0;
	counter.html(moves);
	matches = 0;
	clickCard = 0;

	restartTimer();
}

/*Function that open the cards and stores his classes to an array*/

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

/*Function that compares the classes of open cards and verifies if they are equal*/

function cardShowed() {

	if (cardsTry.length === 2) {

		if(cardsTry[0] === cardsTry[1]) {
			moves++;
			matches++;
			counter.html(moves);
			matchCards();
			cardsTry = [];
		} else {
			moves++;
			counter.html(moves);
			unmatchCards();
		}
	};
	beginRating();
	winner();
}

/*Function that attributes the match class to the opened and equal cards*/

function matchCards() {
	deck.find('.open').addClass('match disable').removeClass('open show');
}

/*Function that attributes the unmatch class to the opened and different cards*/

function unmatchCards() {
	deck.find('.open').addClass('unmatch').removeClass('open show');
	disableCards();
	setTimeout(function() {
		deck.find('.unmatch').removeClass('unmatch');
		activeCards();
		cardsTry = [];
	}, 1000);
}

/*Function that block the click on the opened or matched cards*/

function disableCards(){
	deck.find('.card').addClass('disable');
}

/*Function that active the click on the cards that aren't opened and
on the cards that aren't matched*/

function activeCards() {
	var aCards = deck.find('.card');

		for(let i = 0; i < cards.length; i++) {

			if(!aCards.eq(i).hasClass('match')) {
				aCards.eq(i).removeClass('disable');
		};
	}
}

/*Function that attributes a class that hide stars to do the rating*/

function beginRating() {

	if(moves > 16 && moves < 23){
		rating.find('i').eq(2).addClass('lost');
	} else if (moves > 23){
		rating.find('i').eq(1).addClass('lost');
	}
}

/*Function that reset minutes and seconds values*/

function restartTimer() {
	second.value = 0;
	minute.value = 0;
	clearInterval(clocker);
	updateTimer();
}

/*Function that updates the minute and second values ​​on the page*/

function updateTimer() {
	if (second.value < 10 && minute.value < 10) {
		seconds.html("0" + second.value + second.label);
		minutes.html("0" + minute.value + minute.label);
	} else if (minute.value < 10) {
			seconds.html(second.value + second.label);
			minutes.html("0" + minute.value + minute.label);
		} else {
			minutes.html(minute.value + minute.label);
			seconds.html(second.value + second.label);
			}
}

/*Function that initializes the time count*/

function beginTimer() {
	if(clickCard === 1) {
		clocker = setInterval(function() {
			second.value++;
			if(second.value == 60) {
				minute.value++;
				second.value = 0;
			}
			updateTimer();
		}, 1000);
	};
}

/*Win modal that appears when the player match all cards*/

function winner() {
	if(matches === 8) {
		clearInterval(clocker);
		modal.addClass("show");
		$("#session-moves").html(moves);
		$("#session-time").html(timer.html());
		$("#session-rating").html($(".stars").html());
		closeModal();
		console.log('Congratulations!');
	};
}

/*close modal function on play again button*/

function closeModal() {
	$('#play-again').click(function() {
		modal.removeClass('show');
		startGame();
	});
}

});
