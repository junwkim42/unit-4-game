//The random number shown at the start of the game 
//should be between 19 - 120.
//Each crystal should have a random hidden value between 1 - 12.
// remove guesscount (line 13, 24, 27, 52, 53, 55)


$(document).ready(function(){
    var Gem1 = 0;
    var Gem2 = 0;
    var Gem3 = 0;
    var Gem4 = 0;
    var Goal = 0;
    var Guess = 0;
    var userTotal = 0;
    var win = 0;
    var lose = 0;

    function gamestart(){
        Gem1 = Math.floor(Math.random() * 13) + 1;
        Gem2 = Math.floor(Math.random() * 13) + 1;
        Gem3 = Math.floor(Math.random() * 13) + 1;
        Gem4 = Math.floor(Math.random() * 13) + 1;
        Goal = Gem1 * Math.floor(Math.random() * 3) + Gem2 * (Math.floor(Math.random() * 2) + 1) + Gem3 * Math.floor(Math.random() * 3) + Gem4 * (Math.floor(Math.random() * 2) + 1);
        Guess = 5;
        userTotal = 0;
        $("#Goalpoint").text(Goal);
        $("#guesscount").text(Guess);
        $("#uTotal").text(userTotal);
    }

    
    $('.Gems').on("click", function(){
        debugger;
        if($(this).val() == "1"){
            userTotal += Gem1;
        }
        else if($(this).val() == "2"){
            userTotal += Gem2;
        }
        else if($(this).val() == "3"){
            userTotal += Gem3;

        }
        else if($(this).val() == "4"){
            userTotal += Gem4;
        }
        else{
            $("#uTotal").text("BIG PROBLEM. FIX CODE");
        }

        $("#uTotal").text(userTotal);
        Guess--;
        $("#guesscount").text(Guess);

        if (Guess < 1 || userTotal > Goal){
            alert("You lost :(");
            lose++;
            $("#losecount").text(lose);
            gamestart();
        }
        else if (userTotal == Goal){
            alert("GOOD JOB!! :D")
            win++;
            $("#wincount").text(win);
            gamestart();
        }
    });



    gamestart();
});