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
            element.setAttribute("pre-ti", element.textContent);
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

/**
 * Translates a given string by replacing the words specified in the wordIndices array with their corresponding translations.
 *
 * @param {string} string - The string to be translated.
 * @param {number[]} wordIndices - An array of indices representing the positions of the words to be translated in the string.
 * @param {string} lang - The language code indicating the target language for translation.
 * @return {string} The translated string.
 */
function translateString(string, wordIndices, lang) {
    for (let wordIndex of wordIndices) {
        if (wordIndex >= translationMatrix.length) continue;
        let translation = translationMatrix[wordIndex][lang];

        if (transRegex.test(string)) {
            string = string.replace(transRegex, translation);
        } else string = translation;
    }

    return string
}

/**
 * @param {string} companyName 
 * @param {number} li 
 * @returns {string}
 */
function translateCompanyName(companyName, li) {
    switch (companyName) {
        case "tara":
        case "טרה": return li === 0 ? "tara" : "טרה";
        case "tnuva":
        case "תנובה": return li === 0 ? "tnuva" : "תנובה";
        case "gad":
        case "גד": return li === 0 ? "gad" : "גד";
        case "shtrauss":
        case "שטראוס": return li === 0 ? "shtrauss" : "שטראוס";
        case "osem":
        case "אוסם": return li === 0 ? "osem" : "אוסם";
        case "nestle":
        case "נסטלה": return li === 0 ? "nestle" : "נסטלה";
        case "feldman":
        case "פלדמן": return li === 0 ? "feldman" : "פלדמן";
        case "shufersal":
        case "שופרסל": return li === 0 ? "shufersal" : "שופרסל";
        case "coca-cola":
        case "coca cola":
        case "קוקה-קולה":
        case "קוקה קולה": return li === 0 ? "coca cola" : "קוקה קולה";
        case "pepsi":
        case "פפסי": return li === 0 ? "pepsi" : "פפסי";
        case "blu":
        case "בלו": return li === 0 ? "blu" : "בלו";
        case "rami-levy":
        case "rami levy":
        case "רמי-לוי":
        case "רמי לוי": return li === 0 ? "rami levy" : "רמי לוי";
        case "sugat":
        case "סוגת": return li === 0 ? "sugat" : "סוגת";
        case "unilever":
        case "יונילבר": return li === 0 ? "unilever" : "יונילבר";
        case "elit":
        case "עלית": return li === 0 ? "elit" : "עלית";
        case "burger-king":
        case "burger king":
        case "בורגר-קינג":
        case "בורגר קינג": return li === 0 ? "burger king" : "בורגר קינג";
        case "mcdonalds":
        case "מקדונלדס": return li === 0 ? "McDonalds" : "מקדונלדס";
        case "roladin":
        case "רולדין": return li === 0 ? "roladin" : "רולדין";
        case "soglowek":
        case "זוגלובק": return li === 0 ? "soglowek" : "זוגלובק";
        case "hazi-hinam":
        case "hazi hinam":
        case "חצי-חינם":
        case "חצי חינם" : return li === 0 ? "hazi hinam" : "חצי חינם";
        case "neto":
        case "נטו": return li === 0 ? "neto" : "נטו";
        case "gatorade":
        case "גיטורייד": return li === 0 ? "gatorade" : "גיטורייד";
        case "mars":
        case "מרס": return li === 0 ? "mars" : "מרס";
        case "monster":
        case "מאנסטר": return li === 0 ? "monster" : "מאנסטר";
        case "red-bull":
        case "red bull":
        case "רד-בול":
        case "רד בול": return li === 0 ? "red bull" : "רד בול";
        case "xl":
        case "אקסל": return li === 0 ? "xl" : "אקסל";
        case "barca":
        case "בארכה": return li === 0 ? "barca" : "בארכה";
        default: {
            console.log("company name not found: " + companyName);
            return companyName
        }
    }
}