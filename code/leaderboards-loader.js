let table = document.getElementById("leaderboards");

let response = await fetch(window.location.origin + "/content/contributors.html");
let html = await response.text();
table.innerHTML = html

let rows = Array.from(table.getElementsByTagName("tr"));

let r = rows.shift()

for (let i = 0; i < rows.length; i++) {
    let row = rows[i]
    let normalContribs = parseInt(row.getElementsByTagName("td")[1].innerText)
    let directContribs = parseInt(row.getElementsByTagName("td")[2].innerText)

    row.getElementsByTagName("td")[3].innerText = normalContribs + directContribs * 10
}

rows = rows.sort((a, b) => {
    return parseInt(b.getElementsByTagName("td")[3].innerText) - parseInt(a.getElementsByTagName("td")[3].innerText)
})

rows.unshift(r)

table.innerHTML = ""

for (let i = 0; i < rows.length; i++) {
    table.appendChild(rows[i])
}