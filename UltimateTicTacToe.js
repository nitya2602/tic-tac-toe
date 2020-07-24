/* Ultimate Tic Tac Toe
* This file controlls the game rules and graphics
* Most of the core game code was writte by someone else
* But the AI code was all done by me, from scratch.
*
* In the markCellForPlayer() function.  The call to calculateAIPlayer1Move
* Is the link to my AI code.
*/


//Global variables for whether or not each player is human or AI
var player1IsHuman = true //(prompt("Is player1 human? (Yes/No)", "yes").toLowerCase() === "yes")?true:false;
var player2IsHuman = false //(prompt("Is player2 human? (Yes/No)", "no").toLowerCase() === "yes")?true:false;

//AI Difficulty Mode (1 = easy) (2 = medium) (3 = hard)
var difficulty = 3;

//Global variables for keeping track of game state
var selected; //Keeps track of which spaces have already been selected
var wonCells; //Keeps track of which cells have been won or tied (1 or 2 for player 1 or 2, 0 for still playing, -1 for tie)

//Draws svg Ultimate Tic Tac Toe board in div specified by divId
function drawBoard(divId)
{
    //SVG which the board will be drawn on
    var boardSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    //div to which to add svg
    var divForBoard = document.getElementById(divId);

    //Get height and width of divForBoard to use for drawing svg elements
    var height = divForBoard.getAttributeNS(null, "height");
    var width = divForBoard.getAttributeNS(null, "width");

    //Padding to go around sides of inner boards
    var padding = 15;

    //Set boardSVG height and width to divForBoard height and width
    boardSVG.setAttributeNS(null, "height", height);
    boardSVG.setAttributeNS(null, "width", width);

    //Set SVG id for later reference
    boardSVG.setAttributeNS(null, "id", "boardSVG");

    //Add boardSVG to divForBoard
    divForBoard.appendChild(boardSVG);

    //Add yellow, hidden rectangles to each cell for highlighting
    var rectAttrs = [];
    rectAttrs["height"] = height/3-2*padding;//font
    rectAttrs["width"] = width/3-2*padding;
    rectAttrs["fill"] = "white";
    rectAttrs["fill-opacity"] = 0;
    rectAttrs["stroke"] = "none";
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            rectAttrs["x"] = i * width/3 + padding;
            rectAttrs["y"] = j * height/3 + padding;
            //Assign id to each cell corresponding to which cell it is for later reference
            rectAttrs["id"] = "cell" + i + "x" + j;
            addEltToSVG(boardSVG, "rect", rectAttrs);
        }
    }

    //Draw the lines for the main board
    var lineAttrs = [];
    lineAttrs["stroke"] = "black";
    lineAttrs["stroke-width"] = 5;
    //Vertical lines
    for(var i = width/3; i < width; i += width/3)
    {
        lineAttrs["x1"] = i;
        lineAttrs["x2"] = i;
        lineAttrs["y1"] = 0;
        lineAttrs["y2"] = height;

        addEltToSVG(boardSVG, "line", lineAttrs);
    }
    //Horizontal lines
    for(var i = height/3; i < height; i += height/3)
    {
        lineAttrs["x1"] = 0;
        lineAttrs["x2"] = width;
        lineAttrs["y1"] = i;
        lineAttrs["y2"] = i;

        addEltToSVG(boardSVG, "line", lineAttrs);
    }

    //Draw inner boards
    //Change height and width for rectAttrs for new smaller rectangles
    rectAttrs["height"] = height/9 - 2*padding/3;
    rectAttrs["width"] = width/9 - 2*padding/3;
    //Change stroke width for inner board lines to be smaller than main board
    lineAttrs["stroke-width"] = 2;
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {

            //Add the rectangles with padding on the sides
            for(var k = 0; k < 3; k ++)
            {
                for(var l = 0; l < 3; l ++)
                {
                    rectAttrs["x"] = i*width/3 + k*(width/9 - 2*padding/3) + padding;
                    rectAttrs["y"] = j*height/3 + l*(height/9 - 2*padding/3) + padding;
                    //Assign id to each cell corresponding to which cell it is for later reference
                    rectAttrs["id"] = "cell" + i + "x" + j + "x" + k + "x" + l;
                    addEltToSVG(boardSVG, "rect", rectAttrs);
                    
                }
            }
            
            //Draw the lines for the inner boards
            //Vertical lines
            for(var k = width/9 + padding/3; k < (width/3 - padding*3); k += (width/9 - 2*padding/3))
            {
                lineAttrs["x1"] = i*width/3 + k;
                lineAttrs["x2"] = i*width/3 + k;
                lineAttrs["y1"] = j*height/3 + padding;
                lineAttrs["y2"] = (j + 1)*height/3 - padding;

                addEltToSVG(boardSVG, "line", lineAttrs);
            }
            //Horizontal lines
            for(var k = height/9 + padding/3; k < (height/3 - padding*3); k += (height/9 - 2*padding/3))
            {
                lineAttrs["x1"] = i*width/3 + padding;
                lineAttrs["x2"] = (i+1)*width/3 - padding;
                lineAttrs["y1"] = j*height/3 + k;
                lineAttrs["y2"] = j*height/3 + k;

                addEltToSVG(boardSVG, "line", lineAttrs);
            }
        }
    }

}

