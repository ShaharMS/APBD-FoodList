switch (LANGUAGE) {
    case "en": document.getElementById("loading-details").innerHTML = "Script Started. Retrieving Table..."; break;
    case "he": document.getElementById("loading-details").innerHTML = "הקוד הופעל. מנסה להשיג מידע.&rlm;.&rlm;.&rlm;"; break;
}

const parameters = new URLSearchParams(window.location.search);

/**
 * @type {HTMLTableElement}
 */
let table = document.getElementById("food-list");

const response = await fetch(window.location.origin + "/content/table.html")
const html = await response.text()
table.innerHTML = html

switch (LANGUAGE) {
    case "en": document.getElementById("loading-details").innerHTML = "Table Retrieved. Translating..."; break;
    case "he": document.getElementById("loading-details").innerHTML = "המידע הושג. מתרגם רשימה.&rlm;.&rlm;.&rlm;"; break;
}

// First Rests - every time table.innerHTML is set, all references are lost.

/**
 * @type {HTMLTableRowElement[]}
 */
let rows = Array.from(table.getElementsByTagName("tr"));

table = document.getElementById("food-list")
table.style.display = "none"

console.log("tables done, translating if needed");

activateSwitches()
activateSearchbar()
activateDropdowns()
if (!parameters.has("lang") || (parameters.has("lang") && parameters.get("lang") === "en")) {
    await translate("en");
} else await translate(parameters.get("lang"));


switch (LANGUAGE) {
    case "en": document.getElementById("loading-details").innerHTML = "Table Translated. Sorting table..."; break;
    case "he": document.getElementById("loading-details").innerHTML = "הרשימה תורגמה. ממיין רשימה.&rlm;.&rlm;.&rlm;"; break;
}

// Second Reset - translate sets innerHTML as well

table = document.getElementById("food-list");
rows = Array.from(table.getElementsByTagName("tr"));

// Post-process th table

// Sort if needed
if (parameters.has("sort")) {

    console.log("Sorting by " + parameters.get("sort"));
    let header = rows.shift();
    let sort = parameters.get("sort");
    switch (sort) {
        case "name-d": {
            rows.sort((a, b) => {
                let aName = a.getElementsByTagName("td")[0].innerText;
                let bName = b.getElementsByTagName("td")[0].innerText;
                if (aName > bName) return 1;
                if (aName < bName) return -1;
                return 0;
            });
            break;
        }
        case "name-u": {
            rows.sort((a, b) => {
                let aName = a.getElementsByTagName("td")[0].innerText;
                let bName = b.getElementsByTagName("td")[0].innerText;
                if (aName < bName) return 1;
                if (aName > bName) return -1;
                return 0;
            });
            break;
        }
        case "glycemic-index-d": {
            rows.sort((a, b) => {
                let aIndex = parseFloat(a.getElementsByTagName("td")[2].getElementsByTagName("span")[0].innerText);
                let bIndex = parseFloat(b.getElementsByTagName("td")[2].getElementsByTagName("span")[0].innerText);
                if (aIndex == -1 && bIndex == -1) return 0;
                if (aIndex == -1) return 1;
                if (bIndex == -1) return -1;
                if (aIndex > bIndex) return 1;
                if (aIndex < bIndex) return -1;
                return 0;
            });
            break;
        }
        case "glycemic-index-u": {
            rows.sort((a, b) => {
                let aIndex = parseFloat(a.getElementsByTagName("td")[2].getElementsByTagName("span")[0].innerText);
                let bIndex = parseFloat(b.getElementsByTagName("td")[2].getElementsByTagName("span")[0].innerText);
                if (aIndex == -1 && bIndex == -1) return 0;
                if (aIndex == -1) return 1;
                if (bIndex == -1) return -1;
                if (aIndex < bIndex) return 1;
                if (aIndex > bIndex) return -1;
                return 0;
            });
            break;
        }
        case "glycemic-load-d": {
            rows.sort((a, b) => {
                let aLoad = parseFloat(a.getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerText);
                let bLoad = parseFloat(b.getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerText);
                if (aLoad < 0 && bLoad < 0) return 0;
                if (aLoad < 0) return 1;
                if (bLoad < 0) return -1;
                if (aLoad > bLoad) return 1;
                if (aLoad < bLoad) return -1;
                return 0;
            });
            break;
        }
        case "glycemic-load-u": {
            rows.sort((a, b) => {
                let aLoad = parseFloat(a.getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerText);
                let bLoad = parseFloat(b.getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerText);
                if (aLoad < 0 && bLoad < 0) return 0;
                if (aLoad < 0) return 1;
                if (bLoad < 0) return -1;
                if (aLoad < bLoad) return 1;
                if (aLoad > bLoad) return -1;
                return 0;
            });
            break;
        }
        case "sugars-d": {
            rows.sort((a, b) => {
                let aSugars = parseFloat(a.getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerText);
                let bSugars = parseFloat(b.getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerText);
                if (aSugars < 0 && bSugars < 0) return 0;
                if (aSugars < 0) return 1;
                if (bSugars < 0) return -1;
                if (aSugars > bSugars) return 1;
                if (aSugars < bSugars) return -1;
                return 0;
            });
            break;
        }
        case "sugars-u": {
            rows.sort((a, b) => {
                let aSugars = parseFloat(a.getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerText);
                let bSugars = parseFloat(b.getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerText);
                if (aSugars < 0 && bSugars < 0) return 0;
                if (aSugars < 0) return 1;
                if (bSugars < 0) return -1;
                if (aSugars < bSugars) return 1;
                if (aSugars > bSugars) return -1;
                return 0;
            });
            break;
        }
        case "carbs-d": {
            rows.sort((a, b) => {
                let aCarbs = parseFloat(a.getElementsByTagName("td")[5].getElementsByTagName("span")[0].innerText);
                let bCarbs = parseFloat(b.getElementsByTagName("td")[5].getElementsByTagName("span")[0].innerText);
                if (aCarbs < 0 && bCarbs < 0) return 0;
                if (aCarbs < 0) return 1;
                if (bCarbs < 0) return -1;
                if (aCarbs > bCarbs) return 1;
                if (aCarbs < bCarbs) return -1;
                return 0;
            });
            break;
        }
        case "carbs-u": {
            rows.sort((a, b) => {
                let aCarbs = parseFloat(a.getElementsByTagName("td")[5].getElementsByTagName("span")[0].innerText);
                let bCarbs = parseFloat(b.getElementsByTagName("td")[5].getElementsByTagName("span")[0].innerText);
                if (aCarbs < 0 && bCarbs < 0) return 0;
                if (aCarbs < 0) return 1;
                if (bCarbs < 0) return -1;
                if (aCarbs < bCarbs) return 1;
                if (aCarbs > bCarbs) return -1;
                return 0;
            });
            break;
        }
        default: break;
    }
    rows.unshift(header);
}

