/**
 * @type {string[][]}
 */
var translationMatrix = [];
var languageIndex = 0;
function activateDropdowns() {
    let contribute = document.getElementById("contribute");
    let contributeBounds = contribute.getBoundingClientRect();
    
    let contact = document.getElementById("contact");
    let contactBounds = contact.getBoundingClientRect();

    let contributeMenu = document.getElementById("contribute-menu");
    let contactMenu = document.getElementById("contact-menu");

    const showContributeMenu = (e) => {console.log("show trib");
        contributeMenu.style.display = "block";
    }

    const hideContributeMenu = (e) => {console.log("hide trib");
        contributeMenu.style.display = "none";
    }

    const switchContributeMenu = (e) => {console.log("switch trib");
        hideContactMenu();
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
        if (contactMenu.style.display == "block") {
            hideContactMenu();
        } else {
            showContactMenu();
        }
    }

    contribute.addEventListener("mouseenter", showContributeMenu)
    contributeMenu.addEventListener("mouseenter", showContributeMenu)
    contributeMenu.addEventListener("mouseleave", hideContributeMenu)
    contribute.addEventListener("mouseleave", hideContributeMenu)

    contribute.addEventListener("touchstart", switchContributeMenu, {passive: true})
    contact.addEventListener("touchstart", switchContactMenu, {passive: true})

    contact.addEventListener("mouseenter", showContactMenu)
    contactMenu.addEventListener("mouseenter", showContactMenu)
    contactMenu.addEventListener("mouseleave", hideContactMenu)
    contact.addEventListener("mouseleave", hideContactMenu)

    // Discord button
    let discord = document.getElementById("discord");
    discord.onclick = () => {
        discord.textContent = translationMatrix[36][languageIndex] + "!"

        setTimeout(() => {
            discord.textContent = translationMatrix[35][languageIndex] + ": shaharms"
        }, 1000)
    }
}