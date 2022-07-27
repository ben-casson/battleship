import { createGameboard } from "../src/gameboard";
import { createShip } from "../src/ship";

describe('public gameboard methods', () => {
    let friendlyGameboard;
    let enemyGameboard;
    let destroyer;
    let cruiser;

    beforeEach(() => {
        friendlyGameboard = createGameboard();
        friendlyGameboard.generateCoordinatesGrid();
        enemyGameboard = createGameboard();
        enemyGameboard.generateCoordinatesGrid();
        destroyer = createShip(2);
        cruiser = createShip(3);
        destroyer.coordinates = [new Map().set('x', 0).set('y', 0).set('hit', false),
                                  new Map().set('x', 0).set('y', 1).set('hit', false)];
        cruiser.coordinates = [new Map().set('x', 9).set('y', 0).set('hit', false),
                               new Map().set('x', 9).set('y', 1).set('hit', false),
                               new Map().set('x', 9).set('y', 2).set('hit', false)];
    });

    test('grid is created properly', () => {
        expect(friendlyGameboard.coordinatesGrid.length).toBe(10);
        expect(friendlyGameboard.coordinatesGrid[0].length).toBe(10);
        expect(friendlyGameboard.coordinatesGrid[0][0].size).toBe(2);
        expect(friendlyGameboard.coordinatesGrid[0][0].has('ship')).toBeTruthy();
        expect(friendlyGameboard.coordinatesGrid[0][0].has('attacked')).toBeTruthy();
    });

    test('friendly ships are added to list', () => {
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
        friendlyGameboard.addShipToCoordinatesGrid(destroyer);
        expect(friendlyGameboard.coordinatesGrid[0][0].get('ship')).toBe(destroyer);
        expect(friendlyGameboard.coordinatesGrid[1][0].get('ship')).toBe(destroyer);
        expect(friendlyGameboard.coordinatesGrid[2][0].get('ship')).toEqual('none');
        expect(enemyGameboard.coordinatesGrid[0][0].get('ship')).toEqual('none');
        expect(enemyGameboard.coordinatesGrid[1][0].get('ship')).toEqual('none');
    });

    test('ship receives attack', () => {
        friendlyGameboard.addShipToCoordinatesGrid(destroyer);
        friendlyGameboard.receiveAttack(0, 0);
        expect(destroyer.coordinates[0].get('hit')).toBeTruthy();
        expect(destroyer.coordinates[1].get('hit')).toBeFalsy();
        expect(destroyer.isSunk()).toBeFalsy();
        friendlyGameboard.receiveAttack(0, 1);
        expect(destroyer.coordinates[0].get('hit')).toBeTruthy();
        expect(destroyer.coordinates[1].get('hit')).toBeTruthy();
        expect(destroyer.isSunk()).toBeTruthy();
    });
});