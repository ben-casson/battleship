import { createGameboard } from "./models/gameboard.js";
import { createShip } from "./models/ship.js";
import { displayGameboardTiles, gameplayText, friendlyGameboardDisplay } from "./game-setup.js";
import { friendlyGameboard, startApp } from "./app.js";

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

const listofLength5ShipHorizontalPositions = new Array();
const listofLength4ShipHorizontalPositions = [];
const listofLength3ShipHorizontalPositions = [];
const listofLength2ShipHorizontalPositions = [];

function addInitialPossibleHorizontalShipPositions(list, length) {
    for (let row = 0; row < 10; row++) {
        for (let j = 0; j < 10 - length + 1; j++) {
            const tempArr = [];
            for (let b = j; b < j + length; b++) {
                const tempArr2 = [];
                tempArr2.push(b);
                tempArr2.push(row);
                tempArr.push(tempArr2);
            }
            list.push(tempArr);
        }
    }
}   

function addInitialPotentialPositions() {
    addInitialPossibleHorizontalShipPositions(listofLength5ShipHorizontalPositions, 5);
    addInitialPossibleHorizontalShipPositions(listofLength4ShipHorizontalPositions, 4);
    addInitialPossibleHorizontalShipPositions(listofLength3ShipHorizontalPositions, 3);
    addInitialPossibleHorizontalShipPositions(listofLength2ShipHorizontalPositions, 2);
}

function computerAttacks(friendylShipsHitCount) {
    const friendlyTiles = [...friendlyGameboardDisplay.children];
    console.log(friendlyTiles);
    let randomRow = Math.floor(Math.random() * 10);
    let randomColumn = Math.floor(Math.random() * 10);
    loop1:
    for (let i = 0; i < friendlyTiles.length; i++) {
        if (friendlyTiles[i].dataset.xCoordinate === `${randomColumn}`
            && friendlyTiles[i].dataset.yCoordinate === `${randomRow}`) {
            if (friendlyTiles[i].classList.contains('hit') || friendlyTiles[i].classList.contains('miss')) {
                break loop1;
            }
            else {
                if (friendlyTiles[i].classList.contains('has-ship')) {
                    friendlyTiles[i].classList.add('hit');
                    console.log('hit');
                    friendylShipsHitCount++;
                    console.log(friendylShipsHitCount)
                    friendlyGameboard.coordinatesGrid[randomRow][randomColumn].get('ship').hit(randomColumn, randomRow);
                    for (let p = 0; p < friendlyTiles.length; p++) {
                        if (friendlyTiles[p].classList.contains('hit')) {
                            friendylShipsHitCount++;
                        }
                    }
                    if (friendylShipsHitCount === 17) {
                        alert('You lose!');
                        window.history.go(0);
                    }
                    return;
                }
                else {
                    friendlyTiles[i].classList.add('miss');
                    return;
                }
            }

        }
    }
    computerAttacks(friendylShipsHitCount);
}

function takeTurn(friendylShipsHitCount) {
    let hitCount = 0;
    let enemyShipTilesCount = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (enemyGameboard.coordinatesGrid[i][j].get('ship') !== 'none') {
                enemyShipTilesCount++;
            }
        }
    }
    for (let row = 0; row < 10; row++) {
        for (let column = 0; column < 10; column++) {
            let tile = document.querySelector(`[data-x-coordinate="${column}"][data-y-coordinate="${row}"]`);
            if (!tile.classList.contains('hit') || !tile.classList.contains('miss')) {
                tile.addEventListener('click', () => {
                    if (tile.classList.contains('enemy-ship')) {
                        tile.classList.add('hit');
                        enemyGameboard.coordinatesGrid[row][column].get('ship').hit(column, row);
                        hitCount = 0;
                        for (let i = 0; i < 10; i++) {
                            for (let j = 0; j < 10; j++) {
                                if (document.querySelector(`[data-x-coordinate="${j}"][data-y-coordinate="${i}"]`).classList.contains('hit')) {
                                    hitCount++;
                                }
                            }
                        }
                        if (hitCount === enemyShipTilesCount) {
                            alert('WINNER WINNER CHICKEN DINNER!');
                            window.history.go(0);
                        }
                    }
                    else {
                        tile.classList.add('miss');
                    }
                    computerAttacks(friendylShipsHitCount);
                });
            }
        }
    }
}

