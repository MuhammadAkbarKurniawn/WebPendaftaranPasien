document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace with actual validation logic
    if (username === 'admin' && password === 'admin') {
        window.location.href = 'index.html';
    } else {
        alert('Incorrect username or password. Please try again.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Memastikan seluruh konten halaman telah dimuat sebelum menambahkan event listener
    var logoutLink = document.getElementById('logout');
    
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();  // Mencegah tindakan default tautan
            if (confirm('Apakah Anda ingin keluar?')) {
                window.location.href = 'login.html';  // Mengarahkan ke halaman login
            }
        });
    }
});






