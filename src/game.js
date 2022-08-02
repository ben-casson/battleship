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

function checkForValidPlacement(enemyShip, shipCoordinatesMap) {
    let randomNumber1 = Math.floor(Math.random() * (8));
    let randomNumber2 = Math.floor(Math.random() * (8));
    for (let i = 0; i < enemyShip.length; i++) {
        if (!enemyGameboard.shipsCoordinatesList.includes([randomNumber1, randomNumber2])) {
            shipCoordinatesMap.set(`${i}`, [randomNumber1, randomNumber2]);
            enemyGameboard.shipsCoordinatesList.push(shipCoordinatesMap.get(`${i}`));
        }
        else {
            for (let coordinate of shipCoordinatesMap) {
                for (let j = 0; j < enemyGameboard.shipsCoordinatesList.length; j++) {
                    if (enemyGameboard.shipsCoordinatesList[j] === coordinate) {
                        let tempVal = enemyGameboard.shipsCoordinatesList[0];
                        enemyGameboard.shipsCoordinatesList[0] = enemyGameboard.shipsCoordinatesList[j];
                        enemyGameboard.shipsCoordinatesList[j] = tempVal;
                        enemyGameboard.shipsCoordinatesList.shift();
                    }
                }
            }
            shipCoordinatesMap.clear();
            checkForValidPlacement(enemyShip, shipCoordinatesMap);
        }
    }
}

function placeEnemyShips() {
    for (let enemyShip of enemyShipsList) {
        let shipCoordinatesMap = new Map();
        checkForValidPlacement(enemyShip, shipCoordinatesMap);
        let enemyXCoordinate;
        let enemyYCoordinate;
        for (let m = 0; m < enemyShip.length; m++) {
            // enemyGameboard.shipsCoordinatesList.push(shipCoordinatesMap.get(`${m}`));
            enemyXCoordinate = shipCoordinatesMap.get(`${m}`)[0];
            enemyYCoordinate = shipCoordinatesMap.get(`${m}`)[1];
            enemyShip.coordinates.push(new Map().set('x', enemyXCoordinate)
                                                .set('y', enemyYCoordinate)
                                                .set('hit', false));
            document.querySelector(`[data-x-coordinate="${enemyXCoordinate}"][data-y-coordinate="${enemyYCoordinate}"]`).classList.add('has-ship');
            enemyGameboard.addShipToGameboard(enemyShip);
        }
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

    placeEnemyShips();
    console.log(enemyGameboard.coordinatesGrid);
    console.log(enemyGameboard.shipsCoordinatesList);
    console.log(enemyGameboard.shipsList);
}