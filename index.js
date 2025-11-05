const paginateCustomForPrint = (data, pageHeightPx, contentHeightPx, footerHeightPx, paddingMm) => {
  const usableHeight = pageHeightPx - footerHeightPx - footerHeightPx;
  const sections = document.querySelectorAll(".report-section");

  sections.forEach((section) => {
    const content = section.querySelector(".print-content");
    if (!content) return;
    // hapus halaman lama supaya konten gk numpuk
    section.querySelectorAll(".page-print").forEach((pagePrint) => pagePrint.remove());
    // cloning konten untuk hitung total tinggi konten nya tanpa ganggu konten aslinya
    const cloneContent = content.cloneNode(true);
    cloneContent.style.cssText = `
      position: absolute;
      visibility: hidden;
      width: 800px;
      top: 0;
      left: -9999px;
    `;
    document.body.appendChild(cloneContent);
    const totalHeight = cloneContent.scrollHeight;
    document.body.removeChild(cloneContent);

    // hitung jumlah halaman di setiap data
    const totalPages = Math.ceil(totalHeight / usableHeight);
    // loop halaman per data
    for (let counterPage = 0; counterPage < totalPages; counterPage++) {
      // page
      const pageDiv = document.createElement("div");
      pageDiv.className = "page-print";
      pageDiv.style.cssText = `
        position: relative;
        height: ${contentHeightPx}px;
        background: white;
        box-sizing: border-box;
        overflow: hidden;
        page-break-after: always;
        padding: ${paddingMm}mm ${paddingMm}mm 0mm ${paddingMm}mm;
      `;

      // body
      const body = document.createElement("div");
      body.className = "page-body";
      body.style.cssText = `
        height: ${usableHeight}px;
        box-sizing: border-box;
        overflow: hidden;
      `;
      body.innerHTML = `
        <div style="transform: translateY(-${counterPage * usableHeight}px);">
          ${content.innerHTML}
        </div>
      `;

      // footer
      const footer = document.createElement("div");
      footer.className = "page-footer";
      footer.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: ${footerHeightPx}px;
        line-height: ${footerHeightPx}px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        padding: 0 ${paddingMm}mm; /* padding kiri-kanan */
        box-sizing: border-box;
      `;

      // footer kiri: info cetak
      const leftText = document.createElement("div");
      leftText.innerHTML = `Dicetak pada ${moment().format("DD MMMM YYYY, HH:mm:ss")} oleh ${data?.surgeryStatusPost?.[0]?.createdByName}`;

      // footer kanan: nomor halaman
      const rightText = document.createElement("div");
      rightText.innerHTML = `${counterPage + 1}/${totalPages}`;

      // gabungkan konten
      footer.appendChild(leftText);
      footer.appendChild(rightText);
      pageDiv.appendChild(body);
      pageDiv.appendChild(footer);
      section.appendChild(pageDiv);
    }

    // sembunyikan konten asli
    content.style.display = "none";
  });
};
module.exports = {paginateCustomForPrint}