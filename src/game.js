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
//     console.log(enemyShip.shipType);
//     console.log(enemyShip.coordinates);
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

const listofLength5ShipHorizontalPositions = [];
const listofLength4ShipHorizontalPositions = [];
const listofLength3ShipHorizontalPositions = [];
const listofLength2ShipHorizontalPositions = [];


function addInitialPossibleHorizontalShipPositions(list, length) {
    for (let row = 0; row < 10; row++) {
        for (let j = 0; j < 10 - length + 1; j++) {
            const tempArr = [];
            for (let b = 0; b < length; b++) {
                tempArr.push([j + b, row]);
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

function placeEnemyShips() {
    for (let enemyShip of enemyShipsList) {
        if (enemyShip.length === 5) {
            console.log(listofLength5ShipHorizontalPositions.length)
            let randomIndex = Math.floor(Math.random() * (listofLength5ShipHorizontalPositions.length - 1));
            console.log(randomIndex)
            for (let e = 0; e < 5; e++) {
                enemyShip.coordinates.push(new Map().set('x', listofLength5ShipHorizontalPositions[randomIndex][e][0])
                                                    .set('y', listofLength5ShipHorizontalPositions[randomIndex][e][1])
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${listofLength5ShipHorizontalPositions[randomIndex][e][0]}"][data-y-coordinate="${listofLength5ShipHorizontalPositions[randomIndex][e][1]}"]`).classList.add('has-ship');                                  
                // let tempArr = listofLength5ShipHorizontalPositions[0];
                // listofLength5ShipHorizontalPositions[0] = listofLength5ShipHorizontalPositions[randomIndex];
                // listofLength5ShipHorizontalPositions[randomIndex] = tempArr;
                // listofLength5ShipHorizontalPositions.shift();    
            }
        }
        else if (enemyShip.length === 4) {
            let randomIndex = Math.floor(Math.random() *  (listofLength4ShipHorizontalPositions.length - 1));
            for (let e = 0; e < 4; e++) {
                enemyShip.coordinates.push(new Map().set('x', listofLength4ShipHorizontalPositions[randomIndex][e][0])
                                                    .set('y', listofLength4ShipHorizontalPositions[randomIndex][e][1])
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${listofLength4ShipHorizontalPositions[randomIndex][e][0]}"][data-y-coordinate="${listofLength4ShipHorizontalPositions[randomIndex][e][1]}"]`).classList.add('has-ship');                                                                     
                // let tempArr = listofLength4ShipHorizontalPositions[0];
                // listofLength4ShipHorizontalPositions[0] = listofLength4ShipHorizontalPositions[randomIndex];
                // listofLength4ShipHorizontalPositions[randomIndex] = tempArr;
                // listofLength4ShipHorizontalPositions.shift();   
            }
        }
        else if (enemyShip.length === 3) {
            let randomIndex = Math.floor(Math.random() *  (listofLength3ShipHorizontalPositions.length - 1));
            for (let e = 0; e < 3; e++) {
                enemyShip.coordinates.push(new Map().set('x', listofLength3ShipHorizontalPositions[randomIndex][e][0])
                                                    .set('y', listofLength3ShipHorizontalPositions[randomIndex][e][1])
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${listofLength3ShipHorizontalPositions[randomIndex][e][0]}"][data-y-coordinate="${listofLength3ShipHorizontalPositions[randomIndex][e][1]}"]`).classList.add('has-ship');                                                                      
                // let tempArr = listofLength3ShipHorizontalPositions[0];
                // listofLength3ShipHorizontalPositions[0] = listofLength3ShipHorizontalPositions[randomIndex];
                // listofLength3ShipHorizontalPositions[randomIndex] = tempArr;
                // listofLength3ShipHorizontalPositions.shift();  
            }
        }
        else {
            let randomIndex = Math.floor(Math.random() *  (listofLength2ShipHorizontalPositions.length - 1));
            for (let e = 0; e < 2; e++) {
                enemyShip.coordinates.push(new Map().set('x', listofLength2ShipHorizontalPositions[randomIndex][e][0])
                                                    .set('y', listofLength2ShipHorizontalPositions[randomIndex][e][1])
                                                    .set('hit', false));
                document.querySelector(`[data-x-coordinate="${listofLength2ShipHorizontalPositions[randomIndex][e][0]}"][data-y-coordinate="${listofLength2ShipHorizontalPositions[randomIndex][e][1]}"]`).classList.add('has-ship');                                                                 
                // let tempArr = listofLength2ShipHorizontalPositions[0];
                // listofLength2ShipHorizontalPositions[0] = listofLength2ShipHorizontalPositions[randomIndex];
                // listofLength2ShipHorizontalPositions[randomIndex] = tempArr;
                // listofLength2ShipHorizontalPositions.shift();       
            }
        }
        enemyGameboard.addShipToGameboard(enemyShip);
    }
    console.log(enemyGameboard.coordinatesGrid)
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

    addInitialPotentialPositions();
    console.log(listofLength5ShipHorizontalPositions)

    placeEnemyShips();
    console.log(enemyGameboard.coordinatesGrid);
    // console.log(enemyGameboard.shipsCoordinatesList);
    console.log(enemyGameboard.shipsList);
}