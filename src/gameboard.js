export const createGameboard = () => {
    const coordinatesGrid = [];
    const shipsList = [];
    const shipsCoordinatesList = [];

    function generateCoordinatesGrid() {
        for (let row = 0; row < 10; row++) {
            const rowArray = [];
            for (let column = 0; column < 10; column++) {
                rowArray.push(new Map().set('ship', 'none').set('attacked', false));
            }
            //this.
            coordinatesGrid.push(rowArray);
        }
    }

    function addShipCoordinatesToCoordinatesList(shipCoordinatesArray) {
        //this.
        shipsCoordinatesList.push(shipCoordinatesArray);
    }

    //call upon tile click to place ship, after ship created, gameboard created, etc.
    function addShipToCoordinatesGrid(shipObject) {
        for(let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                for (let i = 0; i < shipObject.coordinates.length; i++) {
                    if (shipObject.coordinates[i].get('x') === column && shipObject.coordinates[i].get('y') === row) {
                        //this.
                        coordinatesGrid[row][column].set('ship', shipObject);
                    }
                }
            }
        }
    }

    function addShipToShipsList(shipObject) {
        //this.
        shipsList.push(shipObject);
    }

    function addShipToGameboard(shipObject) {
        addShipToShipsList(shipObject);
        addShipToCoordinatesGrid(shipObject);
        addShipCoordinatesToCoordinatesList(shipObject.coordinates);
    }

    function receiveAttack(xCoordinate, yCoordinate) {
        //                      this.
        let currentCoordinate = coordinatesGrid.at(yCoordinate).at(xCoordinate);
        if (currentCoordinate.get('ship') !== 'none') {
            currentCoordinate.get('ship').hit(xCoordinate, yCoordinate);
        }
        currentCoordinate.set('attacked', true);
    }

    function allShipsAreSunk() {
        for (let ship of this.shipsList) {
            if (!ship.isSunk()) return false;
        }
        return true;
    }

    return { coordinatesGrid, generateCoordinatesGrid, shipsCoordinatesList, addShipToGameboard,
             shipsList, receiveAttack, allShipsAreSunk };
}