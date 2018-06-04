/*
 * Create a list that holds all of your cards
 */
const chess_cards = ['chess', 'chess-bishop', 'chess-board', 'chess-king',
	'chess-knight', 'chess-pawn', 'chess-queen', 'chess-rook'
];
const geek_cards = ['android', 'empire', 'galactic-republic', 'galactic-senate',
	'gamepad', 'gitkraken', 'jedi-order', 'linux', 'mandalorian',
	'nintendo-switch', 'old-republic', 'phoenix-squadron', 'python', 'quidditch',
	'rebel', 'reddit-alien', 'sith',
	'steam', 'trade-federation', 'wolf-pack-battalion'
];
const possible_cards = ['allergies', 'ambulance', 'anchor', 'angelist', 'at',
	'balance-scale', 'bath', 'bell', 'bicycle', 'binoculars',
	'birthday-cake', 'bomb', 'briefcase-medical', 'bug', 'bullhorn', 'bullseye',
	'bus', 'calculator', 'camera-retro',
	'car', 'child', 'clock', 'cloud', 'code', 'coffee', 'compass', 'cogs',
	'couch', 'crow', 'crown', 'cubes', 'cut',
	'dna', 'dove', 'earlybirds', 'eject', 'eraser', 'eye-dropper', 'feather',
	'fighter-jet', 'film', 'fire-extinguisher',
	'first-aid', 'flask', 'fly', 'font-awesome', 'frog', 'gas-pump', 'gift',
	'grav', 'grunt', 'heart', 'heartbeat',
	'helicopter', 'home', 'kiwi-bird', 'leaf', 'lemon', 'lightbulb', 'magic',
	'meh', 'motorcycle', 'music', 'newspaper',
	'optin-monster', 'paint-brush', 'palette', 'parachute-box', 'paw',
	'pied-piper-hat', 'pied-piper-alt', 'piggy-bank',
	'plug', 'puzzle-piece', 'road', 'robot', 'rocket', 'school', 'ship',
	'shipping-fast', 'shoe-prints', 'skull', 'smile',
	'snowflake', 'space-shuttle', 'star', 'sticker-mule', 'stopwatch', 'store',
	'sun', 'table-tennis', 'taxi', 'thermometer',
	'thumbs-up', 'thumbtack', 'ticket-alt', 'train', 'tree', 'trophy', 'truck',
	'tshirt', 'university', 'user-astronaut',
	'user-graduate', 'user-md', 'user-secret', 'walking', 'warehouse',
	'wheelchair', 'whmcs', 'wifi', 'wrench', 'x-ray'
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
		deck.append(`<li class='card'><i class='fa fa-${newCard}'></li>`);
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