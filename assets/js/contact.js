 
 export const submitForm = () => {
   document.getElementById('appointmentForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const namaLengkap = document.getElementById('nama').value;
    const noTelepon = document.getElementById('telepon').value;
    const email = document.getElementById('email').value;
    const layanan = document.getElementById('selectedOption').innerText;
    const tanggal = document.getElementById('date').value;
    const pesan = document.getElementById('pesanTambahan').value;

    if (layanan === 'Pilih layanan') {
      alert('Silakan pilih layanan terlebih dahulu');
      return;
    }

    const data = {
      namaLengkap,
      noTelepon,
      email,
      layanan,
      tanggal,
      pesan
    };

    
    fetch('https://api-salon.salondiantanjung.my.id/api/booking/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) throw new Error('Gagal kirim');
        return response.json();
      })
      .then(result => {
        alert('Pesan berhasil dikirim!');
        console.log(data)
        document.getElementById('appointmentForm').reset();
        document.getElementById('selectedOption').innerText = 'Pilih layanan'; 
      })
      .catch(err => {
        console.error(err);
        alert('Terjadi kesalahan saat mengirim!');
      });
  });
 }
