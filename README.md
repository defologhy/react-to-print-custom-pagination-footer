# 📄 react-to-print-custom-pagination-footer

**react-to-print-custom-pagination-footer** adalah package untuk menambahkan **custom footer** saat proses printing di browser (khususnya Chrome) menggunakan package [react-to-print](https://www.npmjs.com/package/react-to-print).

Package ini dirancang untuk mengatasi keterbatasan browser Chrome yang **tidak mendukung custom pagination atau footer via CSS**, terutama pada kasus printing data dalam jumlah besar (*bulky print*) di mana setiap halaman perlu memiliki **penomoran halaman (paging)** yang *reset* untuk setiap blok data.

---

## ✨ Fitur Utama

✅ Menambahkan custom footer di setiap halaman hasil print.  
✅ **Kiri bawah:** Timestamp (tanggal & waktu saat print dilakukan).  
✅ **Kanan bawah:** Nomor halaman (paging), yang bisa di-*reset* untuk setiap bagian data.  
✅ Kompatibel dengan **React** dan **react-to-print**.  
✅ Solusi untuk *print bulky data* dengan pagination custom tanpa bergantung pada fitur CSS printing browser.

---

## 📦 Instalasi

```bash
npm install react-to-print-custom-pagination-footer
```
atau
```bash
yarn add react-to-print-custom-pagination-footer
```

## 🚀 Cara Penggunaan
Berikut contoh dasar penggunaannya bersama dengan react-to-print:
```bash
import ReactToPrint from "react-to-print";
import { paginateCustomForPrint, useCustomPrintFooter } from "react-to-print-custom-pagination-footer";
import { style } from "./printStyles"; // contoh file berisi style print

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
    paginateCustomForPrint(
      data,
      297,  // tinggi halaman A4 (mm)
      280,  // tinggi area konten (mm)
      15,   // tinggi footer (mm)
      10,   // padding (mm)
      ".report-section", // optional
      ".print-content"   // optional
    );
  }}
/>
```

Catatan:
Fungsi paginateCustomForPrint menerima satuan milimeter (mm), bukan pixel.

## 🧩 Struktur Parameter
```js
paginateCustomForPrint(
  printedBy,        // user yang melakukan print
  pageHeightMm,     // tinggi halaman (misal: 293 mm untuk A4)
  contentHeightMm,  // tinggi area konten di dalam halaman (misal: 297 mm untuk A4)
  footerHeightMm,   // tinggi area footer di setiap halaman
  paddingMm,        // padding halaman dalam mm
  sectionSelector?, // optional: selector elemen section
  contentSelector?  // optional: selector elemen konten
);
```

## ⚙️ Opsi Konfigurasi
| Opsi | Tipe | Default | Deskripsi |
|------|------|----------|------------|
| `printedBy` | `string` | `""` | Menampilkan nama user yang melakukan print di kiri bawah. |
| `pageHeightMm` | `number` | `0` | Total tinggi halaman (contoh: 297 mm untuk A4). |
| `contentHeightMm` | `number` | `0` | Total tinggi area konten per halaman. |
| `footerHeightMm` | `number` | `0` | Tinggi area footer di setiap halaman. |
| `paddingMm` | `number` | `0` | Padding di setiap halaman (mm). |

📄 Contoh Style Print
File: printStyles.js
```bash
export const style = () => `
  @media print {
    @page {
      margin: 0;
      size: A4;
    }
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;
```
## 🧠 Contoh Kasus Penggunaan
Misalnya kamu memiliki laporan yang terdiri dari banyak bagian data (bulky data), dan kamu ingin setiap laporan memiliki penomoran halaman sendiri-sendiri (reset pagination) seperti:<br><br>

Laporan A -> Halaman 1/4, 2/4, 3/4, 4/4 <br>
Laporan B -> Halaman 1/3, 2/3, 3/3<br>
Browser seperti Google Chrome tidak mengizinkan pengaturan footer custom melalui CSS (@page atau @bottom-center), maka package ini dapat digunakan untuk menambahkan footer tersebut secara dinamis melalui JavaScript.

## 💡 Catatan Penting
Package ini bekerja dengan menambahkan elemen footer ke dalam setiap halaman hasil render print.<br>
Cocok digunakan bersama react-to-print, bukan untuk PDF rendering server-side.<br>
Disarankan menentukan tinggi footer agar layout tidak terpotong.<br>
Semua ukuran mendukung satuan mm untuk presisi tinggi saat print.<br>
Mendukung penambahan label "Printed by" di kiri bawah halaman.

## 🧾 Contoh Footer Otomatis
Contoh hasil print akan memiliki footer seperti berikut:

Dicetak pada 11-11-2025 10:42 oleh Defitra M. Yasin                         Halaman 1/3<br>
Footer akan otomatis ditambahkan pada setiap halaman yang dihasilkan oleh react-to-print.

## 📏 Ukuran Referensi Kertas
Jenis Kertas	Lebar (mm)	Tinggi (mm)<br>
A4	210	297<br>
Letter	216	279<br>
Legal	216	356

## 🧰 Tips Tambahan
Jika kamu ingin agar penomoran halaman reset untuk setiap grup data (misalnya per laporan), panggil paginateCustomForPrint() setiap kali sebelum proses print per grup.

Contoh:<br>
```bash
onBeforeGetContent={() => {
  data.forEach(report => {
    paginateCustomForPrint(report.items, 297, 280, 15, 10);
  });
}}
```

## 🖋️ Lisensi
MIT License © 2025
Dikembangkan untuk membantu kebutuhan print bulky dengan custom pagination di browser Chrome.
Semoga bermanfaat — terima kasih! 🙌