//Initializes values for keeping track of where players have played and sets up for first player to make a move
function startGame()
{
   //Initialize selected and wonCells for a blank board
   selected = [
        [
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        ],
        [
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        ],
        [
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        ]
   ];
   wonCells = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

   //Highlight all cells to indicate first player can pick one
   for(var i = 0; i < 3; i++)
   {
       for(var j = 0; j < 3; j++)
       {
           //Get rect for cell ixj and set its fill-opacity to 0.2
           document.getElementById("cell" + i + "x" + j).setAttributeNS(null, "fill-opacity", 0.2);
       }
   }

   //Set on click functions for each cell so player 1 can select one of them
   setInitialOnClickFunctions();
}

//Sets the on click functions for the first move in the game
function setInitialOnClickFunctions()
{
    //Loop through main cells
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            //Loop through inner cells
            for(var k = 0; k < 3; k++)
            {
                for(var l = 0; l < 3; l++)
                {
                    //Set onclick for this cell to call markCellForPlayer with current values for i, j, k, and l
                    document.getElementById("cell" + i + "x" + j + "x" + k + "x" + l).onclick = (function(){
                        var currentI = i;
                        var currentJ = j;
                        var currentK = k;
                        var currentL = l;
                        return function(){
                            markCellForPlayer(currentI, currentJ, currentK, currentL, 1);
                        }
                    })();
                }
            }
        }
    }
}

//Set onclick functions for board specified by outerX and outerY for player to play
function setOnClickFunctionsForBoard(outerX, outerY, player)
{
    //Set onclick functions for unselected cells in current inner board
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            //Set onclick for this cell to call markCellForPlayer if cell is not already selected
            if(selected[outerX][outerY][i][j] == 0){
                document.getElementById("cell" + outerX + "x" + outerY + "x" + i + "x" + j).onclick = (function(){
                    var currentInnerX = outerX;
                    var currentInnerY = outerY;
                    var currentI = i;
                    var currentJ = j;
                    return function(){
                        markCellForPlayer(currentInnerX, currentInnerY, currentI, currentJ, player);
                    }
                })();
            }
        }
    }
}

//Sets onclick to null for all cells
function clearOnClick()
{
    //Loop through main cells
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            //Loop through inner cells
            for(var k = 0; k < 3; k++)
            {
                for(var l = 0; l < 3; l++)
                {
                    //Set onclick for this cell to null
                    document.getElementById("cell" + i + "x" + j + "x" + k + "x" + l).onclick = null;
                }
            }
        }
    }
}

//Sets rects corresponding to each cell of the larger board to opacity 0 to remove highlighting that indicates which board should be played
function clearHighlighting()
{
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            document.getElementById("cell" + i + "x" + j).setAttributeNS(null, "fill-opacity", 0);
        }
    }
}

