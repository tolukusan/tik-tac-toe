## Warnings

-   the instructions were not to pollute the global scope:
    Use factories for things you need more than once.
    Use IIFE for things you need once.

## TODO

-   [x] The board would initially have a blank/null state.
-   [x] When a player plays on an area, that area's value gets updated.
-   [x] I'll use a matrix to read and write to the area.
-   [x] I need to decide who the first player would be. I'll do it randomly, at the start, when they have both entered their names. I'll attach it to the Gameboard cause it runs once... wait a minute, I need the GameBoard to run once after the players have picked their names for this to work. okay then can i attach it to the players them selves? I guess... it would be a random number that gets compared at the start, the higher number is X, and the lower is O!

-  [x] before the 4th turn starts, we start checking for a winner, which can only be done from that point.
-   [x] We check for a winner after every player action from that point.
-   [x] This means we can never have 2 winners.
- [x] GUI: once a player clicks on the area, it updates the area, then moves to the next turn.

## Win Condition

Someone wins if they have 3 in a straight line.
It's a tie if no one has 3.

We probably need a scoreboard; this would probably be global.

I can use x and o, or I can use 0 and 1. I'll use X and O.
