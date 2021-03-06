(function() {

  var canvas = document.getElementById('canvas');
  var tailToggleCheckbox = document.getElementById('tailToggle');
  var particleSize = document.getElementById('particleSize');

  var ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx.fillStyle = '#333';

  var physics = new Physics();

  var mass = 10; // More mass the faster they go
  var mass2 = 10; // More mass the faster they go
  var mass3 = 20; // More mass the faster they go



  var x1 = canvas.width * 0.25;
  var x2 = canvas.width * 0.75;
  var x3 = canvas.width * 0.25;


  var y1 = canvas.height / 2;
  var y2 = canvas.height / 4;


  var a = physics.makeParticle(mass, x1, y1);
  var b = physics.makeParticle(mass2, x2, y1);
  var c = physics.makeParticle(mass3, x3, y2);
  var d = physics.makeParticle(mass3, x2, y2);



  // The strength of the bond between two particles.
  var strength1 = 100000;
  var strength2 = 50000;

  // The proximity at which the attraction will be enabled.
  var minDistance = canvas.width;

  // Make the attraction and add it to physics
  var attraction = physics.makeAttraction(a, b, strength1, minDistance);
  var attraction2 = physics.makeAttraction(b, c, strength1, minDistance);
  var attraction3 = physics.makeAttraction(a, c, strength2, minDistance);
  var attraction3 = physics.makeAttraction(a, d, strength1, minDistance);
  //var attraction3 = physics.makeAttraction(b, d, strength1, minDistance);
  var attraction3 = physics.makeAttraction(c, d, strength2, minDistance);


  var stars = function() 
  {
    for(var i = 0; i < Math.random() * 10000; i+=1)
    {
      var x = Math.random() * 10000 % window.innerWidth;
      var y = Math.random() * 10000 % window.innerHeight;
     
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.arc(x, y, 1, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }

  var render = function() {

    if(!tailToggleCheckbox.checked)
    {
      ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
    }

    var radius = particleSize.value; // size of particle


    var x1 = a.position.x;
    var y1 = a.position.y;

    var x2 = b.position.x;
    var y2 = b.position.y;

    var x3 = c.position.x;
    var y3 = c.position.y;

    var x4 = d.position.x;
    var y4 = d.position.y;

    // Draw a
    ctx.beginPath();
    ctx.fillStyle ='orange';
    ctx.arc(x1, y1, radius, 0, Math.PI * 2, false);
    ctx.fill();

    // Draw b
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(x2, y2, radius, 0, Math.PI * 2, false);
    ctx.fill();

    // Draw c
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(x3, y3, radius, 0, Math.PI * 2, false);
    ctx.fill();

    // Draw c
    ctx.beginPath();
    ctx.fillStyle ='teal' ;
    ctx.arc(x4, y4, radius, 0, Math.PI * 2, false);
    ctx.fill();

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
})();