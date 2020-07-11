/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @desc This class represents the board, contains methods that checks board state, insert a symbol, etc..
  * @param {Array} state - an array representing the state of the board
*/
var Board = function () {
    //Initializing the board
    function Board() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['', '', '', '', '', '', '', '', ''];
        var oddarr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [1, 3, 5, 7, 9];
        var evenarr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [2, 4, 6, 8];
        var move = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        _classCallCheck(this, Board);

        this.state = state;
        this.oddarr = oddarr;
        this.evenarr = evenarr;
        this.move = move;
    }
    //Logs a visualised board with the current state to the console


    _createClass(Board, [{
        key: 'printFormattedBoard',
        value: function printFormattedBoard() {
            var formattedString = '';
            this.state.forEach(function (cell, index) {
                formattedString += cell ? ' ' + cell + ' |' : '   |';
                if ((index + 1) % 3 == 0) {
                    formattedString = formattedString.slice(0, -1);
                    if (index < 8) formattedString += '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n';
                }
            });
            console.log('%c' + formattedString, 'color: #6d4e42;font-size:16px');
        }
        //Checks if board has no symbols yet

    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.state.every(function (cell) {
                return !cell;
            });
        }
        //Check if board has no spaces available

    }, {
        key: 'isFull',
        value: function isFull() {
            return this.state.every(function (cell) {
                return cell;
            });
        }
        /**
         * Inserts a new symbol(x,o) into
         * @param {String} symbol 
         * @param {Number} position
         * @return {Boolean} boolean represent success of the operation
         */

    }, {
        key: 'insert',
        value: function insert(symbol, position) {
            if (position > 8 || this.state[position]) return false; //Cell is either occupied or does not exist
            this.state[position] = symbol;
            return true;
        }
        //Returns an array containing available moves for the current state

    }, {
        key: 'getAvailableMoves',
        value: function getAvailableMoves() {
            var moves = [];
            this.state.forEach(function (cell, index) {
                if (!cell) moves.push(index);
            });
            return moves;
        }
    }, {
        key: 'getAvailableOddMoves',
        value: function getAvailableOddMoves() {
            var _this = this;

            var moves = [];
            this.oddarr.forEach(function (cell, index) {
                if (!(cell == _this.move)) moves.push(cell);
            });
            return moves;
        }
    }, {
        key: 'getAvailableEvenMoves',
        value: function getAvailableEvenMoves() {
            var _this2 = this;

            var moves = [];
            this.evenarr.forEach(function (cell, index) {
                if (!(cell == _this2.move)) moves.push(cell);
            });
            return moves;
        }
    }, {
        key: 'getCurrentMove',
        value: function getCurrentMove() {
            curmove = this.move / 2 == 0 ? 'even' : 'odd';
            return curmove;
        }
        /**
         * Checks if the board has a terminal state ie. a player wins or the board is full with no winner
         * @return {Object} an object containing the winner, direction of winning and row number
         */

    }, {
        key: 'isTerminal',
        value: function isTerminal() {
            //Return False if board in empty
            if (this.isEmpty()) return false;

            //Checking Horizontal Wins
            if (this.state[0] + this.state[1] + this.state[2] == 15 && this.state[1] && this.state[0] && this.state[2]) {
                return { 'winner': getCurrentMove(), 'direction': 'H', 'row': 1 };
            }
            if (this.state[3] + this.state[4] + this.state[5] == 15 && this.state[3] && this.state[4] && this.state[5]) {
                return { 'winner': getCurrentMove(), 'direction': 'H', 'row': 2 };
            }
            if (this.state[6] + this.state[7] + this.state[8] == 15 && this.state[6] && this.state[7] && this.state[8]) {
                return { 'winner': getCurrentMove(), 'direction': 'H', 'row': 3 };
            }

            //Checking Vertical Wins
            if (this.state[0] + this.state[3] + this.state[6] == 15 && this.state[6] && this.state[0] && this.state[3]) {
                return { 'winner': getCurrentMove(), 'direction': 'V', 'row': 1 };
            }
            if (this.state[1] + this.state[7] + this.state[4] == 15 && this.state[1] && this.state[7] && this.state[4]) {
                return { 'winner': getCurrentMove(), 'direction': 'V', 'row': 2 };
            }
            if (this.state[2] + this.state[5] + this.state[8] == 15 && this.state[2] && this.state[5] && this.state[8]) {
                return { 'winner': getCurrentMove(), 'direction': 'V', 'row': 3 };
            }

            //Checking Diagonal Wins
            if (this.state[0] + this.state[4] + this.state[8] == 15 && this.state[0] && this.state[4] && this.state[8]) {
                return { 'winner': getCurrentMove(), 'direction': 'D', 'row': 1 };
            }
            if (this.state[2] + this.state[4] + this.state[6] == 15 && this.state[6] && this.state[4] && this.state[2]) {
                return { 'winner': getCurrentMove(), 'direction': 'D', 'row': 2 };
            }

            //If no winner but the board is full, then it's a draw
            if (this.isFull()) {
                return { 'winner': 'draw' };
            }

            //return false otherwise
            return false;
        }
    }]);

    return Board;
}();

