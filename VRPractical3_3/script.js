let rnd = (l,u) => Math.random() * (u-l) + l;

let scene, camera, bullet = null;
let enemies = [];
let ammo_boxes = [];
let ammo_count = 3;
let enemy_killed = 0;
let time_left = 60;
let gameOver = false;

window.addEventListener("DOMContentLoaded",function() {
  scene  = document.querySelector("a-scene");
  camera = document.querySelector("#playerCam");

  createEnemies();
  createAmmoBoxes();
  updateHUD();

  window.addEventListener("keydown",function(e){
    if(e.key === " " && ammo_count > 0 && !gameOver){
      bullet = new Bullet();
      ammo_count--;
      updateHUD();
    }
  });

  setTimeout(loop,100);
  setTimeout(countdown,1000);
});

function createEnemies(){
  for(let i=0;i<5;i++){
    let enemy = document.createElement("a-box");
    enemy.setAttribute("color","red");
    enemy.setAttribute("width",1);
    enemy.setAttribute("height",1);
    enemy.setAttribute("depth",1);
    enemy.setAttribute("position",{
      x:rnd(-10,10),
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
    box.setAttribute("width",0.7);
    box.setAttribute("height",0.7);
    box.setAttribute("depth",0.7);
    box.setAttribute("position",{
      x:rnd(-10,10),
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
  let p1 = obj1.object3D.position;
  let p2 = obj2.object3D.position;
  let dx = p1.x - p2.x;
  let dy = p1.y - p2.y;
  let dz = p1.z - p2.z;
  return Math.sqrt(dx*dx + dy*dy + dz*dz);
}

// Bullet vs enemies
function checkBulletHits(){
  if(!bullet) return;

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

  // remove bullet if it goes too far
  if(bullet){
    if(Math.abs(bullet.obj.object3D.position.x) > 40 ||
       Math.abs(bullet.obj.object3D.position.z) > 40){
      scene.removeChild(bullet.obj);
      bullet = null;
    }
  }
}

// Camera vs ammo boxes
function checkAmmoPickup(){
  for(let i=0;i<ammo_boxes.length;i++){
    let box = ammo_boxes[i];
    if(!box) continue;

    if(distance(camera,box) < 2.0){   // easier pickup radius
      scene.removeChild(box);
      ammo_boxes[i] = null;
      ammo_count += 3;
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
