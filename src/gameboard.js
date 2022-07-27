export const createGameboard = () => {
    const coordinatesGrid = [];
    function generateCoordinatesGrid() {
        for (let i = 0; i < 10; i++) {
            const rowArray = [];
            for (let j = 0; j < 10; j++) {
                rowArray.push(new Map().set('has ship', false).set('attacked', false));
            }
            this.coordinatesGrid.push(rowArray);
        }
    }

    const shipsCoordinatesList = [];
    function addShipCoordinatesToList(shipCoordinatesArray) {
        this.shipsCoordinatesList.push(shipCoordinatesArray);
    }

    //call upon tile click to place ship, after ship created, gameboard created, etc.
    //i represents current row in grid, corresponds to y coordinate
    //j represents current column in grid, corresponds to x coordinate
    function addShipToCoordinatesGrid(shipObject) {
        for(let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                for (let k = 0; k < shipObject.coordinates.length; k++) {
                    if (shipObject.coordinates[k].get('x') === j && shipObject.coordinates[k].get('y') === i) {
                        this.coordinatesGrid[i][j].set('has ship', true);
                    }
                }
            }
        }
    }

    return { coordinatesGrid, generateCoordinatesGrid, shipsCoordinatesList, addShipCoordinatesToList,
             addShipToCoordinatesGrid };
}