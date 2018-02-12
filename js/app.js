
/*Global Variables*/
const restartElement = document.querySelector('.restart');
const deckElement = document.querySelector('.deck');
const fragment = document.createDocumentFragment();
const deckNodeList = document.querySelectorAll('.card');/*Create a list that holds all cards*/
const modal = document.querySelector('.modal-background');
const restartImgElement = document.querySelector('.restart-img');
const moveList = document.querySelectorAll('.moves');
const starsNodeList = document.querySelectorAll('.fa-star');
const timerList = document.querySelectorAll('.timer');
const cardArray = [];

let gamePlay = {
	moves:0,
	matchedcards:0,
	timeNow:0,
	timerOn:true,
	cardWrongAnimation:true
};

let openCardList = [];
let randomDeckArray;

/* Intial function: Display the randomized hidden cards on the page*/
(function(){ 
	for(card of deckNodeList)
		cardArray.push(card);
	randomizeDeck();
}());

/*EventListeners*/
deckElement.addEventListener('click', cardClicked, false);//If a card is clicked
restartElement.addEventListener('click', restartGame, false);//If restart symbol on main screen is pressed
restartImgElement.addEventListener('click', restartGamefromModal, false);//If restart Image is pressed

/*Restart the game from the modal*/
function restartGamefromModal(){
	restartImgElement.className ='restart-img animated rotateOut';
	setTimeout(function(){
		modal.style.display = 'none';
		restartGame();
		restartImgElement.className ='restart-img';
		gamePlay.timerOn = true;
	},500);
}

/*Restart game from main screen restart symbol*/
function restartGame(){
	openCardList = [];//Clear selected List
	gamePlay.timeNow = 0;//Timer restart
	timerList[0].innerHTML = 0;
	for(star of starsNodeList)//Stars restart
		star.style.display ='inline-block';
	gamePlay.moves = 0;//Moves restart
	gamePlay.matchedcards = 0;//Reset matched cards
	document.querySelector('.moves').innerHTML = gamePlay.moves;	//Reset main screen move counter to 0.
	randomizeDeck();
}

/*Randomize and hide the deck*/
function randomizeDeck(){
	randomDeckArray = shuffle(cardArray);//Randomize array ie cards
	for(randomCard of randomDeckArray){
		randomCard.className = 'card';//Hide all cards
	    fragment.appendChild(randomCard);//Attach card from randomized deck to a fragment
	}
	deckElement.appendChild(fragment);//attach fragment to deck
}

/*Game logic to follow if a card is clicked*/
function cardClicked(event){
	let cardSelected = event.path[0];
	if(cardSelectedNotMatchedYet(cardSelected)){
		if(addToOpenCardList(cardSelected)){
			if(doCardsMatch()){//If cards match lock cards into the open position
				bothCardsNowInOpen();
				gamePlay.matchedcards++;//tracks how many cards have been matched
			}else	
				cardsBacktoHidden();
			updateMoves();
			updateStars();
			checkAllCardsMatched();
		}
	}
}

/*Update the number of 'moves' variable and display on screen*/
function updateMoves(){
	gamePlay.moves++;
	for(element of moveList)
		element.innerHTML = gamePlay.moves;
}

/*Updates the number of 'stars' which depends on the score"*/
 function updateStars(){
	if(gamePlay.moves === 10){
		starsNodeList[0].style.display = 'none';
		starsNodeList[3].style.display = 'none';
	}else if(gamePlay.moves === 16){
		starsNodeList[1].style.display = 'none';
		starsNodeList[4].style.display = 'none';
	}
}

/*Checks if all the cards are matched*/
function checkAllCardsMatched(){
	if(gamePlay.matchedcards === 8){
		gamePlay.timerOn  = false;
		setTimeout(function(){
			modal.style.display = 'block';
		},800);
	}
}

/*Display card, if card is not already matched and the card was clicked*/
function cardSelectedNotMatchedYet(node){
	if(node.className != 'card match animated pulse' && node.className != 'card match' && node.nodeName == 'LI' && gamePlay.cardWrongAnimation){
		node.className = 'card open show';
		return true;
	}
	return false;
}

/*Add the card to a *list* of "open" cards. If list is full return true, if list is not full return false*/
function addToOpenCardList(node){
	openCardList.push(node);
	if(openCardList[0] == openCardList[1])
		openCardList.pop(openCardList[1]);
	if(openCardList.length == 2)
		return true;
	else
		return false;
}

/*If selected list cards match, return true, if not return false*/
function doCardsMatch(){
	if(openCardList[0].innerHTML === openCardList[1].innerHTML)
		return true;
	return false;
}

/*If cards are not in the correct position, play wrong card animation,
hide cards and temporaily disable mouse clicks so mo error occurs during wrong animation play*/
function cardsBacktoHidden(){
	openCardList[0].className = 'card wrong show animated shake';
	openCardList[1].className = 'card wrong show animated shake';
	gamePlay.cardWrongAnimation = false;
	setTimeout(
		function(){
			openCardList[0].className = 'card';
			openCardList[1].className = 'card';
			openCardList = [];
			gamePlay.cardWrongAnimation = true;
		},600);
}

/*If the cards do match, lock the cards in the open position*/
function bothCardsNowInOpen(){
	openCardList[0].className = 'card match animated pulse';
	openCardList[1].className = 'card match animated pulse';
	openCardList = [];
}

/*Stopwatch function*/
setInterval(function(){
	if(gamePlay.timerOn ){
		for(element of timerList)
			element.innerHTML = gamePlay.timeNow;
		gamePlay.timeNow++;
	}
}, 1000);

/*Shuffle function*/
//From http://stackoverflow.com/a/2450976
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