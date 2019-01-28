import world from './World';
/* TODO:
    - Create a gameobjets list
    - Delegate the updates to each gameobject
    - The world will be a very spetial gameobject on that list
*/
function Game() {
    var gameObjects = new Map();

    return {
        update () {

            for (var [goId, go] of gameObjects) {
                go.update();
            }
        },
        addObject(goId, go) {
            gameObjects.set(goId, go);
            return go;
        },
        getObjectModel(goId) {
            return gameObjects.get(goId).model;
        },
        removeObject(goId) {
            var go = gameObjects.get(goId);
            gameObjects.delete(goId);
            return go;
        },
        get world() {
            return world;
        }
    }
}

export default Game;