function Player(mark) {
  this.mark = mark;
}

function Space(x_coordinate, y_coordinate) {
  this.x_coordinate = x_coordinate;
  this.y_coordinate = y_coordinate;
}

Space.prototype.mark_by = function(player) {
  if(this.markedBy === undefined) {
    this.markedBy = player;
  }
}

function Board() {
  this.spaces = [new Space(1,1), new Space(1,2), new Space(1,3), new Space(2,1), new Space(2,2), new Space(2,3), new Space(3,1), new Space(3,2), new Space(3,3) ]
}

Board.prototype.findSpace = function(x,y) {
  for (var index in this.spaces) {
    if (this.spaces[index].x_coordinate === x && this.spaces[index].y_coordinate === y) {
      return this.spaces[index];
    }
  }
}
Board.prototype.checkColumn = function(x) {
  var column = [];
  for (var index in this.spaces) {
    if (this.spaces[index].x_coordinate === x) {
      column.push(this.spaces[index]);
    }
  }
  return ((column[0].markedBy === column[1].markedBy) && (column[1].markedBy ===  column[2].markedBy) && (column[2].markedBy !== undefined));
}

Board.prototype.checkRow = function(y) {
  var row = [];
  for (var index in this.spaces) {
    if (this.spaces[index].y_coordinate === y) {
      row.push(this.spaces[index]);
    }
  }
  return (row[0].markedBy === row[1].markedBy) && (row[1].markedBy ===  row[2].markedBy && (row[2].markedBy !== undefined));
}

Board.prototype.checkDiagonal = function() {
  var diagonal1 = [this.spaces[0], this.spaces[4], this.spaces[8]];
  var diagonal2 = [this.spaces[2], this.spaces[4], this.spaces[6]];
  return ((diagonal1[0].markedBy === diagonal1[1].markedBy)
          && (diagonal1[1].markedBy === diagonal1[2].markedBy)
          && (diagonal1[2].markedBy !== undefined))
          || ((diagonal2[0].markedBy === diagonal2[1].markedBy)
          && (diagonal2[1].markedBy ===  diagonal2[2].markedBy)
          && (diagonal2[2].markedBy !== undefined));
}


Board.prototype.threeInARow = function() {
  return this.checkColumn(1) || this.checkColumn(2) || this.checkColumn(3)
      || this.checkRow(1) || this.checkRow(2) || this.checkRow(3)
      || this.checkDiagonal();
}

Board.prototype.allMarked = function() {
  for(var index in this.spaces) {
    if(this.spaces[index].markedBy === undefined) {
      return false;
    }
  }
  return true;
}

function Game() {
  var playerX = new Player("X");
  var playerO = new Player("O");
  this.players = [playerX, playerO];
  this.board = new Board();
  this.whoseTurn = playerX;
}

Game.prototype.toggleTurn = function() {
  if (this.whoseTurn === this.players[0]) {
    this.whoseTurn = this.players[1];
  } else {
    this.whoseTurn = this.players[0];
  }
}

var createBoard = function() {
  for (var row = 1; row < 4; row++) {
    $("#game tbody").append("<tr>");
    for (var column = 1; column < 4; column++) {
      var id = column + "," + row;
      $("#game tbody").append("<td id='"+id+"' class='unmarked'></td>");
    }
    $("#game tbody").append("</tr>");
  }
}

$(document).ready(function() {
  createBoard();
  var game = new Game();
  $("#player-turn").text(game.whoseTurn.mark + "'s turn");

  // $(".unmarked").hover(function() {
  //
  // });

    $(".unmarked").click(function() {
      $(this).removeClass('unmarked').addClass('marked');
      $(this).off();
      var coords = this.id;
      var x = parseInt(coords.charAt(0));
      var y = parseInt(coords.charAt(2));

      var space = game.board.findSpace(x,y);
      space.mark_by(game.whoseTurn);
      $(this).text(space.markedBy.mark);

      if(game.board.threeInARow()) {
        $(".unmarked").off();
        $(".unmarked").removeClass('unmarked');
        $("#player-turn").text(game.whoseTurn.mark + " WINS!");
      } else if(game.board.allMarked()) {
        $("#player-turn").text("It's a tie!");
      } else {
        game.toggleTurn();
        $("#player-turn").text(game.whoseTurn.mark + "'s turn");
      }
    });


});
