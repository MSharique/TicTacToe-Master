$(".start").click(function() {
        var Player = new AI();
        globals.game = new Game(Player);

        Player.plays(globals.game);

        globals.game.start();
});


$(".boxes").each(function() {
     var $this = $(this);
     $this.click(function() {
         if(globals.game.status === "running" && globals.game.currentState.turn === "X" && !$this.hasClass('occupied')) {
             var indx = parseInt($this.data("indx"));

             var next = new State(globals.game.currentState);
             next.board[indx] = "X";

             ui.insertAt(indx, "X");

             next.advanceTurn();

             globals.game.advanceTo(next);

         }
     })
 });

var ui = {};
var globals = {};

ui.intialControlsVisible = true;
ui.currentView = "";

ui.update = function(turn) {

    function _switch(_turn) {
        ui.currentView = "#" + _turn;
        $(ui.currentView).fadeIn("fast");
    }

    if(ui.intialControlsVisible) {
        ui.intialControlsVisible = false;

        $('.intial').fadeOut({
            duration : "fast",
            done : function() {
                _switch(turn);
            }
        });
    }
    else {
        $(ui.currentView).fadeOut({
            duration: "fast",
            done: function() {
                _switch(turn);
            }
        });
    }
};

ui.insertAt = function(indx, symbol) {
    var board = $('.boxes');
    var targetCell = $(board[indx]);

    if(!targetCell.hasClass('occupied')) {
        targetCell.html(symbol);
        targetCell.css({
            color : symbol == "X" ? "black" : "blue"
        });
        targetCell.addClass('occupied');
    }
}

function restart() {
    location.reload();
}