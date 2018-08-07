# Memory Game Project

## Table of Contents

* [Prerequesities](#prerequesities)
* [Instructions](#instructions)
* [Rules](#rules)


## Prerequesities
* npm `~6.0.0 or higher`

## Instructions

* clone the repo:
	> $ git clone https://github.com/aditya81070/fend-project-memory-game.git
* move into repository:
	> $ cd fend-project-memory-game
* run npm install(it will give error if npm is not installed)
	> $ npm install
* now create distribution folder `dist`
	> $ gulp dist
* now open `index.html` file in your favorite browser.

## Rules

* Game has 16 cards. You can only open two cards at a time.
* If cards matched, they will be remained open.
* If cards do not match, cards will be closed and you can open them again.
* If you complete the game within 12 moves, you will get three stars.
* If you complete the game between 12 and 20 moves, you will get two stars.
* If you complete the game more then 20 moves, you will get one star.
* You can restart the game by clicking, restart button in your score panel or if you completet the game and want to play again, you can click on `play again`.
