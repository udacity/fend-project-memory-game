/*
 * Create a list that holds all of your cards
 */


const iconList=['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-anchor','fa fa-leaf','fa fa-bicycle','fa fa-diamond','fa fa-bomb','fa fa-leaf','fa fa-bomb','fa fa-bolt', 'fa fa-bicycle','fa fa-paper-plane-o','fa fa-cube'];

const deck= document.querySelector('.deck');
const ul=document.createDocumentFragment('ul');
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

function createCard(){
	const shuffledCards=shuffle(iconList);
	shuffledCards.forEach(function(card){
		const li=document.createElement('li');
		const i=document.createElement('i');
		i.setAttribute('class',card);
		li.setAttribute('class','card');
		li.appendChild(i);
		ul.appendChild(li);
	});
	deck.appendChild(ul);
}
createCard();

let cards=document.querySelectorAll('.card');
const moves=document.querySelector('.moves');
const restartButton=document.querySelector('.restart');
console.log(restartButton);
const min=document.querySelector('.min');
const sec=document.querySelector('.sec');
let opendCards=[];
let matchedCards=[];
let moveCounter=0;
moves.textContent=moveCounter+' Moves';

let timerId=0;
let timerOn=false;

deck.addEventListener('click', function(e){
	let minuteCounter=0;
	let secondCounter=0;

	if(matchedCards.length==16){
		timerOn=false;
		clearInterval(timerId);
	}
	if(timerOn){
		return;
	}

	if(e.target.classList.contains('card')){
		timerOn=true;
		min.textContent='00';
		sec.textContent='00';
		minuteCounter=0;
		secondCounter=0;
		timerId=setInterval(timer,1000);
	}

	function timer(){
		if(secondCounter==59){
			secondCounter=0;
			minuteCounter++;
			min.textContent=minuteCounter<10?'0'+minuteCounter:minuteCounter;
		}
		secondCounter++;
		sec.textContent=secondCounter<10?'0'+secondCounter:secondCounter;
	}

	for(let card of cards){
		card.addEventListener('click', show);
	}

	function show(e){
		console.log('this is click');
		if(opendCards.length>=2 || e.target.classList.contains('open','show')|| e.target.classList.contains('match')){
			return;
		}

		e.target.classList.add('open','show','animated', 'flipInY');
		opendCards.push(e.target);
		if(opendCards.length==2){
			moveCounter++;
			moves.textContent=moveCounter===1?1+ ' Move':moveCounter+' Moves';
			starScore('.stars','inline-block');	
			match();
		}
	}

	function match(){
		
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