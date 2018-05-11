/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
let moves = 0; //initialize moves to 0 on reload
let icons = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
let matched = 0; //initializig no of matched cards to 0 on reload
var sec = 0; //initializind timer to 0 on reload
let noClicks = [0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]; //To keep track of no.of clicks on each card for rating
let star_status = 5; //Initializing ratiing to 5 stars on reload

var duration = setInterval(function() { //started timer for each sec
        sec++;
        document.querySelector('.time').textContent = sec + " sec";
      }, 1000);

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
//function to handle DOMContentLoaded event for initial setup 
function restart(evt){
  moves = 0;
  sec = 0;
  icons = shuffle(icons); // suffling cards on reload
  document.querySelector('.moves').textContent = moves;
  document.querySelector('.timer').style.display = 'none'; //hidding timer until user clicks on first card
  cardElement = document.querySelectorAll('.card');
  //Displaying cards for 2 sec to memorize
  for (var i = 0 ; i < 16; i++){
    cardElement[i].classList.value = "card show";
    cardElement[i].firstElementChild.classList.value = "fa " + icons[i];
  }
  //flip the cards after 2 sec
  setTimeout(function() {
    for (var i = 0 ; i < 16; i++){
      cardElement[i].classList.value = "card";
    }
  }, 2000);
  
}

document.addEventListener('DOMContentLoaded', restart); 

//reload the page on clicking reload icon
document.querySelector('.restart').addEventListener('click', reload);

//event handler for handling clicks on cards
document.querySelector('.deck').addEventListener('click', function (evt) {
	var x;
	console.log(evt.target.id);
  if(evt.target.nodeName == 'LI'){
      if (evt.target.classList.contains('show')){ //If user clicks on non matched opened card again
          evt.target.classList.value = "card"; //closing the card
      }
      else if (document.querySelector('.show') == null){ //If user clicks on non matched and first card of the pair
          if( !moves) {
            sec = 0;
            document.querySelector('.timer').style.display = 'inline';
          }
          evt.target.classList.add('show', 'open');
      }
      else if(!evt.target.classList.contains('match')){ //if user clicks on card to be paird with already opened card
          var opened_icon = document.querySelector('.show').classList;
          if(evt.target.firstElementChild.classList.value === document.querySelector('.show').firstElementChild.classList.value){ //clicked on the right pair
              evt.target.classList.add('match');
              opened_icon.add('match');
              opened_icon.remove('open','show');
              moves++;
              if(++matched == 8){ //All cards are matched
        				clearInterval(duration);
						//score card display
        				document.querySelector('.deck').outerHTML = '<div class="score"> <div><h1> Congratulations!!! </h1>  <p class="fa fa-smile-o smily"> </p> </div> <div> <h3> Moves:-' + moves + '</h3></div>  <div><h3> Time :- ' + sec + ' sec </h3></div><div><h3>Rating:-<span class="fa fa-star score_star"></span><span class="fa fa-star score_star"></span><span class="fa fa-star score_star"></span><span class="fa fa-star score_star"></span><span class="fa fa-star score_star"></span></h3></div><div> <p><button type="button" class="button" onclick="reload()">Try Again!!</button> </p></div>' ;
  						for(var i=0; i <star_status; i++){ 
  							   document.querySelectorAll('.score_star')[i].classList.add('checked');
  			     }
			  }
         } else {//clicked on wrong pair
            x = document.querySelector('.show').id -1;
            noClicks[x]++ ;
            opened_icon.value = "card wrong show";
            evt.target.classList.add('wrong', 'show');

            setTimeout(function() {
                evt.target.classList.remove('show', 'wrong');
                opened_icon.value = "card";
                noClicks[evt.target.id - 1]++;
                //star rating display
                console.log(noClicks);
                if ((noClicks[evt.target.id - 1] > 2) || (noClicks[x] > 2)){
                  document.getElementById('star_' + star_status--).style.color = '#8c8c8c';

                  //reduse rating
                }
            }, 400);
            moves++;
        }
          document.querySelector('.moves').textContent = moves; //increasing no.of moves
      }
   }
});
//reload the page
function reload(){
      location.reload();     
}


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
