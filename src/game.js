import { createGameboard } from "./models/gameboard.js";
import { createShip } from "./models/ship.js";
import { changeShipOrientation,
         displayGameboardTiles,
         highlightPotentialShipPlacement } from "./views.js";

const friendlyGameboardDisplay = document.getElementById('friendly-gameboard');

export function playGame() {
    const friendlyCarrier = createShip(5);
    const friendlyBattleship = createShip(4);
    const friendlyCruiser1 = createShip(3);
    const friendlyCruiser2 = createShip(3);
    const friendlyDestroyer = createShip(2);
    const friendlyShipsList = [friendlyCarrier, friendlyBattleship, friendlyCruiser1, 
                               friendlyCruiser2, friendlyDestroyer]
    
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

    displayGameboardTiles(friendlyGameboardDisplay, 'friendly-gameboard-display');

    // friendlyCarrier.canBePlacedOnGameboard = true;
    // tilesList.forEach((tile) => {
    //     tile.addEventListener('mouseover', (event) => {
    //         // event.target.style.backgroundColor = '#000';
    //         tile.classList.add('ship-preview');
    //     });
    // });

    // document.querySelector('[data-x-coordinate="0"][data-y-coordinate="0"]').addEventListener('mouseover', (event) => {
    //     document.querySelector('[data-x-coordinate="0"][data-y-coordinate="0"]').classList.add('ship-preview');
    // });

    const tilesList = [...document.querySelectorAll('.friendly-gameboard-display-tile')];
    friendlyGameboardDisplay.addEventListener('mouseleave', () => {
        tilesList.forEach(tile => tile.classList.remove('ship-preview'));
    });
    highlightPotentialShipPlacement(friendlyCarrier, tilesList);
}

