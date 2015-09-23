describe('Player', function() {
  it("returns the player's mark", function() {
    var testPlayer = new Player("X");
    expect(testPlayer.mark).to.equal("X");
  });
});

describe('Space', function() {
  it("returns coordinates of Space instance", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.x_coordinate).to.equal(1);
    expect(testSpace.y_coordinate).to.equal(2);
  });

  it("lets a player mark a space", function() {
    var testPlayer = new Player("X")
    var testSpace = new Space(1,2);
    testSpace.mark_by(testPlayer)
    expect(testSpace.markedBy).to.equal(testPlayer);
  });

  it("returns undefined when not marked", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.markedBy).to.equal(undefined);
  });
});

describe('Board', function() {
  it("creates 9 spaces when it is initialized", function() {
    var testBoard = new Board();
    expect(testBoard.spaces[4].x_coordinate).to.equal(2);
  });

  it("finds a space by coordinates", function() {
    var testBoard = new Board();
    expect(testBoard.findSpace(1,1).x_coordinate).to.equal(1);
  });

  it("returns true if there are three in a column", function() {
    var testBoard = new Board();
    var testPlayer = new Player("X");
    testBoard.spaces[0].mark_by(testPlayer);
    testBoard.spaces[1].mark_by(testPlayer);
    testBoard.spaces[2].mark_by(testPlayer);
    expect(testBoard.checkColumn(1)).to.equal(true);
  });

  it("returns false if there are not three in a column", function() {
    var testBoard = new Board();
    var testPlayer = new Player("X");
    testBoard.spaces[0].mark_by(testPlayer);
    testBoard.spaces[1].mark_by(testPlayer);
    testBoard.spaces[3].mark_by(testPlayer);
    expect(testBoard.checkColumn(1)).to.equal(false);
  });

  it("returns false when column is all undefined", function() {
    var testBoard = new Board();
    expect(testBoard.checkColumn(1)).to.equal(false);
  });

  it("returns true if there are three in a row", function() {
    var testBoard = new Board();
    var testPlayer = new Player("X");
    testBoard.spaces[0].mark_by(testPlayer);
    testBoard.spaces[3].mark_by(testPlayer);
    testBoard.spaces[6].mark_by(testPlayer);
    expect(testBoard.checkRow(1)).to.equal(true);
  });

  it("returns false if there are not three in a row", function() {
    var testBoard = new Board();
    var testPlayer = new Player("X");
    testBoard.spaces[0].mark_by(testPlayer);
    testBoard.spaces[3].mark_by(testPlayer);
    testBoard.spaces[7].mark_by(testPlayer);
    expect(testBoard.checkRow(1)).to.equal(false);
  });

  it("returns false when row is all undefined", function() {
    var testBoard = new Board();
    expect(testBoard.checkRow(1)).to.equal(false);
  });

  it("returns true if there are three in a diagonal", function() {
    var testBoard = new Board();
    var testPlayer = new Player("X");
    testBoard.spaces[0].mark_by(testPlayer);
    testBoard.spaces[4].mark_by(testPlayer);
    testBoard.spaces[8].mark_by(testPlayer);
    expect(testBoard.checkDiagonal()).to.equal(true);
  });

  it("returns false if there are not three in a diagonal", function() {
    var testBoard = new Board();
    var testPlayer = new Player("X");
    testBoard.spaces[0].mark_by(testPlayer);
    testBoard.spaces[8].mark_by(testPlayer);
    expect(testBoard.checkDiagonal()).to.equal(false);
  });

  it("returns true if there three in a row, column or diagonal", function() {
    var testBoard = new Board();
    var testPlayer = new Player("X");
    testBoard.spaces[2].mark_by(testPlayer);
    testBoard.spaces[4].mark_by(testPlayer);
    testBoard.spaces[6].mark_by(testPlayer);
    expect(testBoard.checkDiagonal()).to.equal(true);
  });

  it("returns false if there are not three in a row, column or diagonal", function() {
    var testBoard = new Board();
    var testPlayer = new Player("X");
    testBoard.spaces[2].mark_by(testPlayer);
    testBoard.spaces[8].mark_by(testPlayer);
    testBoard.spaces[6].mark_by(testPlayer);
    expect(testBoard.checkDiagonal()).to.equal(false);
  });
});

describe('Game', function() {
  it("instantiates a new game correctly", function() {
    var testGame = new Game();
    testGame.board.findSpace(1,2).mark_by(testGame.players[0]);
    expect(testGame.board.findSpace(1,2).markedBy.mark).to.equal("X");
  });

  it("toggles the player turn", function() {
    var testGame = new Game();
    testGame.toggleTurn();
    expect(testGame.whoseTurn.mark).to.equal("O");
  });

  it("will make a game move", function() {
    var testGame = new Game();
    var testSpace = new Space(1,2);
    testGame.makeAMove(testSpace);
    expect(testGame.whoseTurn.mark).to.equal("O");
    expect(testGame.board.findSpace(1,2).markedBy.mark).to.equal("X");
  });
});
