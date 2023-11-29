function tableToCSV() {                                   //3 the function is defined
    const table = document.querySelector('table');        //4 the table is selected in the page
    const rows = table.querySelectorAll('tr');
    let csvContent = '';

    rows.forEach(row => {
        const rowData = [];
        row.querySelectorAll('td, th').forEach(cell => {
            rowData.push(cell.textContent.trim());
        });
        csvContent += rowData.join(',') + '\n';             //5 the table is converted to csv
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });      //6 blob is created
    let downloadLink = document.createElement("a");
    downloadLink.download = 'table_data.csv';                           //7 the csv is named it can be made dynamic in future
    downloadLink.href = window.URL.createObjectURL(blob);               //8 .createObjectURL() was not working in manifest V3 here it creates a DOMString containing a URL representing the object given in the parameter
    document.body.appendChild(downloadLink);
    downloadLink.click();                                                  //9 the link is clicked  
    document.body.removeChild(downloadLink);

}

chrome.action.onClicked.addListener(async (tab) => {     //1 as soon as the extension icon is clicked, the function is executed
    chrome.scripting.executeScript({                   
        target: { tabId: tab.id },
        function: tableToCSV,                       //2 the function is executed
    }

    );
});
