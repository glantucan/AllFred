import Signal from "./Signal";

/**
 * This is a keyboard controller for games. It tries to solve the problem of detecting 
 * key presses and/or releases using two different aproaches, probes and signals, each of them 
 * convenient in different situations.
 * 
 * Probes can be used just to "probe" whether a key is pressed or not at a 
 * particullar moment in time. This is usually the best option for use in the update function of the * game loop, specially if that detection must be done on every frame.
 * 
 * It also lets you associate signals, i.e. callback funcions, with the release of a particular key. * You can set which parameter values will be sent to the callback when the key release is detected.
 * This is more convenient for the menu system on a game, for example, where you'd probably 
 * stop or pause the game loop and probes cannot work. 
 * They can be also be used with the game loop active, but note the particular moment of execution 
 * is not controlled in relation with the time frame of a gameloop update. It can happen at the
 * beginning, somewhere in between, at the end, ... even outisde of the time interval of an update. 
 * This is decided by the browser which will try its best to do it as close as possible to 
 * the keyup event is detected, but doesn't know about your code.
 * Consider yourself whether this can or cannot affect your game logic.
 * 
 * Note signals are dispatched intencionally on the release of the key. I may add the option to do it * on the keydown event, but that's not needed very often, or at least I never needed to do so in a 
 * game. If you think you need it, before messing around with this code, consider using probes 
 * instead. (It's easier than it seems to shoot yourself in the foot when dealing with keyup events 
 * as they are dispatched continuously while you maintain the key pressed)
 * 
 * @author glantucan
 */
function KeyboardInput() {

    var probeIds = {};
    var probes = {};
    var signalIds = {};
    var signals = {}

    activate();

    /**
     * Adds a probe to the key specified by keyCode. Probes can be used by calling the 
     * isActive function at any time, but often they are the most useful on the game loop. 
     * 
     * @param {String} probeId 
     * @param {Number} keyCode 
     */
    function addProbe(probeId, keyCode) {
        if (!probes.hasOwnProperty(probeId)) {
            probes[probeId] = false;
        }
        if (!probeIds[keyCode]) {
            probeIds[keyCode] = [ probeId ];
        } else {
            probeIds[keyCode] = [ ...probeIds[keyCode], probeId];
        }
    }

    /**
     * Removes a probe associated with a key
     * @param {String} probeId 
     * @param {Number} keyCode 
     */
    function removeProbe(probeId, keyCode) {
        if (probeIds[keyCode] && probeIds[keyCode].includes(signalId)) {
            probeIds[keyCode].splice(probeIds[keyCode].indexOf(probeId), 1);
            if ( probeIds[keyCode].length == 0) {
                delete probeIds[keyCode];
            }
        }
    }

    /**
     * Associates a signal with the release of a key on the keyboard. Note you can add different
     * signals to the same key, or even signals to the same function with different parameters 
     * (They should have different ids or the last added one will overwrite the previous one).
     * Also the same signal can be added to different keys, if that's useful, even with the same ids, * without one overriding the other/s.
     * A signal is like an event. It sets a function (callback) to be called when something happens,
     * in this case a keyboard button release. 
     * @param {*} signalId 
     * @param {*} keyCode 
     * @param {Object} signalConf Conf object for the signal. Must have a callback property and, 
     *                              optinally, a params (array) and context (object) property. 
     */
    function addSignal(signalId, keyCode, signalConf) {
        var { callback, params, context } = signalConf;
        signals[signalId] = Signal(signalId, callback, params, context);
        
        if (!signalIds[keyCode]) {
            signalIds[keyCode] = [ signalId ];
        } else {
            signalIds[keyCode] = [ ...signalIds[keyCode], signalId];
        }
        console.log(signals);
    }


    /**
     * Removes a signal associated with a key release
     * @param {String} signalId 
     * @param {Number} keyCode 
     * @returns {Boolean} Whether the button existed before deletion
     */
    function removeSignal(signalId, keyCode) {
        if (signalIds[keyCode] && signalIds[keyCode].includes(signalId)) {
            signalIds[keyCode].splice(signalIds[keyCode].indexOf(signalId), 1);
            if ( signalIds[keyCode].length == 0) {
                delete signalIds[keyCode];
            }
        }
        if (signals[signalId]) {
            signals[signalId].dispose();
            delete signals[signalId];
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns the state (if pressed) of the button
     * @param {String} buttonId 
     * @returns {Boolean}
     */
    function isActive(probeId) {
        return probes[probeId];
    }


    function onKeyDown(ev) {
        var key = ev.which;
        if (probeIds[key]) {
            probeIds[key].forEach( function (probeId){
                probes[probeId] = true;
            });
        };
    }

    function onKeyUp(ev) {
        var key = ev.which;
        if (probeIds[key]) {
            probeIds[key].forEach( function (probeId){
                probes[probeId] = false;
            });
        }
        
        // Process keyboard signals if any
        if(signalIds[key]) {
            signalIds[key].forEach( function (signalId) {
                signals[signalId].send();
            });
        }
    }



    function activate() {
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
    }
    
    function deactivate() {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
    }

    function dispose() {
        deactivate();
        buttonIdstates = null;
        buttonIds = null;
    }


    return {
        addProbe,
        addSignal,
        //removeProbe, 
        removeSignal,
        isActive,
        activate,
        deactivate,
        dispose,
    }
}



export default KeyboardInput;