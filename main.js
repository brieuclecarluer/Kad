import { ObjectGame } from './unit.js';
import { Player } from './player.js';
import { Unit } from './unit.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 8;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

async function chargerMap(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

async function afficherCarte() {
    const map = await chargerMap('map/map.tmj');
    const tileset = map.tilesets[0];
    const tilesetImage = new Image();
    tilesetImage.src = 'map/assetsmap/' + tileset.image;
    await new Promise(resolve => tilesetImage.onload = resolve);

    const cols = map.width;
    const rows = map.height;
    const layer = map.layers.find(layer => layer.type === 'tilelayer');
    const tileData = layer.data;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const tileIndex = tileData[y * cols + x] - tileset.firstgid;
            if (tileIndex < 0) continue;

            const tilesetCols = tileset.columns;
            const sx = (tileIndex % tilesetCols) * TILE_SIZE;
            const sy = Math.floor(tileIndex / tilesetCols) * TILE_SIZE;
            const dx = x * TILE_SIZE;
            const dy = y * TILE_SIZE;

            ctx.drawImage(
                tilesetImage,
                sx, sy, TILE_SIZE, TILE_SIZE,
                dx, dy, TILE_SIZE, TILE_SIZE
            );
        }
    }
}

let listobject1 = [];
let listobject2 = [];

const Player1 = new Player('Player1', 5, listobject1);
const Player2 = new Player('Player2', 5, listobject2);

const unitsPlayer1 = [
    new Unit('Unit1', 3, 1, 1),
    new Unit('Unit2', 3, 2, 2),
    new Unit('Unit3', 3, 3, 3)
];

const unitsPlayer2 = [
    new Unit('Unit4', 3, 3, 4),
    new Unit('Unit5', 3, 2, 4),
    new Unit('Unit6', 3, 1, 4)
];

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

afficherCarte();
