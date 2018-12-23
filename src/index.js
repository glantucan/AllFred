import Display from "./Display";
import Controller from "./controller/Controller";
import Engine from "./Engine";
import Game from "./Game/Game";

require('normalize.css/normalize.css');
require('./styles/index.scss');


document.addEventListener("DOMContentLoaded", () => {

    var controller = Controller.KBController();
    var display = Display( document.getElementById('AllFredGameCanvas') );
    var game = Game();
    var engine = Engine(1000/30, update, render);

    // Adapt to the window size right away
    display.onResize();

    // Adapt to the window size on window resize
    window.addEventListener("resize", display.resize);

    // Everything set. Start the engine
    engine.start();


    // Main render function
    function render() {
        display.setfillColor(game.color);
        display.render();
    };
    
    // Main update function
    function update() {
        if (controller.isPressed(Controller.JUMP)) {
            console.log('JUMP:', controller.isPressed(Controller.JUMP));
        }
        if (controller.isPressed(Controller.LEFT)) {
            console.log('LEFT:', controller.isPressed(Controller.LEFT));
        }
        if (controller.isPressed(Controller.RIGHT)) {
            console.log('RIGHT:', controller.isPressed(Controller.RIGHT));
        }
        if (controller.isPressed(Controller.DOWN)) {
            console.log('DOWN:', controller.isPressed(Controller.DOWN));
        }

        game.update();
    };

    
});