//list of icons
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

//create html for cards
function createCard() {
	const shuffledCards = shuffle(iconList);
	const ulFragment = document.createDocumentFragment();
	shuffledCards.forEach(function(card) {
		const li = document.createElement('li');
		const i = document.createElement('i');
		i.setAttribute('class', card);
		li.setAttribute('class', 'card');
		li.appendChild(i);
		ulFragment.appendChild(li);
	});
	ul.appendChild(ulFragment);
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

//restart using restart button
restartButton.addEventListener('click', function() {
	restart(deck, ul);
});

//start the timer if a card is clicked and stops the counter if matchedCards array has length of 16.
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

//add event to every card
for (let card of cards) {
	card.addEventListener('click', show);
}

//show the card when it is clicked
function show(e) {
	//prevent opening of another card if there are two cards are opened already
	if (opendCards.length >= 2 || e.target.classList.contains('open', 'show') || e.target.classList.contains('match')) {
		return;
	}
	//add classes for show
	// 'disable' class added so one card can'be clicked more then one time in one move.
	e.target.classList.add('open', 'show', 'animated', 'flipInY', 'disable');
	opendCards.push(e.target);
	if (opendCards.length == 2) {
		moveCounter++;
		moves.textContent = moveCounter === 1 ? 1 + ' Move' : moveCounter + ' Moves';
		starScore('.stars');
		match();
	}
}

//check if two cards are matched or not
function match() {
	//if two cards are matched then push cards to matchedCards and empty openCards[].
	if (opendCards[0].firstElementChild.getAttribute('class') === opendCards[1].firstElementChild.getAttribute('class')) {
		opendCards.map(function(card) {
			//disable class so matched card can't be clicked
			card.className = 'card match animated tada disable';
			matchedCards.push(card);
		});
		setTimeout(finalScore, 500);
		opendCards = [];
	} else {
		//if cards are not matched , cards are closed and empty opencards[]
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

//popup the win modal and shows final score if all cards are matched
function finalScore() {
	const playAgain = document.querySelector('#modal-playagain');
	const minFinal = document.querySelector('.min');
	const secFinal = document.querySelector('.sec');
	const timeFinal = document.querySelector('#total-time');
	const totalMoves = document.querySelector('.moves');
	const movesFinal = document.querySelector('#total-moves');

	//restart game when click on 'play again' in modal
	playAgain.addEventListener('click', function() {
		restart(deck, ul);
		$('#exampleModalLong').modal('hide');
	});

	//show win popup when all cards are matched
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

//restart the game. It takes two arguments one is parentTag that is '.deck' and fragement that is 'ul'.
//it takes already crated cards[] and add it to deck after deleting previously opened cards.

function restart(parentTag, fragment) {
	const newCardArr = [];
	cards.forEach(function(card) {
		newCardArr.push(card);
	});
	parentTag.innerHTML = '';
	cards = shuffle(newCardArr);
	const docFragment = document.createDocumentFragment();
	for (let card of cards) {
		docFragment.appendChild(card);
	}
	fragment.appendChild(docFragment);
	parentTag.appendChild(fragment);

	//if no card was opened then this function do nothing
	if (opendCards.length === 0 && matchedCards.length === 0 && moveCounter === 0) {
		return;
	}

	//remove all classes from matched cards
	matchedCards.map(function(card) {
		card.classList.remove('match', 'animated', 'tada','disable');
	});
	//remove all classes from opened cards
	opendCards.map(function(card) {
		card.classList.remove('open', 'show', 'animated', 'flipInY', 'disable','card-not-match');
	});
	moveCounter = 0;
	moves.textContent = moveCounter + ' Moves';
	min.textContent = '00';
	sec.textContent = '00';
	opendCards = [];
	matchedCards = [];
	//reset star rating
	resetStar('.stars');
	resetStar('.modal-stars');
	timerOn = false;
	//clear timer
	clearInterval(timerId);
}

//this function takes the selector and alter the number of stars according to number of moves.
function starScore(selector) {
	const stars = document.querySelector(selector).children;
	const comment = document.querySelector('.comment');
	//if user complete the moves in less than or 12 moves, he gets three stars
	if (moveCounter <= 12) {
		comment.textContent = 'Awesome!';
	}
	//if user completes the game in more than 12 moves and less than or 20 moves, he gets two stars
	else if (moveCounter > 12 && moveCounter <= 20) {
		stars[2].firstElementChild.style.display = 'none';
		comment.textContent = 'Good!';
	} else {
		//otherwise he gets one star
		stars[1].firstElementChild.style.display = 'none';
		stars[2].firstElementChild.style.display = 'none';
		comment.textContent = 'You can do it better';
	}
}
//this reset the star rating when a new game starts.
function resetStar(selector) {
	const stars = document.querySelector(selector).children;
	for (var i = stars.length - 1; i >= 0; i--) {
		stars[i].firstElementChild.style.display = 'inline-block';
	}
}
