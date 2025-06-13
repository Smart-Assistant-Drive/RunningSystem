async function createScene() {
    // Initialize the scene
    console.log("Scene initialized");

    await fetch('https://example.com/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: 'value' })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}
createScene();