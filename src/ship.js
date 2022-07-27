export const createShip = (length) => {
    //array of Maps, each Map contains an 'x' key, a 'y' key, and a 'hit' key
    const coordinates = [];
    function hit(xCoordinate, yCoordinate) {
        for (let map of this.coordinates) {
            if (map.get('x') === xCoordinate && map.get('y') === yCoordinate) {
                map.set('hit', true);
            }
        }
    }
    function isSunk() {
        for (let map of this.coordinates) {
            if (!map.get('hit')) return false;
        }
        return true;
    }
    return { length, coordinates, hit, isSunk };
}