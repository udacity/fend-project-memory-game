const iconList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

const deck = document.querySelector('.deck');
const ul = document.createDocumentFragment('ul');

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

function createCard() {
	const shuffledCards = shuffle(iconList);
	shuffledCards.forEach(function(card) {
		const li = document.createElement('li');
		const i = document.createElement('i');
		i.setAttribute('class', card);
		li.setAttribute('class', 'card');
		li.appendChild(i);
		ul.appendChild(li);
	});
	deck.appendChild(ul);
}
createCard();

let cards = document.querySelectorAll('.card');
const moves = document.querySelector('.moves');
const restartButton = document.querySelector('.restart');
console.log(restartButton);
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
let opendCards = [];
let matchedCards = [];
let moveCounter = 0;
moves.textContent = moveCounter + ' Moves';

let timerId = 0;
let timerOn = false;

restartButton.addEventListener('click', function() {
	restart(deck, ul);
});

deck.addEventListener('click', function(e) {
	let minuteCounter = 0;
	let secondCounter = 0;

	if (matchedCards.length === 16) {
		timerOn = false;
		clearInterval(timerId);
		return;
	}
	if (e.target.classList.contains('card') && !timerOn) {
		timerOn = true;
		min.textContent = '00';
		sec.textContent = '00';
		minuteCounter = 0;
		secondCounter = 0;
		timerId = setInterval(timer, 1000);
	}

	function timer() {
		if (secondCounter == 59) {
			secondCounter = 0;
			minuteCounter++;
			min.textContent = minuteCounter < 10 ? '0' + minuteCounter : minuteCounter;
		}
		secondCounter++;
		sec.textContent = secondCounter < 10 ? '0' + secondCounter : secondCounter;
	}
});

//reveal cards;
for (let card of cards) {
	card.addEventListener('click', show);
}

function show(e) {
	console.log('this is click');
	if (opendCards.length >= 2 || e.target.classList.contains('open', 'show') || e.target.classList.contains('match')) {
		return;
	}

	e.target.classList.add('open', 'show', 'animated', 'flipInY', 'disable');
	opendCards.push(e.target);
	if (opendCards.length == 2) {
		moveCounter++;
		moves.textContent = moveCounter === 1 ? 1 + ' Move' : moveCounter + ' Moves';
		starScore('.stars');
		match();
	}
}

function match() {
	if (opendCards[0].firstElementChild.getAttribute('class') === opendCards[1].firstElementChild.getAttribute('class')) {
		opendCards.map(function(card) {
			card.className = 'card match animated tada';
			matchedCards.push(card);
		});
		setTimeout(finalScore, 500);
		opendCards = [];
	} else {
		setTimeout(function() {
			for (let opendcard of opendCards) {
				setTimeout(function() {
					opendcard.classList.replace('flipInY', 'headShake');
					opendcard.classList.add('card-not-match');
					opendcard.classList.remove('open', 'disable');
				}, 500);

			}
			setTimeout(function() {
				console.log('close');
				console.log(opendCards);
				for (let opendcard of opendCards) {
					// opendcard.classList.replace('headShake','flipInY');
					opendcard.classList.remove('open', 'show', 'card-not-match');
					opendcard.classList.remove('flipInY', 'animated', 'headShake');
					console.log(opendcard);
				}
				opendCards = [];
			}, 800);

		}, 900);

	}
}

function finalScore() {
	const playAgain = document.querySelector('#modal-playagain');
	const minFinal = document.querySelector('.min');
	const secFinal = document.querySelector('.sec');
	const timeFinal = document.querySelector('#total-time');
	const totalMoves = document.querySelector('.moves');
	const movesFinal = document.querySelector('#total-moves');

	playAgain.addEventListener('click', function() {
		restart(deck, ul);
		$('#exampleModalLong').modal('hide');
	});

	if (matchedCards.length === 16) {
		$('#exampleModalLong').modal({
			backdrop: 'static',
			keyboard: false
		});
		console.log('this is working kfjlakjdlfa');
		timeFinal.textContent = minFinal.textContent + ' min ' + secFinal.textContent + ' sec';
		movesFinal.textContent = totalMoves.textContent;
		starScore('.modal-stars');
	}
}

function restart(parentTag, fragment) {
	const newCardArr = [];
	cards.forEach(function(card) {
		newCardArr.push(card);
	});
	parentTag.innerHTML = '';
	cards = shuffle(newCardArr);
	for (let card of cards) {
		fragment.appendChild(card);
	}
	parentTag.appendChild(fragment);

	if (opendCards.length === 0 && matchedCards.length === 0 && moveCounter === 0) {
		return;
	}
	matchedCards.map(function(card) {
		card.classList.remove('match', 'animated', 'tada');
	});
	opendCards.map(function(card) {
		card.classList.remove('open', 'show', 'animated', 'flipInY', 'disable');
	});
	moveCounter = 0;
	moves.textContent = moveCounter + ' Moves';
	min.textContent = '00';
	sec.textContent = '00';
	opendCards = [];
	matchedCards = [];
	resetStar('.stars');
	resetStar('.modal-stars');
	timerOn = false;
	clearInterval(timerId);
}

function starScore(selector) {
	const stars = document.querySelector(selector).children;
	const comment = document.querySelector('.comment');
	if (moveCounter <= 12) {
		comment.textContent = 'Awesome!';
	} else if (moveCounter > 12 && moveCounter <= 20) {
		stars[2].firstElementChild.style.display = 'none';
		comment.textContent = 'Good!';
	} else {
		stars[1].firstElementChild.style.display = 'none';
		stars[2].firstElementChild.style.display = 'none';
		comment.textContent = 'You can do it better';
	}
}

function resetStar(selector) {
	const stars = document.querySelector(selector).children;
	for (var i = stars.length - 1; i >= 0; i--) {
		stars[i].firstElementChild.style.display = 'inline-block';
	}
}