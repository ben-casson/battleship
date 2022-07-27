export const createGameboard = () => {
    const coordinatesGrid = [];
    function generateCoordinatesGrid() {
        for (let row = 0; row < 10; row++) {
            const rowArray = [];
            for (let column = 0; column < 10; column++) {
                rowArray.push(new Map().set('ship', 'none').set('attacked', false));
            }
            this.coordinatesGrid.push(rowArray);
        }
    }

    const shipsCoordinatesList = [];
    function addShipCoordinatesToCoordinatesList(shipCoordinatesArray) {
        this.shipsCoordinatesList.push(shipCoordinatesArray);
    }

    //call upon tile click to place ship, after ship created, gameboard created, etc.
    function addShipToCoordinatesGrid(shipObject) {
        for(let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                for (let i = 0; i < shipObject.coordinates.length; i++) {
                    if (shipObject.coordinates[i].get('x') === column && shipObject.coordinates[i].get('y') === row) {
                        this.coordinatesGrid[row][column].set('ship', shipObject);
                    }
                }
            }
        }
    }

    const shipsList = [];
    function addShipToShipsList(shipObject) {
        this.shipsList.push(shipObject);
    }

    function receiveAttack(xCoordinate, yCoordinate) {
        let currentCoordinate = this.coordinatesGrid.at(yCoordinate).at(xCoordinate);
        if (currentCoordinate.get('ship') !== 'none') {
            currentCoordinate.get('ship').hit(xCoordinate, yCoordinate);
        }
        currentCoordinate.set('attacked', true);
    }

    function allShipsAreSunk() {

    }

    return { coordinatesGrid, generateCoordinatesGrid, shipsCoordinatesList, addShipCoordinatesToCoordinatesList,
             addShipToCoordinatesGrid, receiveAttack };
}