var button = document.querySelectorAll(".point-button"),
    c2a = document.querySelectorAll(".btn .c2a");
console.log(c2a)
for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function () {
        c2a[i].classList.toggle("show")
    }, false);
}