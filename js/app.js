
const restartElement=document.querySelector('.restart');
const deckElement = document.querySelector('.deck');
const fragment = document.createDocumentFragment();
const deckNodeList = document.querySelectorAll('.card');/*Create a list that holds all of your cards*/
const cardArray = [];

let moves=0;
let matchedcards =0;	
let timeNow=0;
let timerOn = true;
let cardWrongAnimation =true;
let openCardList = [];
let randomDeckArray;




/* Intial funciton: Display the randomized cards on the page*/
(function(){ 
for(card of deckNodeList)
	cardArray.push(card); 
randomDeckArray=shuffle(cardArray);//Shuffle the list of cards using the provided "shuffle" method below
for(randomCard of randomDeckArray)//Loop through each card and create its HTML
    fragment.appendChild(randomCard);
deckElement.appendChild(fragment); //Add each card's HTML to the page
}());

 /*EventListeners*/
deckElement.addEventListener('click', cardClicked, false);//If a card is clicked
restartElement.addEventListener('click', restartGame, false);//If reset is pressed*

function restartGame(){
	//Clear selected List
	openCardList = [];
	//Timer restart
	timeNow=0;
	timerNode.innerHTML = 0;
	//Star restart
	for(star of starsNodeList)
		star.style.display='inline-block';
	//Moves restart
	moves =0;
	document.querySelector('.moves').innerHTML= moves;
	//Shuffle cards and replace 
	randomDeckArray=shuffle(cardArray);
	for(randomCard of randomDeckArray){
		randomCard.className="card";
	    fragment.appendChild(randomCard);
	}
	deckElement.appendChild(fragment); 
}

function cardClicked(event){
		let cardSelected = event.path[0];
		if(cardSelectedNotMatchedYet(cardSelected)){
			if(addToOpenCardList(cardSelected)){
				if(doCardsMatch()){//Lock cards into the open position
					bothCardsNowInOpen();
					matchedcards++;
				}else	
					cardsBacktoHidden();
					updateMoves();
					updateStars(); 
					checkAllCardsMatched();
			}
		}
}	

/*Update the moves variable and display on screen*/
function updateMoves(){
	moves++;
	document.querySelector('.moves').innerHTML= moves;
}
/*Updates the number of stars which depends on the score"*/
const starsNodeList = document.querySelectorAll('.fa-star');
 function updateStars(){
	if(moves===10)
		starsNodeList[0].style.display='none';
	if(moves===16)
		starsNodeList[1].style.display='none';
}


/*Checks if all the cards are matched*/
function checkAllCardsMatched(){
	if(matchedcards==1){ //Change to 8 later on
		console.log("Gamer over");
		timerOn = false;

	}
		
}


/*Display card if card is not already matched and the card was clicked*/
function cardSelectedNotMatchedYet(node){
	if(node.className!="card match animated pulse" && node.className!="card match"&&node.nodeName=="LI"&&cardWrongAnimation){
		node.className="card open show";
		return true;
	}
	return false;
} 

/*Add the card to a *list* of "open" cards. If list is full return true, if list is not full return false*/
function addToOpenCardList(node){
			openCardList.push(node);
			if(openCardList[0]==openCardList[1])
				openCardList.pop(openCardList[1]);
			if(openCardList.length ==2)
				return true;
			else
				return false;
}

/*If selected list cards match, return true, if not return false*/
function doCardsMatch(){
	if(openCardList[0].innerHTML===openCardList[1].innerHTML)
		return true;
	return false;
}	 

/*If cards are not in the correct position, play wrong cardanimation,
hide cards and temporaily disable mouse clicks*/
function cardsBacktoHidden(){
	openCardList[0].className="card wrong show animated shake";
	openCardList[1].className="card wrong show animated shake";
	cardWrongAnimation = false;
	setTimeout(
		function(){
			openCardList[0].className="card";
			openCardList[1].className="card";
			openCardList = [];
			cardWrongAnimation = true;
		},600);
}

/*If the cards do match, lock the cards in the open position*/
function bothCardsNowInOpen(){
	openCardList[0].className="card match animated pulse"
	openCardList[1].className="card match animated pulse";
	openCardList = [];
}


/*Stopwatch function*/
const timerNode = document.querySelector('.timer');
setInterval(function(){ 
	if(timerOn) 
		timerNode.innerHTML = timeNow++;
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

// TO DO:
// Add Modal
// Add select using arrow keys and select with enter.
// Add reset using letter 'r'
// Save highscores 
