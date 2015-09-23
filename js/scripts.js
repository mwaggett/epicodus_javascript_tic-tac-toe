function Player(mark) {
  this.mark = mark;
}

function Space(x_coordinate, y_coordinate) {
  this.x_coordinate = x_coordinate;
  this.y_coordinate = y_coordinate;
}

Space.prototype.mark_by = function(player) {
  this.markedBy = player;
}

function Board() {
  this.spaces = [new Space(1,1), new Space(1,2), new Space(1,3), new Space(2,1), new Space(2,2), new Space(2,3), new Space(3,1), new Space(3,2), new Space(3,3) ]
}


// $(document).ready(function() {
//
// });
