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
  const searchIcon = document.getElementById('search-icon');
  const searchInput = document.getElementById('search-input');
  const mobileSearchContainer = document.getElementById('mobile-search-container');
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const profileContainer = document.getElementById('profile-container');
  const profileCards = document.querySelectorAll('.profile-card');
  const warningMessage = document.getElementById('warning-message');
  const recommendations = document.getElementById('recommendations');
  
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
    if (!searchIcon.contains(e.target) && !mobileSearchContainer.contains(e.target)) {
      mobileSearchContainer.classList.remove('active');
    }
  });
  
  const isMobileOrTablet = () => window.matchMedia('(max-width: 768px)').matches;
  
  searchIcon.addEventListener('click', () => {
    if (isMobileOrTablet()) {
      mobileSearchContainer.classList.toggle('active');
      if (mobileSearchContainer.classList.contains('active')) {
        mobileSearchInput.focus();
        navLinks.classList.remove('active'); 
        hamburger.classList.remove('active');
      } else {
        mobileSearchInput.blur();
      }
    }
  });
  
  hamburger.addEventListener('click', () => {
    if (isMobileOrTablet()) {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      if (navLinks.classList.contains('active')) {
        mobileSearchContainer.classList.remove('active'); 
        mobileSearchInput.blur();
      }
    }
  });
  
  const levenshteinDistance = (s, t) => {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
  
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
      arr[i] = [i];
      for (let j = 1; j <= s.length; j++) {
        arr[i][j] = i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
      }
    }
    return arr[t.length][s.length];
  };
  
  const filterProfiles = (searchTerm) => {
    let found = false;
    const names = [];
    profileCards.forEach(card => {
      const name = card.querySelector('.profile-name').textContent.toLowerCase();
      names.push(name);
      if (name.includes(searchTerm.toLowerCase())) {
        card.style.display = 'flex';
        found = true;
      } else {
        card.style.display = 'none';
      }
    });
  
    if (!found) {
      const recommendationsList = names
        .map(name => ({
          name,
          distance: levenshteinDistance(searchTerm.toLowerCase(), name)
        }))
        .filter(item => item.distance <= 3)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3); 
  
      if (recommendationsList.length > 0) {
        const recommendedNames = recommendationsList.map(item => item.name).join(', ');
        recommendations.innerHTML = recommendedNames;
        warningMessage.classList.add('show');
      } else {
        recommendations.innerHTML = 'Tidak ada rekomendasi.';
        warningMessage.classList.add('show');
      }
    } else {
      warningMessage.classList.remove('show');
    }
  };
  
  searchInput.addEventListener('input', (e) => {
    filterProfiles(e.target.value);
  });
  
  mobileSearchInput.addEventListener('input', (e) => {
    filterProfiles(e.target.value);
  });