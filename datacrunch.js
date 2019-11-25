class Star {
    constructor(name, celestialObjects, spectral, radius, distance){
        this.name = name;
        this.celestialObjects = celestialObjects;
        this.spectral = this.setSpectral(spectral);
        this.radius = radius;
        this.distanceLightYears = (distance * 3.26156).toFixed(0);
        this.MAX_DISTANCE = 600;
        this.MIN_DISTANCE = 80;
        this.MAX_RADIUS = 10;
        this.DEFAULT_DISTANCE = (this.MAX_DISTANCE - this.MIN_DISTANCE) / 2;
    }

    setSpectral(spectral){

        var mapping = {
            'O': ['Blue Giant', '#593CCD'],
            'B': ['Blue Giant', '#BBC5F8'],
            'A': ['White Dwarf', '#ECECEC'],
            'F': ['Yellow-white Dwarf', '#F1F2CD'],
            'G': ['Yellow Dwarf', '#E5E79E'],
            'K': ['Orange Dwarf', '#E9723E'],
            'M': ['Red Dwarf', '#EB364A']}
        if (spectral == null){
            return mapping['M'];
        } else {
            return mapping[spectral.charAt(0)];
        }
    }

    getMaxDistance(index){
        var max = 0;
        for (var celest of this.celestialObjects){
            if (celest.distance[index] > max){
                max = celest.distance[index];
            }
        }
        return max;
    }

    getMinDistance(index){
        var min = Number.MAX_SAFE_INTEGER;
        for (var celest of this.celestialObjects){
            if (celest.distance[index] < min){
                min = celest.distance[index];
            }
        }
        return min;
    }

    getMaxRadius(){
        var max = 0;
        for (var celest of this.celestialObjects){
            if (celest.radius > max){
                max = celest.radius;
            }
        }
        return max;
    }

    distanceAdjust(){
        if (this.getMaxDistance(0) <= this.MAX_DISTANCE && this.getMinDistance(1) >= this.MIN_DISTANCE){
            return;
        }
        var displayRange = this.MAX_DISTANCE - this.MIN_DISTANCE;
        var min;
        var max;
        var range;
        var aboveMin;
        var percentOfRange;
        var addToDistance;
        var periPercent;
        for (var celest of this.celestialObjects){
            periPercent = celest.distance[1] / celest.distance[0];
            for (var index=0;index <= 1; index++){
                if (index == 0){
                    min = this.getMinDistance(1);
                    max = this.getMaxDistance(0);
                    range = max - min;
                    aboveMin = celest.distance[index] - min;
                    percentOfRange = aboveMin / range;
                    addToDistance = percentOfRange * displayRange;
                    if (range == 0){
                        celest.distance[0] = this.DEFAULT_DISTANCE;
                    } else {
                        celest.distance[0] = addToDistance + this.MIN_DISTANCE;
                    }

                } else if (index == 1){
                    celest.distance[1] = celest.distance[0] * periPercent;
                }
            }
        }
    }

    radiusAdjust(){
        if (this.getMaxRadius() <= this.MAX_RADIUS){
            return;
        }
        var multiplier = this.MAX_RADIUS / this.getMaxRadius();
        for (var celest of this.celestialObjects){
            celest.radius *= multiplier;
        }
    }

    sizeAdjust(){
        this.distanceAdjust();
        this.radiusAdjust();
    }
}

function planetsToStars(data){
    var stars = new Map();
    var temp;
    for (let record of data){
        if (record.pl_orbeccen == null || record.pl_radj == null || record.pl_orbsmax == null){
            continue;
        }
        if (stars.get(record.pl_hostname) == undefined){
            stars.set(record.pl_hostname, new Star(record.pl_hostname, [], record.st_spstr, record.st_rad, record.st_dist));
        }
        temp = new Celestial(record.pl_name, record.pl_radj, [0, 0], record.pl_orbeccen, record.pl_orbsmax, "white", record.pl_hostname);
        stars.get(record.pl_hostname).celestialObjects.push(temp);
    }
    var out = [];
    for (const [key, value] of stars.entries()){
        out.push(value);
    }
    out.sort(function(a, b){
        return b.celestialObjects.length - a.celestialObjects.length;
    })
    return out;
}