table.innerHTML = rows.map(x => x.outerHTML).join("\n");

switch (LANGUAGE) {
    case "en": document.getElementById("loading-details").innerHTML = "Table Sorted. Adding Metadata..."; break;
    case "he": document.getElementById("loading-details").innerHTML = "הרשימה ממוינת. מוסיף מטא-דאטא.&rlm;.&rlm;.&rlm;"; break;
}

// Third Reset - innerHTML of table is set, rows var is lost.

rows = Array.from(table.getElementsByTagName("tr"));

console.log("postprocessing table");

// Add meta-data
/*
 - Floating Point Errors
 - less/more than signs (< or >, `less-than` or `more-than`)
 - Estimated values (~) (`inaccurate`)
 - Attach approximated value indicator (todo) (`approximated`)
 - Attach company name + image (`company="..."`)
 - Attach danger notes (`danger="..."`)
*/
let pre = document.createElement("p"); //Global creating is easier
pre.style.width = "min(150px, 20vw)";
pre.style.position = "absolute";
pre.style.zIndex = "1000";
pre.style.display = "none";
pre.style.fontSize = "0.8em";
pre.style.backgroundColor = "#222222";
pre.style.border = "2px solid gray";
pre.style.borderRadius = "5px";
pre.style.padding = "5px";
pre.style.display = "none";
document.body.append(pre);

