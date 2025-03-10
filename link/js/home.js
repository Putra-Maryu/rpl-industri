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

  (function () {
    const devToolsOpen = function () {};
    devToolsOpen.toString = function () {
      return 'devToolsOpen';
    };
    console.log('%c', devToolsOpen);
  })();

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });