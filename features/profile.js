/* PROFILE: edit this template and the functions below; keep IDs used by shared navigation. */
document.getElementById('mount-profile').outerHTML = `<section id="screen-profile" class="screen">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-serif text-2xl">Profile</h2>
          </div>
          <div class="card p-5 text-center mb-5">
            <div class="w-16 h-16 mx-auto rounded-full bg-sand flex items-center justify-center mb-3">
              <i data-lucide="user" class="w-8 h-8 text-dark"></i>
            </div>
            <h3 id="profile-name" class="font-serif text-xl">Guest</h3>
            <p id="profile-persona" class="text-gold text-sm font-medium mt-1">The Curious Newcomer</p>
            <div class="flex justify-center gap-8 mt-4 text-sm">
              <div><span id="profile-sips" class="block font-serif text-xl text-dark">0</span><span class="text-gray-400 text-[10px] uppercase tracking-wider">Sips</span></div>
              <div><span id="profile-points" class="block font-serif text-xl text-dark">0</span><span class="text-gray-400 text-[10px] uppercase tracking-wider">Points</span></div>
            </div>
          </div>

          <h3 class="font-serif text-base mb-2">My QR Code Wallet</h3>
          <div id="profile-wallet" class="space-y-2 mb-5"></div>

          <h3 class="font-serif text-base mb-2">Want to Try</h3>
          <div id="profile-wishlist" class="space-y-2 mb-5"></div>

          <button onclick="resetDemo()" class="pressable w-full py-3 rounded-full border border-sand text-gray-500 text-sm">Reset demo data</button>
        </section>`;

    // ===== PROFILE =====
    function renderProfile(){
      document.getElementById('profile-name').textContent = state.user?.name || 'Guest';
      document.getElementById('profile-persona').textContent = computePersona();
      document.getElementById('profile-sips').textContent = state.sipLog.length;
      document.getElementById('profile-points').textContent = state.points;
      renderWallet();
      renderWishlist();
    }
    function renderWallet(){
      const wl = document.getElementById('profile-wallet');
      if (!state.savedQrs.length){ wl.innerHTML='<p class="text-sm text-gray-400">No saved QR codes yet.</p>'; return; }
      wl.innerHTML = state.savedQrs.slice().reverse().map(qr=>{
        const d = findDrink(qr.drinkId); const b = findBar(qr.barId);
        return `<button onclick="openSavedQr('${qr.id}')" class="pressable w-full card p-3 flex gap-3 items-center text-left">
          <img src="${imgUrl(d.prompt)}" class="w-12 h-12 rounded-xl object-cover bg-sand" />
          <div class="flex-1"><p class="text-sm font-medium">${d.name}</p><p class="text-[10px] text-gray-400">${b.name}</p></div>
          <i data-lucide="qr-code" class="w-5 h-5 text-gold"></i>
        </button>`;
      }).join('');
    }
    function renderWishlist(){
      const wl = document.getElementById('profile-wishlist');
      if (!state.wishlist.length){ wl.innerHTML='<p class="text-sm text-gray-400">No saved drinks yet.</p>'; return; }
      wl.innerHTML = state.wishlist.slice().reverse().map(w=>{
        const d = findDrink(w.drinkId); const b = findBar(w.barId);
        return `<div class="card p-3 flex gap-3 items-center">
          <img src="${imgUrl(d.prompt)}" class="w-12 h-12 rounded-xl object-cover bg-sand" />
          <div class="flex-1"><p class="text-sm font-medium">${d.name}</p><p class="text-[10px] text-gray-400">${b.name}</p></div>
          <button onclick="removeWish('${w.drinkId}')" class="pressable text-xs text-gold underline">Remove</button>
        </div>`;
      }).join('');
    }
    function openSavedQr(qrId){
      const qr = state.savedQrs.find(q=>q.id===qrId); if (!qr) return;
      const d = findDrink(qr.drinkId); const b = findBar(qr.barId);
      const text = `${qr.promo?'PROMO':'ORDER'}|${b.id}|${d.id}|${qr.savedAt}`;
      showQrOverlay(text, `${d.name} @ ${b.name}`);
    }
    function removeWish(id){
      state.wishlist = state.wishlist.filter(w=>w.drinkId!==id);
      saveState();
      renderProfile();
      showToast('Removed');
    }
    function resetDemo(){ localStorage.removeItem('siply-state-v2'); location.reload(); }
    function computePersona(){
      if (!state.sipLog.length) return 'The Curious Newcomer';
      const tags = {};
      state.sipLog.forEach(s=>findDrink(s.drinkId).tags.forEach(t=>tags[t]=(tags[t]||0)+1));
      if ((tags['smoky']||0)+(tags['spicy']||0)+(tags['savory']||0) > 2) return 'The Bold Explorer';
      if ((tags['sweet']||0)+(tags['creamy']||0) > 2) return 'The Smooth Romantic';
      if ((tags['herbal']||0)+(tags['floral']||0) > 2) return 'The Botanical Dreamer';
      return 'The Curious Sipper';
    }

