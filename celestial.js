var WIDTH = 1000;
var HEIGHT = 700;
var CENTER = [WIDTH / 2, HEIGHT / 2]
var BUTTONDIMENSION = [80, 20];
var SUNRADIUS = convert(60);
var AU = WIDTH / 4;
var LD = AU / 10;
var APISIZEADJ = 10000;

function convert(pixels){
  return (WIDTH * .5) * (pixels / 800);
  //return pixels / 5;
}
class Celestial {
    constructor(name, radius, distance, eccentricity, semimajor_axis, color, parent){
        this.name = name;
        this.radius = radius * 100;
        this.eccentricity = eccentricity;
        this.semimajor_axis = semimajor_axis;
        this.distance = this.setDistance(distance);
        this.color = color;
        this.parent = parent;
        this.position = [0,0];
        this.orbitIndex = 0;
        this.orbit = [];
    }

    setDistance(distance){
        if (distance[0] == 0){
            distance[0] = (1 + this.eccentricity) * this.semimajor_axis * APISIZEADJ;
            distance[1] = (1 - this.eccentricity) * this.semimajor_axis * APISIZEADJ;
        }
        return distance;
    }

    setOrbit(barycenter){
        var sides = Math.round(convert(this.distance[0]) / 1.5,0);
        this.orbit = [];
        var x, y;
        for (var i = 0; i < sides; i++){
            x = (convert(this.distance[0]) * Math.cos(i * 2 * Math.PI / sides)) + barycenter[0];
            y = (convert(this.distance[1]) * Math.sin(i * 2 * Math.PI / sides)) + barycenter[1];
            this.orbit.push([x, y]);
        }
    }

    updatePosition(){
        if (this.orbitIndex < this.orbit.length-1){
            this.orbitIndex++;
        } else {
            this.orbitIndex = 0;
        }
        this.position = this.orbit[this.orbitIndex];
    }
}

var earth = new Celestial('Earth', 10, [AU * 1.0155, AU * 0.9832], null, null, 'blue', null);
var mars = new Celestial('Mars', 7, [AU * 1.666, AU * 1.3814], null, null, 'red', null);
var venus = new Celestial('Venus', 7, [AU * 0.728, AU * 0.718], null, null, 'white', null);
var mercury = new Celestial('Mercury', 5, [AU * 0.466, AU * 0.3074], null, null, 'grey', null);
var luna = new Celestial('Luna', 3, [LD * 1.054432319, LD * 0.9431109], null, null, 'white', earth);
var phobos = new Celestial('Phobos', 2, [LD, LD], null, null, '#635957', mars);
var deimos = new Celestial('Deimos', 2, [LD, LD], null, null, '#C6AD95', mars);
var planets = [earth, mars, venus, mercury];
var moons = [luna, phobos, deimos];
var celestialObjects = moons.concat(planets);
var helios = new Star('helios', celestialObjects, 'G', 1, 0);
var flightPath = true;
