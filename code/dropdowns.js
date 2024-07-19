/**
 * @type {string[][]}
 */
var translationMatrix = [];
var languageIndex = 0;
function activateDropdowns() {
    let about = document.getElementById("about");
    let contribute = document.getElementById("contribute");
    let contact = document.getElementById("contact");
    
    let aboutMenu = document.getElementById("about-menu");
    let contributeMenu = document.getElementById("contribute-menu");
    let contactMenu = document.getElementById("contact-menu");


    const showAboutMenu = (e) => {console.log("show about");
        aboutMenu.style.display = "block";
    }

    const hideAboutMenu = (e) => {console.log("hide about");
        aboutMenu.style.display = "none";
    }

    const switchAboutMenu = (e) => {console.log("switch about");
        hideContributeMenu();
        hideContactMenu();
        if (aboutMenu.style.display == "block") {
            hideAboutMenu();
        } else {
            showAboutMenu();
        }
    }

    const showContributeMenu = (e) => {console.log("show trib");
        contributeMenu.style.display = "block";
    }

    const hideContributeMenu = (e) => {console.log("hide trib");
        contributeMenu.style.display = "none";
    }

    const switchContributeMenu = (e) => {console.log("switch trib");
        hideContactMenu();
        hideAboutMenu();
        if (contributeMenu.style.display == "block") {
            hideContributeMenu();
        } else {
            showContributeMenu();
        }
    }   

    const showContactMenu = (e) => {console.log("show contact");
        contactMenu.style.display = "block";
    }

    const hideContactMenu = (e) => {console.log("hide contact");
        contactMenu.style.display = "none";
    }

    const switchContactMenu = (e) => {console.log("switch contact");
        hideContributeMenu();
        hideAboutMenu();
        if (contactMenu.style.display == "block") {
            hideContactMenu();
        } else {
            showContactMenu();
        }
    }


    about.addEventListener("mouseenter", showAboutMenu)
    aboutMenu.addEventListener("mouseenter", showAboutMenu)
    aboutMenu.addEventListener("mouseleave", hideAboutMenu)
    about.addEventListener("mouseleave", hideAboutMenu)

    contribute.addEventListener("mouseenter", showContributeMenu)
    contributeMenu.addEventListener("mouseenter", showContributeMenu)
    contributeMenu.addEventListener("mouseleave", hideContributeMenu)
    contribute.addEventListener("mouseleave", hideContributeMenu)

    contact.addEventListener("mouseenter", showContactMenu)
    contactMenu.addEventListener("mouseenter", showContactMenu)
    contactMenu.addEventListener("mouseleave", hideContactMenu)
    contact.addEventListener("mouseleave", hideContactMenu)


    about.addEventListener("touchstart", switchAboutMenu, {passive: true})
    contribute.addEventListener("touchstart", switchContributeMenu, {passive: true})
    contact.addEventListener("touchstart", switchContactMenu, {passive: true})


    // Discord button
    let discord = document.getElementById("discord");
    discord.onclick = () => {
        discord.textContent = translationMatrix[36][languageIndex] + "!"

        setTimeout(() => {
            discord.textContent = translationMatrix[35][languageIndex] + ": shaharms"
        }, 1000)
    }
}