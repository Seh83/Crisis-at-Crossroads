pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.7.570/pdf.worker.min.js";

let pdfDoc = null;
let pageNum = 1;
const scale = 1.5;
const canvas = document.getElementById("pdf-render");
const ctx = canvas.getContext("2d");

// Load PDF
async function loadPDF(url) {
  try {
    const pdf = await pdfjsLib.getDocument(url).promise;
    pdfDoc = pdf;
    document.getElementById("total-pages").textContent = pdfDoc.numPages;
    renderPage(pageNum);
  } catch (error) {
    console.error("Error loading PDF:", error);
    alert("Could not load the PDF file. Please check the path or file.");
  }
}

// Render the page
async function renderPage(num) {
  const page = await pdfDoc.getPage(num);
  const viewport = page.getViewport({ scale });
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderCtx = {
    canvasContext: ctx,
    viewport: viewport,
  };

  await page.render(renderCtx).promise;
  document.getElementById("current-page").textContent = num;
}

// Button event handlers
document.getElementById("prev-page").addEventListener("click", () => {
  if (pageNum <= 1) return;
  pageNum--;
  renderPage(pageNum);
});

document.getElementById("next-page").addEventListener("click", () => {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  renderPage(pageNum);
});

// Load your PDF
loadPDF("Homeless_Schizodraft_Updated.pdf");
