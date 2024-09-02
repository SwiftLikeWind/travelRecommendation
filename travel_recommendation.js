document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-bar button');
    searchButton.addEventListener('click', searchRecommendations);

    const clearButton = document.querySelector('.search-bar button:nth-of-type(2)');
    clearButton.addEventListener('click', clearResults);
});

let data = null;

function fetchData() {
    return fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            console.log('Data fetched successfully:', data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function searchRecommendations() {
    if (!data) {
        console.log('No data available. Fetching data...');
        fetchData().then(() => {
            performSearch();
        });
    } else {
        performSearch();
    }
}

function performSearch() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    let results = [];

    if (input.includes('beach')) {
        results = data.beaches;
    } else if (input.includes('temple')) {
        results = data.temples;
    } else if (input.includes('country')) {
        results = data.countries.flatMap(country => country.cities);
    }

    displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No recommendations found.</p>';
        return;
    }

    results.forEach(item => {
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.imageUrl}" alt="${item.name}">
            <p>${item.description}</p>
        `;
        resultsDiv.appendChild(resultDiv);
    });
}

function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}


