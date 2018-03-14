# Introduction
React/Redux singlepage application for Mariokart64 Tournaments (or any Game played with 2-n Players against each other at the same time)

## Configuration
Edit ``src/constants/config.js`` for customization

### minimalPlayers
Enter an integer ∈ {2,..., maxMatchSize } that determines the minimal size of each match and hence the number of players required to start a match.

### maxMatchSize
Enter an integer > minimalPlayers that determines the maximal size of each match.

### scores
Enter a map containing keys ∈ {'1',...,'maxMatchSize'} and values representing the score a player will receive after a match when he is the key'th player, i.e.
```
{
  '1': 9,
  '2': 6,
  '3': 3,
  '4': 1,
}
```
means that the first player receives 9 points, the second receives 6 points and so on.
### maps
TODO

## Getting started
Run ``npm start`` to locally start a node.js server.

Then navigate in the Browser of your choice to
http://localhost:3000
to start the tournament.

## Stages of the Tournament
### AddPlayers Page
At the start of the tournament you can add players to the tournament using the `+ New` button. Note that the **name** of each player **must be unique**.

You can also remove players using the checkbox next to the name and the `Delete` button.

Once done adding players, you can use the `StartGame` button.

**Note that you cannot add players after the game started!**

### Score Page
Once the game starts, you see the score page. It consists of a sorted table with players and their scores.

You can use the `StartRound` button to start a new round.

Not yet implemented: `StartKO` button to start a k/o mode at the end of the game to determine a tournament winner. Note that you can also use the `StartRound` button as often as you wish and use the score page to determine a winner.

### (regular) Round Page
The round page shows which players play against each other in the current map.
Each table represents one match.

The players are randomly split into `n (n ∈ ℕ, n ≥ 1)` matches of size `s` with `minimalPlayers ≤ s ≤ maxMatchSize`. The sizes of the matches are balanced. This means `min ≤ max ≤ min+1` where `min` is the minimal match size and `max` is the maximal match size.

The controllers are randomly assigned to the players. This might come in handy, when some controllers are better than others, to prevent players to always get the same controller.

The player has to use the controller of the controller column in his row.
After a match, you can enter the placement of each player by clicking the cell in the placement column of the row of the player and selecting his placement in the dropdown.

Once all matches of the current round are finished and got their scores entered, you can click `SubmitScores` to finish the current round and return to the score page. Each player earns the number of points that are configured for his placement.

**Note that each player must have a placement and each placement in a match must be different to be able to finish a round!**

### (k/o) Round Page
TODO

# Development hints
run ``npm test`` to start the unit tests
