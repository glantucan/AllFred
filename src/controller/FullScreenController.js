
function isOnFullScreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement ||
        document.mozFullScreenElement)
            return true;
    else
            return false;
}
export default {isOnFullScreen}