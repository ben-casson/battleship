import { createGameboard } from "./models/gameboard.js";
import { createShip } from "./models/ship.js";
import { displayGameboardTiles, gameplayText } from "./game-setup.js";
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


// function checkForValidPlacement(enemyShip, shipCoordinatesMap, verticalOrHorizontal) {
//     let randomNumber1 = Math.floor(Math.random() * (8));
//     let randomNumber2 = Math.floor(Math.random() * (8));
//     for (let i = 0; i < enemyShip.length; i++) {
//         if (verticalOrHorizontal === 1 
//             && !enemyGameboard.shipsCoordinatesList.includes([randomNumber1 + i, randomNumber2])
//             && randomNumber1 + enemyShip.length < 10) {
//                 shipCoordinatesMap.set(`${i}`, [randomNumber1 + i, randomNumber2]);
//                 enemyGameboard.shipsCoordinatesList.push(shipCoordinatesMap.get(`${i}`));
//         }
//         else if (verticalOrHorizontal === 2 
//                  && !enemyGameboard.shipsCoordinatesList.includes([randomNumber1, randomNumber2 + i])
//                  && randomNumber2 + enemyShip.length < 10) {
//             shipCoordinatesMap.set(`${i}`, [randomNumber1, randomNumber2 + i]);
//             enemyGameboard.shipsCoordinatesList.push(shipCoordinatesMap.get(`${i}`));
//         }
//         else {
//             for (let coordinate of shipCoordinatesMap) {
//                 for (let j = 0; j < enemyGameboard.shipsCoordinatesList.length; j++) {
//                     if (enemyGameboard.shipsCoordinatesList[j][0] === coordinate[0]
//                         && enemyGameboard.shipsCoordinatesList[j][1] === coordinate[1]) {
//                             let tempVal1 = enemyGameboard.shipsCoordinatesList[0][0];
//                             let tempVal2 = enemyGameboard.shipsCoordinatesList[0][1];
//                         enemyGameboard.shipsCoordinatesList[0][0] = enemyGameboard.shipsCoordinatesList[j][0];
//                         enemyGameboard.shipsCoordinatesList[0][1] = enemyGameboard.shipsCoordinatesList[j][1];
//                         enemyGameboard.shipsCoordinatesList[j][0] = tempVal1;
//                         enemyGameboard.shipsCoordinatesList[j][1] = tempVal2;
//                         enemyGameboard.shipsCoordinatesList.shift();
//                     }
//                 }
//             }
//             shipCoordinatesMap.clear();
//             checkForValidPlacement(enemyShip, shipCoordinatesMap);
//         }
//     }
    // console.log(enemyShip.shipType);
    // console.log(enemyShip.coordinates);
// }

// function placeEnemyShips() {
//     for (let enemyShip of enemyShipsList) {
//         let shipCoordinatesMap = new Map();
//         let verticalOrHorizontal = Math.floor(Math.random() * (2) + 1);
//         checkForValidPlacement(enemyShip, shipCoordinatesMap, verticalOrHorizontal);
//         let enemyXCoordinate;
//         let enemyYCoordinate;
//         for (let m = 0; m < enemyShip.length; m++) {
//             enemyGameboard.shipsCoordinatesList.push(shipCoordinatesMap.get(`${m}`));
//             enemyXCoordinate = shipCoordinatesMap.get(`${m}`)[0];
//             enemyYCoordinate = shipCoordinatesMap.get(`${m}`)[1];
//             enemyShip.coordinates.push(new Map().set('x', enemyXCoordinate)
//                                                 .set('y', enemyYCoordinate)
//                                                 .set('hit', false));
//             document.querySelector(`[data-x-coordinate="${enemyXCoordinate}"][data-y-coordinate="${enemyYCoordinate}"]`).classList.add('has-ship');
//         }
//         enemyGameboard.addShipToGameboard(enemyShip);
//     }
// }

//keeps track of every unused array of coordinates where a ship of length 'x' can fit 
const listofLength5ShipVerticalPositions = [];
const listofLength4ShipVerticalPositions = [];
const listofLength3ShipVerticalPositions = [];
const listofLength2ShipVerticalPositions = [];
const listsOfOpenVerticalShipPositions = [listofLength5ShipVerticalPositions, listofLength4ShipVerticalPositions,
                                          listofLength3ShipVerticalPositions, listofLength2ShipVerticalPositions];

// function addInitialPossibleVerticalShipPositions(list, length) {
//     for (let i = 0; i < 10; i++) {
//         for (let j = 0; j < 10 - length + 1; j++) {
//             const tempArr = [];
//             if (j === 10 - length) {
//                 tempArr.push(enemyGameboard.coordinatesGrid[i].slice(j));
//             }
//             else {
//                 tempArr.push(enemyGameboard.coordinatesGrid[i].slice(j, j + length));
//             }
//             list.push(tempArr);
//         }
//     }
//     listsOfOpenHorizontalShipPositions.push(list);
// }   

const listofLength5ShipHorizontalPositions = new Array();
const listofLength4ShipHorizontalPositions = [];
const listofLength3ShipHorizontalPositions = [];
const listofLength2ShipHorizontalPositions = [];
const listsOfOpenHorizontalShipPositions = [listofLength5ShipHorizontalPositions, listofLength4ShipHorizontalPositions,
                                            listofLength3ShipHorizontalPositions, listofLength2ShipHorizontalPositions];

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
    // console.log(listofLength5ShipHorizontalPositions)
    addInitialPossibleHorizontalShipPositions(listofLength4ShipHorizontalPositions, 4);
    // console.log(listofLength4ShipHorizontalPositions)
    addInitialPossibleHorizontalShipPositions(listofLength3ShipHorizontalPositions, 3);
    // console.log(listofLength3ShipHorizontalPositions)
    addInitialPossibleHorizontalShipPositions(listofLength2ShipHorizontalPositions, 2);
    // console.log(listofLength2ShipHorizontalPositions)
}




