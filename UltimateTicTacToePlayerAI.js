/* Ultimate Tic Tac Toe AI
*
*  This is the code that will calculate the computer's move	
*  It uses game theory and a constrained depth first search
*  to find the best move.  It also uses alpha beta pruning
*  to avoid searching branches that do not have the best move.
*  The depth that the algorithm searches is determined by the
*  ply variable of the calculateMove() function.  The higher
*  the ply, the longer the algorithm will take, and 
*  the more moves it can look ahead.
*/

var totalPly = 2;

function calculateAIPlayer1Move(outerX, outerY, innerX, innerY) {
    //NOTES: if outerX and outerY = 1 then AI is first to move

    var aiMove = {
        outerX: outerX,
        outerY: outerY,
        innerX: innerX,
        innerY: innerY
    };

    //loop through and construct our minimax logic
    //go to correct function based on difficulty
    switch (difficulty) {
        case 1:
            //easy
            return calculateMove();
            break;
        case 2:
            //medium
            break;
        case 3:
            //hard
            break;
    }

    //assign decision to variables and return object

    return aiMove;
}

function calculateAIPlayer2Move(outerX, outerY, innerX, innerY) {
    //NOTES: if outerX and outerY = 1 then AI is first to move
    //loop through and construct our minimax logic
    //go to correct function based on difficulty
    switch (difficulty) {
        case 1:
            //easy
            //prompt("calculating player move");
            return calculateMove(outerX, outerY, innerX, innerY, 1, 2);
            break;
        case 2:
            //medium
            return calculateMove(outerX, outerY, innerX, innerY, 2, 2);
            break;
        case 3:
            //hard
			return calculateMove(outerX, outerY, innerX, innerY, 6, 2);
            break;
    }

    //assign decision to variables and return object

    return aiMove;
}

