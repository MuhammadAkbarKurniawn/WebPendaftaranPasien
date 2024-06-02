document.addEventListener('DOMContentLoaded', function() {
    // Login form logic
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(user => user.username === username && user.password === password);

        if (user) {
            if (user.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            alert('Nama pengguna atau kata sandi salah. Silakan coba lagi.');
        }
    });

    // Register form logic
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = storedUsers.some(user => user.username === newUsername);

        if (userExists) {
            alert('Nama pengguna sudah ada. Silakan pilih nama pengguna lain.');
        } else {
            storedUsers.push({ username: newUsername, password: newPassword, role: 'user' });
            localStorage.setItem('users', JSON.stringify(storedUsers));
            alert('Akun berhasil dibuat. Anda sekarang dapat masuk.');
            document.getElementById('register-form').reset();
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'none';
        }
    });

    document.getElementById('show-register').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    });

    document.getElementById('show-login').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    });

    var logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            if (confirm('Apakah Anda ingin keluar?')) {
                window.location.href = 'login.html';
            }
        });
    }

    // Set username dan password default untuk admin
    const adminUser = { username: 'admin', password: 'admin', role: 'admin' };
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isAdminExists = storedUsers.some(user => user.role === 'admin');

    if (!isAdminExists) {
        storedUsers.push(adminUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
    }

    // Riwayat form logic
    document.getElementById('riwayat-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const noRm = document.getElementById('no-rm').value;
        const tglLahir = document.getElementById('tgl-lahir').value;
        
        const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        const riwayat = registrations.find(reg => reg.noRm == noRm && reg.dob == tglLahir);
        
        if (riwayat) {
            const tbody = document.getElementById('riwayat-table').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';

            const row = tbody.insertRow();
            row.insertCell(0).textContent = riwayat.noRm;
            row.insertCell(1).textContent = riwayat.name;
            row.insertCell(2).textContent = riwayat.dob;
            row.insertCell(3).textContent = riwayat.address;
            row.insertCell(4).textContent = riwayat.phone;
            
            document.getElementById('riwayat-table').style.display = 'table';
        } else {
            alert('Riwayat tidak ditemukan. Silakan periksa kembali No RM dan Tanggal Lahir Anda.');
        }
    });

    // Pendaftaran pasien baru
    document.getElementById('registration-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const ktp = document.getElementById('ktp').value;

        const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        const noRm = registrations.length + 1;

        registrations.push({ noRm, ktp, name, dob, address, phone });
        localStorage.setItem('registrations', JSON.stringify(registrations));

        alert('Pendaftaran berhasil! No RM Anda adalah: ' + noRm);
        window.location.href = 'riwayat.html'; // Redirect ke halaman riwayat setelah pendaftaran
    });
});
