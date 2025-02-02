document.addEventListener("DOMContentLoaded", function() {
    var title = document.getElementById('title');
    var contentBody = document.querySelector('.content-body');

    // Set "Dashboard" as default
    loadPage('content/dashboard.html');
    title.textContent = "Dashboard";

    // Add event listeners to all sidebar links
    document.querySelectorAll('.left-sidebar a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            title.textContent = this.textContent; // Update title
            let pagePath = "content/" + this.id + ".html"; // Construct file path
            console.log("Loading:", pagePath); // Debugging log
            loadPage(pagePath); // Load file from content folder
        });
    });

    // Function to load the HTML content dynamically
    function loadPage(page) {
        fetch(page)
            .then(response => {
                if (!response.ok) throw new Error(`Page not found: ${page}`);
                return response.text();
            })
            .then(html => {
                contentBody.innerHTML = html;
            })
            .catch(error => {
                contentBody.innerHTML = `<h2>Error loading content</h2><p>${error.message}</p>`;
                console.error("Error:", error);
            });
    }
});
