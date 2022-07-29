import { createGameboard } from "./models/gameboard.js";
import { createShip } from "./models/ship.js";
import { changeShipOrientation } from "./views.js";
import { displayGameboardTiles } from "./views.js";

const friendlyGameboardDisplay = document.getElementById('friendly-gameboard');

export function playGame() {
    const friendlyCarrier = createShip(5);
    const friendlyBattleship = createShip(4);
    const friendlyCruiser1 = createShip(3);
    const friendlyCruiser2 = createShip(3);
    const friendlyDestroyer = createShip(2);
    
    const enemyCarrier = createShip(5);
    const enemyBattleship = createShip(4);
    const enemyCruiser1 = createShip(3);
    const enemyCruiser2 = createShip(3);
    const enemyDestroyer = createShip(2);
    
    const friendlyGameboard = createGameboard();
    friendlyGameboard.generateCoordinatesGrid();
    
    const enemyGameboard = createGameboard();
    enemyGameboard.generateCoordinatesGrid();

    changeShipOrientation();

    displayGameboardTiles(friendlyGameboardDisplay, 'friendlyGameboardDisplay');
    //dynamically generate grid ui (import from /views)
}

