var timer;
var running = false;
var currentStar = null;

function setPlanetaryOrbits(){
    for (var planet of currentStar.celestialObjects){
        planet.setOrbit(CENTER);
    }
}

function setLunarOrbits(){
    for (var moon of moons){
        var planet = moon.parent;
        var position = planet.position;
        var advancedPoint = (planet.orbitIndex + 1) % planet.orbit.length;
        var advancedPosition = planet.orbit[advancedPoint];
        moon.setOrbit(advancedPosition);
    }
}

function drawBackground(){
    var canvas = document.getElementById('canvas');
    if (canvas == null){
        console.log(true);
        clearInterval(timer);
        return;
    }
    var context = canvas.getContext("2d");
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();
    context.fillStyle = currentStar.spectral[1];
    context.arc(WIDTH/2,HEIGHT/2,convert(50),0,2*Math.PI);
    context.fill();
    if (flightPath == true){
        drawFlighPath(context);
    }
    context.stroke();
}

function drawFlighPath(context){
    context.fillStyle = 'white';
    for (var planet of currentStar.celestialObjects){
        var orbit = planet.orbit;
        for (var j = 0; j < orbit.length; j++){
            var xy = orbit[j];
            context.fillRect(xy[0],xy[1],1,1);
        }
    }
}

function toggleFlightPath(){
    if (flightPath == true) {
        flightPath = false;
    } else {
        flightPath = true;
    }
}

function randomizePositions(){
    for (var celestialObject of currentStar.celestialObjects){
        var randomIndex = Math.floor(Math.random() * celestialObject.orbit.length);
        celestialObject.orbitIndex = randomIndex;
    }
}

function updateCelestialObjectPositions(){
    for (var celestialObject of currentStar.celestialObjects){
        celestialObject.updatePosition();
    }
}

function drawPlanets(){
    updateCelestialObjectPositions();
    //setLunarOrbits();
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    for (var celestialObject of currentStar.celestialObjects){
        context.beginPath();
        context.fillStyle = celestialObject.color;
        context.arc(celestialObject.position[0], celestialObject.position[1], celestialObject.radius, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    }
}

function animate(){
    if (running){
        //setLunarOrbits();
    }
    if (running){
        drawBackground();
    }
    if (running){
        drawPlanets();
    }
}

function execute(star){
    console.log(star);
    running = true;
    currentStar = star;
    currentStar.sizeAdjust();
    clearInterval(timer);
    timer = setInterval(animate, 75);
    setPlanetaryOrbits();
    //setLunarOrbits();
    randomizePositions();
}

function terminate() {
  clearInterval(timer);
  running = false;
}
