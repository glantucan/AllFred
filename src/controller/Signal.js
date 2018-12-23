/**
 * Signals intend to be a smarter way to define callbacks with their parameter values as a whole.
 * 
 * TODO: Find a way for them to be just a map with all the inherited properties of the object
 * prototype, but with the abilitie to use getters or any other strategy to make their keys read only.
 * Also, the code must be readable enough, commented bellow there is a working approach but feels 
 * haccky and ugly.
 * 
 * @author Glantucan
 */

/**
 * 
 * @param {String} id 
 * @param {Function} callback 
 * @param {Array} params 
 * @param {Object} context 
 * @param {Boolean} onlyOnce This is just informative and intended for use on the client code if 
 *                           suitable. Intended to decide whether to destroy the signal after one use.
 */
function Signal(id, callback, params = [], context = null, onlyOnce = false) {

    function send(extraParams = []) {
        if (!context) {
            callback(...params, ...extraParams);
        } else {
            callback.call(context, ...params, ...extraParams);
        }
    }

    function dispose() {
        callback = null;
        params = null;
        context = null;
    }

    return {
        get id () { return id; },
        get callback () { return callback; },
        get params () { return params; },
        get context () { return context; },
        send,
        dispose,
    }
}

/* function Signal(id, callback, params, context) {
    // The idea is that the signal is as lightweight as possible and to be read only:
    // But this approach is odd and not readable
    var signal = Object.create(null); // we want just a map, not a full object
    addGetter(signal, 'id', id);
    addGetter(signal, 'callback', callback);
    addGetter(signal, 'params', params);
    addGetter(signal, 'context', context);
    addGetter(signal, 'send', send);

    function addGetter (obj, prop, value) {
        Object.defineProperty(obj, prop, {
            enumerable:true,
            get: function() { return value },
        })
    }

    return signal;
} */



export default Signal;