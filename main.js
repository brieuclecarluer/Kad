import { ObjectGame } from './unit.js';
import { Player } from './player.js';
import { Unit } from './unit.js';


const url = map.tmj;
async function chargerMap(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data
}

let listobject1 = [];
let listobject2 = [];

const Player1 = new Player('Player1', 5, listobject1);
const Player2 = new Player('Player2', 5, listobject2);

const unitsPlayer1 = [new Unit('Unit1', 3, 1, 1), new Unit('Unit2', 3, 2, 2), new Unit('Unit3', 3, 3, 3)];
const unitsPlayer2 = [new Unit('Unit4', 3, 3, 4), new Unit('Unit5', 3, 2, 4), new Unit('Unit6', 3, 1, 4)];

let currentPlayer = Player1;  


function handleUnitAction(unit, action) {
    if (action.type === 'move') {
        unit.move(action.x, action.y);
    }
    if (action.type === 'attack') {
        unit.attack(action.target);
    }
}

function moveUnit(unit, x, y) {
    if (unit.canMove(x, y)) {
        unit.move(x, y);
    }
}

function attackUnit(attacker, target) {
    if (attacker.canAttack(target)) {
        attacker.attack(target);
    }
}

function nextTurn() {
    currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
}


function checkForEliminations() {
    currentPlayer.units.forEach(unit => {
        if (unit.life <= 0) {
            console.log(`${unit.name} est éliminée !`);
            currentPlayer.removeUnit(unit);
        }
    });
}
