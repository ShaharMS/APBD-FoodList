function activateSearchbar() {
    /**
     * @type {HTMLInputElement}
     */
    let searchbar = document.getElementById("food-search");

    searchbar.addEventListener("input", function () {
        let table = document.getElementById("food-list");

        let rows = table.getElementsByTagName("tr");

        for (let i = 0; i < rows.length; i++) {
            let cells = rows[i].getElementsByTagName("td");
            if (cells.length > 0) {
                /**
                 * @type {HTMLSpanElement}
                 */
                let name = cells[1];
                console.log(cells[1]);
                if (name.textContent.toLowerCase().includes(searchbar.value.toLowerCase())) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }
    })
}