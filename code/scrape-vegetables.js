function GI_Color(gi) {
    if (gi < 30) return '<span style="color: #00ff00">' + gi + '</span>'
    else if (gi < 56) return '<span style="color: #9fe2bf">' + gi + '</span>'
    else if (gi < 70) return '<span style="color: #ffff00">' + gi + '</span>'
    else return '<span style="color: #ff0000">' + gi + '</span>'
}

/**
 * Creates an input element for the grams value with the given global load and name.
 *
 * @param {number} gl - The global load value.
 * @param {string} name - The name of the input element.
 * @return {string} The HTML string representing the input element.
 */
function GL(gl, name) {
    console.log(gl, name);
    let changeFunction = `var v = (${gl} / 100) * parseFloat(this.value);
var e = document.getElementById("GLFIELD-${name}");
if (v < 10) e.innerHTML = "<span style=\\"color: #00ff00\\">" + v + "</span>";
else if (v < 20) e.innerHTML = "<span style=\\"color: #ffff00\\">" + v + "</span>";
else e.innerHTML = "<span style=\\"color: #ff0000\\">" + v + "</span>";`;
    let gramsInput = `<input type="number" id="grams" value="100" onchange='${changeFunction}'>`;
    let v = (gl / 100) * 100;
    let glField = `<span id="GLFIELD-${name}">${v < 10 ? "<span style='color: #00ff00'>" + v + "</span>" : v < 20 ? "<span style='color: #ffff00'>" + v + "</span>" : "<span style='color: #ff0000'>" + v + "</span>" }</span>`;

    return `${gramsInput} ${glField}`
}


var table = document.getElementsByClassName("tftable")[0];

var rows = table.getElementsByTagName("tr");
var arr = [];
for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    if (cells.length > 0) {
        var photo = cells[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0];
        var n = cells[1].getElementsByTagName("a")[0];
        var gi = cells[2].getElementsByTagName("a")[0];
        var gl = cells[3].getElementsByTagName("a")[0];

        var food = {
            name: n.innerText,
            gi: gi.innerText,
            gl: gl.innerText
        };

        arr.push(`<tr>
    <td>{{${food.name}}}</td>
    <td>${GI_Color(parseFloat(food.gi))}</td>
    <td>${GL(parseFloat(food.gl), food.name)}</td>
    <td></td>
    <td></td>
</tr>`);
    }
}

arr.join("\n");
window.onclick = function () {
    navigator.clipboard.writeText(arr.join("\n"));
}
