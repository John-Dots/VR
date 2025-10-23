class Tree{
  constructor(x,y,z){
    this.obj = document.createElement("a-entity");
  
    let pines = document.createElement("a-cone");
    pines.setAttribute("color","green");
    pines.setAttribute("position","0 1.5 0");
    pines.setAttribute("height","2");
    this.obj.append( pines );
  
    let stump = document.createElement("a-cylinder");
    stump.setAttribute("position","0 0 0");
    stump.setAttribute("color","brown");
    stump.setAttribute("radius","0.25");
    this.obj.append( stump );
  
    this.obj.setAttribute("position",{x:x, y:y, z:z});
    scene.append( this.obj )
  }
}
let rnd = (l, u) => Math.floor(Math.random() * (u - l) + l);
let scene;

window.addEventListener("DOMContentLoaded", function () {
  scene = document.querySelector("a-scene");

  
  for (let i = 0; i < 100; i++) {
    let x = rnd(-20, 20);
    let z = rnd(-20, 20);
    let tree = new Tree(x, 0, z);
  }

  // Add clouds
  for (let i = 0; i < 20; i++) {
    let x = rnd(-20, 20);
    let y = rnd(4, 10);   
    let z = rnd(-20, 20);
    new Cloud(x, y, z);
  }

  // Add houses
  for (let i = 0; i < 10; i++) {
    let x = rnd(-20, 20);
    let z = rnd(-20, 20);
    new House(x, 0, z);
  }
});

// Cloud class
class Cloud {
  constructor(x, y, z) {
    this.obj = document.createElement("a-entity");

    let main = document.createElement("a-sphere");
    main.setAttribute("radius", 0.7);
    main.setAttribute("color", "#fff");
    main.setAttribute("position", "0 0 0");
    this.obj.append(main);

    let fluff1 = document.createElement("a-sphere");
    fluff1.setAttribute("radius", 0.5);
    fluff1.setAttribute("color", "#eee");
    fluff1.setAttribute("position", "0.6 0.3 0.3");
    this.obj.append(fluff1);

    let fluff2 = document.createElement("a-sphere");
    fluff2.setAttribute("radius", 0.4);
    fluff2.setAttribute("color", "#eee");
    fluff2.setAttribute("position", "-0.5 0.2 0.2");
    this.obj.append(fluff2);

    this.obj.setAttribute("position", {x: x, y: y, z: z});
    scene.append(this.obj);
  }
}

class House {
  constructor(x, y, z) {
    this.obj = document.createElement("a-entity");

    let base = document.createElement("a-box");
    base.setAttribute("width", 2.4);
    base.setAttribute("height", 1.4);
    base.setAttribute("depth", 2);
    base.setAttribute("color", "#8B4513");
    base.setAttribute("position", "0 0.7 0");
    this.obj.append(base);

    let roof = document.createElement("a-cone");
    roof.setAttribute("radius-bottom", 1.7);
    roof.setAttribute("radius-top", 0);
    roof.setAttribute("height", 1.2);
    roof.setAttribute("color", "#CC0000");
    roof.setAttribute("position", "0 1.7 0");
    this.obj.append(roof);

    let door = document.createElement("a-box");
    door.setAttribute("width", 0.6);
    door.setAttribute("height", 0.9);
    door.setAttribute("depth", 0.1);
    door.setAttribute("color", "#FFF");
    door.setAttribute("position", "0 0.45 1.01");
    this.obj.append(door);

    this.obj.setAttribute("position", {x: x, y: y, z: z});
    scene.append(this.obj);
  }
}

for (let i = 0; i < 10; i++) {
  let x = rnd(5, 20); // shift to right - positive X only
  let z = rnd(-20, 20);
  new House(x, 0, z);
}


