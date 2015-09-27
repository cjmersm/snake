
var validateElement = function(elementName) {
    return document.getElementById(elementName).value > 0 &&document.getElementById(elementName).value != undefined
}


var reset = function() {

    if(validateElement('numOfParticles'))
    {
        NUM_OF_PARTICLES = document.getElementById('numOfParticles').value;
    }

    if(validateElement('mass'))
    {
        MASS = document.getElementById('mass').value;
    }

    if(validateElement('strength'))
    {
        ATTRACTION_STRENGTH = document.getElementById('strength').value;
    }

    if(validateElement('size'))
    {
        RADIUS = document.getElementById('size').value;
    }

    ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );

    listOfParticles = new Array();

    // Particles
    for(var i = 0; i < NUM_OF_PARTICLES ; i++)
    {
      var uMass = getRandomInt(1, MASS);
      var uxStart = getRandomInt(0,ctx.canvas.width);
      var uyStart = getRandomInt(0,ctx.canvas.height);
      var uRadius = RADIUS;

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
    for(var i = 0; i < NUM_OF_PARTICLES; i++)
    {
      var particleA = listOfParticles[i].baseParticle;

      for(var j = 0; j < NUM_OF_PARTICLES; j++)
      {
          var particleB = listOfParticles[j].baseParticle;

          if(i != j)
          {
            physics.makeAttraction(particleA, particleB, ATTRACTION_STRENGTH, MIN_DISTANCE); 
            physics.makeAttraction(particleB, particleA, ATTRACTION_STRENGTH, MIN_DISTANCE); 
          }
      }
    }

    // Print particles for debug
    for(var i = 0;i<listOfParticles.length;i++)
    {
      console.log(listOfParticles[i]);
    }

};







var render = function() {

  if(!tailToggleCheckbox.checked)
  {
    ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
  }

  for(var i = 0;i<listOfParticles.length;i++)
  {
    var particle = listOfParticles[i];

    if(boundryToggle.checked)
    {

      if(particle.baseParticle.position.x > ctx.canvas.width)
      {
        particle.baseParticle.velocity.x = -particle.baseParticle.velocity.x;
      }
      if(particle.baseParticle.position.x < 0)
      {
        particle.baseParticle.velocity.x = -particle.baseParticle.velocity.x;
      }
      if(particle.baseParticle.position.y > ctx.canvas.height)
      {
        particle.baseParticle.velocity.y = -particle.baseParticle.velocity.y;
      }
      if(particle.baseParticle.position.y < 0)
      {
        particle.baseParticle.velocity.y = -particle.baseParticle.velocity.y;
      }

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
};