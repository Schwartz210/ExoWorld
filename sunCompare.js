var canvas = null;
var overlayRadius = true;

function sunCompareExecute(star){
    canvas = document.getElementById('canvas-' + star.name);
    canvas.style.display = "block";
    canvas.width = 1000;
    canvas.height = 350;
    var context = canvas.getContext("2d");

    // Background
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();
    var [heliosRadius, starRadius] = setSize(star);

    // Helios Main Arc
    context.beginPath();
    context.fillStyle = 'yellow';
    context.arc(canvas.width/3, canvas.height/2-10, heliosRadius, 0, 2 * Math.PI);
    context.fill();

    // Star Main Arc
    context.beginPath();
    context.fillStyle = star.spectral[1];
    context.arc(canvas.width/3 * 2, canvas.height/2-10, starRadius, 0, 2 * Math.PI);
    context.fill();

    // Helios Text
    context.beginPath();
    context.fillStyle = 'white';
    context.font = "30px Arial";
    context.fillText("Sun", canvas.width/3-40, canvas.height-10);
    context.fill();

    // Star text
    context.fillStyle = 'white';
    context.font = "30px Arial";
    context.fillText(star.name, canvas.width/3 * 2-60, canvas.height-10);
    context.fill();

    if (overlayRadius){
        // Helios Radius Line
        context.beginPath();
        context.fillStyle = "black";
        context.moveTo(canvas.width/3, canvas.height/2-10);
        context.lineTo(canvas.width/3+heliosRadius, canvas.height/2-10);

        // Helios radius text
        context.fillStyle = 'black';
        context.font = "10px Arial";
        context.fillText('r = 432k miles', canvas.width/3, canvas.height/2);
        context.fill();

        // Star Radius Line
        context.moveTo(canvas.width/3 * 2, canvas.height/2-10);
        context.lineTo(canvas.width/3 * 2 +starRadius * 2, canvas.height/2-10);

        // Star Radius Text
        context.fillStyle = 'black';
        context.font = "10px Arial";
        context.fillText(calcMilesRadius(star), canvas.width/3 * 2, canvas.height/2);
        context.fill();
    }
    context.stroke();
}

function calcMilesRadius(star){
    var sunRadius = 432170;
    return 'r = ' + ((star.radius * sunRadius) / 1000).toFixed(0) + 'k miles';
}

function setSize(star){
    var bigOneRadius = 150;
    var out = [0, 0];
    if (star.radius > 1){
        out = [150 / star.radius, 150];
    } else {
        out = [150, 150 * star.radius];
    }
    return out;
}
