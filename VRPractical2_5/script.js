/* Note
   Feel free to use classes from past classwork and practical activities.  You may also create new classes.  
   If you wish to use objects from Unit 1, you can use cloneNode( ) to duplicate them.  As an added bonus you 
   can also incorporate classes that have animations integrated into them. 
*/

/* Challenge 1
   Add appropriate classes to use as objects in your maze.  Choose characters to represent these objects and 
   position them in the maze.   In Challenge 3 and 4, you will generate the maze along with any other object 
   you chose to put in the maze.  Get Creative!
*/
let maze = [
  "XXXXXXXXXXXXXXXXXXXX",
  "XS-------X--------EX",
  "X-XXX-XX-X-XXXXXX-XX",
  "X-T--XX--T--XX---T-X",
  "XXXX-XXXXXX-XXXXXXXX",
  "X------------------X",
  "XXXXXXXXXXXXXXXXXXXX"
];

/* Challenge 2
   Add appropriate classes to use as objects in your map.  Choose characters to represent these objects and position them on the map.   In Challenge 5 and 6, you will generate the map using the character representation of the objects you chose to place in the world. Get Creative!
*/class MazeWall {
  constructor(x, y, z) {
    let el = document.createElement('a-box');
    el.setAttribute('position', `${x} 1 ${z}`);
    el.setAttribute('depth', 1);
    el.setAttribute('height', 2);
    el.setAttribute('width', 1);
    // Optionally use a texture
    // el.setAttribute('src', '#wallTexture');
    el.setAttribute('color', '#444');
    scene.appendChild(el);
  }
}

class MazeTreasure {
  constructor(x, y, z) {
    let el = document.createElement('a-sphere');
    el.setAttribute('position', `${x} 1 ${z}`);
    el.setAttribute('radius', 0.5);
    el.setAttribute('color', '#FFD700');
    scene.appendChild(el);
  }
}

class MazeTrap {
  constructor(x, y, z) {
    let el = document.createElement('a-cone');
    el.setAttribute('position', `${x} 0.5 ${z}`);
    el.setAttribute('radius-bottom', 0.5);
    el.setAttribute('height', 1);
    el.setAttribute('color', '#FF3333');
    scene.appendChild(el);
  }
}


let scene;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  for(let r = 0; r < maze.length; r++){
    /* Challenge 3
      Choose a technique to traverse the each character in the string.
    */ window.addEventListener("DOMContentLoaded", function () {
  scene = document.querySelector("a-scene");
  for (let r = 0; r < maze.length; r++) {
    let row = maze[r];
    for (let c = 0; c < row.length; c++) {
      let char = row[c];
      let x = c - (row.length / 2);
      let z = r - (maze.length / 2);

      switch (char) {
        case "X":
          new MazeWall(x, 0, z);
          break;
        case "T":
          new MazeTreasure(x, 0, z);
          break;
        case "P":
          new MazeTrap(x, 0, z);
          break;
        // "S", "E", "-" are open spaces or can add entrance/exit markers if desired
      }
    }
  }
});

    /* Challenge 4
       Make an appropriate decision based on the characters you chose to enter 
       in the maze.  Create an instance of the corresponding object.
    */
  }

})