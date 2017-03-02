'use strict'

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var centerX = 0;
var centerY = 0;
var radius = 50;
var rotation = 135 + 180 * parseInt(2 * Math.random());
var rotationStep = 10;
var counter = 0;

var button = document.getElementById('flip');
button.onclick = start;

function start() {
    if (!isInProgress()) {
        window.requestAnimationFrame(step);
    }
}

function reset() {
    counter = 0;
    rotationStep = 10;
    rotation = 135 + 180 * parseInt(2 * Math.random());
}

function isInProgress() {
    return counter > 0;
}

function step() {
    clearCanvas();
    drawCircle();
    drawText();
    update();
    if (!isRotationDone()) {
        window.requestAnimationFrame(step);
    }
    else {
        reset();
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    rotation = (rotation + rotationStep) % 360;
    if (counter > 70) { rotationStep -= 0.1 };
    counter++;
}

function isRotationDone() {
    return counter > 170;
}

function isHead() {
    return rotation < 180;
}

function currentLetter() {
    return isHead() ? 'H' : 'T';
}

function scaleContext(context) {
    // scale context horizontally
    var scale = rotation % 180;
    scale = scale < 90 ? scale : 180 - scale;
    scale = scale / 90;
    context.scale(scale, 1);
}

function drawText() {
    // save state
    context.save();

    // translate context
    context.translate(canvas.width / 2, canvas.height / 2);

    scaleContext(context);

    context.font = '48px serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(currentLetter(), centerX, centerY);

    // restore to original state
    context.restore();
}

function drawCircle() {
    // save state
    context.save();

    // translate context
    context.translate(canvas.width / 2, canvas.height / 2);

    scaleContext(context);

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

    // apply styling
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = 'black';
    context.stroke();

    // restore to original state
    context.restore();
}
