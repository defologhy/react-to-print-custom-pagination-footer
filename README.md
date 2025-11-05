react-to-print-custom-pagination-footer

react-to-print-custom-pagination-footer adalah package untuk menambahkan custom footer saat proses printing di browser (khususnya Chrome) menggunakan package react-to-print
.

Package ini dirancang untuk mengatasi keterbatasan browser Chrome yang tidak mendukung custom pagination atau footer via CSS, terutama pada kasus printing data dalam jumlah besar (bulky print) di mana setiap halaman perlu memiliki penomoran halaman (paging) yang reset untuk setiap blok data.

✨ Fitur Utama

✅ Menambahkan custom footer di setiap halaman hasil print.
✅ Kiri bawah: Timestamp (tanggal & waktu saat print dilakukan).
✅ Kanan bawah: Nomor halaman (paging), yang bisa di-reset untuk setiap bagian data.
✅ Kompatibel dengan React dan react-to-print.
✅ Solusi untuk print bulky data dengan pagination custom tanpa bergantung pada fitur CSS printing browser.

📦 Instalasi
npm install react-to-print-custom-pagination-footer

atau

yarn add react-to-print-custom-pagination-footer

🚀 Cara Penggunaan

Berikut contoh dasar penggunaannya bersama dengan react-to-print:

import ReactToPrint from "react-to-print";
import { useCustomPrintFooter } from "react-to-print-custom-pagination-footer";
<ReactToPrint
trigger={() => (
<button>
    Cetak Semua Laporan
</button>
)}
content={() => yourcontent}
pageStyle={style()}
copyStyles={true}
onBeforeGetContent={() => {
paginateCustomForPrint(data, 1520, 1570, 30, 15)
}}
/>

note : pageStyle harus berisi seperti ini :
export const style = () => `
  @media print {
    @page {
      margin: 0;
    }
  }
`;
data, pageHeightPx, contentHeightPx, footerHeightPx, paddingMm
⚙️ Opsi Konfigurasi
Opsi	Tipe	Default	Deskripsi
data	object	{}	menampilkan nama user di kiri bawah.
pageHeightPx	number	0	total tinggi dalam pixel di setiap halaman, ex: 1123px untuk a4.
contentHeightPx	number	0	total tinggi konten dalam pixel di setiap halaman.
footerHeightPx	number	0	Tinggi area footer dalam pixel di setiap halaman.
paddingMm       number  0   total pagging di setiap halaman dalam milimeter.
🧠 Contoh Kasus Penggunaan

Misalnya kamu memiliki laporan yang terdiri dari banyak bagian data (bulky data), dan kamu ingin setiap laporan memiliki penomoran halaman sendiri-sendiri (reset) seperti:

Laporan A -> Halaman 1/4, 2/4, 3/4, 4/4
Laporan B -> Halaman 1/3, 2/3, 3/3


Browser seperti Google Chrome tidak mengizinkan pengaturan footer custom melalui CSS (@page atau @bottom-center), maka package ini dapat digunakan untuk menambahkan footer tersebut secara dinamis melalui JavaScript.

💡 Catatan

Package ini bekerja dengan menambahkan elemen footer ke dalam setiap halaman hasil render print.

Cocok digunakan bersama react-to-print, bukan untuk PDF rendering server-side.

Disarankan untuk menentukan tinggi footer agar layout tidak terpotong.

🖋️ Lisensi

MIT License © 2025
Dikembangkan untuk membantu kebutuhan print bulky dengan custom pagination di browser Chrome.
Semoga bermanfaat — terima kasih! 🙌