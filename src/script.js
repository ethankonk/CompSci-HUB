// Sample data for suggestions
var sampleData = ['Programming Practice', 'Programming Languages', 'Homework Help', 'Schedule Guide'];
var suggestionTimeout;

function updateSuggestions() {
    // Clear the existing timeout
    clearTimeout(suggestionTimeout);

    // Get the search input value
    var searchInput = document.getElementById('searchInput').value.toLowerCase();

    // Filter sample data based on the search input
    var filteredData = sampleData.filter(function(item) {
        return item.toLowerCase().includes(searchInput);
    });

    // Display suggestions dropdown
    var suggestionDropdown = document.getElementById('suggestionDropdown');
    suggestionDropdown.innerHTML = '';

    filteredData.forEach(function(item) {
        var suggestionDiv = document.createElement('div');
        suggestionDiv.classList.add('suggestion');
        suggestionDiv.textContent = item;
        suggestionDiv.onclick = function() {
            document.getElementById('searchInput').value = item;
            suggestionDropdown.style.display = 'none'; // Hide suggestions after selecting
        };
        suggestionDropdown.appendChild(suggestionDiv);
    });

    // Show or hide the suggestions dropdown
    suggestionDropdown.style.display = filteredData.length > 0 ? 'block' : 'none';
}

function hideSuggestions() {
    // Use a timeout to allow time for the user to click on a suggestion
    suggestionTimeout = setTimeout(function() {
        document.getElementById('suggestionDropdown').style.display = 'none';
    }, 200);
}

function search() {
    // Clear the existing timeout when performing a search
    clearTimeout(suggestionTimeout);

    // Get the search input value
    var searchInput = document.getElementById('searchInput').value;

    // Find elements on the page that match the search term
    var elements = document.querySelectorAll('[id*="' + searchInput + '"]');

    // Display search results
    var searchResults = document.getElementById('searchResults');

    if (elements.length > 0) {
        searchResults.innerHTML = 'Search Results: ' + searchInput;

        // Scroll to each found element
        elements.forEach(function(element) {
            element.scrollIntoView({ behavior: 'smooth' });
        });
    } else {
        // Display alert if no items are found
        searchResults.innerHTML = '';
        alert('No items found with the search term: ' + searchInput);
    }

    // Hide suggestions dropdown after search
    document.getElementById('suggestionDropdown').style.display = 'none';
}

fetch('../src/display.php')
    .then(response => response.json())
    .then(data => {
        const fileListElement = document.getElementById('fileList');

        // Clear existing content
        fileListElement.innerHTML = '';

        if (data.length > 0) {
            data.forEach(file => {
                const fileContainer = document.createElement('div');
                fileContainer.className = 'resource-details';
                fileContainer.id = `resource-${file.id}`;
                fileContainer.innerHTML = `
                    <p><strong>Title:</strong> ${file.title}</p>
                    <p><strong>Description:</strong> ${file.description}</p>
                    <p><a href='../uploads/${file.file_name}' download='${file.file_name}'>Download ${file.file_name}</a></p>
                    <span class="material-symbols-outlined" onclick="deleteItem(${file.id})">delete</span>
                `;
                fileListElement.appendChild(fileContainer);
            });
        } else {
            const fileContainer = document.createElement('div');
            fileContainer.className = 'resource-details';
            fileListElement.innerHTML = `
                <p>No files uploaded yet.</p>
            `;
        }
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to delete an item
function deleteItem(itemId) {
    fetch(`../src/delete.php?id=${itemId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const deletedItem = document.getElementById(`resource-${itemId}`);
            if (deletedItem) {
                deletedItem.remove();
            }
        } else {
            console.error('Error deleting item:', data.error);
        }
    })
    .catch(error => console.error('Error deleting item:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('uploadForm');

    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('../src/upload.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            // Redirect back to the original page
            window.location.href = response.url;
        })
        .catch(error => console.error('Error uploading file:', error));
    });
});

// Validate Contact Form
function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (name === '' || email === '' || message === '') {
        alert('All fields (Name, Email, and Message) are required.');
        return false;
    }

    // Check if the email is in a valid format
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('../src/submit.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            const messageContainer = document.getElementById('messageContainer');
            const messageHandlerContainer = document.createElement('div');

            if (data.success) {
                // Show success message
                messageHandlerContainer.className = 'message-success';
                messageHandlerContainer.innerHTML = `<p>Message sent successfully.</p>`;
                contactForm.reset();
            } else {
                // Show error message
                messageHandlerContainer.className = 'message-error';
                messageHandlerContainer.innerHTML = `<p class="err">Error sending message.</p>`;
            }

            // Clear existing content
            messageContainer.innerHTML = '';

            // Append the message container to the main container
            messageContainer.appendChild(messageHandlerContainer);
        })
        .catch(error => {
            // Handle any errors during the fetch request
            console.error('Error submitting form:', error);
            const messageHandlerContainer = document.createElement('div');
            const messageContainer = document.getElementById('messageContainer');
            messageHandlerContainer.className = 'message-error';
            messageHandlerContainer.innerHTML = `<p>An error occurred</p>`;

            // Clear existing content
            messageContainer.innerHTML = '';

            // Append the error message container to the main container
            messageContainer.appendChild(messageHandlerContainer);
        });
    });
});

