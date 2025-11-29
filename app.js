// app.js

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('maintenanceForm');
    const downloadButton = document.getElementById('downloadCsvButton');

    /**
     * Mengambil semua data input dari formulir dan mengembalikannya sebagai objek.
     * @returns {Object} Objek data formulir.
     */
    function getFormData() {
        const formData = {};
        const elements = form.querySelectorAll('input, select, textarea');
        
        elements.forEach(element => {
            if (element.name) {
                // Membersihkan nilai dari baris baru atau koma agar aman untuk CSV
                const cleanValue = element.value.replace(/(\r\n|\n|\r|,)/gm, " ").trim();
                formData[element.name] = cleanValue;
            }
        });
        
        // Menambahkan data tetap (non-input field)
        formData['koordinator'] = 'DEAN G.H. MARO';
        formData['teknisi_1_nama'] = formData['teknisi_1'];
        formData['teknisi_2_nama'] = formData['teknisi_2'];
        
        // Opsional: Hapus input nama teknisi asli jika sudah di-rename
        delete formData['teknisi_1'];
        delete formData['teknisi_2'];

        // Menambahkan header untuk data yang tidak diisi (misalnya: Grounding)
        formData['grounding_33'] = 'Tidak diukur';
        formData['grounding_15'] = 'Tidak diukur';
        
        return formData;
    }

    /**
     * Mengubah objek data menjadi format string CSV.
     * @param {Object} data - Objek data formulir.
     * @returns {string} String dalam format CSV.
     */
    function convertToCsv(data) {
        // Ambil semua kunci sebagai header CSV
        const headers = Object.keys(data);
        // Ambil semua nilai sebagai baris data CSV
        const values = Object.values(data);
        
        // Gabungkan header dan nilai. Nilai yang mengandung koma atau kutipan 
        // harus diapit oleh kutipan ganda ("") - tapi untuk penyederhanaan, 
        // kita sudah membersihkan nilai di getFormData().
        const headerCsv = headers.join(';'); // Menggunakan semicolon sebagai delimiter untuk keamanan
        const dataCsv = values.join(';');
        
        // Gabungkan header dan data, dipisahkan oleh baris baru
        return headerCsv + '\n' + dataCsv;
    }

    /**
     * Memicu proses download string CSV sebagai file.
     * @param {string} csvString - String CSV yang akan diunduh.
     * @param {string} filename - Nama file.
     */
    function downloadCsv(csvString, filename) {
        // Membuat Blob dengan tipe MIME CSV dan charset UTF-8
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        
        const link = document.createElement("a");
        if (link.download !== undefined) { 
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Membersihkan URL objek untuk membebaskan memori
            URL.revokeObjectURL(url);
        } else {
            alert("Browser Anda tidak mendukung download otomatis. Silakan gunakan browser modern.");
        }
    }

    // Event listener utama saat tombol download diklik
    downloadButton.addEventListener('click', () => {
        const data = getFormData();
        
        // Menggunakan tanggal dari RWY 33 untuk nama file
        const tgl = data['tgl_33'].replace(/-/g, ''); 
        const filename = `Formulir_AWOS_Maint_${tgl}.csv`;

        const csvData = convertToCsv(data);
        
        downloadCsv(csvData, filename);
        
        // Pemberitahuan setelah unduhan
        console.log(`Data formulir berhasil diunduh sebagai: ${filename}`);
    });

});
