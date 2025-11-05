// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-toggle-icon');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Resume Download Function
async function downloadResume() {
    try {
        const fileData = await window.fs.readFile('VanshPratapSingh_Resume.pdf');
        const blob = new Blob([fileData], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'VanshPratapSingh_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading resume:', error);
        alert('Resume file not found. Please make sure VanshPratapSingh_Resume.pdf is uploaded.');
    }
}

// Contact form submission using EmailJS
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formStatus = document.getElementById("formStatus");
  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // Initialize EmailJS
  emailjs.init("okIPe631qXV6kpQeV"); // Replace with your Public Key

  const templateParams = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  emailjs.send("service_7z8udhb", "template_rffelng", templateParams)
    .then(() => {
      formStatus.style.display = "block";
      formStatus.className = "success";
      formStatus.textContent = "✅ Message sent successfully!";
      e.target.reset();
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      formStatus.style.display = "block";
      formStatus.className = "error";
      formStatus.textContent = "❌ Failed to send message. Please try again.";
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      setTimeout(() => formStatus.style.display = "none", 5000);
    });
});


// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Certificate Modal Viewer
function openCertificate(image, title, issuer, link) {
  const modal = document.getElementById("certificateModal");
  document.getElementById("modalImage").src = image;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalIssuer").textContent = issuer;

  const modalLink = document.getElementById("modalLink");
  modalLink.href = link; // ✅ this line updates the link
  modalLink.style.display = link && link !== "#" ? "inline-block" : "none";

  modal.style.display = "flex";
}

function closeCertificate() {
  const modal = document.getElementById("certificateModal");
  modal.style.display = "none";
}

// Close modal when clicking outside content
window.addEventListener("click", function (e) {
  const modal = document.getElementById("certificateModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Banking Dashboard Modal Viewer
let dashboardImages = [
  "Screenshot 2025-09-13 203745.png",
  "Screenshot 2025-09-13 203823.png",
  "Screenshot 2025-09-13 203853.png",
  "Screenshot 2025-09-13 203940.png"
];

let currentDashboardIndex = 0;

function openBankingDashboardModal() {
  const modal = document.getElementById("bankingDashboardModal");
  const dashboardImage = document.getElementById("dashboardImage");
  
  dashboardImage.src = dashboardImages[currentDashboardIndex];
  modal.style.display = "flex";
}

function closeBankingDashboardModal() {
  const modal = document.getElementById("bankingDashboardModal");
  modal.style.display = "none";
}

document.getElementById("nextDashboard").addEventListener("click", () => {
  currentDashboardIndex = (currentDashboardIndex + 1) % dashboardImages.length;
  document.getElementById("dashboardImage").src = dashboardImages[currentDashboardIndex];
});

document.getElementById("prevDashboard").addEventListener("click", () => {
  currentDashboardIndex = (currentDashboardIndex - 1 + dashboardImages.length) % dashboardImages.length;
  document.getElementById("dashboardImage").src = dashboardImages[currentDashboardIndex];
});

// Close modal when clicking outside
window.addEventListener("click", function (e) {
  const modal = document.getElementById("bankingDashboardModal");
  if (e.target === modal) {
    closeBankingDashboardModal();
  }
});
