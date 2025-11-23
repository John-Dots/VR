window.addEventListener("DOMContentLoaded", function () {
  scene = document.querySelector("a-scene");

  // Register car interaction - moves when clicked
  AFRAME.registerComponent('drivable-car', {
    init: function () {
      this.el.addEventListener('click', () => {
        this.el.setAttribute('animation', {
          property: 'position',
          to: '10 0 0',
          dur: 1500,
          easing: 'linear'
        });
      });
    }
  });

  // Register UFO interaction - disappears on mouseover
  AFRAME.registerComponent('shootable-ufo', {
    init: function () {
      this.el.addEventListener('mouseenter', () => {
        this.el.setAttribute('visible', false);
      });
    }
  });

  // Populate multiple cars and UFOs
  const car = document.createElement('a-box');
  car.setAttribute('drivable-car', '');
  car.setAttribute('position', '0 0 -5');
  car.setAttribute('color', 'red');
  scene.appendChild(car);

  const ufo = document.createElement('a-sphere');
  ufo.setAttribute('shootable-ufo', '');
  ufo.setAttribute('position', '0 3 -8');
  ufo.setAttribute('color', 'gray');
  scene.appendChild(ufo);

  loop();
});

function loop() {
  window.requestAnimationFrame(loop);
}
