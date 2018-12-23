import KeyboardInput from "./KeyboardInput";
import KeyCode from "./KeyCode";

// We could call these user action ids 
const JUMP = 'JUMP';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const DOWN = 'DOWN';

const EXIT = 'EXIT';

// The idea is to have different controllers for different devices or control methods
function KBController() {
    
    var kbController = KeyboardInput();
    kbController.addProbe( JUMP, KeyCode.KEY_W );
    kbController.addProbe( LEFT, KeyCode.KEY_A );
    kbController.addProbe( RIGHT, KeyCode.KEY_D );
    kbController.addProbe( DOWN, KeyCode.KEY_S );

    return {
        isPressed: kbController.isActive,
    }
}

export default {JUMP, LEFT, RIGHT, DOWN, KBController};
