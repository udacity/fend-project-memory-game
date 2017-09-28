#Project memrory game
the project was to create a memory game were a player clicks on a card and reveals a picture if there is three matching pictures the player wins. the player can get three chances to win 


##code example

this starts the game by shuffling the cards into a radom order before the playe starts clicking on card 



--function startGame() {
    deck = shuffle(deck);
    const deckElement = document.getElementById('deck');
    // clear cards incase the reresh button is used

    deckElement.innerHTML = '';
    for (var index = 0; index < deck.length; index++) {

        const card = document.createElement('li');
        card.addEventListener('click', openCard);
        card.className = 'card';
        const cardType = document.createElement('i');
        cardType.className = 'fa fa-' + deck[index];
        card.append(cardType);
        deckElement.append(card);
    }
    //rests move conter
    moves = 0;
    document.getElementById('moves').textContent = moves;
    remainingMatches = 8;

    document.getElementById('game').style.display = 'block';
    document.getElementById('completed').style.display = 'none';
}--


*note this function also refreshes the page