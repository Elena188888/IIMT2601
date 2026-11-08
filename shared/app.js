    // ===== STATE =====
    let state = loadState();
    let currentScreen = 'login';
    let previousScreen = 'login';
    let currentRole = 'user';
    let displayedMonth = new Date();
    let currentDiscovery = { shuffles: 2, last: null, matchAt: null };
    let currentSurprise = null;
    let surpriseDeclined = 0;
    let selectedPeople = 0;

    function generateSampleData() {
      const posts = [];
      const sampleUsers = ['Coco','Marcus','Ella','Leo','Sofia'];
      const sampleNotes = ['Perfect balance.','Would order again.','A little sweet for me.','Stunning presentation.','Hidden gem.'];
      for (let i=0;i<5;i++) {
        const bar = bars[i % bars.length];
        const drink = bar.drinks[i % bar.drinks.length];
        posts.push({
          id:'p'+i, user:sampleUsers[i], drinkId:drink.id, barId:bar.id, rating:4+(i%2),
          note:sampleNotes[i], photo:imgUrl(drink.prompt), likes:8+i*2,
          likedByMe:false, date:new Date(Date.now()-i*86400000).toISOString(),
          comments:[{user:'Siply','text':'Cheers!','date':new Date(Date.now()-i*43200000).toISOString()}]
        });
      }
      const sipLog = [];
      const today = new Date();
      for (let i=1;i<=45;i++) {
        if (Math.random()>0.5) continue;
        const bar = bars[Math.floor(Math.random()*bars.length)];
        const drink = bar.drinks[Math.floor(Math.random()*bar.drinks.length)];
        const date = addDays(today, -i);
        sipLog.push({date, drinkId:drink.id, barId:bar.id, price:drink.price});
      }
      return { posts, barPosts:[], barDrinks:[], barRemovedDrinks:[], barProfile:null, sipLog, points:680, wishlist:[], savedQrs:[], pendingDrinks:[], promos:[], user:{name:'Alex'}, role:'user', barId:'bar-velvet', surpriseUsed:null, barLoggedIn:false };
    }

    function loadState() {
      const raw = localStorage.getItem('siply-state-v2');
      if (raw) {
        const saved = JSON.parse(raw);
        saved.posts = saved.posts || [];
        saved.pendingDrinks = saved.pendingDrinks || [];
        saved.promos = saved.promos || [];
        saved.barPosts = saved.barPosts || [];
        saved.barDrinks = saved.barDrinks || [];
        saved.barRemovedDrinks = saved.barRemovedDrinks || [];
        saved.barProfile = saved.barProfile || null;
        hydrateBarDrinks(saved);
        return saved;
      }
      const s = generateSampleData();
      s.loggedIn = false;
      return s;
    }
    function saveState(){ localStorage.setItem('siply-state-v2', JSON.stringify(state)); }
    function hydrateBarDrinks(saved){
      const bar = bars.find(b=>b.id === (saved.barId || 'bar-velvet')) || bars[0];
      (saved.barDrinks || []).filter(d=>!bar.drinks.some(existing=>existing.id===d.id)).forEach(d=>bar.drinks.push(d));
      const removed = new Set(saved.barRemovedDrinks || []);
      bar.drinks = bar.drinks.filter(d=>!removed.has(d.id));
    }


    // ===== LOGIN =====
    function startUserLogin(){ currentRole='user'; document.getElementById('login-role-label').textContent='User Access'; go('login-form'); }
    function startBarLogin(){ currentRole='bar'; document.getElementById('login-role-label').textContent='Partner Bar Access'; go('login-form'); }
    function toOtp(){
      const email = document.getElementById('login-email').value.trim();
      const pass = document.getElementById('login-pass').value.trim();
      if (!email || !pass) return showToast('Please enter your details');
      go('otp');
      setTimeout(autoFillOtp, 600);
    }
    function autoFillOtp(){
      const code = '888888';
      document.querySelectorAll('#otp-boxes div').forEach((b,i)=> b.textContent = code[i]);
      const btn = document.getElementById('otp-confirm');
      btn.disabled = false; btn.classList.remove('opacity-50');
    }
    function confirmOtp(){
      state.loggedIn = true;
      if (!state.user) state.user = {};
      state.user.name = document.getElementById('login-email').value.trim().split('@')[0] || 'Guest';
      state.role = currentRole;
      if (currentRole === 'bar') state.barLoggedIn = true;
      saveState();
      if (currentRole === 'bar') { startApp(); showToast('Bar workspace unlocked'); }
      else { startApp(); showToast('Welcome to Siply'); }
    }


    // ===== NAVIGATION =====
    function go(screen){
      if (currentRole === 'bar' && (screen === 'discovery' || screen === 'surprise' || screen === 'siplog')) screen = 'bar-dashboard';
      if(screen!=='discovery') resetQuizMotion();
      if (screen !== 'drink-detail') previousScreen = currentScreen;
      currentScreen = screen;
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      const el = document.getElementById('screen-' + screen);
      if (el) el.classList.add('active');
      updateRoleNavigation();
      document.querySelectorAll('[data-nav]').forEach(n => n.classList.toggle('active', n.dataset.nav === screen));
      if (screen === 'discovery') renderDiscovery();
      if (screen === 'surprise') renderSurprise();
      if (screen === 'siplog') renderSipLog();
      if (screen === 'community') renderCommunity();
      if (screen === 'profile') renderProfile();
      if (screen === 'bar-dashboard') renderBarDashboard();
      const scroller = el && el.closest('#main-app')
        ? document.querySelector('#main-app > .screen-scroll')
        : el && el.querySelector('.screen-scroll');
      if (scroller) scroller.scrollTop = 0;
      setTimeout(()=>lucide.createIcons(), 10);
    }
    function updateRoleNavigation(){
      const isBar = currentRole === 'bar';
      document.getElementById('nav-discovery').classList.toggle('hidden', isBar);
      document.getElementById('nav-surprise').classList.toggle('hidden', isBar);
      document.getElementById('nav-siplog').classList.toggle('hidden', isBar);
      document.getElementById('nav-bar-dashboard').classList.toggle('hidden', !isBar);
      document.getElementById('nav-bar-dashboard').style.order = isBar ? '1' : '';
      document.getElementById('nav-community').style.order = isBar ? '2' : '';
      document.querySelectorAll('[data-nav="discovery"],[data-nav="community"],[data-nav="bar-dashboard"]').forEach(n=>n.classList.toggle('active', n.dataset.nav === currentScreen));
    }


    // ===== QR OVERLAY =====
    function showQrOverlay(text, title){
      const ov = document.getElementById('qr-overlay');
      document.getElementById('qr-title').textContent = title;
      document.getElementById('qr-slot').innerHTML = '';
      ov.classList.remove('hidden');
      ov.classList.add('flex');
      setTimeout(()=> new QRCode(document.getElementById('qr-slot'), { text, width:180, height:180, colorDark:'#000000', colorLight:'#ffffff' }), 0);
    }
    function closeQrOverlay(){
      const ov = document.getElementById('qr-overlay');
      ov.classList.add('hidden'); ov.classList.remove('flex');
    }

    function closeModal(){ document.getElementById('modal-root').classList.add('hidden'); }

    function showToast(msg){
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.remove('opacity-0');
      setTimeout(()=>t.classList.add('opacity-0'), 2500);
    }


    function startCountdown(elId, from){
      const el = document.getElementById(elId);
      if (!el) return;
      const update = () => {
        const left = Math.max(0, from + 24*3600*1000 - Date.now());
        const h=Math.floor(left/3600000), m=Math.floor((left%3600000)/60000), s=Math.floor((left%60000)/1000);
        el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
      };
      update();
      const iv = setInterval(()=>{ if (!document.getElementById(elId)){ clearInterval(iv); } else update(); }, 1000);
    }

    function flyCardToProfile(sourceEl){
      const rect = sourceEl.getBoundingClientRect();
      const target = document.getElementById('header-profile').getBoundingClientRect();
      const clone = sourceEl.cloneNode(true);
      clone.classList.add('fly-clone');
      clone.style.left = rect.left + 'px';
      clone.style.top = rect.top + 'px';
      clone.style.width = rect.width + 'px';
      clone.style.height = rect.height + 'px';
      (document.querySelector('.phone-screen') || document.body).appendChild(clone);
      requestAnimationFrame(()=>{
        const dx = target.left + target.width/2 - rect.left - rect.width/2;
        const dy = target.top + target.height/2 - rect.top - rect.height/2;
        clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.08)`;
        clone.style.opacity = '0';
      });
      setTimeout(()=>clone.remove(), 750);
      const icon = document.getElementById('header-profile');
      icon.classList.add('gold-glow');
      setTimeout(()=>icon.classList.remove('gold-glow'), 1200);
    }

