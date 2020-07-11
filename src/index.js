import Board from './classes/Board';
import Player from './classes/Player';
import './style.scss';

//Helpers (from http://jaketrent.com/post/addremove-classes-raw-javascript/)
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
function addClass(el, className) {
  if (el.classList)
    el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}
function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className=el.className.replace(reg, ' ');
  }
}

/*
Helper function that takes the object returned from isTerminal() and adds a 
class to the board that will handle drawing the winning line's animation
*/
function drawWinningLine({ direction, row }) {
	let board = document.getElementById("board");
	board.className = `${direction}${row}`;
	setTimeout(() => { board.className += ' full'; }, 50);
}


//Starts a new game with a certain depth and a starting_player of 1 if human is going to start
function newGame(depth = -1, starting_player = 1) {
	//Instantiating a new player and an empty board
	let p = new Player(parseInt(depth));
	let b = new Board(['','','','','','','','','']);

	//Clearing all #Board classes and populating cells HTML
	let board = document.getElementById("board");
	board.className = '';
	board.innerHTML = '<div class="cell-0"></div><div class="cell-1"></div><div class="cell-2"></div><div class="cell-3"></div><div class="cell-4"></div><div class="cell-5"></div><div class="cell-6"></div><div class="cell-7"></div><div class="cell-8"></div>';
	
	//Clearing all celebrations classes
	removeClass(document.getElementById("charachters"), 'celebrate_human');
	removeClass(document.getElementById("charachters"), 'celebrate_robot');

	//Storing HTML cells in an array
	let html_cells = [...board.children];

	//Initializing some variables for internal use
	let starting = parseInt(starting_player),
		maximizing = starting,
		player_turn = starting;
		turn_next= parseInt(turn);
		turn=1;
	//If computer is going to start, choose a random cell as long as it is the center or a corner
	if(!starting) {
		let center_and_corners = [0,2,4,6,8];
		let odd_options=[1,3,5,7,9];
		let first_choice = center_and_corners[Math.floor(Math.random()*center_and_corners.length)];
		let first_symbol= odd_options[Math.floor(Math.random()*odd_options.length)];
		//let symbol = !maximizing ? 'o' : 'x';
		b.insert(first_symbol, first_choice);
		b.move=first_symbol;
		addClass(html_cells[first_choice], first_symbol);
		player_turn = 0; //Switch turns
	}

	//Adding Click event listener for each cell
  	b.state.forEach((cell, index) => {
  		html_cells[index].addEventListener('click', () => {
  			//If cell is already occupied or the board is in a terminal state or it's not humans turn, return false
  			if(/*hasClass(html_cells[index], 'x') || hasClass(html_cells[index], 'o')|| */b.isTerminal() || !player_turn) return false;

	  		if(maximizing) {	
	  			document.getElementById("turn1").addEventListener("click", (event) => {
					if(event.target.tagName !== "LI" || hasClass(event.target, 'active')) return
					let odd_choices = [...document.getElementById("turn1").children[0].children];
					odd_choices.forEach((choice) => {
				
						removeClass(choice, 'active');
						addClass(choice, 'visited');
					});
					addClass(event.target, 'active');
					turn = event.target.dataset.value;
				}, false);
	  		}

	  		if(!maximizing) {
				document.getElementById("turn2").addEventListener("click", (event) => {
					if(event.target.tagName !== "LI" || hasClass(event.target, 'active')) return
					let even_choices = [...document.getElementById("turn2").children[0].children];
					even_choices.forEach((choice) => {
				
						removeClass(choice, 'active');
						addClass(choice, 'visited');			
					});
					addClass(event.target, 'active');
					turn = event.target.dataset.value;
				}, false);
			}
	
	
  			let symbol =parseInt(turn)
  			// maximizing ? turnodd : turneven; //Maximizing player is always 'x'

  			//Update the Board class instance as well as the Board UI
  			b.insert(symbol, index);
  			addClass(html_cells[index], symbol);

  			//If it's a terminal move and it's not a draw, then human won
  			if(b.isTerminal()) {
  				let { winner } = b.isTerminal();
				if(winner !== 'draw') addClass(document.getElementById("charachters"), 'celebrate_human');
  				drawWinningLine(b.isTerminal());
  			}
  			player_turn = 0; //Switch turns

  			//Get computer's best move and update the UI
  			p.getBestMove(b, !maximizing, best => {
  				let symbol = b.move
  				b.insert(symbol, best);
  				addClass(html_cells[best], symbol);
  				if(b.isTerminal()) {
	  				let { winner } = b.isTerminal();
					if(winner !== 'draw') addClass(document.getElementById("charachters"), 'celebrate_robot');
	  				drawWinningLine(b.isTerminal());
	  			}
  				player_turn = 1; //Switch turns
  			});
  		}, false);
  		if(cell) addClass(html_cells[index], cell);
  	});
}

document.addEventListener("DOMContentLoaded", event => { 

	//Start a new game when page loads with default values
	let depth = -1;
	let starting_player = 1;
	let turn1= 1;
	let turn2= 2;
	newGame(depth, starting_player);


	//Events handlers for depth, starting player options
	document.getElementById("depth").addEventListener("click", (event) => {
		if(event.target.tagName !== "LI" || hasClass(event.target, 'active')) return
		let depth_choices = [...document.getElementById("depth").children[0].children];
		depth_choices.forEach((choice) => {
			removeClass(choice, 'active');
		});
		addClass(event.target, 'active');
		depth = event.target.dataset.value;
	}, false);

	document.getElementById("starting_player").addEventListener("click", (event) => {
		if(event.target.tagName !== "LI" || hasClass(event.target, 'active')) return
		let starting_player_choices = [...document.getElementById("starting_player").children[0].children];
		starting_player_choices.forEach((choice) => {
			removeClass(choice, 'active');
		});
		addClass(event.target, 'active');
		starting_player = event.target.dataset.value;
	}, false);

	document.getElementById("newgame").addEventListener('click', function () {
		newGame(depth, starting_player);
	});

});