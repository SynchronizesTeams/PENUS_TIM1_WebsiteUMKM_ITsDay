 
 export const submitForm = () => {
   document.getElementById('appointmentForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const name = document.getElementById('nama').value;
    const no_telp = document.getElementById('telepon').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('selectedOption').innerText;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('pesanTambahan').value;

    if (service === 'Pilih layanan') {
      alert('Silakan pilih layanan terlebih dahulu');
      return;
    }

    const data = {
      name,
      no_telp,
      email,
      service,
      date,
      notes
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
