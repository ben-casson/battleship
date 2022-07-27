import { createGameboard } from "../src/gameboard";
import { createShip } from "../src/ship";

describe('generate coordinates grid', () => {
    const friendlyGameboard = createGameboard();
    const enemyGameboard = createGameboard();
    const destroyer = createShip(2);
    const cruiser = createShip(3);
    beforeEach(() => {
        destroyer.coordinates = [new Map().set('x', 0).set('y', 0).set('hit', false),
                                  new Map().set('x', 0).set('y', 1).set('hit', false)];
        cruiser.coordinates = [new Map().set('x', 9).set('y', 0).set('hit', false),
                               new Map().set('x', 9).set('y', 1).set('hit', false),
                               new Map().set('x', 9).set('y', 2).set('hit', false)];
    });

    test('is grid created properly', () => {
        friendlyGameboard.generateCoordinatesGrid();
        expect(friendlyGameboard.coordinatesGrid.length).toBe(10);
        expect(friendlyGameboard.coordinatesGrid[0].length).toBe(10);
        expect(friendlyGameboard.coordinatesGrid[0][0].size).toBe(2);
        expect(friendlyGameboard.coordinatesGrid[0][0].has('has ship')).toBeTruthy();
        expect(friendlyGameboard.coordinatesGrid[0][0].has('attacked')).toBeTruthy();
    });

    test('are friendly ships added to list', () => {
        friendlyGameboard.addShipCoordinatesToList(destroyer.coordinates);
        expect(friendlyGameboard.shipsCoordinatesList.length).toBe(1);
        friendlyGameboard.addShipCoordinatesToList(cruiser.coordinates);
        expect(friendlyGameboard.shipsCoordinatesList.length).toBe(2);
        expect(friendlyGameboard.shipsCoordinatesList[0].length).toBe(2);
        expect(friendlyGameboard.shipsCoordinatesList[1].length).toBe(3);
        expect(friendlyGameboard.shipsCoordinatesList[0][1].get('x')).toBe(0);
        expect(friendlyGameboard.shipsCoordinatesList[0][1].get('y')).toBe(1);
        expect(friendlyGameboard.shipsCoordinatesList[0][1].get('hit')).toBeFalsy();
    });

    test('ship is added to gameboard coordinates grid', () => {
        friendlyGameboard.generateCoordinatesGrid();
        enemyGameboard.generateCoordinatesGrid();
        friendlyGameboard.addShipToCoordinatesGrid(destroyer);
        expect(friendlyGameboard.coordinatesGrid[0][0].get('has ship')).toBeTruthy();
        expect(friendlyGameboard.coordinatesGrid[1][0].get('has ship')).toBeTruthy();
        expect(friendlyGameboard.coordinatesGrid[2][0].get('has ship')).toBeFalsy();
        expect(friendlyGameboard.coordinatesGrid[0][2].get('has ship')).toBeFalsy();
        expect(enemyGameboard.coordinatesGrid[0][0].get('has ship')).toBeFalsy();
        expect(enemyGameboard.coordinatesGrid[1][0].get('has ship')).toBeFalsy();
    });
});