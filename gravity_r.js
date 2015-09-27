var canvas = document.getElementById('canvas');
var tailToggleCheckbox = document.getElementById('tailToggle');
var particleSize = document.getElementById('particleSize');
var boundryToggle = document.getElementById('boundryToggle');
var numOfParticles = document.getElementById('numOfParticles');

var particlesMass = document.getElementById('mass');
var attractionStrength = document.getElementById('strength');
var pixelSize = document.getElementById('size');

var NUM_OF_PARTICLES = 20;
var MIN_DISTANCE = canvas.width;
var ATTRACTION_STRENGTH = 20;
var RADIUS = 2;
var MASS = 10;

numOfParticles.value = NUM_OF_PARTICLES;
particlesMass.value = MASS;
pixelSize.value = RADIUS;
attractionStrength.value = ATTRACTION_STRENGTH;


var ctx = canvas.getContext('2d');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.fillStyle = '#333';

var physics = new Physics();
var listOfParticles = new Array();


//////////// ^Setup^ ////////////

// Start her up
reset();


// Bind the render function to when physics updates.
physics.onUpdate(render);

// Render a posterframe.
render();

// Bind canvas click to toggle.
canvas.onclick = function(e) {
  physics.toggle(); // Toggle between play and paused states.
};


// store our physics object on the canvas so we can access it later
canvas.physics = physics;
physics.play();