/*Evaluates the state of the game.

will return a point value based on the player who is at the end of the sequence of moves
points are added up if grid states have favourable attributes that are in a row

different board states are valued positively and negatively with different weights
	2-in a rows
	winnable rows
	blocked rows

The board state is examined to see how many of these attributes each player has
Then the points are added up based on the weight of each of the attributes
It then returns the number of points to be used in the move decision.
*/
function evaluateBoardState(player)
{
	var modifier = 1;

	//points that will be passed up to the min-max function
	var points = 0;
	
	
	//weight values of certain conditions
	var valWonRow = 30;
	var val2inARow = 5;
	var valBlockedRow = 1;
	var valWinnableRows = 1;

	var tempGridState = {
		wonPOne: 0,
		wonPTwo: 0,
		numTwosPOne: 0,
		numTwosPTwo: 0,
		winnableRowsPOne: 0,
		winnableRowsPTwo: 0,
		blockedWinsPOne: 0,
		blockedWinsPTwo: 0
    };

	
	//3x3 2 dimensional array of smaller gridStates
	var gridStates = [[tempGridState,tempGridState,tempGridState],
					[tempGridState,tempGridState,tempGridState],
					[tempGridState,tempGridState,tempGridState]];
	
	//iterate through all 9 of the smaller grids to populate gridStates
	for(var i = 0; i <= 2; i++)
	{
		for(var j = 0; j <= 2; j++)
		{
			gridStates[i][j] = evaluateSmallGrid(i, j, player);
		}
	}

	//variables to hold temporary values of number of wins / number of "2 in a rows" etc
	var wonRowsPOne = 0;
	var wonRowsPTwo = 0;
	var numTwosPOne = 0;
	var numTwosPTwo = 0;
	var winnableRowsPOne = 0;
	var winnableRowsPTwo = 0;
	var blockedRowsPOne = 0;
	var blockedRowsPTwo = 0;
	
	//check horizontal rows
	for (var i = 0; i < 3; i++) {
        
		wonRowsPOne = 0;
		wonRowsPTwo = 0;
		numTwosPOne = 0;
		numTwosPTwo = 0;
		winnableRowsPOne = 0;
		winnableRowsPTwo = 0;
		blockedRowsPOne = 0;
		blockedRowsPTwo = 0;
		
        // iterate through elements in row
        for (var j = 0; j < 3; j++) {
            
			wonRowsPOne += gridStates[i][j].wonPOne;
			wonRowsPTwo += gridStates[i][j].wonPTwo;
			
			//only check other stuff if the gridState wasn't won
			if((gridStates[i][j].wonPOne === 0) && (gridStates[i][j].wonPTwo === 0))
			{
				numTwosPOne += gridStates[i][j].numTwosPOne;
				numTwosPTwo += gridStates[i][j].numTwosPTwo;
				winnableRowsPOne += gridStates[i][j].winnableRowsPOne;
				winnableRowsPTwo += gridStates[i][j].winnableRowsPTwo;
				blockedRowsPOne += gridStates[i][j].blockedWinsPOne;
				blockedRowsPTwo += gridStates[i][j].blockedWinsPTwo;
			}
        }
			
			
		//if game is winnable increase the points
		if(wonRowsPOne === 3)
			wonRowsPOne = 100;
		if(wonRowsPTwo === 3)
			wonRowsPTwo = 100;
			
		
		//adds in positives for one player and negatives for the other
		//based on which player the board is being evaluated for
		points += ((modifier)*((wonRowsPOne * valWonRow) 
								+ (numTwosPOne * val2inARow) 
								+ (blockedRowsPOne * valBlockedRow) 
								+ (winnableRowsPOne * valWinnableRows))
				+(-modifier)*((wonRowsPTwo * valWonRow) 
								+ (numTwosPTwo * val2inARow) 
								+ (blockedRowsPTwo* valBlockedRow) 
								+ (winnableRowsPTwo * valWinnableRows)));
								
		
	}//check horizontal rows

	
	
	//check vertical columns
	for (var i = 0; i < 3; i++) {
        
		wonRowsPOne = 0;
		wonRowsPTwo = 0;
		numTwosPOne = 0;
		numTwosPTwo = 0;
		winnableRowsPOne = 0;
		winnableRowsPTwo = 0;
		blockedRowsPOne = 0;
		blockedRowsPTwo = 0;
		
        // iterate through elements in column
        for (var j = 0; j < 3; j++) {
            
			wonRowsPOne += gridStates[j][i].wonPOne;
			wonRowsPTwo += gridStates[j][i].wonPTwo;
			
			//only check other stuff if the gridState wasn't won
			if((gridStates[j][i].wonPOne === 0) && (gridStates[j][i].wonPTwo === 0))
			{
				numTwosPOne += gridStates[j][i].numTwosPOne;
				numTwosPTwo += gridStates[j][i].numTwosPTwo;
				winnableRowsPOne += gridStates[j][i].winnableRowsPOne;
				winnableRowsPTwo += gridStates[j][i].winnableRowsPTwo;
				blockedRowsPOne += gridStates[j][i].blockedWinsPOne;
				blockedRowsPTwo += gridStates[j][i].blockedWinsPTwo;
			}
        }
		
		
		//if game is winnable jack up the points to the sky
		if(wonRowsPOne === 3)
			wonRowsPOne = 100;
		if(wonRowsPTwo === 3)
			wonRowsPTwo = 100;
		
		//adds in positives for one player and negatives for the other
		//based on which player the board is being evaluated for
		points += ((modifier)*((wonRowsPOne * valWonRow) 
								+ (numTwosPOne * val2inARow) 
								+ (blockedRowsPOne * valBlockedRow) 
								+ (winnableRowsPOne * valWinnableRows))
				+(-modifier)*((wonRowsPTwo * valWonRow) 
								+ (numTwosPTwo * val2inARow) 
								+ (blockedRowsPTwo* valBlockedRow) 
								+ (winnableRowsPTwo * valWinnableRows)));
		
		
		
	}//check vertical columns
	

	//reset variables before checking diagonal
	wonRowsPOne = 0;
	wonRowsPTwo = 0;
	numTwosPOne = 0;
	numTwosPTwo = 0;
	winnableRowsPOne = 0;
	winnableRowsPTwo = 0;
	blockedRowsPOne = 0;
	blockedRowsPTwo = 0;
	
	//check diagonal 1
    for (var i = 0; i < 3; i++) {
        wonRowsPOne += gridStates[i][i].wonPOne;
		wonRowsPTwo += gridStates[i][i].wonPTwo;
		
		//only check other stuff if the gridState wasn't won
		if((gridStates[i][i].wonPOne === 0) && (gridStates[i][i].wonPTwo === 0))
		{
			numTwosPOne += gridStates[i][i].numTwosPOne;
			numTwosPTwo += gridStates[i][i].numTwosPTwo;
			winnableRowsPOne += gridStates[i][i].winnableRowsPOne;
			winnableRowsPTwo += gridStates[i][i].winnableRowsPTwo;
			blockedRowsPOne += gridStates[i][i].blockedWinsPOne;
			blockedRowsPTwo += gridStates[i][i].blockedWinsPTwo;
		}
		
    }
	
	
	//if game is winnable jack up the points to the sky
	if(wonRowsPOne === 3)
		wonRowsPOne = 100;
	if(wonRowsPTwo === 3)
		wonRowsPTwo = 100;
	
	//adds in positives for one player and negatives for the other
	//based on which player the board is being evaluated for
	points += ((modifier)*((wonRowsPOne * valWonRow) 
								+ (numTwosPOne * val2inARow) 
								+ (blockedRowsPOne * valBlockedRow) 
								+ (winnableRowsPOne * valWinnableRows))
				+(-modifier)*((wonRowsPTwo * valWonRow) 
								+ (numTwosPTwo * val2inARow) 
								+ (blockedRowsPTwo* valBlockedRow) 
								+ (winnableRowsPTwo * valWinnableRows)));
	
	  

	//reset variables before checking diagonal 2
	wonRowsPOne = 0;
	wonRowsPTwo = 0;
	numTwosPOne = 0;
	numTwosPTwo = 0;
	winnableRowsPOne = 0;
	winnableRowsPTwo = 0;
	blockedRowsPOne = 0;
	blockedRowsPTwo = 0;
	
	//check diagonal 2
    for (var i = 0; i < 3; i++) {
        wonRowsPOne += gridStates[2-i][i].wonPOne;
		wonRowsPTwo += gridStates[2-i][i].wonPTwo;
		
		//only check other stuff if the gridState wasn't won
		if((gridStates[2-i][i].wonPOne === 0) && (gridStates[2-i][i].wonPTwo === 0))
		{
			numTwosPOne += gridStates[2-i][i].numTwosPOne;
			numTwosPTwo += gridStates[2-i][i].numTwosPTwo;
			winnableRowsPOne += gridStates[2-i][i].winnableRowsPOne;
			winnableRowsPTwo += gridStates[2-i][i].winnableRowsPTwo;
			blockedRowsPOne += gridStates[2-i][i].blockedWinsPOne;
			blockedRowsPTwo += gridStates[2-i][i].blockedWinsPTwo;
		}
		
    }
	
	
	//if game is winnable jack up the points to the sky
	if(wonRowsPOne === 3)
		wonRowsPOne = 100;
	if(wonRowsPTwo === 3)
		wonRowsPTwo = 100;
	
	//adds in positives for one player and negatives for the other
	//based on which player the board is being evaluated for
	points += ((modifier)*((wonRowsPOne * valWonRow) 
								+ (numTwosPOne * val2inARow) 
								+ (blockedRowsPOne * valBlockedRow) 
								+ (winnableRowsPOne * valWinnableRows))
				+(-modifier)*((wonRowsPTwo * valWonRow) 
								+ (numTwosPTwo * val2inARow) 
								+ (blockedRowsPTwo* valBlockedRow) 
								+ (winnableRowsPTwo * valWinnableRows)));

	
	
	
	return points;
							
}//end evaluateBoardState


