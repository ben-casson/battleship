export const createGameboard = () => {
    const coordinatesGrid = [];
    function generateCoordinatesGrid() {
        for (let i = 0; i < 10; i++) {
            const rowArray = [];
            for (let j = 0; j < 10; j++) {
                rowArray.push('unattacked');
            }
            this.coordinatesGrid.push(rowArray);
        }
    }

    return { coordinatesGrid, generateCoordinatesGrid };
}