function removePositionContainingUsedCoordinate(shipLength, horizontalList, xCoordinate, yCoordinate) {
    for (let i = 0; i < horizontalList.length; i++) {
        // console.log(horizontalList[i])
        for (let j = 0; j < horizontalList[i].length; j++) {
            if (horizontalList[i][j][0] === xCoordinate && horizontalList[i][j][1] === yCoordinate) {
                // let tempArr = list[0];
                // list[0] = list[i];
                // list[i] = tempArr;
                // list.shift(); 
                // horizontalList[i][j].length = 0;
                // horizontalList[i].length = 0;
                horizontalList[i].flat();
                horizontalList = horizontalList.filter(arr => arr.length !== (shipLength * 2));
            }
        }
    }
}

function takeTurn() {
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
                        if (enemyGameboard.allShipsAreSunk()) {
                            alert('WINNER WINNER CHICKEN DINNER!')
                        }
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
                });
            }
        }
    }
}

function placeEnemyShips() {
    for (let enemyShip of enemyShipsList) {
        if (enemyGameboard.shipsList.length === 0) {
            // console.log(listofLength5ShipHorizontalPositions.length)
            let randomIndex = Math.floor(Math.random() * (listofLength5ShipHorizontalPositions.length - 1));
            console.log(randomIndex)
            console.log(listofLength5ShipHorizontalPositions.length)
            // console.log(randomIndex)
            for (let e = 0; e < 5; e++) {
                // console.log(randomIndex)
                let tempXCoordinate = listofLength5ShipHorizontalPositions[randomIndex][e][0];
                let tempYCoordinate = listofLength5ShipHorizontalPositions[randomIndex][e][1];
                enemyShip.coordinates.push(new Map().set('x', tempXCoordinate)
                                                    .set('y', tempYCoordinate)
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${tempXCoordinate}"][data-y-coordinate="${tempYCoordinate}"]`).classList.add('enemy-ship');                                  
            }
            // for (let coordinate of enemyShip.coordinates) {
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength5ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength4ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength3ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength2ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            // }
        }
        else if (enemyGameboard.shipsList.length === 1) {
            let randomIndex = Math.floor(Math.random() *  (listofLength4ShipHorizontalPositions.length - 1));
            console.log(randomIndex)
            console.log(listofLength4ShipHorizontalPositions.length)
            for (let e = 0; e < 4; e++) {
                let tempXCoordinate = listofLength4ShipHorizontalPositions[randomIndex][e][0];
                let tempYCoordinate = listofLength4ShipHorizontalPositions[randomIndex][e][1];
                enemyShip.coordinates.push(new Map().set('x', tempXCoordinate)
                                                    .set('y', tempYCoordinate)
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${tempXCoordinate}"][data-y-coordinate="${tempYCoordinate}"]`).classList.add('enemy-ship');
            }
            // for (let coordinate of enemyShip.coordinates) {
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength5ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength4ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength3ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength2ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            // }
        }
        else if (enemyGameboard.shipsList.length === 2 || enemyGameboard.shipsList.length === 3) {
            let randomIndex = Math.floor(Math.random() *  (listofLength3ShipHorizontalPositions.length - 1));
            console.log(randomIndex)
            console.log(listofLength3ShipHorizontalPositions.length)
            for (let e = 0; e < 3; e++) {
                let tempXCoordinate = listofLength3ShipHorizontalPositions[randomIndex][e][0];
                let tempYCoordinate = listofLength3ShipHorizontalPositions[randomIndex][e][1];
                enemyShip.coordinates.push(new Map().set('x', tempXCoordinate)
                                                    .set('y', tempYCoordinate)
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${tempXCoordinate}"][data-y-coordinate="${tempYCoordinate}"]`).classList.add('enemy-ship');
            }
            // for (let coordinate of enemyShip.coordinates) {
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength5ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength4ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength3ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength2ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            // }
        }
        else {
            let randomIndex = Math.floor(Math.random() *  (listofLength2ShipHorizontalPositions.length - 1));
            console.log(randomIndex)
            console.log(listofLength2ShipHorizontalPositions.length)
            for (let e = 0; e < 2; e++) {
                let tempXCoordinate = listofLength2ShipHorizontalPositions[randomIndex][e][0];
                let tempYCoordinate = listofLength2ShipHorizontalPositions[randomIndex][e][1];
                enemyShip.coordinates.push(new Map().set('x', tempXCoordinate)
                                                    .set('y', tempYCoordinate)
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${tempXCoordinate}"][data-y-coordinate="${tempYCoordinate}"]`).classList.add('enemy-ship');
            }
            // for (let coordinate of enemyShip.coordinates) {
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength5ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength4ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength3ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            //     removePositionContainingUsedCoordinate(enemyShip.length, listofLength2ShipHorizontalPositions, coordinate.get('x'), coordinate.get('y'));
            // }
        }
        enemyGameboard.addShipToGameboard(enemyShip);
        // console.log(listofLength2ShipHorizontalPositions)
    }
    // console.log(enemyGameboard.coordinatesGrid)
    if (enemyGameboard.shipsList.length === 5) {
        takeTurn();
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

    
    // console.log(listofLength5ShipHorizontalPositions)
    addInitialPotentialPositions();
    placeEnemyShips();
    // console.log(enemyGameboard.coordinatesGrid);
    // console.log(enemyGameboard.shipsCoordinatesList);
    console.log(enemyGameboard.shipsList);
}