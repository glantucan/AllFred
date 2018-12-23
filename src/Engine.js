
/* This is a fixed time step game loop. It can be used for any game and will ensure
that game state is updated at the same rate across different devices which is important
for uniform gameplay. Imagine playing your favorite game on a new phone and suddenly
it's running at a different speed. That would be a bad user experience, so we fix
it with a fixed step game loop. In addition, you can do things like frame dropping
and interpolation with a fixed step loop, which allow your game to play and look
smooth on slower devices rather than freezing or lagging to the point of unplayability. */

function Engine(time_step, update, render) {

    var accumulated_time        = 0;// Amount of time that's accumulated since the last update.
    var animation_frame_request = undefined;// reference to the AFR
    var time                    = undefined;// The most recent timestamp of loop execution.
  
    var updated = false;// Whether or not the update function has been called since the last cycle.
  

    /**
     * Process an animation frame and requests the next one
     * @param {number} time_stamp 
     */
    function tick(time_stamp) {// This is one cycle of the game loop
        
        // Although it would seem logic to put this at the end of the function we are setting up an event listener, short of, it's better to put it at the beginning so that if we call stop() while processing game logic it will stop this request. The other way around it wouldn't be stopping anything, cause the last one was already called this callback, and it would request another one at the end that wouldn't be stopped. 
        animation_frame_request = window.requestAnimationFrame(tick);

        accumulated_time += time_stamp - time;
        time = time_stamp;
  
        /* If the device is too slow, updates may take longer than our time step. If
        this is the case, it could freeze the game and overload the cpu. To prevent this,
        we skip updates if accumulated times starts getting longer than three times the time step.
        This is not ideal, but at least the user won't crash their cpu. */
        if (accumulated_time >= time_step * 3) {
            accumulated_time = time_step;
        }
  
        /* See if enough of the stored accumulated time has passed to justify an update. 
        We want to update every time we have accumulated one time step's worth of time, 
        and if multiple time steps have accumulated, we must update one time for each of them 
        to stay up to speed. */
        while (accumulated_time >= time_step) {
            accumulated_time -= time_step;
            update(time_stamp);
            updated = true; // Only if the game has updated, we need to draw it again.
        }
  
      /* This allows us to only draw when the game has updated. */
      if (updated) {
        updated = false;
        render(time_stamp);
      }
    };


    /**
     * Starts ticking the engine
     */
    function start() {
        accumulated_time = time_step;
        time = window.performance.now();
        animation_frame_request = window.requestAnimationFrame(tick);
    }

    
    /**
     * Stops ticking the engine
     */
    function stop() {
        window.cancelAnimationFrame(animation_frame_request);
    }
    
    return { start, stop };
}
  

export default Engine;