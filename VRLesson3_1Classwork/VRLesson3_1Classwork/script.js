window.addEventListener("DOMContentLoaded", function() {
    let myBox = document.querySelector("#myBox"); // Task 3

    // Task 4: Height increases on mouseenter
    myBox.addEventListener("mouseenter", function() {
        this.setAttribute("height", 2);
    });

    // Task 4: Height resets to 1 on mouseleave
    myBox.addEventListener("mouseleave", function() {
        this.setAttribute("height", 1);
    });

    // Task 5: Disappear on click
    myBox.addEventListener("click", function() {
        this.setAttribute("opacity", 0);
    });
});
