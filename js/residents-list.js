document.addEventListener("DOMContentLoaded", function () {
    fetchResidents();
    setInterval(fetchResidents, 5000); // Auto-refresh every 5 seconds
});

// ✅ Function to add a new resident dynamically in alphabetical order
window.addNewResident = function(residentData) {
    let tableBody = document.getElementById("residentTableBody");
    if (!tableBody) {
        console.error("residentTableBody not found!");
        return;
    }

    let newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${residentData.name}</td>
        <td>${residentData.gender}</td>
        <td>${residentData.address}</td>
        <td>${residentData.mobile_no}</td>
        <td>${residentData.status}</td>
        <td>
            <button class="btn btn-info">View</button>
            <button class="btn btn-primary">Edit</button>
        </td>
    `;

    // Insert newRow in the correct sorted position
    let rows = Array.from(tableBody.getElementsByTagName("tr"));
    let inserted = false;

    for (let row of rows) {
        let rowName = row.cells[0].textContent.trim().toLowerCase();
        let newName = residentData.name.trim().toLowerCase();
        if (newName < rowName) {
            tableBody.insertBefore(newRow, row);
            inserted = true;
            break;
        }
    }

    if (!inserted) {
        tableBody.appendChild(newRow);
    }
};

// ✅ Fetch residents and update table
function fetchResidents() {
    $.ajax({
        url: "http://localhost/Web-based-Brgy-Ligaya-Management-System-main/handlers_php/fetch-residents.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            let table = document.getElementById("residentTableBody");
            table.innerHTML = ""; // Clear existing rows before updating
            
            // Sort by last_name, first_name, middle_name
            data.sort((a, b) => {
                let nameA = a.name.toLowerCase().split(", ");
                let nameB = b.name.toLowerCase().split(", ");
                let lastNameCompare = nameA[0].localeCompare(nameB[0]);
                if (lastNameCompare !== 0) return lastNameCompare;
                return nameA[1].localeCompare(nameB[1]); // Compare first names if last names are the same
            });

            // Add residents to table dynamically
            data.forEach(resident => {
                addNewResident(resident);
            });
        },
        error: function (xhr, status, error) {
            console.error("Fetch Error:", xhr.responseText);
        }
    });
    console.log("residents-list.js loaded");
}
