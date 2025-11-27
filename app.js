document.getElementById('maintenanceForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // GANTI INI DENGAN URL DEPLOYMENT GOOGLE APPS SCRIPT ANDA
    const apiUrl = 'https://script.google.com/macros/s/AKfycbxh-d-8c5VmqLeBl_RFfLBXVpse0ACYlAfPIVL0hsEbTkWCL4PPzGdo-rA6pn6rzTlC/exec'; 
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = document.getElementById('submitButton');
    const statusMessage = document.getElementById('status-message');

    // Tampilkan status loading
    submitButton.textContent = 'Mengirim...';
    submitButton.disabled = true;
    statusMessage.style.display = 'none';

    // Kirim data menggunakan Fetch API
    fetch(apiUrl, {
        method: 'POST',
        body: formData 
    })
    .then(response => {
        if (response.ok) return response.text();
        throw new Error('Gagal terhubung ke Google API.');
    })
    .then(text => {
        if (text === 'SUCCESS') {
            statusMessage.textContent = '? Data berhasil disimpan di Google Sheets!';
            statusMessage.style.backgroundColor = '#d4edda';
            form.reset(); 
        } else {
             throw new Error('Apps Script mengembalikan respon tidak terduga.');
        }
    })
    .catch(error => {
        statusMessage.textContent = `? Terjadi Kesalahan: ${error.message}`;
        statusMessage.style.backgroundColor = '#f8d7da';
        console.error('Error:', error);
    })
    .finally(() => {
        statusMessage.style.display = 'block';
        submitButton.textContent = 'Kirim Data ke Spreadsheet';
        submitButton.disabled = false;
    });
});