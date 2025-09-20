## Warnings

-   the instructions where to not pollute the global scope:
    use factories for things you need more than once.
    use IIFE for things you need once.

## TODO

-   [x] the board would initially be have a blank/null state.
-   [x] when a player plays on an area, that area's value gets updated.
-   [x] I'll use a matix to read and to write to the area.
-   [x] I need to decide who the first player would be, ill do it randomly, at the start when they have both entered their names. I'll attach it to the Gameboard cause it runs once... wait a minute, I need the GameBoard to run once after the players have picled their names for this to work. okay then can i attach it to the players them selves? I guess... it would be a random number that gets compared at the start the higer number is X, and the lower is o!

-   [] before the 4th turn starts, we start checking for a winner has that can only be done from that point.
-   [] we check for a winner after every player action from that point.
-   [] this means we can never have 2 winners.
-   [] gui: once a player clicks on the area, it updates the area then moves to the next turn.

## Win Condition

someone wins if they have 3 in a straight line.
its a tie if non have 3.

we prolly need a score board, this would prolly be global.

i can use x and o or i can use 0 and 1, I'll use x and o.
