import Game from "./game/Game";
import world from './game/World';
import Player from './game/Player';
import Display from "./display/Display";
import PlayerDisplay from "./display/PlayerDisplay";
import Background from "./display/Background";
import KeyboardController from "./controller/KeyboardController";
import Engine from "./Engine";
import resizeController from "./controller/ResizeController"



require('normalize.css/normalize.css');
require('./styles/index.scss');

// DOMContentLoaded doesn't wait till css is loaded, whic means that canvas container will probably not the definitive size --> Use load instead. 
window.addEventListener("load", () => {
    var canvas = document.getElementById('AllFredGameCanvas');

    var keyboard = KeyboardController.KBController();
    var display = Display(canvas);
    var game = Game();
    var engine = Engine(1000/30, update, render);


     // Adapt to the window size right away
     resizeController.resize(canvas.parentNode);
   
    

    // Adapt to the window size on window resize
    window.addEventListener("resize", resizeController.resize);
    
    // Add gameObjects
    game.addObject('World', world);
    var player = game.addObject('Player', Player({
        x: 300, 
        y: 250, 
        w: 100, 
        h: 70
    }, 10));

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
            }, game.getObjectModel('Player')));

    
    // Everything set. Start the engine
    engine.start();

    // Main render function
    function render() {
        //display.setfillColor(game.color);
        display.render();
    };
    
    // Main update function
    function update() {
        
        if (keyboard.isPressed(KeyboardController.LEFT)) {
            player.moveLeft();
        } else if (keyboard.isPressed(KeyboardController.RIGHT)) {
            player.moveRight();
        } else {
            player.stopX();
        }
        if (keyboard.isPressed(KeyboardController.JUMP)) {
            console.log('JUMP:', keyboard.isPressed(KeyboardController.JUMP));
            player.moveUp();
        } else if (keyboard.isPressed(KeyboardController.DOWN)) {
            console.log('DOWN:', keyboard.isPressed(KeyboardController.DOWN));
            player.moveDown();
        } else {
            player.stopY();
        }

        game.update();
    };

    
});