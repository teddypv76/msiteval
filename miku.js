document.addEventListener('DOMContentLoaded', function () {
  const PASSWORD = "MIKUMIKUBEAM"; // Mot de passe à vérifier

  const loginContainer = document.getElementById('loginContainer');
  const protectedContent = document.getElementById('protectedContent');
  const passwordInput = document.getElementById('passwordInput');
  const submitBtn = document.getElementById('submitBtn');
  const errorMsg = document.getElementById('errorMsg');

  function checkPassword() {
    if (passwordInput.value === PASSWORD) {
      errorMsg.classList.add('hidden');
      loginContainer.classList.add('hidden');
      protectedContent.classList.remove('hidden');
    } else {
      errorMsg.classList.remove('hidden');
      passwordInput.value = '';
      passwordInput.focus();
    }
  }

  submitBtn.addEventListener('click', checkPassword);

  passwordInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      checkPassword();
    }
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery img');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.remove('hidden');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.add('hidden');
});

