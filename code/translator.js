/**
 * @type {string[][]}
 */
var translationMatrix = [];
var languageIndex = 0;

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

function translateCompanyName(companyName, languageIndex) {
    switch (companyName) {
        case "tara": return languageIndex == 0 ? "tara" : "טרה";
        case "tnuva": return languageIndex == 0 ? "tnuva" : "תנובה";
        case "gad": return languageIndex == 0 ? "gad" : "גד";
        case "shtrauss": return languageIndex == 0 ? "shtrauss" : "שטראוס";
        case "osem": return languageIndex == 0 ? "osem" : "אוסם";
        case "nestle": return languageIndex == 0 ? "nestle" : "נסטלה";
        case "feldman": return languageIndex == 0 ? "feldman" : "פלדמן";
        case "shufersal": return languageIndex == 0 ? "shufersal" : "שופרסל";
        case "coca-cola": return languageIndex == 0 ? "coca-cola" : "קוקה-קולה";
        case "pepsi": return languageIndex == 0 ? "pepsi" : "פפסי";
        case "blu": return languageIndex == 0 ? "blu" : "בלו";
        case "rami-levy": return languageIndex == 0 ? "rami levy" : "רמי לוי";
        case "sugat": return languageIndex == 0 ? "sugat" : "סוגת";
        case "unilever": return languageIndex == 0 ? "unilever" : "יונילבר";
        case "elit": return languageIndex == 0 ? "elit" : "עלית";
        case "burger-king": return languageIndex == 0 ? "burger king" : "בורגר קינג";
        case "mcdonalds": return languageIndex == 0 ? "McDonalds" : "מקדונלדס";
        case "roladin": return languageIndex == 0 ? "roladin" : "רולדין";
        case "soglowek": return languageIndex == 0 ? "soglowek" : "זוגלובק";
        case "hazi-hinam": return languageIndex == 0 ? "hazi hinam" : "חצי חינם";
        case "neto": return languageIndex == 0 ? "neto" : "נטו";
        default: return companyName
    }
}