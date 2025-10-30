let rnd = (l, u) => Math.random() * (u - l) + l;
let scene, rockets = [], ufos = [];

class Rocket {
  constructor(x, y, z) {
    this.el = document.createElement('a-entity');
    this.el.setAttribute('position', `${x} ${y} ${z}`);

    // Rocket body as cylinder
    let body = document.createElement('a-entity');
    body.setAttribute('geometry', {primitive: 'cylinder', height: 1, radius: 0.15});
    body.setAttribute('material', 'color: #888');
    body.setAttribute('position', '0 0.5 0');
    this.el.appendChild(body);

    // Rocket nose as cone
    let nose = document.createElement('a-entity');
    nose.setAttribute('geometry', {primitive: 'cone', height: 0.3, radiusBottom: 0.15});
    nose.setAttribute('material', 'color: #f00');
    nose.setAttribute('position', '0 1.15 0');
    this.el.appendChild(nose);

    this.speed = 0.07 + Math.random() * 0.07; // random upward speed
    this.launched = false;

    scene.appendChild(this.el);
  }
  launch() {
    this.launched = true;
  }
  update() {
    if (this.launched) {
      this.el.object3D.position.y += this.speed;
    }
  }
}

class UFO {
  constructor(x, y, z) {
    this.el = document.createElement('a-entity');
    this.el.setAttribute('position', `${x} ${y} ${z}`);

    // UFO disc (torus)
    let disc = document.createElement('a-entity');
    disc.setAttribute('geometry', {primitive: 'torus', radius: 0.5, radiusTubular: 0.13});
    disc.setAttribute('material', 'color: #ccc');
    disc.setAttribute('position', '0 0 0');
    this.el.appendChild(disc);

    // UFO dome (sphere)
    let dome = document.createElement('a-entity');
    dome.setAttribute('geometry', {primitive: 'sphere', radius: 0.23});
    dome.setAttribute('material', 'color: #8ef');
    dome.setAttribute('position', '0 0.25 0');
    this.el.appendChild(dome);

    this.speed = 0.04 + Math.random() * 0.06;
    this.invading = false;

    scene.appendChild(this.el);
  }
  invade() {
    this.invading = true;
  }
  update() {
    if (this.invading) {
      if (this.el.object3D.position.y > 0) {
        this.el.object3D.position.y -= this.speed;
        if (this.el.object3D.position.y < 0) this.el.object3D.position.y = 0;
      }
    }
  }
}

window.addEventListener("DOMContentLoaded", function() {
  scene = document.querySelector("a-scene");

  // Rockets in grid
  let n = 10, spacing = 3.5;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let x = (i - n / 2) * spacing;
      let z = (j - n / 2) * spacing;
      let y = rnd(-4, -2); // start below plane
      let rocket = new Rocket(x, y, z);
      rocket.launch();
      rockets.push(rocket);
    }
  }

  // UFOs at random positions, high up
  for (let i = 0; i < 15; i++) {
    let x = rnd(-15, 15);
    let z = rnd(-15, 15);
    let y = rnd(8, 15);
    let ufo = new UFO(x, y, z);
    ufo.invade();
    ufos.push(ufo);
  }

  loop();
});

function loop() {
  rockets.forEach(r => r.update());
  ufos.forEach(u => u.update());
  window.requestAnimationFrame(loop);
}
