document.getElementById("announcementForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const title = document.getElementById("announcementTitle").value;
    const category = document.getElementById("announcementCategory").value;
    const text = document.getElementById("announcementText").value;
    const fileInput = document.getElementById("announcementImage");
    const file = fileInput.files[0];
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imgSrc = file ? `<img src="${e.target.result}" class="img-fluid rounded mt-2">` : "";
        
        const newPost = `
            <div class="card p-3 mt-3">
                <strong>${title}</strong>
                <span class="badge bg-secondary ms-2">${category}</span>
                <p class="mt-2">${text}</p>
                ${imgSrc}
            </div>`;
        
        document.getElementById("announcementsFeed").insertAdjacentHTML("afterbegin", newPost);
    };
    
    if (file) {
        reader.readAsDataURL(file);
    } else {
        reader.onload();
    }

    document.getElementById("announcementForm").reset();
});