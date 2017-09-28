var Movement = function(pos) {

    this.movePosition = pos;
    this.minimaxVal = 0;

    this.applyTo = function(state) {
        var next = new State(state);
        next.board[this.movePosition] = state.turn;

        if(state.turn === "O")
            next.oMovesCount++;

        next.advanceTurn();

        return next;
    }
};

Movement.IncreasingOrder = function(first, second) {
    if(first.minimaxVal < second.minimaxVal)
        return -1; 
    else if(first.minimaxVal > second.minimaxVal)
        return 1; 
    else
        return 0; 
}

Movement.DecreasingOrder = function(first, second) {
    if(first.minimaxVal > second.minimaxVal)
        return -1; 
    else if(first.minimaxVal < second.minimaxVal)
        return 1; 
    else
        return 0; 
}


var AI = function() {

    var game = {};

    function minimaxValue(state) {
        if(state.isTerminal()) {
            return Game.score(state);
        }
        else {
            var stateScore; 
            if(state.turn === "X")
                stateScore = -1000;
            else
                stateScore = 1000;

            var availablePositions = state.emptyCells();
            var availableNextStates = availablePositions.map(function(pos) {
                var action = new Movement(pos);
                var nextState = action.applyTo(state);
                return nextState;
            });

            availableNextStates.forEach(function(nextState) {
                var nextScore = minimaxValue(nextState);
                if(state.turn === "X") {
                    if(nextScore > stateScore)
                        stateScore = nextScore;
                }
                else {
                    if(nextScore < stateScore)
                        stateScore = nextScore;
                }
            });

            return stateScore;
        }
    }

    function takeMove(turn) {
        var available = game.currentState.emptyCells();

        var availableActions = available.map(function(pos) {
            var action =  new Movement(pos); 
            var next = action.applyTo(game.currentState); 
            action.minimaxVal = minimaxValue(next);
            return action;
        });

        if(turn === "X")
            availableActions.sort(Movement.DecreasingOrder);
        else
            availableActions.sort(Movement.IncreasingOrder);

        var chosenAction = availableActions[0];
        var next = chosenAction.applyTo(game.currentState);
        ui.insertAt(chosenAction.movePosition, turn);
        game.advanceTo(next);
    }

    this.plays = function(_game){
        game = _game;
    };

    this.notify = function(turn) {
            takeMove(turn); 
    };
};