function placeEnemyShips(friendylShipsHitCount) {
    for (let enemyShip of enemyShipsList) {
        if (enemyGameboard.shipsList.length === 0) {
            let randomIndex = Math.floor(Math.random() * (listofLength5ShipHorizontalPositions.length - 1));
            for (let e = 0; e < 5; e++) {
                let tempXCoordinate = listofLength5ShipHorizontalPositions[randomIndex][e][0];
                let tempYCoordinate = listofLength5ShipHorizontalPositions[randomIndex][e][1];
                enemyShip.coordinates.push(new Map().set('x', tempXCoordinate)
                                                    .set('y', tempYCoordinate)
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${tempXCoordinate}"][data-y-coordinate="${tempYCoordinate}"]`).classList.add('enemy-ship');                                  
            }
        }
        else if (enemyGameboard.shipsList.length === 1) {
            let randomIndex = Math.floor(Math.random() *  (listofLength4ShipHorizontalPositions.length - 1));
            for (let e = 0; e < 4; e++) {
                let tempXCoordinate = listofLength4ShipHorizontalPositions[randomIndex][e][0];
                let tempYCoordinate = listofLength4ShipHorizontalPositions[randomIndex][e][1];
                enemyShip.coordinates.push(new Map().set('x', tempXCoordinate)
                                                    .set('y', tempYCoordinate)
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${tempXCoordinate}"][data-y-coordinate="${tempYCoordinate}"]`).classList.add('enemy-ship');
            }
        }
        else if (enemyGameboard.shipsList.length === 2 || enemyGameboard.shipsList.length === 3) {
            let randomIndex = Math.floor(Math.random() *  (listofLength3ShipHorizontalPositions.length - 1));
            for (let e = 0; e < 3; e++) {
                let tempXCoordinate = listofLength3ShipHorizontalPositions[randomIndex][e][0];
                let tempYCoordinate = listofLength3ShipHorizontalPositions[randomIndex][e][1];
                enemyShip.coordinates.push(new Map().set('x', tempXCoordinate)
                                                    .set('y', tempYCoordinate)
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${tempXCoordinate}"][data-y-coordinate="${tempYCoordinate}"]`).classList.add('enemy-ship');
            }
        }
        else {
            let randomIndex = Math.floor(Math.random() *  (listofLength2ShipHorizontalPositions.length - 1));
            for (let e = 0; e < 2; e++) {
                let tempXCoordinate = listofLength2ShipHorizontalPositions[randomIndex][e][0];
                let tempYCoordinate = listofLength2ShipHorizontalPositions[randomIndex][e][1];
                enemyShip.coordinates.push(new Map().set('x', tempXCoordinate)
                                                    .set('y', tempYCoordinate)
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${tempXCoordinate}"][data-y-coordinate="${tempYCoordinate}"]`).classList.add('enemy-ship');
            }
        }
        enemyGameboard.addShipToGameboard(enemyShip);
    }
    if (enemyGameboard.shipsList.length === 5) {
        takeTurn(friendylShipsHitCount);
    }
}

export function playGame() {
    enemyGameboardDisplayContainer.style.display = 'block';
    toggleButtonsContainer.style.display = 'none';
    friendlyGameboardCover.style.display = 'block';
    gameplayText.style.display = 'none';

    friendlyGameboardCover.addEventListener('mouseover', () => {
        friendlyGameboardCover.style.cursor = 'not-allowed';
    });

    enemyGameboard.generateCoordinatesGrid();

    displayGameboardTiles(enemyGameboardDisplay, 'enemy-gameboard-display');

    addInitialPotentialPositions();

    let friendylShipsHitCount = 0;

    placeEnemyShips(friendylShipsHitCount);
}