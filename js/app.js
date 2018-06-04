/*
 * Create a list that holds all of your cards
 */
const chess_cards = ['fas fa-chess', 'fas fa-chess-bishop',
	'fas fa-chess-board', 'fas fa-chess-king',
	'fas fa-chess-knight', 'fas fa-chess-pawn', 'fas fa-chess-queen',
	'fas fa-chess-rook'
];
const geek_cards = ['fab fa-android', 'fab fa-gitkraken', 'fab fa-linux',
	'fab fa-mandalorian', 'fab fa-nintendo-switch', 'fab fa-phoenix-squadron',
	'fab fa-python', 'fab fa-reddit-alien', 'fab fa-steam',
	'fab fa-wolf-pack-battalion'
];
const star_wars_cards = ['fab fa-empire', 'fab fa-galactic-republic',
	'fab fa-galactic-senate', 'fab fa-jedi-order', 'fab fa-old-republic',
	'fab fa-rebel', 'fab fa-sith', 'fab fa-trade-federation'
];
const possible_cards = ['fas fa-allergies', 'fas fa-ambulance', 'fas fa-anchor',
	'fab fa-angellist', 'fas fa-at', 'fas fa-balance-scale', 'fas fa-bath',
	'fas fa-bell', 'fas fa-bicycle', 'fas fa-binoculars', 'fas fa-birthday-cake',
	'fas fa-bomb', 'fas fa-briefcase-medical', 'fas fa-bug', 'fas fa-bullhorn',
	'fas fa-bullseye', 'fas fa-bus', 'fas fa-calculator', 'fas fa-camera-retro',
	'fas fa-car', 'fas fa-child', 'fas fa-clock', 'fas fa-cloud', 'fas fa-code',
	'fas fa-coffee', 'fas fa-compass', 'fas fa-cogs', 'fas fa-couch',
	'fas fa-crow', 'fas fa-crown', 'fas fa-cubes', 'fas fa-cut', 'fas fa-dna',
	'fas fa-dove', 'fab fa-earlybirds', 'fas fa-eject', 'fas fa-eraser',
	'fas fa-eye-dropper', 'fas fa-feather', 'fas fa-fighter-jet', 'fas fa-film',
	'fas fa-fire-extinguisher', 'fas fa-first-aid', 'fas fa-flask', 'fas fa-fly',
	'fas fa-font-awesome', 'fas fa-frog', 'fas fa-gas-pump', 'fas fa-gift',
	'fab fa-grav', 'fab fa-grunt', 'fas fa-heart', 'fas fa-heartbeat',
	'fas fa-helicopter', 'fas fa-home', 'fas fa-kiwi-bird', 'fas fa-leaf',
	'fas fa-lemon', 'fas fa-lightbulb', 'fas fa-magic', 'fas fa-meh',
	'fas fa-motorcycle', 'fas fa-music', 'fas fa-newspaper', 'fas fa-paint-brush',
	'fas fa-palette', 'fas fa-parachute-box', 'fas fa-paw',
	'fab fa-pied-piper-alt', 'fab fa-pied-piper-hat', 'fas fa-piggy-bank',
	'fas fa-plug', 'fas fa-puzzle-piece', 'fas fa-road', 'fas fa-robot',
	'fas fa-rocket', 'fas fa-school', 'fas fa-ship', 'fas fa-shipping-fast',
	'fas fa-shoe-prints', 'fas fa-skull', 'fas fa-smile', 'fas fa-snowflake',
	'fas fa-space-shuttle', 'fas fa-star', 'fab fa-sticker-mule',
	'fas fa-stopwatch', 'fas fa-store', 'fas fa-sun', 'fas fa-table-tennis',
	'fas fa-taxi', 'fas fa-thermometer', 'fas fa-thumbs-up', 'fas fa-thumbtack',
	'fas fa-ticket-alt', 'fas fa-train', 'fas fa-tree', 'fas fa-trophy',
	'fas fa-truck', 'fas fa-tshirt', 'fas fa-university', 'fas fa-user-astronaut',
	'fas fa-user-graduate', 'fas fa-user-md', 'fas fa-user-secret',
	'fas fa-walking', 'fas fa-warehouse', 'fas fa-wheelchair', 'fas fa-wifi',
	'fas fa-wrench', 'fas fa-x-ray'
];


/*
 * Display the cards on the page
 *   - pick 8 cards out of the list (for lists with a length longer than 8)
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Pick eight cards out of a lists
function pickCards(array) {
	let numCards = array.length;
	let currentIndex;
	const trimmedArray = [];

	for (let i = 0; i < 8; ++i) {
		currentIndex = Math.floor(Math.random() * numCards);
		if (trimmedArray.includes(array[currentIndex])) {
			--i; // If the card already exists in the trimmedArray, then decrement i
		} else {
			trimmedArray[i] = array[currentIndex];
		}
	}

	return trimmedArray;
}

function doubleArray(array) {
	const newArray = [];
	for (let i = 0; i < array.length; ++i) {
		newArray.push(array[i]);
		newArray.push(array[i]);
	}
	return newArray;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	let currentIndex = array.length,
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

function displayCards(array) {
	let newCard = '';
	let deck = $('#deck');
	// If the card list is longer than 8, pick 8 cards for this game.
	if (array.length > 8) {
		array = pickCards(array);
	}

	// Now create and shuffle an array of 8 matching pairs.
	array = shuffle(doubleArray(array));

	// Loop through the array and add the html
	for (let i = 0; i < array.length; ++i) {
		newCard = array[i];
		deck.append(`<li class='card open show'><i class='${newCard}'></li>`);
	}

}
displayCards(possible_cards);
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