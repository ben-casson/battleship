import { friendlyGameboard,
         friendlyShipsList } from "./game.js";

const verticalButton = document.getElementById('vertical-btn');
const horizontalButton = document.getElementById('horizontal-btn');

const gameplayText = document.getElementById('gameplay-text');

export const friendlyGameboardDisplay = document.getElementById('friendly-gameboard');

function changeSelectedButton(verticalButton, horizontalButton) {
    if (!verticalButton.classList.contains('selected')) {
        horizontalButton.classList.remove('selected');
        verticalButton.classList.add('selected');
    }
}

export function changeShipOrientation() {
    verticalButton.addEventListener('click', () => {
        changeSelectedButton(verticalButton, horizontalButton);
    });
    
    horizontalButton.addEventListener('click', () => {
        changeSelectedButton(horizontalButton, verticalButton);
    });
}

export function displayGameboardTiles(gameboardDisplay, gameboardDisplayString) {
    for (let row = 0; row < 10; row++) {
        for (let column = 0; column < 10; column++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.classList.add(`${gameboardDisplayString}-tile`);
            tile.dataset.xCoordinate = `${column}`;
            tile.dataset.yCoordinate = `${row}`;
            gameboardDisplay.appendChild(tile);
        }
    }
}

function displayPotentialShip(tile, iterator, tilesList) {
    let xCoordinate = parseInt(tile.dataset.xCoordinate);
    let yCoordinate = parseInt(tile.dataset.yCoordinate);
    for (let gameTile of tilesList) {
        gameTile.style.cursor = 'pointer';
        friendlyGameboardDisplay.style.cursor = 'pointer';
    }
    if (verticalButton.classList.contains('selected') && yCoordinate + iterator < 10) {
        document.querySelector(`[data-x-coordinate="${xCoordinate}"][data-y-coordinate="${yCoordinate + iterator}"]`).classList.add('ship-preview');
    }
    else if (horizontalButton.classList.contains('selected') && xCoordinate + iterator < 10) {
        document.querySelector(`[data-x-coordinate="${xCoordinate + iterator}"][data-y-coordinate="${yCoordinate}"]`).classList.add('ship-preview');
    }
    else {
        for (let gameTile of tilesList) {
            gameTile.classList.remove('ship-preview');
            gameTile.style.cursor = 'not-allowed';
            friendlyGameboardDisplay.style.cursor = 'not-allowed';
        }
    }
}

function highlightPotentialShipPlacement(event, tilesList, friendlyShipsList, friendlyGameboard) {
    for (let gameTile of tilesList) gameTile.classList.remove('ship-preview');
    let currentShip;
    if (friendlyGameboard.shipsList.length < 5) {
        currentShip = friendlyShipsList[friendlyGameboard.shipsList.length];
        for (let i = 0; i < currentShip.length; i++) {
            displayPotentialShip(event.target, i, tilesList);
        }  
    }
    else {
        for (let gameTile of tilesList) {
            gameTile.style.cursor = 'default';
            friendlyGameboardDisplay.style.cursor = 'default';
        }
    }
}

export function showPotentialShipOnMouseover(tilesList) {
    tilesList.forEach(tile => {
        tile.addEventListener('mouseover', (event) => {
            highlightPotentialShipPlacement(event, tilesList, friendlyShipsList, friendlyGameboard);            
        });
    });
}

function promptUserToPlaceNextShip(currentShip) {
    let currentShipIndex = friendlyShipsList.indexOf(currentShip);
    let nextShip = friendlyShipsList[currentShipIndex + 1];
    if (currentShipIndex < friendlyShipsList.length - 1) {
        gameplayText.innerText = `Place your ${nextShip.shipType}...`;
    }
}

function setShipCoordinates(tilesList) {
    let currentShip;
    if (friendlyGameboard.shipsList.length < 5) {
        currentShip = friendlyShipsList[friendlyGameboard.shipsList.length];
        for (let gameTile of tilesList) {
            if (gameTile.classList.contains('ship-preview')) {
                currentShip.coordinates.push(new Map().set('x', gameTile.dataset.xCoordinate)
                                                      .set('y', gameTile.dataset.yCoordinate)
                                                      .set('hit', false));
                gameTile.classList.remove('ship-preview');
                gameTile.classList.add('has-ship');
            }
        }
        friendlyGameboard.addShipToGameboard(currentShip);
        promptUserToPlaceNextShip(currentShip);
    }
}

export function addShipToGameboardDisplay(tilesList) {
    tilesList.forEach(tile => {
        tile.addEventListener('click', () => {
            tile.removeEventListener('mouseover', (event) => {
                highlightPotentialShipPlacement(event, tilesList, friendlyShipsList, friendlyGameboard);            
            });
        }, { once: true });
        
    });
    if (friendlyGameboard.shipsList.length < 5) {
        tilesList.forEach(tile => {
            tile.addEventListener('click', () => {
                if (tile.style.cursor !== 'not-allowed') setShipCoordinates(tilesList);
            }, { once: true });
            
        });
    }
}