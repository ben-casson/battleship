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
        expect(friendlyGameboard.coordinatesGrid[0][0]).toEqual('unattacked');
        expect(friendlyGameboard.coordinatesGrid[0][9]).toEqual('unattacked');
        expect(friendlyGameboard.coordinatesGrid[9][0]).toEqual('unattacked');
        expect(friendlyGameboard.coordinatesGrid[9][9]).toEqual('unattacked');
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
});