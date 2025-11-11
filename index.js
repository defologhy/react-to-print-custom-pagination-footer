const paginateCustomForPrint = (
  printedBy,
  pageHeightMm,
  contentHeightMm,
  footerHeightMm,
  paddingMm,
  sectionClassName,
  contentClassName
) => {
  const PX_PER_MM = 3.779528;

  // usable height
  const usableHeightMm = pageHeightMm - footerHeightMm - footerHeightMm;

  const sections = document.querySelectorAll(sectionClassName);

  sections.forEach((section) => {
    const content = section.querySelector(contentClassName);
    if (!content) return;

    // hapus halaman lama
    section.querySelectorAll(".page-print").forEach((p) => p.remove());

    // clone untuk hitung tinggi
    const clone = content.cloneNode(true);
    clone.style.cssText = `
      position: absolute;
      visibility: hidden;
      width: 210mm;
      top: 0;
      left: -9999px;
    `;
    document.body.appendChild(clone);

    const totalHeightPx = clone.scrollHeight;
    document.body.removeChild(clone);

    const totalHeightMm = totalHeightPx / PX_PER_MM;
    const totalPages = Math.ceil(totalHeightMm / usableHeightMm);

    for (let i = 0; i < totalPages; i++) {
      const page = document.createElement("div");
      page.className = "page-print";
      page.style.cssText = `
        position: relative;
        height: ${contentHeightMm}mm;
        background: white;
        box-sizing: border-box;
        overflow: hidden;
        page-break-after: always;
        padding: ${paddingMm}mm ${paddingMm}mm 0mm ${paddingMm}mm;
      `;

      const body = document.createElement("div");
      body.className = "page-body";
      body.style.cssText = `
        height: ${usableHeightMm}mm;
        box-sizing: border-box;
        overflow: hidden;
      `;
      body.innerHTML = `
        <div style="transform: translateY(-${i * usableHeightMm}mm);">
          ${content.innerHTML}
        </div>
      `;

      const footer = document.createElement("div");
      footer.className = "page-footer";
      footer.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: ${footerHeightMm}mm;
        line-height: ${footerHeightMm}mm;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        padding: 0 ${paddingMm}mm;
        box-sizing: border-box;
      `;

      const leftText = document.createElement("div");
      leftText.innerHTML = `Dicetak pada ${moment().format(
        "DD MMMM YYYY, HH:mm:ss"
      )} ${printedBy ? " oleh "+printedBy+" " : ""}`;

      const rightText = document.createElement("div");
      rightText.innerHTML = `${i + 1}/${totalPages}`;

      footer.appendChild(leftText);
      footer.appendChild(rightText);
      page.appendChild(body);
      page.appendChild(footer);
      section.appendChild(page);
    }

    content.style.display = "none";
  });
};

module.exports = {paginateCustomForPrint}