var board = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
var level = -1;
var human = "X";
var bot = "O";
var finished = false;
var clicked = [];
var w1,w2,w3,w4,w5;

function avPositions(newboard) {
    return newboard.filter(function (elem) {return elem!="X" && elem!="O";})
}

function winUtil(newboard, player, a,b,c,d,e) {
    if (newboard[a]==player && newboard[b]==player && 
        newboard[c]==player && newboard[d]==player && newboard[e]==player) {
        w1 = a, w2 = b, w3 = c, w4 = d, w5 = e;
        return true;
    }
    return false;
}
function winCondition(newboard, player) {
    return(winUtil(newboard,player,0,1,2,3,4) ||
        winUtil(newboard,player,5,6,7,8,9) ||
        winUtil(newboard,player,10,11,12,13,14) ||
        winUtil(newboard,player,15,16,17,18,19) ||
        winUtil(newboard,player,20,21,22,23,24) ||
        winUtil(newboard,player,0,5,10,15,20) ||
        winUtil(newboard,player,1,6,11,16,21) ||
        winUtil(newboard,player,2,7,12,17,22) ||
        winUtil(newboard,player,3,8,13,18,23) ||
        winUtil(newboard,player,4,9,14,19,24) ||
        winUtil(newboard,player,0,6,12,18,24) ||
        winUtil(newboard,player,4,8,12,16,20))
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

function makeLine(a,b,c,d,e) {
    document.getElementById("sq"+a).style.color = "red";
    document.getElementById("sq"+b).style.color = "red";
    document.getElementById("sq"+c).style.color = "red";
    document.getElementById("sq"+d).style.color = "red";
    document.getElementById("sq"+e).style.color = "red";
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
        makeLine(w1,w2,w3,w4,w5);
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
        var chance = Math.floor(Math.random() * (25));
        if(chance <= 5) {
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
        makeLine(w1,w2,w3,w4,w5);
        document.getElementById("footer").innerHTML+="Bot Wins !";
        document.getElementById("refresh").style.visibility = "visible";
    }
}