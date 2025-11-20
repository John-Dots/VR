// Initialize flags
carousel.rotate = false;
balloon1.fall = false;
balloon2.fly = false;

// Carousel mouse events
carousel.addEventListener("mouseenter", function() {
    carousel.rotate = true;
});
carousel.addEventListener("mouseleave", function() {
    carousel.rotate = false;
});

// Balloon1 click event for falling
balloon1.addEventListener("click", function() {
    balloon1.fall = true;
});

// SurpriseBox click event for balloon2 flying
surpriseBox.addEventListener("click", function() {
    balloon2.fly = true;
});

function loop() {
    if (carousel.rotate) {
        carousel.r += carousel.dr;
        carousel.setAttribute("rotation", {x:0, y:0, z: carousel.r});
    }
    if (balloon1.fall) {
        balloon1.y -= balloon1.dy; // Ballon falls by decreasing y
        balloon1.setAttribute("position", {x: balloon1.x, y: balloon1.y, z: balloon1.z});
    }
    if (balloon2.fly) {
        balloon2.y += balloon2.dy; // Ballon2 flies up by increasing y
        balloon2.setAttribute("position", {x: balloon2.x, y: balloon2.y, z: balloon2.z});
    }

    window.requestAnimationFrame(loop);
}
