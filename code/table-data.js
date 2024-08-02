/**
 *  
 * @param {HTMLTableElement} table 
 */
function onTableReady(table) {
    window.table = table;
    window.tableRows = Array.from(table.rows).map(row => {
        let defaultWeight = parseFloat(row.children[0].getElementsByTagName("input")[0].value);
        let translationIndex = parseFloat(row.children[1].getAttribute("ti"));
        let foodNameEn = translationMatrix[translationIndex][0];
        let foodNameHe = translationMatrix[translationIndex][1];
        
    });
}