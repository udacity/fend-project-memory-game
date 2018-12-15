// Selectors 
const deckSlctr = document.querySelector(".deck");

// Variables 
const uniqueItems = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
const pairs = duplicateElements(uniqueItems);

// Start the game!
render(deckSlctr, deckTemplate(pairs));

// Events 

deckSlctr.addEventListener("click", evt => {
    const element = evt.target;
    if (element.nodeName === "LI") {
        flipCard(element);
    }
});

// Functions 

/**
 * Flip the cards' effect adding "open" and "show" classes.
 * @param {HTMLElement} card - HTML element to be flipped.
 */

function flipCard(card) {
    card.classList.add("show");
    card.classList.add("open");
}

/**
 * Render any HTML based on any element.
 * @param {HTMLElement} slctr - HTML element where to be overwritten.
 * @param {string} html - HTML content to be added to the doc.
 */
function render(slctr, html) {
    slctr.innerHTML = html;
}

/**
 * Generate an HTML template for a single card. 
 * @param {string} itemClass - Font awesome icon name.
 */
function cardTemplate(itemClass) {
    return `<li class="card">
                <i class="fa fa-${itemClass}"></i>
            </li>`;
}

/**
 * Shuffle the card elements in list and returns the HTML structure. 
 * @param {array} list - list of ordered and duplicated font awesome icon' names.
 * @return {string} - HTML content to be rendered. 
 */
function deckTemplate(list) {
    list = shuffle(list);
    return list.map(item => {
        return cardTemplate(item);
    }).join("");
}

/**
 * Duplicate array content. 
 * @see: https://stackoverflow.com/a/33305263
 * @param {array} list - list of items.
 * @return {array} - list of duplicated items. 
 */
function duplicateElements(list) {
    return list.reduce(function(res, current, index, array) {
        return res.concat([current, current]);
    }, []);
}


/**
 * Shuffle the array of items. 
 * @see: http://stackoverflow.com/a/2450976
 * @param {array} list - list of items.
 * @return {array} - list of shuffled items. 
 */
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