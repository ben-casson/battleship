const verticalButton = document.getElementById('vertical-btn');
const horizontalButton = document.getElementById('horizontal-btn');

function changeSelectedButton(selectedButton, unselectedButton) {
    if (!selectedButton.classList.contains('selected')) {
        unselectedButton.classList.remove('selected');
        selectedButton.classList.add('selected');
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


//used for b
function setShipCoordinates(shipObject) {

}

function displayPotentialShip(tile, iterator, tilesList) {
    let xCoordinate = parseInt(tile.dataset.xCoordinate);
    let yCoordinate = parseInt(tile.dataset.yCoordinate);
    if (verticalButton.classList.contains('selected') && yCoordinate + iterator < 10) {
        document.querySelector(`[data-x-coordinate="${xCoordinate}"][data-y-coordinate="${yCoordinate + iterator}"]`).classList.add('ship-preview');
    }
    else if (horizontalButton.classList.contains('selected') && xCoordinate + iterator < 10) {
        document.querySelector(`[data-x-coordinate="${xCoordinate + iterator}"][data-y-coordinate="${yCoordinate}"]`).classList.add('ship-preview');
    }
    else {
        for (let gameTile of tilesList) gameTile.classList.remove('ship-preview'); 
    }
}

function highlightPotentialShipPlacement(event, shipObject, tilesList) {
    for (let gameTile of tilesList) gameTile.classList.remove('ship-preview');
    for (let i = 0; i < shipObject.length; i++) {
        displayPotentialShip(event.target, i, tilesList);
    }  
}

export function showPotentialShipOnMouseover(shipObject, tilesList) {
    tilesList.forEach(tile => {
        tile.addEventListener('mouseover', (event) => {
            highlightPotentialShipPlacement(event, shipObject, tilesList);            
        });
    });
}

