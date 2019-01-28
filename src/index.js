import Display from "./display/Display";
import PlayerDisplay from "./display/PlayerDisplay";
import Background from "./display/Background";
import Controller from "./controller/Controller";
import Engine from "./Engine";
import Game from "./game/Game";

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
    window.addEventListener("resize", display.onResize);
    
    // Everything set. Start the engine
    engine.start();

    // attach displayObjects
    display.attachChild('bg', Background({color:'#77eeff'}));

    display.attachChild('player', 
        PlayerDisplay(
            {
                file: require('./assets/bird_4_sprites.svg'), 
                scale:0.2, 
                frameStep:2,
                frameWidth: 1000,
                frameHeight: 700,
                frames:[[0,0], [0,1], [0,3], [0,2], [0,1]],
            }, game.world.player.model));


    // Main render function
    function render() {
        //display.setfillColor(game.color);
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