//Marks cell ixjxkxl with color for player and sets up for other player to go
function markCellForPlayer(outerX, outerY, innerX, innerY, player)
{
	
    console.log(wonCells); //DEBUG
    
    //Make cell visible and set color corresponding to player; also set selected for that player and check for wins
    document.getElementById("cell" + outerX + "x" + outerY + "x" + innerX + "x" + innerY).setAttributeNS(null, "fill-opacity", 1);
    if(player == 1)
    {
        document.getElementById("cell" + outerX + "x" + outerY + "x" + innerX + "x" + innerY).setAttributeNS(null, "fill", "red");
        selected[outerX][outerY][innerX][innerY] = 1;
        
        //Set wonCells to corresponding value from checkForBoardWin (sets to 0 if there is no win/tie yet)
        wonCells[outerX][outerY] = checkForBoardWin(outerX, outerY, player);

		
		var wonCellsString = "";
		for(var i = 0; i < 3; i++)
			for(var j = 0; j < 3; j++)
				wonCellsString += ("["+ i + "]" + "[" + j + "]" + ": " + wonCells[i][j] + "\n"); 
		
		//alert(wonCellsString);
		
		
        //Check for a game win
        var final = checkForGameWin(player);
        //If the game is over, call finishGame(final)
        if(final != 0)
            finishGame(final);
        //Otherwise, get ready for next turn
        else
        {
            //Set board for player 2 to go if they are human
            if(player2IsHuman)
                setBoardForPlayer(outerX, outerY, innerX, innerY, 2);
            //Otherwise, get new play from AI 
            else
            {
                var player2Move = calculateAIPlayer2Move(outerX, outerY, innerX, innerY);
                //prompt("Selected node with value: " + player2Move.value);
                markCellForPlayer(player2Move["outerX"], player2Move["outerY"], player2Move["innerX"], player2Move["innerY"], 2);
            }
        }
    }
    else
    {
        document.getElementById("cell" + outerX + "x" + outerY + "x" + innerX + "x" + innerY).setAttributeNS(null, "fill", "blue");
        selected[outerX][outerY][innerX][innerY] = 2;
        //console.log("Player 2 chose: " + outerX + "x" + outerY + "x" + innerX + "x" + innerY); //DEBUG
        //Set wonCells to corresponding value from checkForBoardWin (sets to 0 if there is no win/tie yet)
        wonCells[outerX][outerY] = checkForBoardWin(outerX, outerY, player);


        //Check for a game win
        var final = checkForGameWin(player);
        //If the game is over, call finishGame(final)
        if(final != 0)
            finishGame(final);
        //Otherwise, get ready for next turn
        else
        {
            //Set board for player 1 to go if they are human
            if(player1IsHuman)
                setBoardForPlayer(outerX, outerY, innerX, innerY, 1);
            //Otherwise, get new play from AI 
            else
            {
                var player1Move = calculateAIPlayer1Move(outerX, outerY, innerX, innerY);

                markCellForPlayer(player1Move["outerX"], player1Move["outerY"], player1Move["innerX"], player1Move["innerY"], 1);
            }
        }
    } 

}

//Sets up correct highlighting and onclick functions for player to play next turn
function setBoardForPlayer(outerX, outerY, innerX, innerY, nextPlayer)
{
    //Clear onclick functions for all of the cells
    clearOnClick();

    //Clear all yellow highlighting of cells
    clearHighlighting();

    //If board to play next isn't won, highlight and set onclicks for that board, otherwise allow playing of any board
    if(wonCells[innerX][innerY] == 0)
    {
        //Highlight inner board corresponsing to cell that was selected by last player
        document.getElementById("cell" + innerX + "x" + innerY).setAttributeNS(null, "fill-opacity", .2);

        //Call setOnClickFunctionsForBoard for baord corresponding to cell that lastPlayer just played
        setOnClickFunctionsForBoard(innerX, innerY, nextPlayer);

    }
    else
    {
        //Highlight all boards and set onclick functions if they have not been won yet
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                if(wonCells[i][j] == 0)
                {
                    document.getElementById("cell" + i + "x" + j).setAttributeNS(null, "fill-opacity", .2);
                    setOnClickFunctionsForBoard(i, j, nextPlayer);
                }

            }
        }
    }

}