for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    if (cells.length > 0) {

        function fixFloatingPoint() {
            let gl = cells[3].getElementsByTagName("span")[0].getElementsByTagName("span")[0];
            let sugar = cells[4].getElementsByTagName("span")[0];
            let carbs = cells[5].getElementsByTagName("span")[0];

            if (gl.innerText.includes(".")) {
                gl.innerText = gl.innerText.split(".")[0] + "." + gl.innerText.split(".")[1].substring(0, 3);
                if (gl.innerText.endsWith(".000")) gl.innerText = gl.innerText.substring(0, gl.innerText.length - 4);
                if (gl.innerText.endsWith("00")) gl.innerText = gl.innerText.substring(0, gl.innerText.length - 2);
                else if (gl.innerText.endsWith("0")) gl.innerText = gl.innerText.substring(0, gl.innerText.length - 1);
            }
            if (sugar.innerText.includes(".")) {
                sugar.innerText = sugar.innerText.split(".")[0] + "." + sugar.innerText.split(".")[1].substring(0, 3);
                if (sugar.innerText.endsWith(".000")) sugar.innerText = sugar.innerText.substring(0, sugar.innerText.length - 4);
                else if (sugar.innerText.endsWith("00")) sugar.innerText = sugar.innerText.substring(0, sugar.innerText.length - 2);
                else if (sugar.innerText.endsWith("0")) sugar.innerText = sugar.innerText.substring(0, sugar.innerText.length - 1);
            }
            if (carbs.innerText.includes(".")) {
                carbs.innerText = carbs.innerText.split(".")[0] + "." + carbs.innerText.split(".")[1].substring(0, 3);
                if (carbs.innerText.endsWith(".000")) carbs.innerText = carbs.innerText.substring(0, carbs.innerText.length - 4);
                else if (carbs.innerText.endsWith("00")) carbs.innerText = carbs.innerText.substring(0, carbs.innerText.length - 2);
                else if (carbs.innerText.endsWith("0")) carbs.innerText = carbs.innerText.substring(0, carbs.innerText.length - 1);
            }
        }
        fixFloatingPoint();

        let input = cells[0].getElementsByTagName("input")[0];
        input.addEventListener("change", fixFloatingPoint);

        // Get the "gi", "gl", "sugar" and "carbs" spans
        let gi = cells[2].getElementsByTagName("span")[0];
        let gl = cells[3].getElementsByTagName("span")[0];
        let sugar = cells[4].getElementsByTagName("span")[0];
        let carbs = cells[5].getElementsByTagName("span")[0];


        // Add actual meta-data
        let elements = [gi, gl, sugar, carbs];
        for (let element of elements) {
            if (parseFloat(element.innerText) < 0) {
                let par = document.createElement("span");
                par.innerText = translationMatrix[88][languageIndex];
                par.style.color = "gray";
                element.style.display = "none";
                element.after(par)
            } else if (element.hasAttribute("inaccurate")) {
                let par = document.createElement("span");
                par.innerText = "~"
                par.style.marginInlineStart = "0";
                element.after(par)
            } else if (element.hasAttribute("less-than")) {
                let par = document.createElement("span");
                par.innerText = "<"
                par.style.marginInlineStart = "0";
                element.before(par)
            } else if (element.hasAttribute("more-than")) {
                let par = document.createElement("span");
                par.innerText = "<"
                par.style.marginInlineStart = "0";
                element.after(par)
            } else if (element.hasAttribute("danger")) {
                let par = document.createElement("span");
                par.innerText = "!"
                par.style.color = "red";
                par.style.fontWeight = "900"
                par.style.marginInlineStart = "0";
                element.after(par)
                if (element.getElementsByTagName("span").length == 0) element.style.cssText += "color: red;"
                else element.getElementsByTagName("span")[0].style.cssText += "color: red;"
                let text = translationMatrix[element.getAttribute("danger")][languageIndex];

                element.addEventListener("mouseover", function () {
                    pre.textContent = text;
                    pre.style.top = `${element.getBoundingClientRect().y}px`;
                    pre.style.left = `${element.getBoundingClientRect().x}px`;
                    pre.style.display = "block";
                });
                par.addEventListener("mouseover", function () {
                    pre.textContent = text;
                    pre.style.top = `${element.getBoundingClientRect().y}px`;
                    pre.style.left = `${element.getBoundingClientRect().x}px`;
                    pre.style.display = "block";
                })
                element.addEventListener("mouseleave", function () {
                    pre.style.display = "none";
                });
                par.addEventListener("mouseleave", function () {
                    pre.style.display = "none";
                })
                element.addEventListener("touchstart", function () {
                    console.log("touchstart");
                    pre.textContent = text;
                    pre.style.top = `${element.getBoundingClientRect().y}px`;
                    pre.style.left = `${element.getBoundingClientRect().x}px`;
                    if (pre.focused === element) {
                        pre.style.display = "none";
                        pre.focused = null;
                    } else {
                        pre.focused = element;
                        pre.style.display = "block";
                    }

                })

                document.body.append(pre);
            }
        }

        let name = cells[1];
        if (name.hasAttribute("company")) {
            name.style.display = "flex";
            name.style.alignItems = "center";

            let companyName = name.getAttribute("company")
            let companyImg = document.createElement("img");

            companyImg.crossOrigin = "Anonymous";
            companyImg.style.height = "1.2em";
            companyImg.style.display = "inline";
            companyImg.src = window.location.origin + `/assets/logos/${companyName}.png`;
            companyImg.alt = companyName + " Logo";
            companyImg.style.paddingInlineEnd = "0.5rem";

            companyImg.onerror = function () {
                companyImg.src = window.location.origin + "/assets/logos/default.png";
            }

            name.prepend(companyImg);

            if (window.innerWidth > 700) {
                let par = document.createElement("span");
                par.innerText = translateCompanyName(companyName, languageIndex) + ":";
                par.style.color = "gray";
                par.style.paddingInlineEnd = "0.5rem";
                par.style.textTransform = "capitalize";
                companyImg.after(par);
            }
        }
    }
}

switch (LANGUAGE) {
    case "en": document.getElementById("loading-details").innerHTML = "Table built successfully!"; break;
    case "he": document.getElementById("loading-details").innerHTML = "רשימה נבנתה בהצלחה!&rlm;"; break;
}


clearInterval(INTERVAL);
for (let id of ["loading-h1", "loading-details", "loading-p"]) {
    document.getElementById(id).style.display = "none";
}
table.style.display = "table";