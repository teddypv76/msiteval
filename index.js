 const trigger = document.getElementById('triggerImg');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.getElementById('modalClose');
  trigger.onclick = function() {
    modal.style.display = "block";
    modalImg.src = 'big-image.jpg'; // target image
  }
  closeBtn.onclick = function() {
    modal.style.display = "none";
  }
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = "none";
  }

    function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("collapsed");
  }