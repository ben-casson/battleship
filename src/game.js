import { createGameboard } from "./models/gameboard.js";
import { createShip } from "./models/ship.js";
import { changeShipOrientation,
         displayGameboardTiles,
         showPotentialShipOnMouseover,
         friendlyGameboardDisplay,
         addShipToGameboardDisplay} from "./views.js";

const friendlyCarrier = createShip(5, 'Carrier');
const friendlyBattleship = createShip(4, 'Battleship');
const friendlyCruiser1 = createShip(3, 'first Cruiser');
const friendlyCruiser2 = createShip(3, 'second Cruiser');
const friendlyDestroyer = createShip(2, 'Destroyer');
export const friendlyShipsList = [friendlyCarrier, friendlyBattleship, friendlyCruiser1, 
                                    friendlyCruiser2, friendlyDestroyer]

const enemyCarrier = createShip(5, 'Carrier');
const enemyBattleship = createShip(4, 'Battleship');
const enemyCruiser1 = createShip(3, 'first Cruiser');
const enemyCruiser2 = createShip(3, 'second Cruiser');
const enemyDestroyer = createShip(2, 'Destroyer');

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

export function startApp() {
    displayGameboardTiles(friendlyGameboardDisplay, 'friendly-gameboard-display');
    const tilesList = [...document.querySelectorAll('.friendly-gameboard-display-tile')];
    
    letUserPlaceShips(tilesList);
}

