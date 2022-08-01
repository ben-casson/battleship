import { createGameboard } from "./models/gameboard.js";
import { createShip } from "./models/ship.js";
import { displayGameboardTiles, friendlyGameboardDisplay } from "./game-setup.js";

const enemyCarrier = createShip(5, 'Carrier');
const enemyBattleship = createShip(4, 'Battleship');
const enemyCruiser1 = createShip(3, 'first Cruiser');
const enemyCruiser2 = createShip(3, 'second Cruiser');
const enemyDestroyer = createShip(2, 'Destroyer');
export const enemyShipsList = [enemyCarrier, enemyBattleship, enemyCruiser1, 
                               enemyCruiser2, enemyDestroyer]

const enemyGameboard = createGameboard();

const enemyGameboardDisplay = document.getElementById('enemy-gameboard');
const enemyGameboardDisplayContainer = document.getElementById('enemy-gameboard-container');

const toggleButtonsContainer = document.getElementById('ship-orientation-toggle-container');

const friendlyGameboardCover = document.getElementById('friendly-gameboard-cover');

export function playGame(tilesList) {
    enemyGameboardDisplayContainer.style.display = 'block';
    toggleButtonsContainer.style.display = 'none';
    friendlyGameboardCover.style.display = 'block';

    friendlyGameboardCover.addEventListener('mouseover', () => {
        friendlyGameboardCover.style.cursor = 'not-allowed';
    });

    enemyGameboard.generateCoordinatesGrid();

    displayGameboardTiles(enemyGameboardDisplay, 'enemy-gameboard-display');
}