var table = document.getElementById("food-list");

var rows = table.getElementsByTagName("tr");

for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    if (cells.length > 0) {
        /**
         * @type {HTMLSpanElement}
         */
        var gl = cells[2].getElementsByTagName("span")[0].getElementsByTagName("span")[0];
        console.log(gl.innerText);
        if (gl.innerText.includes(".")) {
            gl.innerText = gl.innerText.split(".")[0] + "." + gl.innerText.split(".")[1].substring(0, 2);
            if (gl.innerText.endsWith(".00")) gl.innerText = gl.innerText.substring(0, gl.innerText.length - 3);
            else if (gl.innerText.endsWith("0")) gl.innerText = gl.innerText.substring(0, gl.innerText.length - 1);
        }
    }
}