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

