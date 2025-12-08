let rnd = (l,u) => Math.random() * (u-l) + l;
let scene, camera, bullet;
let enemies = [];
let ammo_boxes = [];
let ammo_count = 3;
let enemy_killed = 0;
let time_left = 60;
let gameOver = false;

window.addEventListener("DOMContentLoaded",function() {
  scene  = document.querySelector("a-scene");
  camera = document.querySelector("#playerCam");

  // create enemies and ammo boxes
  createEnemies();
  createAmmoBoxes();

  window.addEventListener("keydown",function(e){
    // spacebar and sufficient ammo
    if(e.key == " " && ammo_count > 0 && !gameOver){
      bullet = new Bullet();
      ammo_count--;
      updateHUD();
    }
  });

  setTimeout(loop,100);
  setTimeout(countdown,1000);
  updateHUD();
});

function createEnemies(){
  for(let i=0;i<5;i++){
    let enemy = document.createElement("a-box");
    enemy.setAttribute("color","red");
    enemy.setAttribute("depth",1);
    enemy.setAttribute("height",1);
    enemy.setAttribute("width",1);
    enemy.setAttribute("position",{
      x:rnd(-15,15),
      y:1,
      z:rnd(-15,-5)
    });
    scene.append(enemy);
    enemies.push(enemy);
  }
}

function createAmmoBoxes(){
  for(let i=0;i<4;i++){
    let box = document.createElement("a-box");
    box.setAttribute("color","blue");
    box.setAttribute("depth",0.7);
    box.setAttribute("height",0.7);
    box.setAttribute("width",0.7);
    box.setAttribute("position",{
      x:rnd(-15,15),
      y:0.5,
      z:rnd(-15,-5)
    });
    scene.append(box);
    ammo_boxes.push(box);
  }
}

function loop(){
  if(gameOver){
    return;
  }

  if(bullet){
    bullet.fire();
    checkBulletHits();
  }

  checkAmmoPickup();

  window.requestAnimationFrame(loop);
}

function countdown(){
  if(gameOver){
    return;
  }
  time_left--;
  updateHUD();

  if(time_left <= 0){
    checkWinLose(true);
    return;
  }
  setTimeout(countdown,1000);
}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;
  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}

// bullet vs enemies
function checkBulletHits(){
  for(let i=0;i<enemies.length;i++){
    let e = enemies[i];
    if(!e) continue;
    if(distance(bullet.obj,e) < 1.0){
      scene.removeChild(e);
      enemies[i] = null;
      scene.removeChild(bullet.obj);
      bullet = null;
      enemy_killed++;
      updateHUD();
      checkWinLose(false);
      break;
    }
  }
}

// player vs ammo boxes
function checkAmmoPickup(){
  for(let i=0;i<ammo_boxes.length;i++){
    let b = ammo_boxes[i];
    if(!b) continue;
    if(distance(camera,b) < 1.0){
      scene.removeChild(b);
      ammo_boxes[i] = null;
      ammo_count += 3;   // how much ammo per box
      updateHUD();
    }
  }
}

function updateHUD(){
  document.querySelector("#timerText")
          .setAttribute("value","Time: " + time_left);
  document.querySelector("#ammoText")
          .setAttribute("value","Ammo: " + ammo_count);
  document.querySelector("#killText")
          .setAttribute("value","Kills: " + enemy_killed);
}

function checkWinLose(timeExpired){
  let status = document.querySelector("#statusText");
  let remaining = enemies.filter(e => e !== null).length;

  if(remaining === 0 && !gameOver){
    status.setAttribute("value","YOU WIN");
    gameOver = true;
  }else if(timeExpired && remaining > 0 && !gameOver){
    status.setAttribute("value","YOU LOSE");
    gameOver = true;
  }
}