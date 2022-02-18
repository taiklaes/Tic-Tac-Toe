$(function(){
    //#region Essentials
    const players = JSON.parse(`{"One":{"Id":"1", "Text":"X", "Next":"Two", "NextId":"2"}, "Two":{"Id":"2", "Text":"O", "Next":"One", "NextId":"1"}}`);
    const blocks = [["A1", "A2", "A3"], ["B1", "B2", "B3"], ["C1", "C2", "C3"],];
    let positions = [["", "", ""], ["", "", ""], ["", "", ""]];

    $("#winBack").fadeOut();
    //#endregion


    //#region Click Event: Start Button
    $("#start").click(function(){
        let playing = "One";

        $("#title").html("The game is started!!! Player <b class='player-1'>One</b> it's your time");
        $("#start").css("display", "none");
        $("#end").css("display", "block");

        for(let x = 0; x < blocks.length; x++){
            for(let y = 0; y < blocks.length; y++){
                let id = `#${blocks[x][y]}`;

                $(id).click(function(){
                    if(positions[x][y] == ""){
                        positions[x][y] = players[playing]["Text"];

                        if(itsOver(players[playing]["Text"]) == true){
                            finish(playing, `Player <strong class="player-${players[playing]["Id"]}">${playing}</strong> you are the winner!!`, false);
                        }
                        else if(itsOver(players[playing]["Text"]) == "tied"){
                            finish(playing, `It tied but next time one of you will win!!`, true);
                        }
            
                        $("#title").html(`Player <strong class="player-${players[playing]["NextId"]}">${players[playing]["Next"]}</strong> it's your time!`);
                        $(id).html(`<h1>${players[playing]["Text"]}</h1>`).css("cursor", "default");
                        $(`${id} h1`).addClass(`player-${players[playing]["Id"]}`);
            
                        playing = players[playing]["Next"];
                    }
                }).css("cursor", "pointer");
            }
        }
    });
    //#endregion

    //#region Click Event: End Button
    $("#end").click(function(){
        $("#title").html("Tic-Tac-Toe");
        $("#end").css("display", "none");
        $("#start").css("display", "block");

        areaUnbindClick();
        areaClear();
    });
    //#endregion


    //#region It's Over the match?
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
    //#endregion

    //#region Finishing the match
    function finish(playing, finishText, tied){
        let matches = localMatches(playing, tied), porcentage = calcPercentage(matches);

        if(matches.length > 0){
            $("#bar-1").css("width", `${porcentage[0]}%`);
            $("#bar-2").css("width", `${porcentage[1]}%`);
            $("#porcent-1").html(`${porcentage[0]}%`);
            $("#porcent-2").html(`${porcentage[1]}%`);
        }
        else{
            $("#bar-1").css("width", `0%`);
            $("#bar-2").css("width", `0%`);
            $("#porcent-1").html(`0%`);
            $("#porcent-2").html(`0%`);
        }

        $("#finishTitle").html(finishText);
        $("#matchesPlayed").html("Games played: " + matches.length);

        winScreenToggle();
        areaUnbindClick();
    };
    //#endregion

    //#region Matches in localStorage
    function localMatches(playing, tied){
        let matches = new Array();

        if(localStorage.hasOwnProperty("matches")){
            matches = JSON.parse(localStorage.getItem("matches"));
        }
    
        if(tied != true){
            matches.push({Winner: playing, Loser: players[playing]["Next"]});
            localStorage.setItem("matches", JSON.stringify(matches));
        }

        return matches;
    };
    //#endregion

    //#region Calculating the percentage of each player
    function calcPercentage(matches){
        let one = 0, two = 0;
        let percentage = new Array;

        matches.forEach(match => {
            if(match["Winner"] == "One"){
                one++;
            }
            else{
                two++;
            }
        });

        percentage.push(((100 * one) / matches.length).toFixed(1));
        percentage.push(((100 * two) / matches.length).toFixed(1));

        return percentage;
    };
    //#endregion

    //#region Toggle the win screen
    function winScreenToggle(){
        $("#winBack").fadeToggle()
        $("#win").animate({width:'toggle'},350).css("display", "flex");
    };
    //#endregion

    //#region Close the win screen
    $("#winBack").click(function(){
        winScreenToggle();
    });

    $("#close").click(function(){
        winScreenToggle();
    });
    //#endregion

    //#region Unbind the click events in area
    function areaUnbindClick(){
        for(let x = 0; x < blocks.length; x++){
            for(let y = 0; y < blocks.length; y++){
                positions[x][y] = "";

                $(`#${blocks[x][y]}`).unbind("click").css("cursor", "default");
            }
        }
    }
    //#endregion

    //#region Clear area of game
    function areaClear(){
        for(let x = 0; x < blocks.length; x++){
            for(let y = 0; y < blocks.length; y++){
                $(`#${blocks[x][y]}`).html("");
            }
        }
    };
    //#endregion
});
