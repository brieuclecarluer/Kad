export class Unit {
    constructor(name, life, x, y) {
        this.name = name;
        this.life = life;
        this.x = x;
        this.y = y;
    }

    getName() {
        return this.name;
    }

    getLife() {
        return this.life;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        console.log(`${this.name} se déplace en (${x}, ${y})`);
    }

    canMove(x, y) {
        return x >= 0 && x < 5 && y >= 0 && y < 5;
    }

    attack(target) {
        if (this.canAttack(target)) {
            target.life -= 1;
            console.log(`${this.name} attaque ${target.name}! ${target.name} perd 1 PV.`);
        }
    }

    canAttack(target) {
        return Math.abs(this.x - target.x) <= 1 && Math.abs(this.y - target.y) <= 1;
    }
}
