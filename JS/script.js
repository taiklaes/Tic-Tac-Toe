$(function(){
    //Var and Const
    let player = "";
    let state = false;
    let positions = [["", "", ""], ["", "", ""], ["", "", ""]];

    const blocks = [
        ["A1", "A2", "A3"],
        ["B1", "B2", "B3"],
        ["C1", "C2", "C3"],
    ];

    //Start the game
    $("#start").click(function(){
        $("#title").html("The game is started!!! Player <b class='player-1'>One</b> it's your time");
        $("#start").addClass("off");
        $("#end").removeClass("off");

        state = true;

        for(let x = 0; x < blocks.length; x++){
            for(let y = 0; y < blocks.length; y++){
                let id = "#" + blocks[x][y];

                $(id).click(function(){
                    if(positions[x][y] == "" & state == true){
                        positions[x][y] = player;

                        if(over() == true){
                            win();
                        }
                        else if(over() == "tied"){
                            console.log("We tied!");
                        }

                        switch(player){
                            case "X":
                                mark(id, "2", "Two", "1", "O");
                                break;
                        
                            case "O":
                                mark(id, "1", "One", "2", "X");
                                break;
                        }

                        $(id).removeClass("hand");
                    }
                }).addClass("hand");
            }
        }
        
        player = "X";
    });

    //It's over?
    function over(){
        let num = 0;

        if(positions[0][0] == player & positions[1][1] == player & positions[2][2] == player | positions[0][2] == player & positions[1][1] == player & positions[2][0] == player){
            return true;
        }

        for(let i = 0; i < blocks.length; i++){
            if(positions[i][0] == player & positions[i][1] == player & positions[i][2] == player | positions[0][i] == player & positions[1][i] == player & positions[2][i] == player){
                return true;
            }

            for(let y = 0; y < blocks.length; y++){
                if(positions[i][y] != ""){
                    num++;
                }
            }
        }

        if(num == 9){
            return "tied";
        }
        else{
            return false;
        }
    }

    //Check the block
    function mark(id, num, pl, newNum, newPlayer){
        $("#title").html("Player <b class='player-" + num + "'>" + pl + "</b> it's your time");
        $(id).html("<h1>" + player + "</h1>");
        $(id + " h1").addClass("player-" + newNum);

        player = newPlayer;
    }

    //Winner
    function win(){
        console.log("Ganhou: " + player);
        state = false;
    }

    //The end
    $("#end").click(function(){
        state = false;
        clear();

        $("#end").addClass("off");
        $("#start").removeClass("off");
    });

    //Clear
    function clear(){
        $("#title").html("Hash Game");

        for(let x = 0; x < blocks.length; x++){
            for(let y = 0; y < blocks.length; y++){
                let id = "#" + blocks[x][y];
                positions[x][y] = "";

                $(id).html("");
                $(id).unbind("click");
                $(id).removeClass("hand");
            }
        }
    }
});
