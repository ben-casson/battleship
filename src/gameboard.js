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

    return { coordinatesGrid, generateCoordinatesGrid, shipsCoordinatesList, addShipCoordinatesToList };
}