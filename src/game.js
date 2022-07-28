import { createGameboard } from "./models/gameboard";
import { createShip } from "./models/ship";

const friendlyCarrier = createShip(5);
const friendlyBattleship = createShip(4);
const friendlyCruiser1 = createShip(3);
const friendlyCruiser2 = createShip(3);
const friendlyDestroyer = createShip(5);

const enemyCarrier = createShip(5);
const enemyBattleship = createShip(4);
const enemyCruiser1 = createShip(3);
const enemyCruiser2 = createShip(3);
const enemyDestroyer = createShip(5);

const friendlyGameboard = createGameboard();
friendlyGameboard.generateCoordinatesGrid();

const enemyGameboard = createGameboard();
enemyGameboard.generateCoordinatesGrid();

export function playGame() {
    
    //dynamically generate grid ui (import from /views)
}

