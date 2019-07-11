//The random number shown at the start of the game 
//should be between 19 - 120.
//Each crystal should have a random hidden value between 1 - 12.


$(document).ready(function(){
// ------ Variables ----------
// Gem1 - 4 storing value of each gem
// Goal : objective point for game
// userTotal : accumulated point of user for each game
// win, lose : count of wins and loses.
// recorded : boolean flag to check if player's win/lose count has been already recorded.
//            prevents win/lose
    var Gem1 = 0;
    var Gem2 = 0;
    var Gem3 = 0;
    var Gem4 = 0;
    var Goal = 0;
    var userTotal = 0;
    var win = 0;
    var lose = 0;
    var recorded = false;

// ------- Functions ---------
// gamestart() : pick random value for each gem between 1 - 12
// Goal : goal is a combination of gem values such that there will never be impossible objectives
// userTotal : initialized to 0 every game

// dupCheck() : checks if there are any duplicate values among gems.
//              also checks if the goal value is less than 19 or over 120
//              if any of above condition is met, return true (assignment criteria fail)
//              else return false (assignment criteria has been met)

    function gamestart(){
        
        Gem1 = Math.floor(Math.random() * 12) + 1;
        Gem2 = Math.floor(Math.random() * 12) + 1;
        Gem3 = Math.floor(Math.random() * 12) + 1;
        Gem4 = Math.floor(Math.random() * 12) + 1;
        Goal = Gem1 * Math.floor(Math.random() * 5) + Gem2 * (Math.floor(Math.random() * 2) + 1) + Gem3 * Math.floor(Math.random() * 3) + Gem4 * (Math.floor(Math.random() * 3) + 1);
        userTotal = 0;
        recorded = false;
        
        function dupCheck(){
            if (Gem1 == Gem2 || Gem1 == Gem3 || Gem1 == Gem4 || Gem2 == Gem3 || Gem2 == Gem4 || Gem3 == Gem4){
                return true;
            }
            else if (Goal < 19 || Goal > 120){
                return true;
            }
            else{
                return false;
            }
        }
        // if dupCheck() returns true, re-run gamestart and re-initialize gem and goal values.
        // this recursion process continues until dupCheck() returns false.
        // in bigger functions, re-initialize only variables with duplicate values
        if(dupCheck()){
            gamestart();
        }
        else{
            $("#Goalpoint").text(Goal);
            $("#uTotal").text(userTotal);
        }
    }

    // gamebody()
    // check if image id is 1, 2, 3 or 4 and add gem1, gem2, gem3 or gem4 value to userTotal, repectively.
    // if userTotal is larger than Goal, increment lose and update corresponding html (lose condition)
    // if userTotal is equal to the Goal, increment win and update corresponding html (win condition)
    // if userTotal is less than the Goal, do nothing. (game goes on, wait for more clicks)

    // gemInitialize()
    // reset Gem 1 - 4 values to 0
    // set recorded to true. (win/lose score has been recorded)
    // used to prevent players from adding more values after game over (win or lose)
    // by multi-clicking gems within 0.5 sec delay before new game starts
    function gamebody(){
        //   debugger;
           function gemInitialize(){
               Gem1 = 0;
               Gem2 = 0;
               Gem3 = 0;
               Gem4 = 0;
               recorded = true;
           }
   
           if($(this).attr("id") == "1"){
               userTotal += Gem1;
           }
           else if($(this).attr("id") == "2"){
               userTotal += Gem2;
           }
           else if($(this).attr("id") == "3"){
               userTotal += Gem3;
   
           }
           else if($(this).attr("id") == "4"){
               userTotal += Gem4;
           }
           else{
               alert("BIG PROBLEM. FIX CODE");
           }
   
           $("#uTotal").text(userTotal);
   
           if (userTotal > Goal){
               if(!recorded){
                   lose++;
                   $("#losecount").text(lose);
                   setTimeout(gamestart, 500);
                } 
               gemInitialize();
           }
           else if (userTotal == Goal){
               if(!recorded){
                   win++;
                   $("#wincount").text(win);
                   setTimeout(gamestart, 500);
               }
               gemInitialize();
           }
       }

    // $('.Gems').on("click")
    // for images with class Gems, run gamebody on user click  
    $('.Gems').on("click", gamebody);
    gamestart();
});