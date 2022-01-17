$(function(){
    //Var and Const
    const players = JSON.parse(`{"One":{"Id":"1", "Text":"X", "Next":"Two", "NextId":"2"}, "Two":{"Id":"2", "Text":"O", "Next":"One", "NextId":"1"}}`);
    let positions = [["", "", ""], ["", "", ""], ["", "", ""]];
    const blocks = [
        ["A1", "A2", "A3"],
        ["B1", "B2", "B3"],
        ["C1", "C2", "C3"],
    ];

    //Initiate
    $("#winBack").fadeOut();

    //Start the game
    $("#start").click(function(){
        let playing = "One";
        $("#title").html("The game is started!!! Player <b class='player-1'>One</b> it's your time");
        $("#start").addClass("off");
        $("#end").removeClass("off");

        for(let x = 0; x < blocks.length; x++){
            for(let y = 0; y < blocks.length; y++){
                let id = `#${blocks[x][y]}`;

                $(id).click(function(){
                    if(positions[x][y] == ""){
                        positions[x][y] = players[playing]["Text"];

                        if(itsOver(players[playing]["Text"]) == true){
                            finish(playing, `Player <strong class="player-${players[playing]["Id"]}">${playing}</strong> you are the winner!!`);
                        }
                        else if(itsOver(players[playing]["Text"]) == "tied"){
                            finish(playing, `It tied but next time one of you wins!!`);
                        }

                        $("#title").html(`Player <strong class="player-${players[playing]["NextId"]}">${players[playing]["Next"]}</strong> it's your time!`);
                        $(id).html(`<h1>${players[playing]["Text"]}</h1>`);
                        $(`${id} h1`).addClass(`player-${players[playing]["Id"]}`);
                
                        playing = players[playing]["Next"];

                        $(id).removeClass("hand");
                    }
                }).addClass("hand");
            }
        }
    });

    //It's over?
    function itsOver(playingText){
        let marked = 0;

        if(positions[0][0] == playingText & positions[1][1] == playingText & positions[2][2] == playingText | positions[0][2] == playingText & positions[1][1] == playingText & positions[2][0] == playingText){
            return true;
        }

        for(let i = 0; i < blocks.length; i++){
            if(positions[i][0] == playingText & positions[i][1] == playingText & positions[i][2] == playingText | positions[0][i] == playingText & positions[1][i] == playingText & positions[2][i] == playingText){
                return true;
            }

            for(let y = 0; y < blocks.length; y++){
                if(positions[i][y] != ""){
                    marked++;
                }
            }
        }

        if(marked == 9){
            return "tied";
        }
        else{
            return false;
        }
    }

    //Finish
    function finish(playing, finishText){
        let matches = new Array();
        let one = 0;
        let two = 0;

        if(localStorage.hasOwnProperty("matches")){
            matches = JSON.parse(localStorage.getItem("matches"));
        }
    
        matches.push({Winner: playing, Loser: players[playing]["Next"]});
        localStorage.setItem("matches", JSON.stringify(matches));

        for(let i = 0; i < matches.length; i++){
            if(matches[i]["Winner"] == "One"){
                one++;
            }
            else{
                two++;
            }
        }

        one = ((100 * one) / matches.length).toFixed(1);
        two = ((100 * two) / matches.length).toFixed(1);

        $("#finishTitle").html(finishText);        
        $("#bar-1").css("width", one + "%");
        $("#bar-2").css("width", two + "%");
        $("#porcent-1").html(one + "%");
        $("#porcent-2").html(two + "%");
        $("#matchesPlayed").html("Games played: " + matches.length);
        winScreen("50vw", "20px", 0);
        clear(false);
    }

    //The end
    $("#end").click(function(){
        state = false;
        clear(true);

        $("#end").addClass("off");
        $("#start").removeClass("off");
    });

    //Clear
    function clear(pst){
        $("#title").html("# Hash Game");

        for(let x = 0; x < blocks.length; x++){
            for(let y = 0; y < blocks.length; y++){
                let id = `#${blocks[x][y]}`;
                positions[x][y] = "";

                $(id).unbind("click");
                $(id).removeClass("hand");

                if(pst == true){
                    $(id).html("");
                }
            }
        }
    }

    //Disappear
    $("#winBack").click(function(){
        winScreen("0%", "0px", 400);
    });

    //Win Screen
    function winScreen(widthVal, paddingVal, time){
        if(widthVal == "0%"){
            $("#winBack").fadeOut();
            
        }
        else{
            $("#winBack").fadeIn();
            $("#win").removeClass("off");
        }

        setTimeout(function(){
            $("#win").css("width", widthVal);
            
            setTimeout(function(){
                $("#win").css("padding", paddingVal);
            }, time);            
        }, time);
    }
});