exports.default = Board;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Board = __webpack_require__(0);

var _Board2 = _interopRequireDefault(_Board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @desc This class represents the computer player, contains a single method that uses minimax to get the best move
  * @param {Number} max_depth - limits the depth of searching
  * @param {Map} nodes_map - stores the heuristic values for each possible move
*/
var Player = function () {
	function Player() {
		var max_depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

		_classCallCheck(this, Player);

		this.max_depth = max_depth;
		this.nodes_map = new Map();
	}
	/**
  * Uses minimax algorithm to get the best move
  * @param {Object} board - an instant of the board class
  * @param {Boolean} maximizing - whether the player is a maximizing or a minimizing player
  * @param {Function} callback - a function to run after the best move calculation is done
  * @param {Number} depth - used internally in the function to increment the depth each recursive call
  * @return {Number} the index of the best move
  */


	_createClass(Player, [{
		key: 'getBestMove',
		value: function getBestMove(board) {
			var maximizing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var _this = this;

			var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
			var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

			//Throw an error if the first argument is not a board
			if (board.constructor.name !== "Board") throw 'The first argument to the getBestMove method should be an instance of Board class.';
			//Decides whether to log each tree iteration to the console
			var TRACE = window.trace_ttt;
			//clear nodes_map if the function is called for a new move
			if (depth == 0) this.nodes_map.clear();

			//If the board state is a terminal one, return the heuristic value
			if (board.isTerminal() || depth == this.max_depth) {
				if (board.isTerminal().winner == 'odd') {
					return 100 - depth;
				} else if (board.isTerminal().winner == 'even') {
					return -100 + depth;
				}
				return 0;
			}

			//Defining some styles for console logging
			var console_styles = {
				turn_and_available_moves: 'background: #7f3192; color: #fff; font-size:14px;padding: 0 5px;',
				exploring_parent: 'background: #353535;color: #fff;padding: 0 5px;font-size:18px',
				exploring_child: 'background: #f03;color: #fff;padding: 0 5px',
				parent_heuristic: 'background: #26d47c; color: #fff; font-size:14px;padding: 0 5px;',
				child_heuristic: 'background: #5f9ead; color: #fff; font-size:14px;padding: 0 5px;',
				all_moves: 'background: #e27a50;color: #fff;padding: 0 5px;font-size:14px',
				best_move: 'background: #e8602a;color: #fff;padding: 0 5px;font-size:18px'
			};
			//Destructuring Styles
			var turn_and_available_moves = console_styles.turn_and_available_moves,
			    exploring_parent = console_styles.exploring_parent,
			    exploring_child = console_styles.exploring_child,
			    child_heuristic = console_styles.child_heuristic,
			    parent_heuristic = console_styles.parent_heuristic,
			    all_moves = console_styles.all_moves,
			    best_move = console_styles.best_move;

			//Console Tracing Code

			if (TRACE) {
				var p = maximizing ? 'Maximizing' : 'Minimizing';
				console.log('%c' + p + ' player\'s turn Depth: ' + depth, turn_and_available_moves);
				console.log('%cAvailable Moves: ' + board.getAvailableMoves().join(' '), turn_and_available_moves);
				if (depth == 0) board.printFormattedBoard();
			}

			//Current player is maximizing
			if (maximizing) {
				//Initializ best to the lowest possible value
				var best = -100;
				//Loop through all empty cells
				board.getAvailableMoves().forEach(function (index) {
					board.getAvailableOddMoves().forEach(function (option) {

						var move_option = _this.oddarr[option];
						_this.move = move_option;
						//Initialize a new board with the current state (slice() is used to create a new array and not modify the original)
						var child = new _Board2.default(board.state.slice(), board.oddarr.slice(), board.evenarr.slice(), board.move.slice());
						//Create a child node by inserting the maximizing symbol x into the current emoty cell
						child.insert(move_option, index);
					});
					//Console Tracing Code
					if (TRACE) {
						var styles = depth == 0 ? exploring_parent : exploring_child;
						console.log('%cExploring move ' + index, styles);
						child.printFormattedBoard();
					}

					//Recursively calling getBestMove this time with the new board and minimizing turn and incrementing the depth
					var node_value = _this.getBestMove(child, false, callback, depth + 1);
					//Updating best value
					best = Math.max(best, node_value);

					//Console Tracing Code
					if (TRACE) {
						if (depth == 0) {
							console.log('%cMove ' + index + ' yielded a heuristic value of ' + node_value, parent_heuristic);
						} else {
							console.log('%cChild move ' + index + ' yielded a heuristic value of ' + node_value, child_heuristic);
						}
					}

					//If it's the main function call, not a recursive one, map each heuristic value with it's moves indicies
					if (depth == 0) {
						//Comma seperated indicies if multiple moves have the same heuristic value
						var moves = _this.nodes_map.has(node_value) ? _this.nodes_map.get(node_value) + ',' + index : index;
						_this.nodes_map.set(node_value, moves);
					}
				});
				//If it's the main call, return the index of the best move or a random index if multiple indicies have the same value
				if (depth == 0) {
					if (typeof this.nodes_map.get(best) == 'string') {
						var arr = this.nodes_map.get(best).split(',');
						var rand = Math.floor(Math.random() * arr.length);
						var ret = arr[rand];
					} else {
						ret = this.nodes_map.get(best);
					}
					//Console Tracing Code
					if (TRACE) {
						this.nodes_map.forEach(function (index, value) {
							console.log('%cMove(s) ' + index + ' yielded ' + value, all_moves);
						});
						console.log('%cMove ' + ret + ' was decided as the best move', best_move);
					}
					//run a callback after calculation and return the index
					callback(ret);
					return ret;
				}
				//If not main call (recursive) return the heuristic value for next calculation
				return best;
			}

			if (!maximizing) {
				//Initializ best to the highest possible value
				var _best = 100;
				//Loop through all empty cells
				board.getAvailableMoves().forEach(function (index) {
					board.getAvailableEvenMoves().forEach(function (option) {

						var move_option = _this.evenarr[option];
						_this.move = move_option;
						//Initialize a new board with the current state (slice() is used to create a new array and not modify the original)
						var child = new _Board2.default(board.state.slice(), board.oddarr.slice(), board.evenarr.slice(), board.move.slice());
						//Create a child node by inserting the maximizing symbol x into the current emoty cell
						child.insert(move_option, index);
					});

					//Console Tracing Code
					if (TRACE) {
						var styles = depth == 0 ? exploring_parent : exploring_child;
						console.log('%cExploring move ' + index, styles);
						child.printFormattedBoard();
					}

					//Recursively calling getBestMove this time with the new board and maximizing turn and incrementing the depth
					var node_value = _this.getBestMove(child, true, callback, depth + 1);
					//Updating best value
					_best = Math.min(_best, node_value);

					//Console Tracing Code
					if (TRACE) {
						if (depth == 0) {
							console.log('%cMove ' + index + ' yielded a heuristic value of ' + node_value, parent_heuristic);
						} else {
							console.log('%cChild move ' + index + ' yielded a heuristic value of ' + node_value, child_heuristic);
						}
					}

					//If it's the main function call, not a recursive one, map each heuristic value with it's moves indicies
					if (depth == 0) {
						//Comma seperated indicies if multiple moves have the same heuristic value
						var moves = _this.nodes_map.has(node_value) ? _this.nodes_map.get(node_value) + ',' + index : index;
						_this.nodes_map.set(node_value, moves);
					}
				});
				//If it's the main call, return the index of the best move or a random index if multiple indicies have the same value
				if (depth == 0) {
					if (typeof this.nodes_map.get(_best) == 'string') {
						var arr = this.nodes_map.get(_best).split(',');
						var rand = Math.floor(Math.random() * arr.length);
						var ret = arr[rand];
					} else {
						ret = this.nodes_map.get(_best);
					}
					//Console Tracing Code
					if (TRACE) {
						this.nodes_map.forEach(function (index, value) {
							console.log('%cMove(s) ' + index + ' yielded ' + value, all_moves);
						});
						console.log('%cMove ' + ret + ' was decided as the best move', best_move);
					}
					//run a callback after calculation and return the index
					callback(ret);
					return ret;
				}
				//If not main call (recursive) return the heuristic value for next calculation
				return _best;
			}
		}
	}]);

	return Player;
}();

exports.default = Player;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: \r\nundefined\r\n^\r\n      File to import not found or unreadable: ../node_modules/normalize.css/normalize.\r\n      in C:\\Users\\shubh\\Documents\\js-tic-tac-toe-master\\src\\style.scss (line 2, column 1)\n    at C:\\Users\\shubh\\Documents\\js-tic-tac-toe-master\\node_modules\\webpack\\lib\\NormalModule.js:192:19\n    at C:\\Users\\shubh\\Documents\\js-tic-tac-toe-master\\node_modules\\loader-runner\\lib\\LoaderRunner.js:367:11\n    at C:\\Users\\shubh\\Documents\\js-tic-tac-toe-master\\node_modules\\loader-runner\\lib\\LoaderRunner.js:233:18\n    at context.callback (C:\\Users\\shubh\\Documents\\js-tic-tac-toe-master\\node_modules\\loader-runner\\lib\\LoaderRunner.js:111:13)\n    at Object.callback (C:\\Users\\shubh\\Documents\\js-tic-tac-toe-master\\node_modules\\sass-loader\\lib\\loader.js:51:13)\n    at Object.<anonymous> (C:\\Users\\shubh\\Documents\\js-tic-tac-toe-master\\node_modules\\async\\dist\\async.js:2271:31)\n    at Object.callback (C:\\Users\\shubh\\Documents\\js-tic-tac-toe-master\\node_modules\\async\\dist\\async.js:969:16)\n    at options.error (C:\\Users\\shubh\\Documents\\js-tic-tac-toe-master\\node_modules\\node-sass\\lib\\index.js:294:32)");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Board = __webpack_require__(0);

var _Board2 = _interopRequireDefault(_Board);

var _Player = __webpack_require__(1);

var _Player2 = _interopRequireDefault(_Player);

__webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//Helpers (from http://jaketrent.com/post/addremove-classes-raw-javascript/)
function hasClass(el, className) {
	if (el.classList) return el.classList.contains(className);else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
function addClass(el, className) {
	if (el.classList) el.classList.add(className);else if (!hasClass(el, className)) el.className += " " + className;
}
function removeClass(el, className) {
	if (el.classList) el.classList.remove(className);else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className = el.className.replace(reg, ' ');
	}
}

/*
Helper function that takes the object returned from isTerminal() and adds a 
class to the board that will handle drawing the winning line's animation
*/
function drawWinningLine(_ref) {
	var direction = _ref.direction,
	    row = _ref.row;

	var board = document.getElementById("board");
	board.className = '' + direction + row;
	setTimeout(function () {
		board.className += ' full';
	}, 50);
}

//Starts a new game with a certain depth and a starting_player of 1 if human is going to start
function newGame() {
	var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
	var starting_player = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	//Instantiating a new player and an empty board
	var p = new _Player2.default(parseInt(depth));
	var b = new _Board2.default(['', '', '', '', '', '', '', '', '']);

	//Clearing all #Board classes and populating cells HTML
	var board = document.getElementById("board");
	board.className = '';
	board.innerHTML = '<div class="cell-0"></div><div class="cell-1"></div><div class="cell-2"></div><div class="cell-3"></div><div class="cell-4"></div><div class="cell-5"></div><div class="cell-6"></div><div class="cell-7"></div><div class="cell-8"></div>';

	//Clearing all celebrations classes
	removeClass(document.getElementById("charachters"), 'celebrate_human');
	removeClass(document.getElementById("charachters"), 'celebrate_robot');

	//Storing HTML cells in an array
	var html_cells = [].concat(_toConsumableArray(board.children));

	//Initializing some variables for internal use
	var starting = parseInt(starting_player),
	    maximizing = starting,
	    player_turn = starting;
	turn_next = parseInt(turn);
	turn = 1;
	//If computer is going to start, choose a random cell as long as it is the center or a corner
	if (!starting) {
		var center_and_corners = [0, 2, 4, 6, 8];
		var odd_options = [1, 3, 5, 7, 9];
		var first_choice = center_and_corners[Math.floor(Math.random() * center_and_corners.length)];
		var first_symbol = odd_options[Math.floor(Math.random() * odd_options.length)];
		//let symbol = !maximizing ? 'o' : 'x';
		b.insert(first_symbol, first_choice);
		b.move = first_symbol;
		addClass(html_cells[first_choice], first_symbol);
		player_turn = 0; //Switch turns
	}

	//Adding Click event listener for each cell
	b.state.forEach(function (cell, index) {
		html_cells[index].addEventListener('click', function () {
			//If cell is already occupied or the board is in a terminal state or it's not humans turn, return false
			if ( /*hasClass(html_cells[index], 'x') || hasClass(html_cells[index], 'o')|| */b.isTerminal() || !player_turn) return false;

			if (maximizing) {
				document.getElementById("turn1").addEventListener("click", function (event) {
					if (event.target.tagName !== "LI" || hasClass(event.target, 'active')) return;
					var odd_choices = [].concat(_toConsumableArray(document.getElementById("turn1").children[0].children));
					odd_choices.forEach(function (choice) {

						removeClass(choice, 'active');
						addClass(choice, 'visited');
					});
					addClass(event.target, 'active');
					turn = event.target.dataset.value;
				}, false);
			}

			if (!maximizing) {
				document.getElementById("turn2").addEventListener("click", function (event) {
					if (event.target.tagName !== "LI" || hasClass(event.target, 'active')) return;
					var even_choices = [].concat(_toConsumableArray(document.getElementById("turn2").children[0].children));
					even_choices.forEach(function (choice) {

						removeClass(choice, 'active');
						addClass(choice, 'visited');
					});
					addClass(event.target, 'active');
					turn = event.target.dataset.value;
				}, false);
			}

			var symbol = parseInt(turn);
			// maximizing ? turnodd : turneven; //Maximizing player is always 'x'

			//Update the Board class instance as well as the Board UI
			b.insert(symbol, index);
			addClass(html_cells[index], symbol);

			//If it's a terminal move and it's not a draw, then human won
			if (b.isTerminal()) {
				var _b$isTerminal = b.isTerminal(),
				    winner = _b$isTerminal.winner;

				if (winner !== 'draw') addClass(document.getElementById("charachters"), 'celebrate_human');
				drawWinningLine(b.isTerminal());
			}
			player_turn = 0; //Switch turns

			//Get computer's best move and update the UI
			p.getBestMove(b, !maximizing, function (best) {
				var symbol = b.move;
				b.insert(symbol, best);
				addClass(html_cells[best], symbol);
				if (b.isTerminal()) {
					var _b$isTerminal2 = b.isTerminal(),
					    _winner = _b$isTerminal2.winner;

					if (_winner !== 'draw') addClass(document.getElementById("charachters"), 'celebrate_robot');
					drawWinningLine(b.isTerminal());
				}
				player_turn = 1; //Switch turns
			});
		}, false);
		if (cell) addClass(html_cells[index], cell);
	});
}

document.addEventListener("DOMContentLoaded", function (event) {

	//Start a new game when page loads with default values
	var depth = -1;
	var starting_player = 1;
	var turn1 = 1;
	var turn2 = 2;
	newGame(depth, starting_player);

	//Events handlers for depth, starting player options
	document.getElementById("depth").addEventListener("click", function (event) {
		if (event.target.tagName !== "LI" || hasClass(event.target, 'active')) return;
		var depth_choices = [].concat(_toConsumableArray(document.getElementById("depth").children[0].children));
		depth_choices.forEach(function (choice) {
			removeClass(choice, 'active');
		});
		addClass(event.target, 'active');
		depth = event.target.dataset.value;
	}, false);

	document.getElementById("starting_player").addEventListener("click", function (event) {
		if (event.target.tagName !== "LI" || hasClass(event.target, 'active')) return;
		var starting_player_choices = [].concat(_toConsumableArray(document.getElementById("starting_player").children[0].children));
		starting_player_choices.forEach(function (choice) {
			removeClass(choice, 'active');
		});
		addClass(event.target, 'active');
		starting_player = event.target.dataset.value;
	}, false);

	document.getElementById("newgame").addEventListener('click', function () {
		newGame(depth, starting_player);
	});
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map