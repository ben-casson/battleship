import { createGameboard } from "./models/gameboard.js";
import { createShip } from "./models/ship.js";
import { changeShipOrientation,
         displayGameboardTiles,
         showPotentialShipOnMouseover,
         friendlyGameboardDisplay,
         addShipToGameboardDisplay} from "./game-setup.js";

const friendlyCarrier = createShip(5, 'Carrier');
const friendlyBattleship = createShip(4, 'Battleship');
const friendlyCruiser1 = createShip(3, 'Cruiser');
const friendlyCruiser2 = createShip(3, 'Submarine');
const friendlyDestroyer = createShip(2, 'Destroyer');
export const friendlyShipsList = [friendlyCarrier, friendlyBattleship, friendlyCruiser1, 
                                    friendlyCruiser2, friendlyDestroyer]

export const friendlyGameboard = createGameboard();
friendlyGameboard.generateCoordinatesGrid();



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

