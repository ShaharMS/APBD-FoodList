const parameters = new URLSearchParams(window.location.search);

let table = document.getElementById("food-list");

const response = await fetch(window.location.href.split("?")[0] + "/content/table.html")
const html = await response.text()
table.innerHTML = html
/**
 * @type {HTMLTableRowElement[]}
 */
let rows = Array.from(table.getElementsByTagName("tr"));
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

console.log("postprocessing table");

for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    if (cells.length > 0) {
        /**
         * @type {HTMLSpanElement}
         */
        let gl = cells[3].getElementsByTagName("span")[0].getElementsByTagName("span")[0];
        console.log(cells[3], gl);
        if (gl.innerText.includes(".")) {
            gl.innerText = gl.innerText.split(".")[0] + "." + gl.innerText.split(".")[1].substring(0, 2);
            if (gl.innerText.endsWith(".00")) gl.innerText = gl.innerText.substring(0, gl.innerText.length - 3);
            else if (gl.innerText.endsWith("0")) gl.innerText = gl.innerText.substring(0, gl.innerText.length - 1);
        }
    }
}

// All references are lost after postprocessing, except for the rows array

const TABLE = document.getElementById("food-list")
TABLE.innerHTML = rows.map(row => row.outerHTML).join("\n")
console.log("tables done, translating if needed");

activateSwitches()
activateSearchbar()
activateDropdowns()
if (!parameters.has("lang") || (parameters.has("lang") && parameters.get("lang") === "en")) {
    await translate("en");
} else await translate(parameters.get("lang"));