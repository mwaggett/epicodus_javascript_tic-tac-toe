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
});
