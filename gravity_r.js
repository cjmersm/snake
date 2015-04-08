var canvas = document.getElementById('canvas');
var tailToggleCheckbox = document.getElementById('tailToggle');
var particleSize = document.getElementById('particleSize');

var NUM_OF_PARTICLES = 1000;
var MIN_DISTANCE = canvas.width;
var ATTRACTION_STRENGTH = 100;
var SMALLEST_RADIUS = 2;


var ctx = canvas.getContext('2d');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.fillStyle = '#333';

var physics = new Physics();
var listOfParticles = new Array();
var listOfAttractions = new Array();

//////////// ^Setup^ ////////////




// Particles
for(var i = 0; i < NUM_OF_PARTICLES ; i++)
{
  var uMass = getRandomInt(1,50);
  var uxStart = getRandomInt(0,ctx.canvas.width);
  var uyStart = getRandomInt(0,ctx.canvas.height);
  var uRadius = SMALLEST_RADIUS;

  var particle = {
    color : Math.floor(Math.random()*16777215).toString(16),
    mass : uMass,
    xStart : uxStart,
    yStart : uyStart,
    radius : uRadius,
    xInitVelocity : getRandomInt(1,1), // TODO: add init vel
    yInitVeloctiy : getRandomInt(1,1),
    baseParticle : physics.makeParticle(uMass, uxStart, uyStart)
  };

  listOfParticles.push(particle);
}


// Attractions
for(var i = 0; i < 5*NUM_OF_PARTICLES; i++)
{
  var particleIndexA = getRandomInt(0, NUM_OF_PARTICLES-1);
  var particleIndexB = getRandomInt(0, NUM_OF_PARTICLES-1);

  if(particleIndexA != particleIndexB)
  {
    var particleA = listOfParticles[particleIndexA].baseParticle;
    var particleB = listOfParticles[particleIndexB].baseParticle;

    physics.makeAttraction(particleA, particleB, ATTRACTION_STRENGTH, MIN_DISTANCE);    
  }
}




// Print particles for debug
for(var i = 0;i<listOfParticles.length;i++)
{
  console.log(listOfParticles[i]);
}

// Maybe stars one day
// var stars = function() 
// {
//   for(var i = 0; i < Math.random() * 10000; i+=1)
//   {
//     var x = Math.random() * 10000 % window.innerWidth;
//     var y = Math.random() * 10000 % window.innerHeight;
   
//     ctx.beginPath();
//     ctx.fillStyle = 'white';
//     ctx.arc(x, y, 1, 0, Math.PI * 2, false);
//     ctx.fill();
//   }
// }



var render = function() {

  if(!tailToggleCheckbox.checked)
  {
    ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
  }

  for(var i = 0;i<listOfParticles.length;i++)
  {
    var particle = listOfParticles[i];


    if(particle.baseParticle.position.x > ctx.canvas.width - 1)
    {
      particle.baseParticle.velocity.x = -particle.baseParticle.velocity.x;
    }
    if(particle.baseParticle.position.x < 1)
    {
      particle.baseParticle.velocity.x = -particle.baseParticle.velocity.x;
    }
    if(particle.baseParticle.position.y > ctx.canvas.height - 1)
    {
      particle.baseParticle.velocity.y = -particle.baseParticle.velocity.y;
    }
    if(particle.baseParticle.position.y < 1)
    {
      particle.baseParticle.velocity.y = -particle.baseParticle.velocity.y;
    }



    ctx.beginPath();
    ctx.fillStyle = '#'+particle.color
    
    ctx.arc(
      particle.baseParticle.position.x, 
      particle.baseParticle.position.y, 
      particle.radius, 
      0, 
      Math.PI * 2, 
      false);

    ctx.fill();
  }




  // var radius = particleSize.value; // size of particle


  // var x1 = a.position.x;
  // var y1 = a.position.y;


  // // Draw a
  // ctx.beginPath();
  // ctx.fillStyle ='orange';
  // ctx.arc(x1, y1, radius, 0, Math.PI * 2, false);
  // ctx.fill();

};

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