/*Checks for attributes of the game state, like:
	2 in a rows
	blocked 3 in a rows
	winnable rows

saves all the attributed in objects for each player
to be added up for points later
*/
function checkGridState(numberCount, gridState)
{
	//if player count = 3 then win
	if (numberCount[1] === 3)
		gridState.wonPOne = 1;

	//if opponent count = 3 then win
	if (numberCount[2] === 3)
		gridState.wonPTwo = 1;
	
	//  if opponent count = 0 and 0 count > 0 and player count > 0 then winnable
	if (numberCount[2] === 0 && numberCount[0] > 0 && numberCount[1] > 0)
		gridState.winnableRowsPOne += 1;
		
	//  if player count = 0 and 0 count > 0 and opponent count > 0 then winnable
	if (numberCount[1] === 0 && numberCount[0] > 0 && numberCount[2] > 0)
		gridState.winnableRowsPTwo += 1;

	//if opponent count = 2 and player count = 1 then blocked win
	if (numberCount[2] === 2 && numberCount[1] === 1)
		gridState.blockedWinsPOne += 1;
		
	//if player count = 2 and opponent count = 1 then blocked win
	if (numberCount[1] === 2 && numberCount[2] === 1)
		gridState.blockedWinsPTwo += 1;

	//if player count = 2 and 0 count = 1 then setting up for win
	if (numberCount[1] === 2 && numberCount[0] === 1)
		gridState.numTwosPOne += 1;
		
	//if opponent gets 2 in a row
	if (numberCount[2] === 2 && numberCount[0] === 1)
		gridState.numTwosPTwo += 1;
		
	return gridState;

}

