document.getElementById('maintenanceForm').addEventListener('submit', function(event) {
    // Mencegah formulir untuk melakukan submit standar/reload halaman
    event.preventDefault(); 

    // 1. Ambil Data dari Form
    const kode_alat = document.getElementById('kode_alat').value;
    const lokasi = document.getElementById('lokasi').value;
    const teknisi = document.getElementById('teknisi').value;
    // Ganti newline dengan spasi atau karakter lain agar deskripsi tidak merusak format CSV
    const deskripsi = document.getElementById('deskripsi').value.replace(/\n/g, ' ').trim();
    // Tambahkan kolom Tanggal dan Waktu saat ini
    const tanggal_waktu = new Date().toLocaleString('id-ID'); 

    // 2. Tentukan Header dan Baris Data
    const header = [
        "Tanggal_Waktu", 
        "Kode_Alat", 
        "Lokasi_Unit", 
        "Nama_Teknisi", 
        "Deskripsi_Pekerjaan"
    ];
    
    // Pastikan data diapit tanda kutip (") untuk menangani koma di dalam Deskripsi Pekerjaan
    const dataRow = [
        `"${tanggal_waktu}"`,
        `"${kode_alat}"`,
        `"${lokasi}"`,
        `"${teknisi}"`,
        `"${deskripsi}"` 
    ];

    // Gabungkan Header dan Data menjadi konten CSV
    // \r\n adalah kode untuk baris baru (newline) yang umum digunakan pada CSV
    const csvContent = header.join(',') + '\r\n' + dataRow.join(',');

    // 3. Buat Blob dan Link Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    
    // Tentukan nama file yang akan didownload
    // Anda dapat menyertakan tanggal/waktu dalam nama file agar unik
    const filename = `data_pemeliharaan_${new Date().getTime()}.csv`;
    downloadLink.setAttribute('download', filename);

    // 4. Picu Download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // 5. Opsi: Reset form setelah download
    this.reset();
});
