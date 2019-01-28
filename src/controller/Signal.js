/**
 * Signals intend to be a smarter way to define callbacks with their parameter values as a whole.
 * 
 * @author Glantucan
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
            
            if (onlyOnce) {
                id = null;
                callback = null;
                params = null;
                context = null;
            }
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

export default Signal;