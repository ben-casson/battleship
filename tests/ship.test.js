import { createShip } from "../src/models/ship.js";

describe('ship public methods', () => {
    const destroyer = createShip(2);
    const cruiser = createShip(3);
    beforeEach(() => {
        destroyer.coordinates = [new Map().set('x', 0).set('y', 0).set('hit', false),
                                  new Map().set('x', 0).set('y', 1).set('hit', false)];
        cruiser.coordinates = [new Map().set('x', 9).set('y', 0).set('hit', false),
                               new Map().set('x', 9).set('y', 1).set('hit', false),
                               new Map().set('x', 9).set('y', 2).set('hit', false)];
    });

    test('destroyer is the correct size', () => {
        expect(destroyer.length).toBe(2);
        expect(destroyer.length).not.toBe(3);
    });
    test('cruiser is the correct size', () => {
        expect(cruiser.length).toBe(3);
        expect(cruiser.length).not.toBe(2);
    });
    
    test('destroyer coordinates are correct', () => {
        expect(destroyer.coordinates[0].get('hit')).toBeFalsy();
        expect(destroyer.coordinates[0].get('x')).toBe(0);
        expect(destroyer.coordinates[0].get('y')).toBe(0);
        expect(destroyer.coordinates[1].get('hit')).toBeFalsy();
        expect(destroyer.coordinates[1].get('x')).toBe(0);
        expect(destroyer.coordinates[1].get('y')).toBe(1);
    });
    test('cruiser coordinates are correct', () => {
        expect(cruiser.coordinates[0].get('hit')).toBeFalsy();
        expect(cruiser.coordinates[0].get('x')).toBe(9);
        expect(cruiser.coordinates[0].get('y')).toBe(0);
        expect(cruiser.coordinates[1].get('hit')).toBeFalsy();
        expect(cruiser.coordinates[1].get('x')).toBe(9);
        expect(cruiser.coordinates[1].get('y')).toBe(1);
        expect(cruiser.coordinates[2].get('hit')).toBeFalsy();
        expect(cruiser.coordinates[2].get('x')).toBe(9);
        expect(cruiser.coordinates[2].get('y')).toBe(2);
    });

    test('destroyer is not sunk when no tiles are hit', () => {
        expect(destroyer.isSunk()).not.toBeTruthy();
    });
    test('cruiser is not sunk when no tiles are hit', () => {
        expect(cruiser.isSunk()).not.toBeTruthy();
    });

    test('destroyer gets hit', () => {
        destroyer.hit(0, 0);
        expect(destroyer.coordinates[0].get('hit')).toBeTruthy();
        expect(destroyer.coordinates[1].get('hit')).toBeFalsy();
    });
    test('cruiser gets hit', () => {
        cruiser.hit(9, 1);
        expect(cruiser.coordinates[0].get('hit')).toBeFalsy();
        expect(cruiser.coordinates[1].get('hit')).toBeTruthy();
        expect(cruiser.coordinates[2].get('hit')).toBeFalsy();
    });

    test('destroyer is not sunk when one tile is hit', () => {
        destroyer.hit(0, 0);
        expect(destroyer.isSunk()).not.toBeTruthy();
    });
    test('cruiser is not sunk when one tile is hit', () => {
        cruiser.hit(9, 0);
        expect(cruiser.isSunk()).not.toBeTruthy();
    });

    test('destroyer is sunk when all tiles are hit', () => {
        destroyer.hit(0, 0);
        destroyer.hit(0, 1);
        expect(destroyer.isSunk()).toBeTruthy();
    });
    test('cruiser is sunk when all tiles are hit', () => {
        cruiser.hit(9, 0);
        cruiser.hit(9, 1);
        cruiser.hit(9, 2);
        expect(cruiser.isSunk()).toBeTruthy();
    });
})
