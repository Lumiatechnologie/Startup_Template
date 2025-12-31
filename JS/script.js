// Element selectors
let theme_btn = document.querySelector(".theme") // theme toggle button
let logo = document.querySelectorAll(".logo") // all logo images
let side_menu = document.querySelector("nav") // side navigation
let side_menu_btn = document.querySelector(".burger") // burger button
let header = document.querySelector("header") // page header
let header_container = document.querySelector("header div") // header inner container
let nav_ele = document.querySelectorAll("nav a") // nav links
let up_btn = document.querySelector(".to-up") // scroll to top button
let about_p2_text = document.querySelectorAll('#about .part-2 .text')
let fieldsets = document.querySelectorAll('#about fieldset')
let legends = document.querySelectorAll('#about legend')
let waves = document.querySelectorAll("#clients dotlottie-wc")

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

// Update logo based on theme
function pic_theme() {
    if (document.body.classList.contains("dark")) {
        logo.forEach(logo => {
            logo.src = "images/logo/logo.webp"
        })
        waves.forEach(wave => {
            wave.setAttribute("src", "https://lottie.host/8cf09fbc-1262-4ef5-984f-05ea9271e402/td2r9myQJW.lottie")
        })
    } else {
        logo.forEach(logo => {
            logo.src = "images/logo/logo-alt.webp"
        })
        waves.forEach(wave => {
            wave.setAttribute("src", "https://lottie.host/9b0c232b-0ac6-450c-99d4-eb6f52540074/BVKA5TUFwq.lottie")
        })
    }
}

// scroll to top
up_btn.addEventListener("click", () => {
    window.scrollTo(0, 0)
})

// toggle theme on click and save choice
theme_btn.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    theme_btn.classList.toggle("fi-rc-moon")
    theme_btn.classList.toggle("fi-rs-brightness")
    pic_theme()
    if (document.body.classList.contains("dark")) {
        localStorage.theme = "dark"
    } else {
        localStorage.theme = "light"
    }
})

// highlight active nav link
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

function side_menu_toggle(){
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

// header style on scroll
function HeaderEffect() {
    if (window.pageYOffset > 10) {
        header_container.classList.remove("py-6")
        header_container.classList.add("py-4")
        header.classList.add("backdrop-blur-sm", "shadow-md", "dark:bg-header-overlay")
    } else {
        header_container.classList.add("py-6")
        header_container.classList.remove("py-4")
        header.classList.remove("backdrop-blur-sm", "shadow-md", "dark:bg-header-overlay")
    }
}

window.addEventListener('scroll', HeaderEffect)

// Toggle accordion for about section Q&A
fieldsets.forEach(fieldset => {
    // Add click event listener to each legend element
    fieldset.addEventListener('click', () => {
        fieldset.classList.toggle('open');
        fieldset.classList.toggle('active');

        // Close other fieldsets when one opens with height animation
        fieldsets.forEach(fs => {
            if (fs !== fieldset) {
                fs.classList.remove('open');
                fs.classList.remove('active');
            }
        });
    });
});

// close video modal
// close_video.forEach(ele => {
//     ele.addEventListener("click", () => {
//         embed_video.classList.remove("opacity-100")
//         overlay.classList.remove("opacity-100")
//         embed_video.classList.add("opacity-0")
//         overlay.classList.add("opacity-0")
//         setTimeout(() => {
//             embed_video.classList.remove("flex")
//             embed_video.classList.add("hidden")
//             overlay.classList.add("hidden")
//             iframe.setAttribute('src', "https://www.youtube.com/embed/IxX_QHay02M?list=RDIxX_QHay02M");
//         }, 120);
//     })
// });

// // open video modal and autoplay
// play_btn.addEventListener("click", () => {
//     embed_video.classList.remove("hidden")
//     embed_video.classList.add("flex")
//     overlay.classList.remove("hidden")
//     setTimeout(() => {
//         embed_video.classList.remove("opacity-0")
//         overlay.classList.remove("opacity-0")
//         embed_video.classList.add("opacity-100")
//         overlay.classList.add("opacity-100")
//         iframe.setAttribute('src', "https://www.youtube.com/embed/IxX_QHay02M?list=RDIxX_QHay02M&autoplay=1&cc_load_policy=1&controls=1&disablekb=0&enablejsapi=0&fs=1&iv_load_policy=1&loop=0&rel=0&showinfo=1&start=0&wmode=transparent&theme=dark");
//     }, 120);
// })


