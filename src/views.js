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

function displayPotentialShip(tile, iterator) {
    let xCoordinate = parseInt(tile.dataset.xCoordinate);
    let yCoordinate = parseInt(tile.dataset.yCoordinate);
    if (verticalButton.classList.contains('selected')) {
        document.querySelector(`[data-x-coordinate="${xCoordinate}"][data-y-coordinate="${yCoordinate + iterator}"]`).classList.add('ship-preview');
    }
    else {
        document.querySelector(`[data-x-coordinate="${xCoordinate + iterator}"][data-y-coordinate="${yCoordinate}"]`).classList.add('ship-preview');
    }
}

export function highlightPotentialShipPlacement(shipObject, tilesList) {
    tilesList.forEach(tile => {
        tile.addEventListener('mouseover', (event) => {
            for (let gameTile of tilesList) gameTile.classList.remove('ship-preview');
            for (let i = 0; i < shipObject.length; i++) {
                displayPotentialShip(event.target, i);
            }
            // let highlightedTileCount = 0;
            // for (let gameTile of tilesList) {
            //     if (gameTile.classList.contains('ship-preview')) {
            //         highlightedTileCount++;
            //     }           
            //     if (highlightedTileCount < shipObject.length) {
            //         for (let gameTile of tilesList) gameTile.classList.remove('ship-preview'); 
            //     }
            // }            
        });
    });
}

