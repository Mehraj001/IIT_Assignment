const chemicals = [
    { id: 1, name: 'Ammonium Persulfate', vendor: 'LG Chem', density: 3525.92, viscosity: 60.63, packaging: 'Bag', packSize: 100, unit: 'Kg', quantity: 6495.18 },
    { id: 2, name: 'Caustic Potash', vendor: 'Formosa', density: 1172.15, viscosity: 48.22, packaging: 'Bag', packSize: 100, unit: 'Kg', quantity: 8751.90 },
    { id: 3, name: 'Dimethylaminopropylamine', vendor: 'LG Chem', density: 8435.37, viscosity: 12.62, packaging: 'Barrel', packSize: 75, unit: 'Kg', quantity: 5964.61 },
    { id: 4, name: 'Mono Ammonium Phosphate', vendor: 'Sinopec', density: 1597.65, viscosity: 76.51, packaging: 'Bag', packSize: 105, unit: 'Kg', quantity: 8183.73 },
    { id: 5, name: 'Ferric Nitrate', vendor: 'DowDuPont', density: 384.04, viscosity: 14.90, packaging: 'Bag', packSize: 105, unit: 'Kg', quantity: 4154.33 },
    { id: 6, name: 'n-Pentane', vendor: 'Sinopec', density: 4535.26, viscosity: 66.76, packaging: 'N/A', packSize: 'N/A', unit: 'Kg', quantity: 6272.34 },
    { id: 7, name: 'Glycol Ether PM', vendor: 'LG Chem', density: 6495.18, viscosity: 72.12, packaging: 'Bag', packSize: 250, unit: 'Kg', quantity: 8749.54 },
    { id: 8, name: 'Sodium Chloride', vendor: 'Tata Chemicals', density: 2200.00, viscosity: 30.12, packaging: 'Bag', packSize: 50, unit: 'Kg', quantity: 4000.00 },
    { id: 9, name: 'Sulfuric Acid', vendor: 'Reliance', density: 1835.00, viscosity: 25.10, packaging: 'Barrel', packSize: 200, unit: 'L', quantity: 5000.00 },
    { id: 10, name: 'Hydrochloric Acid', vendor: 'BASF', density: 1456.50, viscosity: 15.30, packaging: 'Barrel', packSize: 150, unit: 'L', quantity: 3000.00 },
    { id: 11, name: 'Dimethylaminopropylamine', vendor: 'LG Chem', density: 8435.37, viscosity: 12.62, packaging: 'Barrel', packSize: 75, unit: 'Kg', quantity: 5964.61 },
    { id: 12, name: 'Mono Ammonium Phosphate', vendor: 'Sinopec', density: 1597.65, viscosity: 76.51, packaging: 'Bag', packSize: 105, unit: 'Kg', quantity: 8183.73 },
    { id: 13, name: 'Ferric Nitrate', vendor: 'DowDuPont', density: 384.04, viscosity: 14.90, packaging: 'Bag', packSize: 105, unit: 'Kg', quantity: 4154.33 },
    { id: 14, name: 'n-Pentane', vendor: 'Sinopec', density: 4535.26, viscosity: 66.76, packaging: 'N/A', packSize: 'N/A', unit: 'Kg', quantity: 6272.34 },
    { id: 15, name: 'Glycol Ether PM', vendor: 'LG Chem', density: 6495.18, viscosity: 72.12, packaging: 'Bag', packSize: 250, unit: 'Kg', quantity: 8749.54 }
];

const tableBody = document.querySelector("#chemicalTable tbody");
let selectedRow = null;
let sortDirection = true;

function populateTable() {
    tableBody.innerHTML = '';
    chemicals.forEach((chemical) => {
        let row = tableBody.insertRow();
        addRowCells(row, chemical);
    });
}

