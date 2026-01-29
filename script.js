// Fungsi Smooth Scroll untuk Navigasi
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// 1. ANIMASI ANGKA STATISTIK (Count Up)
const stats = document.querySelectorAll(".stat-item h4");
let hasAnimated = false;

function startCountAnimation() {
  stats.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000;
    const increment = target / (duration / 20);

    const updateCount = () => {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// 2. TOMBOL KEMBALI KE ATAS (Back To Top)
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function () {
  // Jalankan animasi angka saat scroll sampai section About
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    if (sectionPos < screenPos && !hasAnimated) {
      startCountAnimation();
      hasAnimated = true;
    }
  }

  // Tampilkan tombol Back to Top jika scroll lebih dari 300px
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

// Fungsi saat tombol Back to Top diklik
backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 3. LOGIKA FORM DONASI
document
  .getElementById("donation-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const btn = this.querySelector(".cta-button");
    const originalText = btn.innerText;
    const amount = document.getElementById("amount").value;
    const name = document.getElementById("name").value || "Hamba Allah";
    const messageElement = document.getElementById("donation-message");

    // Ubah tombol jadi Loading
    btn.innerText = "MEMPROSES...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    // Format Rupiah
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

    // Simulasi jeda server
    setTimeout(() => {
      messageElement.innerHTML = `✅ Terima kasih <strong>${name}</strong>! <br> Simulasi donasi ${formattedAmount} berhasil.`;
      messageElement.style.padding = "15px";
      messageElement.style.backgroundColor = "#d4edda";
      messageElement.style.color = "#155724";
      messageElement.style.border = "1px solid #c3e6cb";
      messageElement.style.borderRadius = "8px";

      btn.innerText = originalText;
      btn.style.opacity = "1";
      btn.disabled = false;

      document.getElementById("name").value = "";

      setTimeout(() => {
        messageElement.innerHTML = "";
        messageElement.style.padding = "0";
        messageElement.style.border = "none";
      }, 5000);
    }, 1500);
  });
