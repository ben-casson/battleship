import { createGameboard } from "../src/models/gameboard";
import { createShip } from "../src/models/ship";

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
        friendlyGameboard.addShipToGameboard(destroyer);
        expect(friendlyGameboard.shipsCoordinatesList.length).toBe(1);
        friendlyGameboard.addShipToGameboard(cruiser);
        expect(friendlyGameboard.shipsCoordinatesList.length).toBe(2);
        expect(friendlyGameboard.shipsCoordinatesList[0].length).toBe(2);
        expect(friendlyGameboard.shipsCoordinatesList[1].length).toBe(3);
        expect(friendlyGameboard.shipsCoordinatesList[0][1].get('x')).toBe(0);
        expect(friendlyGameboard.shipsCoordinatesList[0][1].get('y')).toBe(1);
        expect(friendlyGameboard.shipsCoordinatesList[0][1].get('hit')).toBeFalsy();
        expect(enemyGameboard.shipsCoordinatesList.length).toBe(0);
    });

    test('ship is added to gameboard coordinates grid', () => {
        friendlyGameboard.addShipToGameboard(destroyer);
        expect(friendlyGameboard.coordinatesGrid[0][0].get('ship')).toBe(destroyer);
        expect(friendlyGameboard.coordinatesGrid[1][0].get('ship')).toBe(destroyer);
        expect(friendlyGameboard.coordinatesGrid[2][0].get('ship')).toEqual('none');
        expect(enemyGameboard.coordinatesGrid[0][0].get('ship')).toEqual('none');
        expect(enemyGameboard.coordinatesGrid[1][0].get('ship')).toEqual('none');
    });

    test('ship receives attack', () => {
        friendlyGameboard.addShipToGameboard(destroyer);
        friendlyGameboard.receiveAttack(0, 0);
        expect(destroyer.coordinates[0].get('hit')).toBeTruthy();
        expect(destroyer.coordinates[1].get('hit')).toBeFalsy();
        expect(destroyer.isSunk()).toBeFalsy();
        friendlyGameboard.receiveAttack(0, 1);
        expect(destroyer.coordinates[0].get('hit')).toBeTruthy();
        expect(destroyer.coordinates[1].get('hit')).toBeTruthy();
        expect(destroyer.isSunk()).toBeTruthy();
    });

    test('gameboard marks coordinate as attacked', () => {
        friendlyGameboard.addShipToGameboard(destroyer);
        friendlyGameboard.receiveAttack(0, 0);
        expect(friendlyGameboard.coordinatesGrid[0][0].get('attacked')).toBeTruthy();
        expect(friendlyGameboard.coordinatesGrid[1][0].get('attacked')).toBeFalsy();
        expect(friendlyGameboard.coordinatesGrid[5][8].get('attacked')).toBeFalsy();
        expect(enemyGameboard.coordinatesGrid[0][0].get('attacked')).toBeFalsy();
    });

    test('all ships have been sunk', () => {
        friendlyGameboard.addShipToGameboard(destroyer);
        friendlyGameboard.addShipToGameboard(cruiser);
        expect(friendlyGameboard.allShipsAreSunk()).toBeFalsy();
        friendlyGameboard.receiveAttack(0, 0);
        friendlyGameboard.receiveAttack(0, 1);
        expect(friendlyGameboard.allShipsAreSunk()).toBeFalsy();
        friendlyGameboard.receiveAttack(9, 0);
        friendlyGameboard.receiveAttack(9, 1);
        friendlyGameboard.receiveAttack(9, 2);
        expect(friendlyGameboard.allShipsAreSunk()).toBeTruthy();
    });
});