function addRowCells(row, chemical) {
    row.insertCell(0).innerText = chemical.id;
    row.insertCell(1).innerText = chemical.name;
    row.insertCell(2).innerText = chemical.vendor;
    row.insertCell(3).innerText = chemical.density;
    row.insertCell(4).innerText = chemical.viscosity;
    row.insertCell(5).innerText = chemical.packaging;
    row.insertCell(6).innerText = chemical.packSize;
    row.insertCell(7).innerText = chemical.unit;
    row.insertCell(8).innerText = chemical.quantity;

    row.onclick = function() {
        if (selectedRow) {
            selectedRow.classList.remove("selected");
        }
        selectedRow = this;
        selectedRow.classList.add("selected");
    };
}

function sortTable(columnIndex) {
    sortDirection = !sortDirection;
    chemicals.sort((a, b) => {
        const valA = Object.values(a)[columnIndex];
        const valB = Object.values(b)[columnIndex];

        if (typeof valA === 'number' && typeof valB === 'number') {
            return sortDirection ? valA - valB : valB - valA;
        } else {
            return sortDirection ? valA.toString().localeCompare(valB.toString()) : valB.toString().localeCompare(valA.toString());
        }
    });
    populateTable();
}


function addRow() {
    let row = tableBody.insertRow();
    row.insertCell(0).innerText = chemicals.length + 1;
    row.insertCell(1).innerHTML = '<input type="text" id="newName" placeholder="Chemical Name">';
    row.insertCell(2).innerHTML = '<input type="text" id="newVendor" placeholder="Vendor">';
    row.insertCell(3).innerHTML = '<input type="number" id="newDensity" placeholder="Density">';
    row.insertCell(4).innerHTML = '<input type="number" id="newViscosity" placeholder="Viscosity">';
    row.insertCell(5).innerHTML = '<input type="text" id="newPackaging" placeholder="Packaging">';
    row.insertCell(6).innerHTML = '<input type="number" id="newPackSize" placeholder="Pack Size">';
    row.insertCell(7).innerHTML = '<input type="text" id="newUnit" placeholder="Unit">';
    row.insertCell(8).innerHTML = '<input type="number" id="newQuantity" placeholder="Quantity">';
}

function moveUp() {
    if (selectedRow) {
        let index = Array.from(tableBody.rows).indexOf(selectedRow);
        if (index > 0) {
            [chemicals[index], chemicals[index - 1]] = [chemicals[index - 1], chemicals[index]];
            populateTable();
        }
    }
}

function moveDown() {
    if (selectedRow) {
        let index = Array.from(tableBody.rows).indexOf(selectedRow);
        if (index < chemicals.length - 1) {
            [chemicals[index], chemicals[index + 1]] = [chemicals[index + 1], chemicals[index]];
            populateTable();
        }
    }
}

function deleteRow() {
    if (selectedRow) {
        let index = Array.from(tableBody.rows).indexOf(selectedRow);
        chemicals.splice(index, 1);
        selectedRow = null;
        populateTable();
    }
}

function refreshTable() {
    populateTable();
}


function saveData() {
    let newName = document.getElementById('newName')?.value;
    let newVendor = document.getElementById('newVendor')?.value;
    let newDensity = document.getElementById('newDensity')?.value;
    let newViscosity = document.getElementById('newViscosity')?.value;
    let newPackaging = document.getElementById('newPackaging')?.value;
    let newPackSize = document.getElementById('newPackSize')?.value;
    let newUnit = document.getElementById('newUnit')?.value;
    let newQuantity = document.getElementById('newQuantity')?.value;

    if (newName && newVendor && newDensity && newViscosity && newPackaging && newPackSize && newUnit && newQuantity) {
        chemicals.push({
            id: chemicals.length + 1,
            name: newName,
            vendor: newVendor,
            density: parseFloat(newDensity),
            viscosity: parseFloat(newViscosity),
            packaging: newPackaging,
            packSize: parseFloat(newPackSize),
            unit: newUnit,
            quantity: parseFloat(newQuantity)
        });
        populateTable();
        alert("Data saved successfully");
    } else {

        alert("Please fill all the fields are required")
    }
}

populateTable();


