import { createGameboard } from "./models/gameboard";
import { createShip } from "./models/ship";

export function playGame() {
    const friendlyGameboard = createGameboard();
    friendlyGameboard.generateCoordinatesGrid();
    
    //dynamically generate grid ui (import from /views)
}