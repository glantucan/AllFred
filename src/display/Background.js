function Background(props = {color: "rgba(0, 128, 255, 0)"}) {
    var {color} = props;
    return {
        render(buffer) {
            buffer.fillStyle = color;
            buffer.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);
        }
    }
}

export default  Background ;