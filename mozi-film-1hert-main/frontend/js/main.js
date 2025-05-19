async function fetchMovies() {
    const res = await fetch('http://localhost:3000/movies');
    const movies = await res.json();
    const list = document.getElementById('movie-list');
    list.innerHTML = '';
    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title + ' (' + movie.year + ')';
        li.dataset.id = movie.id;
        li.addEventListener('click', () => showDetails(movie.id));
        list.appendChild(li);
    });
}

async function showDetails(id) {
    const res = await fetch('http://localhost:3000/movies/' + id);
    const movie = await res.json();
    const details = document.getElementById('movie-details');
    details.innerHTML = '<h2>' + movie.title + '</h2>'
        + '<p><strong>Év:</strong> ' + movie.year + '</p>'
        + '<p>' + movie.description + '</p>';
}

fetchMovies();