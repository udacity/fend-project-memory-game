$(function() {
	let allCardsOrg = [
		'fa fa-diamond',
		'fa fa-paper-plane-o',
		'fa fa-anchor',
		'fa fa-bomb',
		'fa fa-bolt',
		'fa fa-cube',
		'fa fa-leaf',
		'fa fa-bicycle',
		'fa fa-diamond',
		'fa fa-paper-plane-o',
		'fa fa-anchor',
		'fa fa-bomb',
		'fa fa-bolt',
		'fa fa-cube',
		'fa fa-leaf',
		'fa fa-bicycle',
	];
	const allCards = shuffle(allCardsOrg);
	let clickedCards = [];
	const deck = $('.deck');
	let count = 0;
	let stars = $('.stars');
	const modal = document.getElementById('myModal');
	const span = document.getElementsByClassName('close')[0];
	//to HTML
	allCards.forEach(function(item) {
		const liElement = createLiElement(item);
		$(deck).append(liElement);
		$('li').addClass('open');
	});

	function createLiElement(cssClass) {
		const liEl = document.createElement('li');
		$(liEl).addClass('card');

		const iEl = document.createElement('i');
		$(iEl).addClass(cssClass);
		$(liEl).append(iEl);

		$(liEl).click(function(e) {
			// prevent dblclick issue
			if ($(liEl).hasClass('show') && !$(liEl).hasClass()) {
				setInterval(onClick, 1000);
			}
			if (clickedCards.length <= 1) {
				handleCardOnClick(this);
				updateStarsScore();
				checkIfWinner();
        modalMessage();
			}
		});
		return liEl;
	}
	// remember that clickedCard is "this".
	function handleCardOnClick(clickedCard) {
		// now you  need to keep track of what cards have been clicked
		console.log(clickedCard);

		$(clickedCard).addClass('show');
		clickedCards.push(clickedCard);

		if (clickedCards.length > 1) {
			count++;

			$('span.moves').html(function() {
				return count;
			});
			//match or not
			if (
				$(clickedCards[0]).find('i').attr('class') ===
				$(clickedCards[1]).find('i').attr('class')
			) {
				$('.show').addClass('match');
				$('li').removeClass('show');
				clickedCards = [];
			} else {
				setTimeout(function() {
					$('li').removeClass('show');
					clickedCards = [];
				}, 1000);
			}
		}
	}

	function updateStarsScore() {
		const stars = $('.stars').children();
		if (count === 16) {
			$(stars[0]).css('color', 'rgb(117, 148, 229)');
		} else if (count === 25) {
			$(stars[1]).css('color', 'rgb(117, 148, 229)');
		}
	}
  function modalMessage(){
	let time = $('h1.clock').html();
	let starScore = $('.score-panel .stars').html();
	$('div.modal-content p').html(function() {
		return (
			'Congrats you WON! ' +
			`Your star level is <div class="score-panel"><ul class="stars">${starScore} </ul><div>` +
			`and your time was <h1 class="clock">${time}</h1> ` +
			'Want to try again?'
	  );
	 });
  }
	
	$('.restart').click(function(e) {
		location.reload(this);
	});

	/*modal JS from W3Schools.com*/
	span.onclick = function() {
		modal.style.display = 'none';
		location.reload(clickedCards);
	};
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};

	function checkIfWinner() {
		if ($('.match').length === 16) {
			clearInterval(t);
			modal.style.display = 'block';
		}
	}

	let h1 = $('.clock').get(0);
	let seconds = 0;
	let minutes = 0;
	let hours = 0;
	let t;
	function add() {
		seconds++;
		if (seconds >= 60) {
			seconds = 0;
			minutes++;
			if (minutes >= 60) {
				minutes = 0;
				hours++;
			}
		}

		h1.textContent =
			(hours ? (hours > 9 ? hours : '0' + hours) : '00') +
			':' +
			(minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') +
			':' +
			(seconds > 9 ? seconds : '0' + seconds);
	}
	t = setInterval(add, 1000);

	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
}); // end of createLiElement
