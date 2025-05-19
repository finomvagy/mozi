document.getElementById('create-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const year = parseInt(document.getElementById('year').value);
    const res = await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Admin': 'true'
        },
        body: JSON.stringify({ title, description, year })
    });
    if (res.ok) {
        document.getElementById('message').textContent = 'Film sikeresen létrehozva.';
    } else {
        document.getElementById('message').textContent = 'Hiba a film létrehozásakor.';
    }
});