var board = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var level = -1;
var human = "X";
var bot = "O";
var finished = false;
var clicked = [];
var w1,w2,w3,w4;

function avPositions(newboard) {
    return newboard.filter(function (elem) {return elem!="X" && elem!="O";})
}

function winUtil(newboard, player, a,b,c,d) {
    if (newboard[a]==player && newboard[b]==player && 
        newboard[c]==player && newboard[d]==player) {
        w1 = a, w2 = b, w3 = c, w4 = d;
        return true;
    }
    return false;
}
function winCondition(newboard, player) {
    return(winUtil(newboard,player,0,1,2,3) ||
        winUtil(newboard,player,4,5,6,7) ||
        winUtil(newboard,player,8,9,10,11) ||
        winUtil(newboard,player,12,13,14,15) ||
        winUtil(newboard,player,0,4,8,12) ||
        winUtil(newboard,player,1,5,9,13) ||
        winUtil(newboard,player,2,6,10,14) ||
        winUtil(newboard,player,3,7,11,15) ||
        winUtil(newboard,player,0,5,10,15) ||
        winUtil(newboard,player,3,6,9,12))
}

function minimax(newboard,player) {
    var avBoard = avPositions(newboard);
    //console.log(avBoard.length);
    var finalMove = {};

    if(winCondition(newboard,human)) {return {score : -10};}
    else if(winCondition(newboard,bot)){return {score : 10};}
    else if(avBoard.length==0){return {score: 0}}


    if(player == "X")
    {
        var bestScore = +1000;
        var bestIndex = -1;
        for(var i=0;i<avBoard.length;i++)
        {
            newboard[avBoard[i]] = "X";
            var res = minimax(newboard,"O");
            if(res.score < bestScore){
                bestScore = res.score;
                bestIndex = avBoard[i];
            }
            newboard[avBoard[i]] = avBoard[i];
        }
        finalMove.index = bestIndex;
        finalMove.score = bestScore;
    }
    else
    {
        var bestScore = -1000;
        var bestIndex = -1;
        for(var i=0;i<avBoard.length;i++)
        {
            newboard[avBoard[i]] = "O";
            var res = minimax(newboard,"X");
            if(res.score > bestScore){
                bestScore = res.score;
                bestIndex = avBoard[i];
            }
            newboard[avBoard[i]] = avBoard[i];
        }
        finalMove.index = bestIndex;
        finalMove.score = bestScore;
    }
    return finalMove;
}

function makeLine(a,b,c,d) {
    document.getElementById("sq"+a).style.color = "red";
    document.getElementById("sq"+b).style.color = "red";
    document.getElementById("sq"+c).style.color = "red";
    document.getElementById("sq"+d).style.color = "red";
}

function makeMove(elem) {
    if(finished) return ;
    if(clicked.indexOf(elem.id) > -1) return ;
    clicked.push(elem.id);
    var eleID = elem.id;
    var position = parseInt(eleID[2]);
    board[position] = "X";
    elem.innerHTML+="X";

    if(winCondition(board,human)) {
        console.log("Human Wins !");
        finished = true;
        makeLine(w1,w2,w3,w4);
        document.getElementById("footer").innerHTML+="You Win !";
        document.getElementById("refresh").style.visibility = "visible";
        return ;
    }
    var avBoard = avPositions(board);
    if(avBoard.length==0) {
        console.log("Game Tie.");
        finished =true;
        document.getElementById("footer").innerHTML+="Game Tie !";
        document.getElementById("refresh").style.visibility = "visible";
        return ;
    }
    var botPos = {};
    if(level == 0)
    {
        botPos.index = avBoard[Math.floor(Math.random() * avBoard.length)];
    }
    else if(level == 1)
    {
        var chance = Math.floor(Math.random() * (15));
        if(chance <= 3) {
            botPos.index = avBoard[Math.floor(Math.random() * avBoard.length)];
            console.log("Random botPos = " + botPos.index);
        }
        else
            botPos = minimax(board, "O");
    }
    else
        botPos = minimax(board, "O");
    board[botPos.index] = "O";
    document.getElementById("sq"+botPos.index).innerHTML+="O";
    if(winCondition(board,bot)) {
        console.log("Bot Wins !");
        finished =true;
        makeLine(w1,w2,w3,w4);
        document.getElementById("footer").innerHTML+="Bot Wins !";
        document.getElementById("refresh").style.visibility = "visible";
    }
}
