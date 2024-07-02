let table = document.getElementById("food-list");

fetch(window.location.href.split("?")[0] + "/content/table.html")
    .then(response => response.text())
    .then(html => {
        table.innerHTML = html

        /**
         * @type {HTMLTableRowElement[]}
         */
        let rows = Array.from(table.getElementsByTagName("tr"));
        let parameters = new URLSearchParams(window.location.search);
        // Switch language if needed

        // Sort if needed
        if (parameters.has("sort")) {
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
                        let aIndex = parseFloat(a.getElementsByTagName("td")[1].getElementsByTagName("span")[0].innerText);
                        let bIndex = parseFloat(b.getElementsByTagName("td")[1].getElementsByTagName("span")[0].innerText);
                        if (aIndex > bIndex) return 1;
                        if (aIndex < bIndex) return -1;
                        return 0;
                    });
                    break;
                }
                case "glycemic-index-u": {
                    rows.sort((a, b) => {
                        let aIndex = parseFloat(a.getElementsByTagName("td")[1].getElementsByTagName("span")[0].innerText);
                        let bIndex = parseFloat(b.getElementsByTagName("td")[1].getElementsByTagName("span")[0].innerText);
                        if (aIndex < bIndex) return 1;
                        if (aIndex > bIndex) return -1;
                        return 0;
                    });
                    break;
                }
                case "glycemic-load-d": {
                    rows.sort((a, b) => {
                        let aLoad = parseFloat(a.getElementsByTagName("td")[2].getElementsByTagName("span")[0].innerText);
                        let bLoad = parseFloat(b.getElementsByTagName("td")[2].getElementsByTagName("span")[0].innerText);
                        if (aLoad > bLoad) return 1;
                        if (aLoad < bLoad) return -1;
                        return 0;
                    });
                    break;
                }
                case "glycemic-load-u": {
                    rows.sort((a, b) => {
                        let aLoad = parseFloat(a.getElementsByTagName("td")[2].getElementsByTagName("span")[0].innerText);
                        let bLoad = parseFloat(b.getElementsByTagName("td")[2].getElementsByTagName("span")[0].innerText);
                        if (aLoad < bLoad) return 1;
                        if (aLoad > bLoad) return -1;
                        return 0;
                    });
                    break;
                }
                case "sugars-d": {
                    rows.sort((a, b) => {
                        let aSugars = a.getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerText;
                        let bSugars = b.getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerText;
                        if (aSugars > bSugars) return 1;
                        if (aSugars < bSugars) return -1;
                        return 0;
                    });
                    break;
                }
                case "sugars-u": {
                    rows.sort((a, b) => {
                        let aSugars = a.getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerText;
                        let bSugars = b.getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerText;
                        if (aSugars < bSugars) return 1;
                        if (aSugars > bSugars) return -1;
                        return 0;
                    });
                    break;
                }
                case "carbs-d": {
                    rows.sort((a, b) => {
                        let aCarbs = a.getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerText;
                        let bCarbs = b.getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerText;
                        if (aCarbs > bCarbs) return 1;
                        if (aCarbs < bCarbs) return -1;
                        return 0;
                    });
                    break;
                }
                case "carbs-u": {
                    rows.sort((a, b) => {
                        let aCarbs = a.getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerText;
                        let bCarbs = b.getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerText;
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

        for (let i = 0; i < rows.length; i++) {
            let cells = rows[i].getElementsByTagName("td");
            if (cells.length > 0) {
                /**
                 * @type {HTMLSpanElement}
                 */
                let gl = cells[2].getElementsByTagName("span")[0].getElementsByTagName("span")[0];
                if (gl.innerText.includes(".")) {
                    gl.innerText = gl.innerText.split(".")[0] + "." + gl.innerText.split(".")[1].substring(0, 2);
                    if (gl.innerText.endsWith(".00")) gl.innerText = gl.innerText.substring(0, gl.innerText.length - 3);
                    else if (gl.innerText.endsWith("0")) gl.innerText = gl.innerText.substring(0, gl.innerText.length - 1);
                }
            }
        }
        table.innerHTML = rows.map(row => row.outerHTML).join("\n");

        
    })
    .catch(error => table.innerHTML = "Error: " + error)