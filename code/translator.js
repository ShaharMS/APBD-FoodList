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
    let languageIndex = index(lang)
    const response = await fetch(window.location.href.split("?")[0] + "/content/translations.txt")
    const text = await response.text()
    const matrix = text.split("⤓").map(x => x.split("¦"));

    let all = document.getElementsByTagName("*");
    for (let i = 0; i < all.length; i++) {
        let element = all[i];
        if (element.hasAttribute("ti")) {
            let wordIndex = parseInt(element.getAttribute("ti"));
            if (wordIndex >= matrix.length) continue;
            let translation = matrix[wordIndex][languageIndex];

            if (transRegex.test(element.textContent)) {
                while (transRegex.test(element.textContent)) {
                    element.textContent = element.textContent.replace(transRegex, translation);
                }
            } else element.textContent = translation;
        }
    }
            
}