/*
Evaluates the state of the small grid.

will return a point value based on the player who is at the end of the sequence of moves
points are added up if grid states have favourable attributes that are in a row

different board states are valued positively and negatively with different weights
	2-in a rows
	winnable rows
	blocked rows

The board state is examined to see how many of these attributes each player has
Then the points are added up based on the weight of each of the attributes
It then returns the number of points to be used in the move decision.
*/
function evaluateSmallGrid(outerX, outerY, player)
{
	var opponent = (player === 1) ? 2 : 1;

	var gridState = {
		wonPOne: 0,
		wonPTwo: 0,
		numTwosPOne: 0,
		numTwosPTwo: 0,
		winnableRowsPOne: 0,
		winnableRowsPTwo: 0,
		blockedWinsPOne: 0,
		blockedWinsPTwo: 0
    };
	
	var numberCount;
	
	
	//check horizontal rows
	for (var i = 0; i < 3; i++) {
        numberCount = [0, 0, 0];
        // iterate through elements in row
        for (var j = 0; j < 3; j++) {
            //  count number of 0s players and opponents in row
				
            numberCount[selected[outerX][outerY][i][j]]++;
        }
        
		//change gridState based on rows that have been evaluated
		gridState = checkGridState(numberCount, gridState);
		
    }
	
	

    //iterate through columns
    for (var i = 0; i < 3; i++) {
        numberCount = [0, 0, 0];
        // iterate through elements in column
        for (var j = 0; j < 3; j++) {
            //  count number of 0s players and opponents in row
			
            numberCount[selected[outerX][outerY][j][i]]++;
        }
		
		//change gridState based on columns that have been evaluated
		gridState = checkGridState(numberCount, gridState);
		
    }
	
	

    //check diagonal 1
    numberCount = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
        //iterate through elements in diagonal
        numberCount[selected[outerX][outerY][i][i]]++;
    }
    
	//change gridState based on diagonal that has been evaluated
	gridState = checkGridState(numberCount, gridState);
	
	
	
    //check diagonal 2
    numberCount = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
        //iterate through elements in diagonal
        numberCount[selected[outerX][outerY][2 - i][i]]++;
    }
	
	
	//change gridState based on diagonal that has been evaluated
	gridState = checkGridState(numberCount, gridState);


	
	return gridState;
	
}



