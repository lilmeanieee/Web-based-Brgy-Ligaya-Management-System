$(document).ready(function () {
    $("#btn_submit").click(function (event) {
        event.preventDefault(); // Prevent form refresh

        var residentData = {
            last_name: $("#last_name").val(),
            first_name: $("#first_name").val(),
            middle_name: $("#middle_name").val(),
            suffix: $("#suffix").val(),
            birthdate: $("#birthdate").val(),
            age: $("#age").val(),
            gender: $("#gender").val(),
            civil_status: $("#civil_status").val(),
            nationality: $("#nationality").val(),
            religion: $("#religion").val(),
            
            // Address Information - normalized
            house_lot_no: $("#house_lot_no").val(),
            purok: $("#purok").val(),
            street: $("#street").val(),
            subdivision: $("#subdivision").val(),
            barangay: $("#barangay").val(),
            city_municipality: $("#city_municipality").val(),
            province: $("#province").val(),
            region: $("#region").val(),

            // Contact Information
            mobile_no: $("#mobile_no").val(),
            email_address: $("#email_address").val(),

            // Emergency Contact
            emergency_name: $("#emergency_name").val(),
            emergency_contact_num: $("#emergency_contact_num").val(),
            emergency_relationship: $("#emergency_relationship").val(),
            confirm: false // Default: Not confirming yet
        };

        $.ajax({
            url: "http://localhost/Web-based-Brgy-Ligaya-Management-System-main/handlers_php/add-residents.php?action=addResident",
            type: "POST",
            data: JSON.stringify(residentData),
            contentType: "application/json",
            success: function (response) {
                console.log("Success:", response);
                
                if (response.success) {
                    showToast("Resident added successfully!");
                    
                    // Reset form
                    document.getElementById("residentForm").reset();
                    
                    // Refresh resident list
                    fetchResidents(); 
                    
                } else if (response.warning) {
                    if (confirm(response.warning + "\nDo you want to proceed?")) {
                        residentData.confirm = true;
                        sendResidentData(residentData);
                    }
                } else {
                    showToast("Error adding resident", true);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                console.log("Response Text:", xhr.responseText);
                showToast("Error adding resident", true);
            }
        });
    });

    function sendResidentData(data) {
        $.ajax({
            url: "http://localhost/Web-based-Brgy-Ligaya-Management-System-main/handlers_php/add-residents.php?action=addResident",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (response) {
                if (response.success) {
                    showToast("Resident added successfully!");
                    document.getElementById("residentForm").reset();
                    fetchResidents();
                } else {
                    showToast("Error adding resident", true);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                showToast("Error adding resident", true);
            }
        });
    }

    function showToast(message, isError = false) {
        var toastElement = $("#toastMessage");
        $("#toastText").text(message);
        toastElement.removeClass("bg-success bg-danger").addClass(isError ? "bg-danger" : "bg-success");
        toastElement.toast("show");
    }

});
