// Maze Legend: X = wall, - = open, T = treasure, P = trap, S = start, E = exit
let maze = [
  "XXXXXXXXXXXXXXXXXXXX",
  "XS-------X-----E--XX",
  "X-XXX-XX-X-XXXXXX-XX",
  "X-T--XX--T--XX----XX",
  "XXXX-XXXXXX-XXXXXXXX",
  "X----------P------XX",
  "XXXXXXXXXXXXXXXXXXXX"
];

class MazeWall {
  constructor(x, z) {
    let el = document.createElement('a-box');
    el.setAttribute('position', `${x} 1 ${z}`);
    el.setAttribute('width', 1);
    el.setAttribute('height', 2);
    el.setAttribute('depth', 1);
    el.setAttribute('color', '#444');
    document.querySelector('a-scene').appendChild(el);
  }
}

class MazeTreasure {
  constructor(x, z) {
    let el = document.createElement('a-sphere');
    el.setAttribute('position', `${x} 1 ${z}`);
    el.setAttribute('radius', 0.4);
    el.setAttribute('color', 'gold');
    document.querySelector('a-scene').appendChild(el);
  }
}

class MazeTrap {
  constructor(x, z) {
    let el = document.createElement('a-cone');
    el.setAttribute('position', `${x} 0.5 ${z}`);
    el.setAttribute('radius-bottom', 0.4);
    el.setAttribute('height', 1);
    el.setAttribute('color', '#f33');
    document.querySelector('a-scene').appendChild(el);
  }
}

class MazeMarker {
  constructor(x, z, type) {
    let el;
    if (type === "start") {
      el = document.createElement('a-box');
      el.setAttribute('color', '#0F0'); // green for entrance
      el.setAttribute('height', 2);
    } else {
      el = document.createElement('a-box');
      el.setAttribute('color', '#FFD700'); // gold for exit
      el.setAttribute('height', 2);
    }
    el.setAttribute('width', 1);
    el.setAttribute('depth', 1);
    el.setAttribute('position', `${x} 1 ${z}`);
    document.querySelector('a-scene').appendChild(el);
  }
}

window.addEventListener("DOMContentLoaded", function() {
  for(let r = 0; r < maze.length; r++) {
    let row = maze[r];
    for(let c = 0; c < row.length; c++) {
      let char = row[c];
      let x = c - Math.floor(row.length / 2);
      let z = r - Math.floor(maze.length / 2);

      if (char === "X") {
        new MazeWall(x, z);
      } else if (char === "T") {
        new MazeTreasure(x, z);
      } else if (char === "P") {
        new MazeTrap(x, z);
      } else if (char === "S") {
        new MazeMarker(x, z, "start");
      } else if (char === "E") {
        new MazeMarker(x, z, "exit");
      }
      // "-" is empty, no action needed
    }
  }
});
