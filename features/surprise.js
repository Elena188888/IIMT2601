/* SURPRISE: edit this template and the functions below; keep IDs used by shared navigation. */
document.getElementById('mount-surprise').outerHTML = `<section id="screen-surprise" class="screen">
          <div id="surprise-used" class="hidden min-h-[50vh] flex flex-col items-center justify-center text-center p-4">
            <p class="eyebrow mb-3">Surprise Me</p>
            <h2 class="font-serif text-2xl mb-3">You've used your<br/>Surprise Me chance today.</h2>
            <p class="text-sm text-gray-500 mb-6">You can come back tomorrow for another surprise,<br/>or explore AI Discovery.</p>
            <button onclick="go('discovery')" class="pressable btn-primary text-sm uppercase tracking-widest">Explore AI Discovery</button>
          </div>
          <div id="surprise-content"></div>
        </section>`;

    // ===== SURPRISE ME =====
    function renderSurprise(){
      document.getElementById('surprise-content').innerHTML = '';
      const used = state.surpriseUsed === todayStr();
      document.getElementById('surprise-used').classList.toggle('hidden', !used);
      if (used) return;
      showSurpriseStep1();
    }
    function showSurpriseStep1(){
      const root = document.getElementById('overlay-root');
      root.innerHTML = `
        <div class="absolute inset-0 bg-black/80 flex items-center justify-center p-6 pointer-events-auto">
          <div class="bg-cream rounded-[28px] p-7 w-full max-w-sm text-center">
            <p class="eyebrow mb-4">Surprise Me</p>
            <h3 class="font-serif text-2xl mb-6">Are you with a friend?</h3>
            <div class="flex gap-3">
              <button onclick="surpriseSetFriends(true)" class="pressable flex-1 btn-primary text-sm uppercase tracking-widest">Yes</button>
              <button onclick="surpriseSetFriends(false)" class="pressable flex-1 btn-outline text-sm uppercase tracking-widest">No</button>
            </div>
          </div>
        </div>`;
    }
    function surpriseSetFriends(withFriends){
      state.surpriseUsed = todayStr(); saveState();
      document.getElementById('overlay-root').innerHTML = '';
      if (!withFriends) runSurpriseReveal(1);
      else showSurpriseStep2();
    }
    function showSurpriseStep2(){
      selectedPeople = 0;
      const root = document.getElementById('overlay-root');
      root.innerHTML = `
        <div class="absolute inset-0 bg-black/80 flex items-center justify-center p-6 pointer-events-auto">
          <div class="bg-cream rounded-[28px] p-7 w-full max-w-sm text-center">
            <p class="eyebrow mb-3">Surprise Me</p>
            <h3 class="font-serif text-2xl mb-1">How many people are drinking tonight?</h3>
            <p class="text-xs text-gray-500 mb-6">Including yourself.</p>
            <div class="grid grid-cols-4 gap-3 mb-6" id="people-grid">
              ${[2,3,4,5].map(n=>`<button onclick="selectPeople(${n})" data-n="${n}" class="people-card pressable aspect-square rounded-2xl bg-white border border-sand flex items-center justify-center font-serif text-2xl">${n}</button>`).join('')}
            </div>
            <button id="people-go" onclick="confirmPeople()" class="pressable w-full btn-primary text-sm uppercase tracking-widest opacity-50" disabled>Let's go</button>
          </div>
        </div>`;
    }
    function selectPeople(n){
      selectedPeople = n;
      document.querySelectorAll('.people-card').forEach(b=>{
        const active = +b.dataset.n === n;
        b.style.borderColor = active ? 'var(--gold)' : '';
        b.style.color = active ? 'var(--gold)' : '';
      });
      const go = document.getElementById('people-go');
      go.disabled = false; go.classList.remove('opacity-50');
    }
    function confirmPeople(){ document.getElementById('overlay-root').innerHTML=''; runSurpriseReveal(selectedPeople); }

    function runSurpriseReveal(count){
      const bar = bars[Math.floor(Math.random()*bars.length)];
      const picks = [];
      for (let i=0;i<count;i++) picks.push({...bar.drinks[i % bar.drinks.length], promoPrice: Math.round(bar.drinks[i % bar.drinks.length].price*0.75), bar});
      currentSurprise = {bar, picks};
      surpriseDeclined = 0;
      showShakerAnimation();
    }

    function showShakerAnimation(){
      const root = document.getElementById('overlay-root');
      root.innerHTML = `
        <div class="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-auto">
          <div class="relative mb-8">
            <div class="beam absolute top-0 left-1/2 -translate-x-1/2 w-40 h-80 bg-gradient-to-b from-gold/30 to-transparent blur-2xl"></div>
            <svg id="surprise-shaker" class="shaker w-40 h-64" viewBox="0 0 100 160">
              <defs><linearGradient id="metal" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#5a5a5a"/><stop offset="50%" stop-color="#d4d4d4"/><stop offset="100%" stop-color="#4a4a4a"/></linearGradient></defs>
              <g class="shaker-lid">
                <path d="M25,5 L75,5 L72,25 L28,25 Z" fill="url(#metal)"/>
                <rect x="28" y="25" width="44" height="8" fill="#3a3a3a"/>
              </g>
              <path d="M22,33 L78,33 L72,130 C72,145 60,155 50,155 C40,155 28,145 28,130 Z" fill="url(#metal)" stroke="#333" stroke-width="0.5"/>
              <ellipse cx="50" cy="33" rx="28" ry="5" fill="#2a2a2a"/>
            </svg>
          </div>
          <p class="text-white/70 text-xs uppercase tracking-[0.25em]">Your surprise is waiting...</p>
        </div>`;
      setTimeout(()=>{ const s=document.getElementById('surprise-shaker'); if(s) s.classList.add('open'); }, 3200);
      setTimeout(()=>{ root.innerHTML=''; renderSurpriseCards(); }, 4500);
    }

    function renderSurpriseCards(){
      const {bar, picks} = currentSurprise;
      const root = document.getElementById('surprise-content');
      const isGroup = picks.length > 1;
      root.innerHTML = `
        <div class="text-center mb-5">
          <p class="eyebrow mb-1">${isGroup ? "Your Group's Surprise" : "Your Surprise"}</p>
          <h3 class="font-serif text-2xl">${bar.name}</h3>
          <p class="text-xs text-gray-500 mt-1">${picks.length} DRINK${picks.length>1?'S':''} · 1 BAR</p>
        </div>
        <div class="flex gap-4 overflow-x-auto snap-x hide-scrollbar pb-6" id="surprise-slider">
          ${picks.map((p,i)=>surpriseCardHTML(p,i)).join('')}
        </div>`;
      setTimeout(()=>lucide.createIcons(), 10);
    }

    function surpriseCardHTML(p,i){
      const img = imgUrl(p.prompt);
      return `
        <div id="surprise-card-${i}" class="snap-start flex-shrink-0 w-[85%]">
          <div class="flip-card">
            <div id="surprise-flipper-${i}" class="flipper">
              <div class="flip-front">
                <div class="card overflow-hidden">
                  <div class="relative h-64 bg-sand">
                    <img src="${img}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x600/EBE4D6/1F1F1F?text=${encodeURIComponent(p.name)}'" />
                    <div class="absolute top-3 left-3 bg-gold text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">Today only</div>
                  </div>
                  <div class="p-5 text-center">
                    <p class="eyebrow mb-1">${p.bar.name}</p>
                    <h3 class="font-serif text-2xl mb-2">${p.name}</h3>
                    <p class="text-sm text-gray-500 mb-3">${p.ingredients}</p>
                    <p class="text-xs text-gray-400 line-through mb-1">HK$${p.price}</p>
                    <p class="font-serif text-2xl text-dark mb-4">HK$${p.promoPrice}</p>
                    <p class="text-[10px] uppercase tracking-[0.2em] text-gold mb-4">No reshuffle.</p>
                    <p class="text-xs text-gray-400 mb-3">Will you accept this drink?</p>
                    <div class="flex gap-3">
                      <button onclick="acceptSurprise(${i})" class="pressable flex-1 btn-primary text-xs uppercase tracking-widest">Accept</button>
                      <button onclick="declineSurprise(${i})" class="pressable flex-1 btn-outline text-xs uppercase tracking-widest">Decline</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flip-back">
                <div class="card-dark p-6 text-center h-full flex flex-col justify-between">
                  <div>
                    <p class="eyebrow mb-2">Confirmed</p>
                    <h3 class="font-serif text-2xl text-white mb-1">${p.name}</h3>
                    <p class="text-sm text-white/60">${p.bar.name}</p>
                  </div>
                  <div class="bg-white/5 rounded-2xl p-5 relative sheen mx-auto w-48">
                    <div id="surprise-qr-${i}" class="qr-gold flex justify-center"></div>
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#C9A66B" stroke-width="1.2"><path d="M8 21h8M12 21V11m0 0c-2.5 0-4.5-2-4.5-4.5S9.5 2 12 2s4.5 2 4.5 4.5S14.5 11 12 11Z"/></svg>
                    </div>
                  </div>
                  <div>
                    <p class="text-white text-sm font-medium mb-1">Your drink is confirmed!</p>
                    <p class="text-[10px] uppercase tracking-[0.15em] text-gold mb-1">Redemption: Within 24 hours</p>
                    <p class="text-xs text-white/50 mb-4">Show this code at the bar to redeem your drink.</p>
                    <button onclick="saveSurpriseToWallet(${i})" class="pressable w-full btn-gold text-xs uppercase tracking-widest">Save to Wallet</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }

    function acceptSurprise(i){
      const p = currentSurprise.picks[i];
      if (p.saved) return;
      document.getElementById('surprise-flipper-' + i).classList.add('flipped');
      setTimeout(()=>{
        const code = `PROMO|${p.bar.id}|${p.id}|${Date.now()}`;
        new QRCode(document.getElementById('surprise-qr-' + i), { text: code, width: 140, height: 140, colorDark:'#000000', colorLight:'#ffffff' });
      }, 300);
      setTimeout(()=>{ if (!p.saved) saveSurpriseToWallet(i); }, 1800);
    }
    function declineSurprise(i){
      const card = document.getElementById('surprise-card-' + i);
      card.style.transition = 'opacity .5s, transform .5s';
      card.style.opacity = '0';
      card.style.transform = 'translateX(-40px)';
      setTimeout(()=>{ card.style.display='none'; }, 500);
      surpriseDeclined++;
      if (surpriseDeclined === currentSurprise.picks.length) setTimeout(showSurpriseAllDeclined, 600);
    }
    function showSurpriseAllDeclined(){
      const root = document.getElementById('overlay-root');
      root.innerHTML = `
        <div class="absolute inset-0 bg-black/80 flex items-center justify-center p-6 pointer-events-auto">
          <div class="bg-cream rounded-[28px] p-7 w-full max-w-sm text-center">
            <p class="eyebrow mb-4">Surprise Me</p>
            <h3 class="font-serif text-2xl mb-3">Sorry, your Surprise Me chance is over today.</h3>
            <p class="text-sm text-gray-500 mb-6">You may try AI Discovery to explore other drinks.</p>
            <button onclick="closeOverlay(); go('discovery');" class="pressable w-full btn-primary text-sm uppercase tracking-widest">Explore AI Discovery</button>
          </div>
        </div>`;
    }
    function saveSurpriseToWallet(i){
      const p = currentSurprise.picks[i];
      if (p.saved) return;
      p.saved = true;
      state.savedQrs.push({id:'qr-'+Date.now(), drinkId:p.id, barId:p.bar.id, promo:true, savedAt:Date.now()});
      saveState();
      flyCardToProfile(document.getElementById('surprise-card-' + i).querySelector('.flip-card'));
      showToast('Saved to your wallet.');
    }
    function closeOverlay(){ document.getElementById('overlay-root').innerHTML=''; }

