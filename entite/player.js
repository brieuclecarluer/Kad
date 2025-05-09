import { Unit } from './unit.js';

export class Player {
    constructor(name, life, units) {
        this.name = name;
        this.life = life;
        this.units = units;  
    }

    getName() {
        return this.name;
    }

    getLife() {
        return this.life;
    }

    getUnits() {
        return this.units;
    }

    removeUnit(unit) {
        this.units = this.units.filter(u => u !== unit);
    }
}
