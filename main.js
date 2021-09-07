let toggleIcon = document.querySelector("#toggle-icon")

toggleIcon.onclick = function () {
    document.body.classList.toggle("dark_mode")
    let x = window.matchMedia("(max-width: 750px)")
    if (x.matches) {
        if (document.body.classList.contains("dark_mode")) {
            toggleIcon.src = "./images/icon-sun.svg"
            document.body.style.backgroundImage = 'url("./images/bg-mobile-dark.jpg")'
        } else {
            toggleIcon.src = "./images/icon-moon.svg"
            document.body.style.backgroundImage = 'url("./images/bg-mobile-light.jpg")'
        }
    } else {
        if (document.body.classList.contains("dark_mode")) {
            toggleIcon.src = "./images/icon-sun.svg"
            document.body.style.backgroundImage = 'url("./images/bg-desktop-dark.jpg")'
        } else {
            toggleIcon.src = "./images/icon-moon.svg"
            document.body.style.backgroundImage = 'url("./images/bg-desktop-light.jpg")'
        }
    }
}
