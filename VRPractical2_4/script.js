let rnd = (l,u) => Math.floor(Math.random()*(u-l) + l);
let scene;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene"); 


  loop();
})

function loop(){

  
  window.requestAnimationFrame( loop );
}

// Rocket class
class Rocket {
  constructor(x, y, z) {
    // Rocket container entity
    this.el = document.createElement('a-entity');
    this.el.setAttribute('position', `${x} ${y} ${z}`);

    // Body: cylinder
    let body = document.createElement('a-cylinder');
    body.setAttribute('height', '1');
    body.setAttribute('radius', '0.15');
    body.setAttribute('color', '#888');
    body.setAttribute('position', '0 0.5 0');
    this.el.appendChild(body);

    // Nose: cone
    let nose = document.createElement('a-cone');
    nose.setAttribute('height', '0.3');
    nose.setAttribute('radius-bottom', '0.15');
    nose.setAttribute('color', '#f00');
    nose.setAttribute('position', '0 1.15 0');
    this.el.appendChild(nose);

    // Animation: up at random speed
    this.speed = 0.01 + Math.random() * 0.03; // random speed between 0.01–0.04
    this.launched = false;

    scene.appendChild(this.el);
  }

  launch() {
    this.launched = true;
  }

  update() {
    if (this.launched) {
      // Move rocket up along y axis
      let pos = this.el.getAttribute('position');
      this.el.setAttribute('position', `${pos.x} ${pos.y + this.speed} ${pos.z}`);
    }
  }
}


// Rocket class
class Rocket {
  constructor(x, y, z) {
    // Rocket container entity
    this.el = document.createElement('a-entity');
    this.el.setAttribute('position', `${x} ${y} ${z}`);

    // Body: cylinder
    let body = document.createElement('a-cylinder');
    body.setAttribute('height', '1');
    body.setAttribute('radius', '0.15');
    body.setAttribute('color', '#888');
    body.setAttribute('position', '0 0.5 0');
    this.el.appendChild(body);

    // Nose: cone
    let nose = document.createElement('a-cone');
    nose.setAttribute('height', '0.3');
    nose.setAttribute('radius-bottom', '0.15');
    nose.setAttribute('color', '#f00');
    nose.setAttribute('position', '0 1.15 0');
    this.el.appendChild(nose);

    // Animation: up at random speed
    this.speed = 0.01 + Math.random() * 0.03; // random speed between 0.01–0.04
    this.launched = false;

    scene.appendChild(this.el);
  }

  launch() {
    this.launched = true;
  }

  update() {
    if (this.launched) {
      // Move rocket up along y axis
      let pos = this.el.getAttribute('position');
      this.el.setAttribute('position', `${pos.x} ${pos.y + this.speed} ${pos.z}`);
    }
  }
}

let rockets = [];

window.addEventListener("DOMContentLoaded", function() {
  scene = document.querySelector("a-scene");

  // Make rockets in grid
  let N = 10; // 10 x 10 grid
  let spacing = 4;
  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      let x = (i - N / 2) * spacing;
      let z = (j - N / 2) * spacing;
      let y = rnd(-3, 0); // random y below plane
      let rocket = new Rocket(x, y, z);
      rocket.launch();    // start animation right away
      rockets.push(rocket);
    }
  }

  loop();
})

function loop() {
  rockets.forEach(r => r.update());
  window.requestAnimationFrame(loop);
}


class UFO {
  constructor(x, y, z) {
    this.el = document.createElement('a-entity');
    this.el.setAttribute('position', `${x} ${y} ${z}`);

    // Top: disc shape (torus)
    let top = document.createElement('a-torus');
    top.setAttribute('radius', '0.5');
    top.setAttribute('radius-tubular', '0.2');
    top.setAttribute('color', '#ccc');
    this.el.appendChild(top);

    // Bottom: a-sphere for dome
    let dome = document.createElement('a-sphere');
    dome.setAttribute('radius', '0.23');
    dome.setAttribute('color', '#8ef');
    dome.setAttribute('position', '0 0.1 0');
    this.el.appendChild(dome);

    this.speed = 0.01 + Math.random() * 0.03; // random speed down
    this.invading = false;

    scene.appendChild(this.el);
  }

  invade() {
    this.invading = true;
  }

  update() {
    if (this.invading) {
      let pos = this.el.getAttribute('position');
      // Fall until y reaches ground (y=0)
      if (pos.y > 0) {
        let newY = Math.max(0, pos.y - this.speed);
        this.el.setAttribute('position', `${pos.x} ${newY} ${pos.z}`);
      }
    }
  }
}

let ufos = [];

function createUFOs(count) {
  for (let i = 0; i < count; ++i) {
    let x = rnd(-20, 20);
    let z = rnd(-20, 20);
    let y = rnd(8, 15); // high up
    let ufo = new UFO(x, y, z);
    ufo.invade();
    ufos.push(ufo);
  }
}

// Add this line after rockets creation in DOMContentLoaded to add UFOs
createUFOs(15);

function loop() {
  rockets.forEach(r => r.update());
  ufos.forEach(u => u.update());
  window.requestAnimationFrame(loop);
}
