let transRegex = /{{(.*?)}}/;

function index(lang) {
    switch (lang) {
        case "en":
            return 0;
        case "he":
            return 1;
        default: return 0;
    }
}

/**
 * Translates the given language.
 *
 * @param {string} lang - The language to translate.
 */
async function translate(lang) {
    if (lang === "he") {
        document.body.setAttribute("dir", "rtl");
    }
    const response = await fetch(window.location.origin.split("?")[0] + "/content/translations.txt")
    const text = await response.text()
    const matrix = text.split("⤓").map(x => x.trimStart().split("¦"));
    // dropdowns.js is loaded before this, this is fine
    translationMatrix = matrix
    languageIndex = index(lang)

    let all = document.getElementsByTagName("*");
    for (let i = 0; i < all.length; i++) {
        let element = all[i];
        if (element.hasAttribute("ti")) {
            let wordIndices = element.getAttribute("ti").split(" ").map(x => parseInt(x));
            for (let wordIndex of wordIndices) {
                if (wordIndex >= matrix.length) continue;
                let translation = matrix[wordIndex][languageIndex];

                if (transRegex.test(element.textContent)) {
                    element.textContent = element.textContent.replace(transRegex, translation);
                } else element.textContent = translation;
            }            
        }
    }
            
}