class Ball{
  constructor(x,y,z){
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("radius","0.5");
    //Challenge 1: Make the ball a dynamic body
    let r = Math.floor(rnd(0,255));
    let g = Math.floor(rnd(0,255));
    let b = Math.floor(rnd(0,255));
    this.obj.setAttribute("color",`rgb(${r},${g},${b})`);

    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);

  }
}