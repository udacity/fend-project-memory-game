/*
 * Create a list that holds all of your cardsshow
*/

var begin = function(){

	var moves = 0;
	var starHtml = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
	$(".stars").html(starHtml);


//get all li elements of deck of cards
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

	var li = $(".card").children();

	var iClass = [];


	li.each(function(){
		iClass.push( $(this).attr("class"));
	 });

	 var shuffledClasses = shuffle(iClass);

	 $(".deck").find(".card").remove();

	 for(var i=0; i<iClass.length; i++){

		 var liClass =  iClass[i] ;
		 var listItem = `<li class="card"><i class ="${liClass}"></i></li>`;
		 $(".deck").append(listItem);
	 }


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
var matchedArray = [];

function match(){


	$(".deck").find(".show").toggleClass("show open").addClass("match");


	matchedArray.push(testArr[0]);
	matchedArray.push(testArr[1]);
	testArr = [];
}



function unmatch(){

	$(".deck").find(".show").toggleClass("show open");
	testArr = [];

}

var testArr = [];
function logic(){

		var className = $(this).attr("class");
		var regEx = /open/gi;

		if(regEx.test(className)){
			return true;
		}

		$(this).addClass("open");
		$(this).addClass("show");

		testArr.push($(this));

		if(testArr.length>1){

				moves++;
				$(".moves").text(moves);

				if(moves > 8 && moves < 16){
					$(".stars").children().first().remove();
				}
				else if(moves>16 && moves <22){
					$(".stars").children().first().remove();
				}else{
					return true;
				}






				if(testArr[0][0]["childNodes"][0]["className"] === testArr[1][0]["childNodes"][0]["className"] ){

					//add class match
					setTimeout(match(), 400);

					//add both of them to a new array matched
				}else{

					setTimeout(unmatch, 400);
					//remove class show and open
					//remove them from testArr
				}
}

	if(matchedArray.length == 16){
			console.log("16")
	}


	};


$(".deck").on("click", ".card", logic);
};
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
begin();
