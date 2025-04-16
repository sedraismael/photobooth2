const photoInput = document.getElementById("photoInput");
const filterSelect = document.getElementById("filterSelect");
const strip = document.getElementById("strip");
const stripColor = document.getElementById("stripColor");
const description = document.getElementById("description");
const dateSpan = document.querySelector("#date span");

dateSpan.textContent = new Date().toLocaleDateString();

photoInput.addEventListener("change", () => {
  strip.innerHTML = "";
  strip.style.borderLeftColor = stripColor.value;

  Array.from(photoInput.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.filter = filterSelect.value;
      strip.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  const desc = document.createElement("p");
  desc.innerText = description.value;
  desc.style.fontStyle = "italic";
  desc.style.marginTop = "10px";
  strip.appendChild(desc);
});

stripColor.addEventListener("change", () => {
  strip.style.borderLeftColor = stripColor.value;
});

function downloadStrip() {
  html2canvas(strip).then(canvas => {
    const link = document.createElement("a");
    link.download = "photobooth-strip.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