// return state with greater value
function getMax(currentState, newState)
{
    if (currentState.value === -1)
        return newState;

    if (newState.value === -1)
        return currentState;

    if (newState.value > currentState.value)
        return newState;
    else
        return currentState;
}

// return state with smaller value
function getMin(currentState, newState)
{
    if (currentState.value === -1)
        return newState;

    if (newState.value === -1)
        return currentState;

    if (newState.value < currentState.value)
        return newState;
    else
        return currentState;
}

function checkForWin(player)
{


	//Check for win
    //Down left column
    if(wonCells[0][0] == player && wonCells[0][1] == player && wonCells[0][2] == player)
        return player;
    //Down middle column
    if(wonCells[1][0] == player && wonCells[1][1] == player && wonCells[1][2] == player)
        return player;
    //Down right column
    if(wonCells[2][0] == player && wonCells[2][1] == player && wonCells[2][2] == player)
        return player;
    //Across top row
    if(wonCells[0][0] == player && wonCells[1][0] == player && wonCells[2][0] == player)
        return player;  
    //Across middle row
    if(wonCells[0][1] == player && wonCells[1][1] == player && wonCells[2][1] == player)
        return player;
    //Across bottom row
    if(wonCells[0][2] == player && wonCells[1][2] == player && wonCells[2][2] == player)
        return player; 
    //Top left to bottom right
    if(wonCells[0][0] == player && wonCells[1][1] == player && wonCells[2][2] == player)
        return player;
    //Top right to bottom left
    if(wonCells[0][2] == player && wonCells[1][1] == player && wonCells[2][0] == player)
        return player;       
    
    //If no win, check for tie
    var countOfWonCells = 0;
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            if(wonCells[i][j] != 0)
                countOfWonCells++;
        }
    }

    if(countOfWonCells == 9)
        return -1;
    else
        return 0;
}

