/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


 var faElements = document.getElementsByClassName('faCard');
 var faClasses=[];
 for(i=0; i<faElements.length; i++){
   faClasses[i]= faElements[i].className;
 }
 console.log(faClasses);

faClasses =shuffle(faClasses);
for (i=0; i<faElements.length; i++){
  faElements[i].className=faClasses[i];
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

const allCards=document.querySelectorAll ('.card');
var openCards = [];
var clickCounter=0;
var star=3;
var seconds=0;
var displaySeconds=0;
var minutes=0;
var startDate = null;
var stopTime = null;
var isStopWatchRunning = false;

function secondsCounter(){
  if(!isStopWatchRunning) {
    return;
  }
  var currentDate = new Date();
  /*console.log("CurrentDate =" + currentDate + "  startTime=" + startDate);
  console.log("CurrentDate.getTime() =" + currentDate.getTime() + "  startTime=" + startDate.getTime());*/
  seconds = Math.round((currentDate.getTime() - startDate.getTime()) / 1000);
      if (seconds<=9){
          seconds= seconds.toString().padStart(2, "0");
          var timerHtml=document.getElementById('timer');
          timerHtml.innerHTML=`${minutes}:${seconds}`;
      }
      if(seconds>=60){
         minutes=Math.floor(seconds/60);
         displaySeconds=Math.ceil(seconds-(minutes*60));
            if(displaySeconds<=9){
               displaySeconds= displaySeconds.toString().padStart(2, "0");
               var timerHtml=document.getElementById('timer');
               timerHtml.innerHTML=`${minutes}:${displaySeconds}`;
            }
         var timerHtml=document.getElementById('timer');
         timerHtml.innerHTML=`${minutes}:${displaySeconds}`;
      }else{
         var timerHtml=document.getElementById('timer');
         timerHtml.innerHTML=`${minutes}:${seconds}`;
      }
}
setInterval(secondsCounter, 500);


  allCards.forEach(function(card){
   card.addEventListener('click',function(){
     if(openCards.length>1){
       return;
     }
     if(!isStopWatchRunning) {
       startDate = new Date();
       isStopWatchRunning = true;
     }
     if(!card.classList.contains('open','show','match')){
       openCards.push(card);
       card.classList.add('open','show');
        if(openCards.length==2){
           clickCounter++;
        /*matching two cards*/
           if(openCards[0].innerHTML==openCards[1].innerHTML){
              openCards[0].classList.add('match');
              openCards[1].classList.add('match');
              openCards=[];
        /*if they are different. we close them*/
          }else{
              setTimeout(function() {
              openCards.forEach(function(card){
               card.classList.remove('open','show');
              });
              openCards=[];
              }, 1000);
          }
       }

    }
     /*check if all cards are matched*/
    var matchedCards=document.querySelectorAll('.open','.show','.match');
      if(matchedCards.length==4){
         isStopWatchRunning=false;
         var timeToWin=document.getElementById('timer').innerHTML;
      /* Appeare of congratulations popup*/
         setTimeout(function() {
         document.querySelector('.deck').style.visibility='hidden';
         document.querySelector('.congratulationsPopup').style.visibility='visible';
         }, 1000);
      }






        /*Color change of stars (depends on moves )*/
        var moveCounter=document.querySelector('.moves');
        if (clickCounter>=8 && clickCounter<16){
          document.getElementById('firstStar').style.color = "#c0c0c0";
          star==2;
        }else if(clickCounter>=16){
          document.getElementById('secondStar').style.color = "#c0c0c0";
          star==1;
        }

        /*Adding congratulations text in HTML*/
        moveCounter.innerText=clickCounter;
        let winText=document.querySelector('.congratText');
        winText.innerHTML=`With ${clickCounter} Moves and ${star} Star.\n
                               It tooks ${timeToWin} to win.`;
    });
});

document.getElementById('playButton').onclick = function() {
   document.location.reload()=true;
};
document.querySelector('.restart').onclick = function() {
   document.location.reload()=true;
};
