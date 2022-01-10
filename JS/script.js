$(function(){
    var jogador = "Um";
    var state = false;

    $("#play").click(function(){
        for (let i = 0; i < 3; i++){
            const l = ["A","B","C"];

            for (let n = 1; n < 4; n++){
                $("#title").html("Player one it's your time");
                $("#" + l[i] + n).addClass("hand");

                $("#" + l[i] + n).click(function(){
                    if(jogador == "Um"){
                        $("#title").html("Player two it's your time");
                        $("#" + l[i] + n).html("<h1>X</h1>");
                        jogador = "Dois";
                    }
                    else{
                        $("#title").html("Player one it's your time");
                        $("#" + l[i] + n).html("<h1>O</h1>");
                        jogador = "Um";
                    }
                }).off("click", "#" + l[i] + n);
            }
        }

        
    });
});