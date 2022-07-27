import { createGameboard } from "../src/gameboard";

describe('generate coordinates grid', () => {
    const friendlyGameboard = createGameboard();
    const enemyGameboard = createGameboard();

    test('is grid created properly', () => {
        friendlyGameboard.generateCoordinatesGrid();
        expect(friendlyGameboard.coordinatesGrid.length).toBe(10);
        expect(friendlyGameboard.coordinatesGrid[0].length).toBe(10);
        expect(friendlyGameboard.coordinatesGrid[0][0]).toEqual('unattacked');
        expect(friendlyGameboard.coordinatesGrid[0][9]).toEqual('unattacked');
        expect(friendlyGameboard.coordinatesGrid[9][0]).toEqual('unattacked');
        expect(friendlyGameboard.coordinatesGrid[9][9]).toEqual('unattacked');
    });
});