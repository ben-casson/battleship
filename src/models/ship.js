export const createShip = (length, shipType) => {
    //array of Maps, each Map contains an 'x' coordinate key, a 'y' coordinate key, and a 'hit' key
    const coordinates = [];
    
    function hit(xCoordinate, yCoordinate) {
        for (let map of coordinates) {
            if (map.get('x') === xCoordinate && map.get('y') === yCoordinate) {
                map.set('hit', true);
            }
        }
    }

    function isSunk() {
        for (let map of coordinates) {
            if (!map.get('hit')) return false;
        }
        return true;
    }
    
    return { length, shipType, coordinates, hit, isSunk };
}