export const createShip = (length) => {
    //array of Maps, each Map contains an 'x' key, a 'y' key, and an 'is hit' key
    const coordinates = [];
    function hit(xCoordinate, yCoordinate) {
        for (let map of coordinates) {
            if (map.get('x') === xCoordinate && map.get('y') === yCoordinate) {
                map.set('is hit', true);
            }
        }
    }
    return { length, coordinates, hit };
}