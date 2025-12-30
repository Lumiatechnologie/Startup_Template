// Element selectors
let theme_btn = document.querySelector(".theme") // theme button
let logo = document.querySelectorAll(".logo") // logo images
let side_menu = document.querySelector("nav") // side nav
let side_menu_btn = document.querySelector(".burger") // burger button
let header = document.querySelector("header") // page header
let header_container = document.querySelector("header div") // header inner container
let nav_ele = document.querySelectorAll("nav a") // nav links
let check = document.querySelector(".check") // custom checkbox wrapper
let check_icon = document.querySelector(".checkbox ion-icon") // check icon

// Initialize theme from localStorage
if (localStorage.theme == "light") {
    document.body.classList.remove("dark")
    pic_theme()
    theme_btn.classList.remove("fi-rc-moon")
    theme_btn.classList.add("fi-rs-brightness")
} else {
    document.body.classList.add("dark")
    pic_theme()
    theme_btn.classList.add("fi-rc-moon")
    theme_btn.classList.remove("fi-rs-brightness")
}

// Update logos based on theme
function pic_theme() {
    if (document.body.classList.contains("dark")) {
        logo.forEach(logo => {
            logo.src = "images/logo/logo.webp" // light logo
        })
    } else {
        logo.forEach(logo => {
            logo.src = "images/logo/logo-alt.webp" // dark logo
        })
    }
}

// Toggle theme on click and save choice
theme_btn.addEventListener("click", () => {
    document.body.classList.toggle("dark") // flip theme
    theme_btn.classList.toggle("fi-rc-moon") // toggle icon class
    theme_btn.classList.toggle("fi-rs-brightness") // toggle icon class
    pic_theme() // update logos
    if (document.body.classList.contains("dark")) {
        localStorage.theme = "dark" // persist choice
    } else {
        localStorage.theme = "light" // persist choice
    }
})

// Highlight active nav link on click
nav_ele.forEach(ele => {
    ele.addEventListener("click", () => {
        nav_ele.forEach(a => {
            a.classList.remove("active")
        })
        ele.classList.add("active")
        side_menu_toggle()
    })
})

// open/close side menu (mobile)
side_menu_btn.addEventListener("click", side_menu_toggle)

function side_menu_toggle() {
    if (side_menu.classList.contains("max-[1200px]:hidden")) {
        side_menu.classList.toggle("max-[1200px]:hidden")
        setTimeout(() => {
            side_menu.classList.toggle("max-[1200px]:opacity-0")
            side_menu.classList.toggle("max-[1200px]:opacity-100")
        }, 150);
    } else {
        side_menu.classList.toggle("max-[1200px]:opacity-0")
        side_menu.classList.toggle("max-[1200px]:opacity-100")
        setTimeout(() => {
            side_menu.classList.toggle("max-[1200px]:hidden")
        }, 150);
    }
}

// Header style change on scroll
function HeaderEffect() {
    if (window.pageYOffset > 10) {
        header_container.classList.remove("py-6") // reduce padding
        header_container.classList.add("py-4") // smaller padding
        header.classList.add("backdrop-blur-sm", "bg-opacity-20", "shadow-md", "dark:bg-header-overlay") // add styles
    } else {
        header_container.classList.add("py-6") // restore padding
        header_container.classList.remove("py-4") // remove small padding
        header.classList.remove("backdrop-blur-sm", "bg-opacity-20", "shadow-md", "dark:bg-header-overlay") // remove styles
    }
}

window.addEventListener('scroll', HeaderEffect) // run on scroll