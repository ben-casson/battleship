import { createGameboard } from "./models/gameboard.js";
import { createShip } from "./models/ship.js";
import { changeShipOrientation,
         displayGameboardTiles,
         showPotentialShipOnMouseover,
         friendlyGameboardDisplay,
         addShipToGameboardDisplay} from "./views.js";

const friendlyCarrier = createShip(5);
const friendlyBattleship = createShip(4);
const friendlyCruiser1 = createShip(3);
const friendlyCruiser2 = createShip(3);
const friendlyDestroyer = createShip(2);
export const friendlyShipsList = [friendlyCarrier, friendlyBattleship, friendlyCruiser1, 
                                    friendlyCruiser2, friendlyDestroyer]

const enemyCarrier = createShip(5);
const enemyBattleship = createShip(4);
const enemyCruiser1 = createShip(3);
const enemyCruiser2 = createShip(3);
const enemyDestroyer = createShip(2);

export const friendlyGameboard = createGameboard();
friendlyGameboard.generateCoordinatesGrid();

const enemyGameboard = createGameboard();
enemyGameboard.generateCoordinatesGrid();

function letUserPlaceShips(tilesList) {
    changeShipOrientation();
    friendlyGameboardDisplay.addEventListener('mouseleave', () => {
        tilesList.forEach(tile => tile.classList.remove('ship-preview'));
    });
    showPotentialShipOnMouseover(tilesList);
    addShipToGameboardDisplay(tilesList); 
}

export function playGame() {
    displayGameboardTiles(friendlyGameboardDisplay, 'friendly-gameboard-display');
    const tilesList = [...document.querySelectorAll('.friendly-gameboard-display-tile')];
    
    letUserPlaceShips(tilesList);
}