//Checks to see if the player has won board specified by outerX and outerY or if that board has been tied
function checkForBoardWin(outerX, outerY, player)
{
    //Check for win
    //Down left column
    if(selected[outerX][outerY][0][0] == player && selected[outerX][outerY][0][1] == player && selected[outerX][outerY][0][2] == player)
        return player;
    //Down middle column
    if(selected[outerX][outerY][1][0] == player && selected[outerX][outerY][1][1] == player && selected[outerX][outerY][1][2] == player)
        return player;
    //Down right column
    if(selected[outerX][outerY][2][0] == player && selected[outerX][outerY][2][1] == player && selected[outerX][outerY][2][2] == player)
        return player;
    //Across top row
    if(selected[outerX][outerY][0][0] == player && selected[outerX][outerY][1][0] == player && selected[outerX][outerY][2][0] == player)
        return player;  
    //Across middle row
    if(selected[outerX][outerY][0][1] == player && selected[outerX][outerY][1][1] == player && selected[outerX][outerY][2][1] == player)
        return player;
    //Across bottom row
    if(selected[outerX][outerY][0][2] == player && selected[outerX][outerY][1][2] == player && selected[outerX][outerY][2][2] == player)
        return player;
    //Top left to bottom right
    if(selected[outerX][outerY][0][0] == player && selected[outerX][outerY][1][1] == player && selected[outerX][outerY][2][2] == player)
        return player;
    //Top right to bottom left
    if(selected[outerX][outerY][0][2] == player && selected[outerX][outerY][1][1] == player && selected[outerX][outerY][2][0] == player)
        return player;

    
    //If no win, check for tie
    var countOfSelected = 0;
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            if(selected[outerX][outerY][i][j] != 0)
                countOfSelected++;
        }
    }

    if(countOfSelected == 9)
        return -1;
    else
        return 0;
}

//Checks to see if player has won the game (if so, returns player), or if there is a tie (returns -1), or no win or tie (returns 0)
function checkForGameWin(player)
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

//Displays game finish message corresponding to result from final
function finishGame(final)
{
    //Allow no more moves
    clearOnClick();
    clearHighlighting();

    var svg = document.getElementById("boardSVG");
    var width = svg.getAttributeNS(null, "width");
    var height = svg.getAttributeNS(null, "height");

    //Draw a message box over the board to show finish message
    var rectAttrs = [];
    rectAttrs["width"] = width/2;
    rectAttrs["height"] = height/3;
    rectAttrs["x"] = width/4;
    rectAttrs["y"] = height/3;

    //Set color corresponding to final
    if(final == 1)
        rectAttrs["fill"] = "red";
    else if(final == 2)
        rectAttrs["fill"] = "blue";
    else
        rectAttrs["fill"] = "green";

    rectAttrs["fill-opacity"] = .8;

    addEltToSVG(svg, "rect", rectAttrs);

    //Add winning message
    var textAttrs = [];
    textAttrs["style"] = "text-anchor: middle; font-family: sans-serif; font-size:200%";
    textAttrs["x"] = width/2;
    textAttrs["y"] = height/2 - 30;

    //Add different text depending on final
    if(final == 1)
        addTextEltToSVG(svg, textAttrs, "Red Wins!")
    else if(final == 2)
        addTextEltToSVG(svg, textAttrs, "Blue Wins!")
    else
        addTextEltToSVG(svg, textAttrs, "It's a Tie!")

    //Add refresh message
    textAttrs["style"] = "text-anchor: middle; font-family: sans-serif; font-size:100%";
    textAttrs["x"] = width/2;
    textAttrs["y"] = height/2 + 30;

    addTextEltToSVG(svg, textAttrs, "Hit refresh to play again!");



}

//Adds element specified by name with attributes in attrs to svg
function addEltToSVG(svg, name, attrs)
{
    var element = document.createElementNS("http://www.w3.org/2000/svg", name);
    if (attrs === undefined) attrs = {};
    for (var key in attrs) {
       element.setAttributeNS(null, key, attrs[key]);
    }
    svg.appendChild(element);

}

//Adds text element to svg with attributes in attrs and text
function addTextEltToSVG(svg, attrs, text)
{
    var element = document.createElementNS("http://www.w3.org/2000/svg", "text");
    if (attrs === undefined) attrs = {};
    for (var key in attrs) {
       element.setAttributeNS(null, key, attrs[key]);
    }
    
    //Add text as child of text element
    element.appendChild(document.createTextNode(text));

    svg.appendChild(element);
}