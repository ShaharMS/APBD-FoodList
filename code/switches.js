function activateSwitches() {
    console.log("switches.js");

    /**
     * @type {HTMLSelectElement}
     */
    var sort = document.getElementById("sort-switch");
    if (new URLSearchParams(window.location.search).has('sort')) {
        const urlParams = new URLSearchParams(window.location.search);
        sort.value = urlParams.get('sort');
    }

    sort.addEventListener("change", function () {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('sort', sort.value);
        window.location.search = urlParams.toString();
        console.log(urlParams.toString());
    })


    /**
     * @type {HTMLSelectElement}
     */
    var language = document.getElementById("language-switch");
    if (new URLSearchParams(window.location.search).has('lang')) {
        const urlParams = new URLSearchParams(window.location.search);
        language.value = urlParams.get('lang');
    }

    language.addEventListener("change", function () {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('lang', language.value);
        window.location.search = urlParams.toString();
    })
}