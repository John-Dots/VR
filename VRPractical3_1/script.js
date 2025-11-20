let carousel,balloon1,balloon2,surpriseBox;

window.addEventListener("DOMContentLoaded",function() {
  carousel = document.getElementById("carousel-arms");
  carousel.r = 0;
  carousel.dr = 1;
  carousel.rotate = false;

  balloon1 = document.getElementById("balloon1"); //blue
  let pos1 = balloon1.getAttribute("position");
  balloon1.x = pos1.x;
  balloon1.y = pos1.y;
  balloon1.z = pos1.z;
  balloon1.dy = -0.05;
  balloon1.fall = false;

  surpriseBox = document.getElementById("surpriseBox");

  balloon2 = document.getElementById("balloon2"); //Yellow
  let pos2 = balloon2.getAttribute("position");
  balloon2.x = pos2.x;
  balloon2.y = pos2.y;
  balloon2.z = pos2.z;
  balloon2.dy = 0.02;
  balloon2.fly = false;

  carousel.addEventListener("mouseenter", function() { carousel.rotate = true; });
  carousel.addEventListener("mouseleave", function() { carousel.rotate = false; });
  balloon1.addEventListener("click", function() { balloon1.fall = true; });
  surpriseBox.addEventListener("click", function() { balloon2.fly = true; });

  loop();
});

function loop(){
  if(carousel.rotate){
    carousel.r += carousel.dr;
    carousel.setAttribute("rotation",{x:0, y:0, z: carousel.r});
  }
  if(balloon1.fall){
    balloon1.y += balloon1.dy;
    balloon1.setAttribute("position", {x: balloon1.x, y: balloon1.y, z: balloon1.z});
  }
  if(balloon2.fly){
    balloon2.y += balloon2.dy;
    balloon2.setAttribute("position", {x: balloon2.x, y: balloon2.y, z: balloon2.z});
  }
  window.requestAnimationFrame( loop );
}
