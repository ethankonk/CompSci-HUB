// Sample data for suggestions
var sampleData = ['item1', 'item2', 'item3', 'otherItem', 'exampleItem'];
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