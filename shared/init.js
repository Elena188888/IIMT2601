    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', () => {
      if (location.search.includes('demo=1')) { state.loggedIn = true; saveState(); }
      if (state.role === 'bar') currentRole = 'bar';
      renderStaticChips();
      if (state.loggedIn) startApp();
      else go('login');
    });

    function startApp() {
      document.getElementById('screen-login').classList.remove('active');
      document.getElementById('screen-login-form').classList.remove('active');
      document.getElementById('screen-otp').classList.remove('active');
      const main = document.getElementById('main-app');
      main.classList.remove('hidden');
      main.classList.add('flex');
      go(currentRole === 'bar' ? 'bar-dashboard' : 'discovery');
    }

