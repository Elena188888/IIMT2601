/* SIPLOG: edit this template and the functions below; keep IDs used by shared navigation. */
document.getElementById('mount-siplog').outerHTML = `<section id="screen-siplog" class="screen">
          <h2 class="font-serif text-2xl mb-4">Sip Log</h2>
          <div class="flex rounded-full bg-white border border-sand p-1 mb-5">
            <button onclick="setSipTab('calendar')" data-siptab="calendar" class="sip-tab flex-1 py-2 rounded-full text-[10px] font-medium uppercase tracking-widest bg-dark text-white">Calendar</button>
            <button onclick="setSipTab('map')" data-siptab="map" class="sip-tab flex-1 py-2 rounded-full text-[10px] font-medium uppercase tracking-widest text-gray-500">Map</button>
            <button onclick="setSipTab('rewards')" data-siptab="rewards" class="sip-tab flex-1 py-2 rounded-full text-[10px] font-medium uppercase tracking-widest text-gray-500">Rewards</button>
          </div>
          <div id="sip-calendar" class="sip-panel"></div>
          <div id="sip-map" class="sip-panel hidden"></div>
          <div id="sip-rewards" class="sip-panel hidden"></div>
        </section>`;

    // ===== SIP LOG =====
    function setSipTab(tab){
      document.querySelectorAll('[data-siptab]').forEach(b=>{
        b.classList.toggle('bg-dark', b.dataset.siptab===tab);
        b.classList.toggle('text-white', b.dataset.siptab===tab);
        b.classList.toggle('text-gray-500', b.dataset.siptab!==tab);
      });
      document.querySelectorAll('.sip-panel').forEach(p=>p.classList.add('hidden'));
      document.getElementById('sip-'+tab).classList.remove('hidden');
      if (tab==='calendar') renderCalendar();
      if (tab==='map') renderMap();
      if (tab==='rewards') renderRewards();
    }
    function renderSipLog(){ setSipTab('calendar'); }

    function renderCalendar(){
      const y = displayedMonth.getFullYear(), m = displayedMonth.getMonth();
      const first = new Date(y, m, 1);
      const days = new Date(y, m+1, 0).getDate();
      const start = first.getDay();
      const monthName = displayedMonth.toLocaleString('en-US',{month:'long'});
      const sips = state.sipLog.filter(s=>{ const [sy,sm]=s.date.split('-').map(Number); return sy===y && sm===m+1; });
      const byDate = {};
      sips.forEach(s=>{ byDate[s.date]=(byDate[s.date]||[]); byDate[s.date].push(s); });
      let cells='';
      for (let i=0;i<start;i++) cells += `<div></div>`;
      for (let d=1; d<=days; d++){
        const ds = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const list = byDate[ds]||[];
        if (list.length){
          cells += `<button onclick="openDayModal('${ds}')" class="aspect-square rounded-2xl bg-sand overflow-hidden relative p-1 flex items-end justify-center">
            ${list.slice(0,3).map((s,j)=>`<img src="${imgUrl(findDrink(s.drinkId).prompt)}" class="absolute w-[70%] aspect-square object-cover rounded-xl border border-white/70 shadow-sm" style="bottom:${8+j*10}px; left:50%; transform:translateX(-50%) rotate(${(j-1)*6}deg); z-index:${3-j}" onerror="this.style.display='none'" />`).join('')}
            <span class="relative z-10 text-[10px] font-medium text-dark bg-white/70 px-1.5 rounded">${d}</span>
          </button>`;
        } else {
          cells += `<div class="aspect-square rounded-2xl bg-white/60 flex items-center justify-center text-xs text-gray-400">${d}</div>`;
        }
      }
      const uniqueBars = new Set(sips.map(s=>s.barId)).size;
      const favourite = getMonthlyFavourite(sips);
      document.getElementById('sip-calendar').innerHTML = `
        <div class="card p-5 mb-5">
          <div class="flex items-center justify-between mb-4">
            <button onclick="changeMonth(-1)" class="pressable w-8 h-8 rounded-full bg-cream flex items-center justify-center"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
            <div class="text-center">
              <h3 class="font-serif text-xl">${monthName}</h3>
              <p class="text-xs text-gray-400">${y}</p>
            </div>
            <button onclick="changeMonth(1)" class="pressable w-8 h-8 rounded-full bg-cream flex items-center justify-center"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
          </div>
          <div class="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-gray-400 mb-2">
            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
          </div>
          <div class="grid grid-cols-7 gap-1">${cells}</div>
        </div>
        <div class="card p-5 mb-4">
          <p class="eyebrow mb-2">This Month</p>
          <p class="font-serif text-2xl mb-3">${sips.length} drinks · ${uniqueBars} bars</p>
          <div class="flex -space-x-2 overflow-hidden">
            ${sips.slice(0,5).map(s=>`<img src="${imgUrl(findDrink(s.drinkId).prompt)}" class="w-10 h-10 rounded-full border-2 border-white object-cover" />`).join('')}
          </div>
        </div>
        <div class="card p-5">
          <p class="eyebrow mb-2">Monthly Favourite</p>
          <div class="flex gap-4 items-center">
            <img src="${imgUrl(favourite.prompt)}" class="w-16 h-16 rounded-2xl object-cover bg-sand" onerror="this.style.display='none'" />
            <div>
              <p class="font-serif text-xl">${favourite.name}</p>
              <p class="text-xs text-gray-500">${favourite.bar.name}</p>
            </div>
          </div>
        </div>`;
      setTimeout(()=>lucide.createIcons(), 10);
    }
    function changeMonth(dir){ displayedMonth.setMonth(displayedMonth.getMonth()+dir); renderCalendar(); }
    function getMonthlyFavourite(sips){
      const counts={};
      sips.forEach(s=>{ counts[s.drinkId]=(counts[s.drinkId]||0)+1; });
      let bestId = sips[0]?.drinkId;
      Object.entries(counts).forEach(([id,n])=>{ if (!bestId || n>counts[bestId]) bestId=id; });
      return bestId ? {...findDrink(bestId), bar:findBarForDrink(bestId)} : {...bars[0].drinks[0], bar:bars[0]};
    }
    function openDayModal(dateStr){
      const list = state.sipLog.filter(s=>s.date===dateStr);
      if (!list.length) return;
      document.getElementById('modal-body').innerHTML = `
        <p class="eyebrow mb-2">${new Date(dateStr).toLocaleDateString('en-US',{weekday:'long', month:'long', day:'numeric'})}</p>
        <div class="flex gap-4 overflow-x-auto snap-x hide-scrollbar pb-2">
          ${list.map(s=>{
            const d=findDrink(s.drinkId); const b=findBar(s.barId);
            return `<div class="snap-start flex-shrink-0 w-[78%] card overflow-hidden">
              <div class="h-48 bg-sand"><img src="${imgUrl(d.prompt)}" class="w-full h-full object-cover" /></div>
              <div class="p-4">
                <p class="eyebrow mb-1">${b.name}</p>
                <h4 class="font-serif text-xl mb-1">${d.name}</h4>
                <p class="text-sm text-gray-500">${s.date} · HK$${s.price}</p>
              </div>
            </div>`;
          }).join('')}
        </div>`;
      document.getElementById('modal-root').classList.remove('hidden');
    }

    function renderMap(){
      const pins = bars.map(b=>{
        const sips = state.sipLog.filter(s=>s.barId===b.id);
        const has = sips.length>0;
        return `<g class="map-pin" onclick="openMapBar('${b.id}')">
          <circle cx="${b.map.x}" cy="${b.map.y}" r="${has?4:2.5}" fill="${has?'#C9A66B':'#A88B6A'}" stroke="#fff" stroke-width="0.6" />
          ${has ? sips.slice(0,2).map((s,i)=>`<image href="${imgUrl(findDrink(s.drinkId).prompt)}" x="${b.map.x-3+i*1.5}" y="${b.map.y-3-i*2}" width="6" height="6" clip-path="circle(3px at 3px 3px)" preserveAspectRatio="xMidYMid slice" />`).join('') : ''}
        </g>`;
      }).join('');
      document.getElementById('sip-map').innerHTML = `
        <div class="card p-3 mb-4">
          <svg viewBox="0 0 100 120" class="w-full h-80 bg-[#F5F1EA] rounded-2xl">
            <path d="M20,40 Q35,18 55,24 T85,35 T90,60 T80,90 T55,105 T25,95 T15,70 Z" fill="#E8E0D5" stroke="#D6CBB9" stroke-width="0.5" />
            <text x="42" y="32" font-size="3" fill="#A88B6A">Central / SoHo</text>
            <text x="45" y="68" font-size="3" fill="#A88B6A">Tsim Sha Tsui</text>
            <text x="68" y="36" font-size="3" fill="#A88B6A">Wan Chai</text>
            <text x="62" y="28" font-size="3" fill="#A88B6A">Causeway Bay</text>
            <g id="map-pins">${pins}</g>
          </svg>
        </div>
        <div id="map-bar-info" class="card p-4 hidden"></div>`;
    }
    function openMapBar(barId){
      const b = findBar(barId);
      const sips = state.sipLog.filter(s=>s.barId===barId);
      const el = document.getElementById('map-bar-info');
      el.classList.remove('hidden');
      el.innerHTML = `
        <p class="eyebrow mb-1">${b.district}</p>
        <h4 class="font-serif text-xl mb-2">${b.name}</h4>
        <div class="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          ${sips.map(s=>{
            const d=findDrink(s.drinkId);
            return `<div class="snap-start flex-shrink-0 w-32 card overflow-hidden">
              <div class="h-24 bg-sand"><img src="${imgUrl(d.prompt)}" class="w-full h-full object-cover" /></div>
              <div class="p-2"><p class="text-xs font-medium truncate">${d.name}</p><p class="text-[10px] text-gray-400">${s.date}</p></div>
            </div>`;
          }).join('') || '<p class="text-sm text-gray-400">No visits yet.</p>'}
        </div>`;
    }

    function renderRewards(){
      const points = state.points;
      const target = 1000;
      const pct = Math.min(100, (points/target)*100);
      document.getElementById('sip-rewards').innerHTML = `
        <div class="card-dark p-6 mb-5 text-center">
          <p class="eyebrow mb-2">Your Points</p>
          <div class="flex items-baseline justify-center gap-2 mb-3">
            <span class="font-serif text-5xl text-white">${points}</span><span class="text-white/60 text-sm">POINTS</span>
          </div>
          <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
            <div class="h-full bg-gold rounded-full" style="width:${pct}%"></div>
          </div>
          <p class="text-xs text-gold">${Math.max(0, target-points)} points to your next free drink</p>
        </div>
        <h3 class="font-serif text-lg mb-3">Redeem</h3>
        <div class="space-y-3">
          ${perks.map(p=>`
            <div class="card p-4 flex justify-between items-center">
              <div>
                <p class="font-medium text-sm">${p.name}</p>
                <p class="text-xs text-gray-400">${p.cost} points</p>
              </div>
              ${points>=p.cost ? `<button onclick="redeemPerk('${p.id}')" class="pressable btn-gold text-xs uppercase tracking-widest px-5 py-2">Redeem</button>` : `<span class="text-xs text-gray-400">${p.cost-points} points needed</span>`}
            </div>
          `).join('')}
        </div>`;
    }
    function redeemPerk(id){
      const p = perks.find(x=>x.id===id);
      if (state.points < p.cost) return;
      state.points -= p.cost; saveState();
      showQrOverlay(`PERK-${id}-${Date.now()}`, p.name);
      showToast(`${p.name} redeemed`);
      renderRewards();
    }

