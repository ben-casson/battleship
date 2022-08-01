import { createGameboard } from "./models/gameboard.js";
import { createShip } from "./models/ship.js";
import { displayGameboardTiles, gameplayText } from "./game-setup.js";

const enemyCarrier = createShip(5, 'Carrier');
const enemyBattleship = createShip(4, 'Battleship');
const enemyCruiser = createShip(3, 'Cruiser');
const enemySubmarine = createShip(3, 'Submarine');
const enemyDestroyer = createShip(2, 'Destroyer');
export const enemyShipsList = [enemyCarrier, enemyBattleship, enemyCruiser, 
                               enemySubmarine, enemyDestroyer];

const enemyGameboard = createGameboard();

const enemyGameboardDisplay = document.getElementById('enemy-gameboard');
const enemyGameboardDisplayContainer = document.getElementById('enemy-gameboard-container');

const toggleButtonsContainer = document.getElementById('ship-orientation-toggle-container');

const friendlyGameboardCover = document.getElementById('friendly-gameboard-cover');

function placeEnemyShips() {
    for (let enemyShip of enemyShipsList) {

    }
}

export function playGame(tilesList) {
    enemyGameboardDisplayContainer.style.display = 'block';
    toggleButtonsContainer.style.display = 'none';
    friendlyGameboardCover.style.display = 'block';
    gameplayText.style.display = 'none';

    friendlyGameboardCover.addEventListener('mouseover', () => {
        friendlyGameboardCover.style.cursor = 'not-allowed';
    });

    enemyGameboard.generateCoordinatesGrid();

    displayGameboardTiles(enemyGameboardDisplay, 'enemy-gameboard-display');


}