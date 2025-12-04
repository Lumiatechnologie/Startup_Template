// Element selectors
let theme_btn = document.querySelector(".theme") // theme toggle button
let logo = document.querySelectorAll(".logo") // all logo images
let hero_1 = document.querySelector(".hero-1")
let hero_2 = document.querySelector(".hero-2")
let about_img_1 = document.querySelector(".about-img-1") // about image 1
let about_img_2 = document.querySelector(".about-img-2") // about image 2
let side_menu = document.querySelector("nav") // side navigation
let side_menu_btn = document.querySelector(".burger") // burger button
let header = document.querySelector("header") // page header
let header_container = document.querySelector("header div") // header inner container
let nav_ele = document.querySelectorAll("nav a") // nav links
let up_btn = document.querySelector(".to-up") // scroll to top button
let fieldsets = document.querySelectorAll('#about fieldset')
let legends = document.querySelectorAll('#about legend')
let close_video = document.querySelectorAll(".close-video") // video close buttons
let embed_video = document.querySelector(".embed") // video embed container
let iframe = document.querySelector("iframe") // video iframe
let play_btn = document.querySelector(".play-btn") // play video button
let overlay = document.querySelector(".overlay") // page overlay
let radio = document.querySelector(".radio") // subscription toggle
let sub_type = document.querySelectorAll(".sub-type span") // subscription labels
let radio_circle = document.querySelector(".outer-circle") // toggle circle
let price = document.querySelectorAll(".price h3") // price values
let price_period = document.querySelectorAll(".subs .price span") // price period labels

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

// Update images based on theme
function pic_theme() {
    if (!document.body.classList.contains("dark")) {
        logo.forEach(logo => {
            logo.src = "images/logo/logo-alt.png"
        })
        about_img_1.src = "images/about/about-image.svg"
        about_img_2.src = "images/about/about-image-2.svg"
        // hero_1.src = "images/hero/shape-1.svg"
        // hero_2.src = "images/hero/shape-2.svg"
    } else {
        logo.forEach(logo => {
            logo.src = "images/logo/logo.png"
        })
        about_img_1.src = "images/about/about-image-dark.svg"
        about_img_2.src = "images/about/about-image-2-dark.svg"
        // hero_1.src = "images/hero/shape-1-dark.svg"
        // hero_2.src = "images/hero/shape-2-dark.svg"
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
    if (!document.body.classList.contains("dark")) {
        localStorage.theme = "light"
    } else {
        localStorage.theme = "dark"
    }
})

// highlight active nav link
nav_ele.forEach(ele => {
    ele.addEventListener("click", () => {
        nav_ele.forEach(a => {
            a.classList.remove("active")
        })
        ele.classList.add("active")
    })
})

// open/close side menu (mobile)
side_menu_btn.addEventListener("click", () => {
    if (side_menu.classList.contains("max-[992px]:hidden")) {
        side_menu.classList.toggle("max-[992px]:hidden")
        setTimeout(() => {
            side_menu.classList.toggle("max-[992px]:opacity-0")
            side_menu.classList.toggle("max-[992px]:opacity-100")
        }, 150);
    } else {
        side_menu.classList.toggle("max-[992px]:opacity-0")
        side_menu.classList.toggle("max-[992px]:opacity-100")
        setTimeout(() => {
            side_menu.classList.toggle("max-[992px]:hidden")
        }, 150);
    }
})

// header style on scroll
function HeaderEffect() {
    if (window.pageYOffset > 10) {
        header_container.classList.remove("py-6")
        header_container.classList.add("tb:py-3", "py-4")
        header.classList.add("backdrop-blur-sm", "bg-opacity-20", "shadow-md", "dark:bg-header-overlay")
    } else {
        header_container.classList.add("py-6")
        header_container.classList.remove("tb:py-3", "py-4")
        header.classList.remove("backdrop-blur-sm", "bg-opacity-20", "shadow-md", "dark:bg-header-overlay")
    }
}

window.addEventListener('scroll', HeaderEffect)

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

// Toggle accordion for about section Q&A
legends.forEach(legend => {
    // Add click event listener to each legend element
    legend.addEventListener('click', () => {
        // Find the closest fieldset parent and toggle the 'open' class
        const fieldset = legend.closest('fieldset');
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

// toggle subscription type and update prices
radio.addEventListener("click", () => {
    radio_circle.classList.toggle("left-0")
    radio_circle.classList.toggle("left-[50%]")

    sub_type.forEach(ele => {
        ele.classList.toggle("active")
    })

    price_period.forEach(ele => {
        if (sub_type[1].classList.contains("active")) {
            ele.textContent = "/yr"
        } else {
            ele.textContent = "/mo"
        }
    })

    price.forEach(ele => {
        let basePrice = parseInt(ele.textContent);
        if (sub_type[1].classList.contains("active")) {
            ele.textContent = Math.round(basePrice + 157);
        } else {
            ele.textContent = Math.round(basePrice - 157);
        }
    })
})