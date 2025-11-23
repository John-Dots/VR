// Car moves to the right when clicked
AFRAME.registerComponent('drivable-car', {
  init: function () {
    this.el.addEventListener('click', () => {
      this.el.setAttribute('animation', {
        property: 'position',
        to: '10 0 -5',
        dur: 1500,
        easing: 'linear'
      });
    });
  }
});

// Rocket launches upward when hovered on
AFRAME.registerComponent('launchable-rocket', {
  init: function () {
    this.el.addEventListener('mouseenter', () => {
      this.el.setAttribute('animation', {
        property: 'position',
        to: '0 15 -8',
        dur: 1000,
        easing: 'easeOutCubic'
      });
    });
  }
});

