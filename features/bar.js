/* BAR: edit this template and the functions below; keep IDs used by shared navigation. */
document.getElementById('mount-bar').outerHTML = `<section id="screen-bar-dashboard" class="screen">
          <div class="flex items-center gap-3 mb-5">
            <button onclick="go('login')" class="pressable w-9 h-9 rounded-full bg-white border border-sand flex items-center justify-center"><i data-lucide="arrow-left" class="w-4 h-4"></i></button>
            <h2 class="font-serif text-xl">Partner Bar</h2>
          </div>
          <div id="bar-login" class="card p-5 mb-4">
            <label class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Bar passcode</label>
            <input id="bar-pass" type="password" value="siply2026" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-4 outline-none" />
            <button onclick="barLogin()" class="pressable w-full btn-primary text-sm uppercase tracking-widest">Unlock</button>
          </div>
          <div id="bar-panel" class="hidden">
            <div class="flex rounded-full bg-white border border-sand p-1 mb-4">
              <button onclick="setBarTab('upload')" data-btab="upload" class="bar-tab flex-1 py-2 rounded-full text-[10px] font-medium uppercase tracking-wider bg-dark text-white">Upload</button>
              <button onclick="setBarTab('promo')" data-btab="promo" class="bar-tab flex-1 py-2 rounded-full text-[10px] font-medium uppercase tracking-wider text-gray-500">Promo</button>
              <button onclick="setBarTab('scan')" data-btab="scan" class="bar-tab flex-1 py-2 rounded-full text-[10px] font-medium uppercase tracking-wider text-gray-500">Scan</button>
            </div>
            <div id="bar-tab-upload" class="bar-panel">
              <div class="card p-4 mb-3">
                <input id="bar-drink-name" type="text" placeholder="Drink name" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none" />
                <input id="bar-drink-bar" type="text" placeholder="Bar name" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none" />
                <input id="bar-drink-price" type="number" placeholder="Price HKD" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none" />
                <textarea id="bar-drink-desc" rows="2" placeholder="Description / tags" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-4 outline-none text-sm"></textarea>
                <button onclick="barUpload()" class="pressable w-full btn-primary text-sm uppercase tracking-widest">Submit for review</button>
              </div>
              <div id="bar-pending" class="space-y-2"></div>
            </div>
            <div id="bar-tab-promo" class="bar-panel hidden">
              <div class="card p-4 mb-3">
                <select id="bar-promo-drink" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none"></select>
                <input id="bar-promo-price" type="number" placeholder="Promo price HKD" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none" />
                <input id="bar-promo-date" type="date" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-4 outline-none" />
                <button onclick="barPublishPromo()" class="pressable w-full btn-primary text-sm uppercase tracking-widest">Publish promo</button>
              </div>
              <div id="bar-promo-list" class="space-y-2"></div>
            </div>
            <div id="bar-tab-scan" class="bar-panel hidden">
              <div class="card p-6 text-center">
                <i data-lucide="scan-line" class="w-10 h-10 mx-auto text-gold mb-3"></i>
                <p class="text-sm text-gray-500 mb-4">Tap to simulate scanning a customer QR code.</p>
                <button onclick="barScan()" class="pressable w-full btn-primary text-sm uppercase tracking-widest">Scan code</button>
                <p id="scan-result" class="mt-3 text-sm font-medium hidden"></p>
              </div>
            </div>
          </div>
        </section>`;

    // ===== BAR DASHBOARD =====
    function barLogin(){
      if (document.getElementById('bar-pass').value === 'siply2026'){
        state.barLoggedIn = true; saveState();
        renderBarDashboard();
        showToast('Bar dashboard unlocked');
      } else showToast('Wrong passcode');
    }
    function setBarTab(tab){
      document.querySelectorAll('[data-btab]').forEach(b=>{
        b.classList.toggle('bg-dark', b.dataset.btab===tab);
        b.classList.toggle('text-white', b.dataset.btab===tab);
        b.classList.toggle('text-gray-500', b.dataset.btab!==tab);
      });
      document.querySelectorAll('.bar-panel').forEach(p=>p.classList.add('hidden'));
      document.getElementById('bar-tab-'+tab).classList.remove('hidden');
    }
    function renderBarDashboard(){
      document.getElementById('bar-login').classList.toggle('hidden', state.barLoggedIn);
      document.getElementById('bar-panel').classList.toggle('hidden', !state.barLoggedIn);
      if (!state.barLoggedIn) return;
      document.getElementById('bar-pending').innerHTML = state.pendingDrinks.length ? state.pendingDrinks.map(d=>`
        <div class="card p-3 text-sm"><p class="font-medium">${d.name}</p><p class="text-xs text-gray-400">${d.bar} · ${d.status}</p></div>
      `).join('') : '<p class="text-sm text-gray-400">No pending drinks.</p>';
      const sel = document.getElementById('bar-promo-drink');
      sel.innerHTML = bars.flatMap(b=>b.drinks.map(d=>`<option value="${d.id}">${d.name} (${b.name})</option>`)).join('');
      document.getElementById('bar-promo-list').innerHTML = state.promos.length ? state.promos.map(p=>{
        const d = findDrink(p.drinkId);
        return `<div class="card p-3 text-sm"><p class="font-medium">${d.name}</p><p class="text-xs text-gray-400">Promo HK$${p.price} · ${p.date}</p></div>`;
      }).join('') : '<p class="text-sm text-gray-400">No active promos.</p>';
    }
    function barUpload(){
      const name = document.getElementById('bar-drink-name').value.trim();
      const bar = document.getElementById('bar-drink-bar').value.trim();
      const price = document.getElementById('bar-drink-price').value;
      const desc = document.getElementById('bar-drink-desc').value.trim();
      if (!name || !bar) return showToast('Fill in name and bar');
      state.pendingDrinks.push({name, bar, price, desc, status:'Pending review'});
      saveState(); renderBarDashboard(); showToast('Drink submitted for review');
    }
    function barPublishPromo(){
      const drinkId = document.getElementById('bar-promo-drink').value;
      const price = document.getElementById('bar-promo-price').value;
      const date = document.getElementById('bar-promo-date').value;
      if (!price || !date) return showToast('Fill promo details');
      state.promos.push({drinkId, price, date, status:'Live'});
      saveState(); renderBarDashboard(); showToast('Promo published');
    }
    function barScan(){
      const el = document.getElementById('scan-result');
      el.classList.remove('hidden');
      el.textContent = 'Valid code · Redeemed successfully';
      el.className = 'mt-4 text-sm font-medium text-green-600';
    }

