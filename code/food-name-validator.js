function activateFoodNameValidator() {
    /**
    * @type {HTMLInputElement}
    */
    const enField = document.getElementById("food-name-english");
    /**
     * @type {HTMLInputElement}
     */
    const heField = document.getElementById("food-name-hebrew");

    const enSpan = document.createElement("span");
    enSpan.classList.add("already-exists");
    const heSpan = document.createElement("span");
    heSpan.classList.add("already-exists");

    enField.parentElement.prepend(enSpan);
    heField.parentElement.prepend(heSpan);

    /**
     * @type {string[]}
     */
    var englishNames = [];
    /**
     * @type {string[]}
     */
    var hebrewNames = [];

    translationMatrix.forEach((x) => {
        englishNames.push(x[0].toLocaleUpperCase());
        hebrewNames.push(x[1]);
    });

    enField.addEventListener("input", (_) => {
        if (enField.value.length == 0) return;

        if (englishNames.includes(enField.value.trim().toLocaleUpperCase())) {
            enField.classList.add("already-exists");
            enSpan.innerHTML = translationMatrix[89][languageIndex];
        } else {
            enField.classList.remove("already-exists");
            enSpan.innerHTML = "";
        }
    });

    heField.addEventListener("input", (_) => {
        if (heField.value.length == 0) return;

        if (hebrewNames.includes(heField.value.trim())) {
            heSpan.innerHTML = translationMatrix[89][languageIndex];
            heField.classList.add("already-exists");
        } else {
            heField.classList.remove("already-exists");
        }
    });
}