// recursive function that calculates the best move on a given board
// outerX and outerY is the board we are coming from
// innerX and innerY is the last move made
// we do this so we can evaluate the base case before switching boards
function calculateMove(outerX, outerY, innerX, innerY, plyCount, player) {
    //prompt("plyCount = " + plyCount);
    var state = {
        value: -1,
        outerX: outerX,
        outerY: outerY,
        innerX: -1,
        innerY: -1
    };
	
	var debugging = 0;

	//change evaluation based on if ply is even or odd.
	//if its even the AI will be checking player's perspective
	//if its odd the AI will be checking its own perspective on the board state
	
    // if ply count is 0 then this is a leaf. eval
    if (plyCount === 0) {
        //swap player
        player = (player === 1) ? 2 : 1;
		state.value = evaluateBoardState(player);

		return state;
    }

    //if cell is won then consider whole board
    if (wonCells[innerX][innerY])
        //iterate through outerXs
        for (var i = 0; i < 3; i++) {
            //iterate through outerYs
            for (var j = 0; j < 3; j++) {
                //iterate through innerXs on the new board
                for (var k = 0; k < 3; k++) {
                    //iterate through innerYs
                    for (var l = 0; l < 3; l++) {
                        // if spot is open for a move
                        if (selected[i][j][k][l] === 0 && !wonCells[i][j]) {
                            //place player at position
                            selected[i][j][k][l] = player;
							wonCells[i][j] = checkForBoardWin(i, j, player);
                            mark(i, j, k, l, player, 0.7);

							//if this move resulted in a win or draw, stop branching and evaluate here
							if(checkForGameWin(player) != 0)
							{
								//alert("board state winnable by player: " + player);
						
								var newState = {
									value: -1,
									outerX: i,
									outerY: j,
									innerX: k,
									innerY: l
								};
					
					
								var tempPlayer = player;
								var tempPlyCount = plyCount;
					
								while(tempPlyCount > 0)
								{
									tempPlyCount--;
									tempPlayer = ((tempPlayer === 1) ? 2 : 1);
								}
					
								//newState.value = evaluateBoardState((player === 1) ? 2 : 1);
								newState.value = evaluateBoardState(tempPlayer);
	
								debugging = 1;
								
								selected[i][j][k][l] = 0;
								wonCells[i][j] = 0;
								mark(i, j, k, l, player, 0);
								
							}
							else
							{
								//calculate next move normally
								var newState = calculateMove(i, j, k, l, plyCount - 1, (player === 1) ? 2 : 1);
								newState.outerX = i;
								newState.outerY = j;
								newState.innerX = k;
								newState.innerY = l;
							}
							
                            //based on level in tree, get min or max
                            if (plyCount % 2 === 1)
                                state = getMax(state, newState);
                            else
                                state = getMin(state, newState);

                            // reset position
                            selected[i][j][k][l] = 0;
							wonCells[i][j] = 0;
                            mark(i, j, k, l, player, 0);
                        }
						
                    }
                }
            }
        } else {
        //calculate for this board
        //iterate through innerXs on the new board
        for (var i = 0; i < 3; i++) {
            //iterate through innerYs
            for (var j = 0; j < 3; j++) {
                // if spot is open for a move
                if (selected[innerX][innerY][i][j] === 0) {
                    
					//place player at position
                    selected[innerX][innerY][i][j] = player;
					
					wonCells[innerX][innerY] = checkForBoardWin(innerX, innerY, player);
                    mark(innerX, innerY, i, j, player, 0.7);

                    if(checkForGameWin(player) != 0)
					{
						//stop branching and evaluate the state here by calculating move with plyCount = 0	
						var newState = {
							value: -1,
							outerX: innerX,
							outerY: innerY,
							innerX: i,
							innerY: j
						};
			
						var tempPlayer = player;
						var tempPlyCount = plyCount;
			
						while(tempPlyCount > 0)
						{
							tempPlyCount--;
							tempPlayer = ((tempPlayer === 1) ? 2 : 1);
						}
						
						//newState.value = evaluateBoardState((player === 1) ? 2 : 1);
						newState.value = evaluateBoardState(tempPlayer);

						debugging = 1;
						
						selected[innerX][innerY][i][j] = 0;
						wonCells[innerX][innerY] = 0;
						mark(innerX, innerY, i, j, player, 0);
						
					}
					else
					{
						var newState = calculateMove(innerX, innerY, i, j, plyCount - 1, (player === 1) ? 2 : 1);
						newState.outerX = innerX;
						newState.outerY = innerY;
						newState.innerX = i;
						newState.innerY = j;
					}

                    //based on level in tree, get min or max
                    if (plyCount % 2 === 1)
                        state = getMax(state, newState);
                    else
                        state = getMin(state, newState);

                    // reset position
                    selected[innerX][innerY][i][j] = 0;
					wonCells[innerX][innerY] = 0;
                    mark(innerX, innerY, i, j, player, 0);
				}
            }
        }
    }

    // return the final move
    return state;
}

function mark(outerX, outerY, innerX, innerY, player, opacity)
{
    document.getElementById("cell" + outerX + "x" + outerY + "x" + innerX + "x" + innerY).setAttributeNS(null, "fill-opacity", opacity);
    if (player === 1)
        document.getElementById("cell" + outerX + "x" + outerY + "x" + innerX + "x" + innerY).setAttributeNS(null, "fill", "red");
    else
        document.getElementById("cell" + outerX + "x" + outerY + "x" + innerX + "x" + innerY).setAttributeNS(null, "fill", "blue");
}