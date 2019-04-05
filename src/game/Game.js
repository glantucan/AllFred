import world from './World';
/* TODO:
    - Create a gameobjets list
    - Delegate the updates to each gameobject
    - The world will be a very spetial gameobject on that list
*/

/**
 * 
 * @param {*} {viewport} Configuration object containing a viewport object and ... 
 */
function Game({viewport} = {
    viewport: {
        w: 2000, 
        h: 1400
    }}) 
{

    var gameObjects = new Map();
    var scaledW = viewport.w;
    var scaledH = viewport.h;
    
    return {
        get w() { return scaledW; },
        get h() { return scaledH; },
        onResize(scale) {
            scaledW = scale * viewport.w;
            scaledH = scale * viewport.h;
            gameObjects.forEach(function(go){
                if(go.onResize) {
                    go.onResize();
                }
            });
        },
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
        }
    }
}

export default Game;