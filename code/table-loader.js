const parameters = new URLSearchParams(window.location.search);

/**
 * @type {HTMLTableElement}
 */
let table = document.getElementById("food-list");

const response = await fetch(window.location.origin + "/content/table.html")
const html = await response.text()
table.innerHTML = html
/**
 * @type {HTMLTableRowElement[]}
 */
let rows = Array.from(table.getElementsByTagName("tr"));

const TABLE = document.getElementById("food-list")
TABLE.innerHTML = rows.map(row => row.outerHTML).join("\n")
console.log("tables done, translating if needed");

activateSwitches()
activateSearchbar()
activateDropdowns()
if (!parameters.has("lang") || (parameters.has("lang") && parameters.get("lang") === "en")) {
    await translate("en");
} else await translate(parameters.get("lang"));

// translate resets HTML references

table = document.getElementById("food-list");
rows = Array.from(table.getElementsByTagName("tr"));

// Post-process th table

// Sort if needed
if (parameters.has("sort")) {

    /**
     * Sorts the rows of a table based on a provided predicate function.
     *
     * @param {HTMLTableElement} table - The table to sort.
     * @param {(a: HTMLTableRowElement, b: HTMLTableRowElement) => number} predicate - The function used to determine the sort order.
     * @return {void} This function does not return a value.
     */
    function sortTable(table, predicate) {
        var rs = Array.from(table.rows).slice(1); // Convert rows collection to array, excluding header row
        rs.sort(predicate); // Sort rows array using the provided predicate function

        // Clear the existing table body
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        // Re-append sorted rows to the table
        rs.forEach(function (row) {
            table.tBodies[0].appendChild(row);
        });
    }

    console.log("Sorting by " + parameters.get("sort"));
    let header = rows.shift();
    let sort = parameters.get("sort");
    switch (sort) {
        case "name-d": {
            sortTable(table, (a, b) => {
                let aName = a.getElementsByTagName("td")[0].innerText;
                let bName = b.getElementsByTagName("td")[0].innerText;
                if (aName > bName) return 1;
                if (aName < bName) return -1;
                return 0;
            });
            break;
        }
        case "name-u": {
            sortTable(table, (a, b) => {
                let aName = a.getElementsByTagName("td")[0].innerText;
                let bName = b.getElementsByTagName("td")[0].innerText;
                if (aName < bName) return 1;
                if (aName > bName) return -1;
                return 0;
            });
            break;
        }
        case "glycemic-index-d": {
            sortTable(table, (a, b) => {
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
            sortTable(table, (a, b) => {
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
            sortTable(table, (a, b) => {
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
            sortTable(table, (a, b) => {
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
            sortTable(table, (a, b) => {
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
            sortTable(table, (a, b) => {
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
            sortTable(table, (a, b) => {
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
            sortTable(table, (a, b) => {
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

console.log("postprocessing table");

// Fix floating point precision errors

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

        // Check for missing data
        let elements = [gi, gl, sugar, carbs];
        for (let element of elements) {
            if (parseFloat(element.innerText) < 0) {
                let par = document.createElement("span");
                par.innerText = translationMatrix[88][languageIndex];
                par.style.color = "gray";
                element.style.display = "none";
                element.after(par)
            } else if (element.hasAttribute("innacurate")) {
                let par = document.createElement("span");
                par.innerText = "~"
                par.style.marginInlineStart = "0";
                element.after(par)
            } else if (element.hasAttribute("less-than")) {
                let par = document.createElement("span");
                par.innerText = "<"
                par.style.marginInlineStart = "0";
                element.before(par)
            }
        }
    }
}