document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

//   document.addEventListener('keydown', function (e) {
//     if (e.ctrlKey && e.shiftKey && e.key === 'C') {
//       e.preventDefault();
//     }
//     if (e.ctrlKey && e.key === 'u') {
//       e.preventDefault();
//     }
//     if (e.key === 'F12') {
//       e.preventDefault();
//     }
//   });

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });