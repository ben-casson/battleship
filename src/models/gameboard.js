export const createGameboard = () => {
    const coordinatesGrid = [];
    const shipsList = [];
    const shipsCoordinatesList = [];

    //Public Methods---------------------------------------------------------------

    function generateCoordinatesGrid() {
        for (let row = 0; row < 10; row++) {
            const rowArray = [];
            for (let column = 0; column < 10; column++) {
                rowArray.push(new Map().set('ship', 'none').set('attacked', false));
            }
            coordinatesGrid.push(rowArray);
        }
    }

    function addShipToGameboard(shipObject) {
        addShipToShipsList(shipObject);
        addShipToCoordinatesGrid(shipObject);
        addShipCoordinatesToCoordinatesList(shipObject.coordinates);
    }
    
    function receiveAttack(xCoordinate, yCoordinate) {
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

    //Private Methods--------------------------------------------------------------

    function addShipCoordinatesToCoordinatesList(shipCoordinatesArray) {
        shipsCoordinatesList.push(shipCoordinatesArray);
    }

    function addShipToCoordinatesGrid(shipObject) {
        for(let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                for (let i = 0; i < shipObject.coordinates.length; i++) {
                    if (parseInt(shipObject.coordinates[i].get('x')) === column 
                        && parseInt(shipObject.coordinates[i].get('y')) === row) {
                        coordinatesGrid[row][column].set('ship', shipObject);
                    }
                }
            }
        }
    }

    function addShipToShipsList(shipObject) {
        shipsList.push(shipObject);
    }

    return { coordinatesGrid, generateCoordinatesGrid, shipsCoordinatesList, 
             addShipToGameboard, shipsList, receiveAttack, allShipsAreSunk };
}