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

const container = document.querySelector('.container');
const cards = document.querySelectorAll('.card');
const clock = document.getElementById('clock');
let gameOption = document.getElementById('label-game');
const gameControl = document.getElementById('chk-game');
const restart = document.getElementById('restart')
const counter = document.querySelector('.count');
const welcomeModal = document.getElementById('welcome-modal');
const winModal = document.getElementById('win-modal');
const playBtn = document.getElementById('play');
const playAgain = document.getElementById('play-again');
const stars = document.querySelector('.stars');
let modalTime = document.getElementById('session-time');
let modalMoves = document.getElementById('session-moves');
let modalRating = document.getElementById('session-rating');

let timer, moves = 0; gameCourse = false, seconds = 0, matches = 0;
let hasFlippedCard = false;
let firstCard, secondCard;
let pauseDeck = true;

gameOption.onclick = () => {
	if (!gameControl.checked) {
		runGame();
		pauseDeck = false;
	} else {
		gameOption.innerText = "Resume";
		clearInterval(timer);
		pauseDeck = true;
	}
}

restart.onclick = () => {
	restartGame();
}

playAgain.onclick = () => {
	restartGame();
}

playBtn.onclick = () => {
	welcomeModal.style.opacity = "0";
	welcomeModal.style.visibility = "hidden";
}

function runGame() {
	gameOption.innerText = "Pause";
	clearInterval(timer);
	startClock();

	if (gameCourse == false) {
		restart.style.pointerEvents = 'none';
		gameOption.style.pointerEvents = 'none';
		setTimeout(() => {
			restart.style.pointerEvents = 'auto';
			gameOption.style.pointerEvents = 'auto';
			cards.forEach(card => { card.classList.toggle('flip'); card.classList.toggle('disable') });
		}, 5000);
		gameCourse = true;
		cards.forEach(card => { card.classList.toggle('flip'); card.classList.toggle('disable') });
	}
	/* pauseDeck = false; */
}

const startClock = () => {
	timer = setInterval(() => {
		seconds++;
		clock.innerHTML = getTimeFromSeconds(seconds);
	}, 1000)
}

const getTimeFromSeconds = seconds => {
	const data = new Date(seconds * 1000);
	return data.toLocaleTimeString('pt-BR', {
		hours12: false,
		timeZone: 'GMT'
	})
}

function flipCard() {

	if (pauseDeck) return;
	if (this === firstCard) return;
	this.classList.toggle('flip')
	/* this.style.pointerEvents = "none"; */

	if (!hasFlippedCard) {
		//first click
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	//second click
	secondCard = this;
	matchCards();
	moves++;
	counter.innerText = moves;
}

function matchCards() {
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
	if (isMatch) {
		matches++;
		disableCards();
		matches == 8 ? endGame() : null;
	} else {
		unflipCards();
	}
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	firstCard.classList.toggle('match')
	secondCard.classList.toggle('match')
	resetboard();
}

function unflipCards() {
	pauseDeck = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		firstCard.classList.toggle('unmatch')
		secondCard.classList.toggle('unmatch')
		resetboard();
	}, 1500);
	firstCard.classList.toggle('unmatch')
	secondCard.classList.toggle('unmatch')
}

function resetboard() {
	[hasFlippedCard, pauseDeck] = [false, false];
	[firstCard, secondCard] = [null, null]
}

function endGame() {

	setTimeout(() => {
		clearInterval(timer);
		winModal.classList.add('show');
		modalTime.innerHTML = clock.innerHTML;
		modalMoves.innerHTML = moves;

	}, 1200)
}

function restartGame() {
	seconds = 0;
	moves = 0;
	matches = 0;
	gameCourse = false;
	clearInterval(timer);
	clock.innerHTML = '00:00:00'
	counter.innerHTML = '0'
	gameControl.checked = false;
	winModal.classList.remove('show');
	playBtn.innerText = "Play";
	cards.forEach(card => { card.addEventListener('click', flipCard); card.classList.remove('flip'); card.classList.remove('match') });
	gameOption.innerText = "Play";
	pauseDeck = true;

	cards.forEach(card => {
		let random = Math.floor(Math.random() * 12);
		card.style.order = random;
	});
}

let shuffle = (function () {
	cards.forEach(card => {
		let random = Math.floor(Math.random() * 12);
		card.style.order = random;
	});
})();

cards.forEach(card => card.addEventListener('click', flipCard))