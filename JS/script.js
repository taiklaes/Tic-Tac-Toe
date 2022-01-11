$(function(){
    //Var and Const
    let player = "";
    let positions = [["", "", ""], ["", "", ""], ["", "", ""],];

    const blocks = [
        ["A1", "A2", "A3"],
        ["B1", "B2", "B3"],
        ["C1", "C2", "C3"],
    ];

    //Start the game
    $("#play").click(function(){
        $("#title").html("The game is started!!! Player one it's your time");

        for(let x = 0; x < blocks.length; x++){
            for(let y = 0; y < blocks.length; y++)
            {
                let id = "#" + blocks[x][y];

                $(id).click(function(){
                    if(positions[x][y] == ""){
                        switch (player) {
                            case "X":
                                $("#title").html("Player two it's your time");
                                $(id).html("<h1>X</h1>");
                                $(id + " h1").addClass("player-1");
            
                                player = "O";
                                break;
                        
                            case "O":
                                $("#title").html("Player one it's your time");
                                $(id).html("<h1>O</h1>");
                                $(id + " h1").addClass("player-2");
                                
                                player = "X";
                                break;
                        }

                        positions[x][y] = player;
                        $(id).removeClass("hand");
                    }
                }).addClass("hand");
            }
        }
        
        player = "X";
    });
});
