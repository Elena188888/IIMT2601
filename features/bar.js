/* BAR: Partner Bar dashboard and shared community actions. */
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
    <div id="bar-overview" class="card p-4 mb-4">
      <p class="eyebrow mb-3">Overview</p>
      <div class="grid grid-cols-3 gap-2 text-center">
        <div><span id="bar-overview-drinks" class="block font-serif text-2xl text-dark">0</span><span class="text-[10px] uppercase tracking-wider text-gray-400">Drinks Listed</span></div>
        <div><span id="bar-overview-promos" class="block font-serif text-2xl text-dark">0</span><span class="text-[10px] uppercase tracking-wider text-gray-400">Active Promotions</span></div>
        <div><span id="bar-overview-posts" class="block font-serif text-2xl text-dark">0</span><span class="text-[10px] uppercase tracking-wider text-gray-400">Community Posts</span></div>
      </div>
    </div>
    <div class="flex rounded-full bg-white border border-sand p-1 mb-4">
      <button onclick="setBarTab('upload')" data-btab="upload" class="bar-tab flex-1 py-2 rounded-full text-[10px] font-medium uppercase tracking-wider bg-dark text-white">Drinks</button>
      <button onclick="setBarTab('promo')" data-btab="promo" class="bar-tab flex-1 py-2 rounded-full text-[10px] font-medium uppercase tracking-wider text-gray-500">Promotions</button>
      <button onclick="setBarTab('scan')" data-btab="scan" class="bar-tab flex-1 py-2 rounded-full text-[10px] font-medium uppercase tracking-wider text-gray-500">Scan</button>
    </div>
    <div id="bar-tab-upload" class="bar-panel">
      <div class="flex items-center justify-between mb-3"><h3 class="font-serif text-xl">Your drinks</h3><button onclick="toggleBarDrinkForm()" class="pressable btn-primary text-[10px] uppercase tracking-widest px-4 py-2">Add New Drink</button></div>
      <div id="bar-drink-list" class="space-y-3 mb-4"></div>
      <div id="bar-add-form" class="card p-4 mb-3 hidden">
        <p class="eyebrow mb-2">New listing</p>
        <input id="bar-drink-name" type="text" placeholder="Drink name" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none" />
        <input id="bar-drink-image" type="url" placeholder="Drink image URL (optional)" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none" />
        <input id="bar-drink-price" type="number" placeholder="Price HKD" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none" />
        <textarea id="bar-drink-desc" rows="2" placeholder="Short description" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none text-sm"></textarea>
        <input id="bar-drink-flavour" type="text" placeholder="Flavour tags, e.g. citrus, herbal" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none" />
        <input id="bar-drink-mood" type="text" placeholder="Mood tags, e.g. relaxed, bold" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none" />
        <input id="bar-drink-occasion" type="text" placeholder="Occasion tags, e.g. date night, friends" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none" />
        <select id="bar-drink-category" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-4 outline-none"><option value="Alcoholic">Alcoholic</option><option value="Non-alcoholic">Non-alcoholic</option></select>
        <button onclick="barUpload()" class="pressable w-full btn-primary text-sm uppercase tracking-widest">Save drink</button>
      </div>
      <div class="card p-4 mb-3"><p class="text-xs text-gray-500">New drinks appear here after saving and are available to customer-facing discovery once listed.</p></div>
      <div id="bar-pending" class="space-y-2"></div>
    </div>
    <div id="bar-tab-promo" class="bar-panel hidden">
      <div class="card p-4 mb-3">
        <label class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Select Drink</label>
        <select id="bar-promo-drink" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none"></select>
        <label class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Promotional Price (HK$)</label>
        <input id="bar-promo-price" type="number" placeholder="Promo price HKD" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none" />
        <label class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Promotion Date</label>
        <input id="bar-promo-date" type="date" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-4 outline-none" />
        <button onclick="barPublishPromo()" class="pressable w-full btn-primary text-sm uppercase tracking-widest">Publish promo</button>
      </div>
      <div id="bar-promo-list" class="space-y-2"></div>
    </div>
    <div id="bar-tab-scan" class="bar-panel hidden">
      <div class="card p-6 text-center"><i data-lucide="scan-line" class="w-10 h-10 mx-auto text-gold mb-3"></i><p class="text-sm text-gray-500 mb-4">Tap to simulate scanning a customer QR code.</p><button onclick="barScan()" class="pressable w-full btn-primary text-sm uppercase tracking-widest">Scan code</button><p id="scan-result" class="mt-3 text-sm font-medium hidden"></p></div>
    </div>
  </div>
</section>`;

function getActiveBar(){ return findBar(state.barId || 'bar-velvet'); }
function getActiveBarDrinks(){ return getActiveBar().drinks; }
function barLogin(){
  if (document.getElementById('bar-pass').value === 'siply2026') { state.barLoggedIn=true; state.role='bar'; currentRole='bar'; saveState(); renderBarDashboard(); updateRoleNavigation(); showToast('Bar dashboard unlocked'); }
  else showToast('Wrong passcode');
}
function setBarTab(tab){
  document.querySelectorAll('[data-btab]').forEach(b=>{ b.classList.toggle('bg-dark',b.dataset.btab===tab); b.classList.toggle('text-white',b.dataset.btab===tab); b.classList.toggle('text-gray-500',b.dataset.btab!==tab); });
  document.querySelectorAll('.bar-panel').forEach(p=>p.classList.add('hidden'));
  document.getElementById('bar-tab-'+tab).classList.remove('hidden');
}
function renderBarDashboard(){
  document.getElementById('bar-login').classList.toggle('hidden',state.barLoggedIn);
  document.getElementById('bar-panel').classList.toggle('hidden',!state.barLoggedIn);
  if (!state.barLoggedIn) return;
  renderBarDrinkList();
  renderBarOverview();
  document.getElementById('bar-pending').innerHTML=state.pendingDrinks.length?state.pendingDrinks.map(d=>`<div class="card p-3 text-sm"><p class="font-medium">${d.name}</p><p class="text-xs text-gray-400">${d.bar||getActiveBar().name} · ${d.status}</p></div>`).join(''):'<p class="text-sm text-gray-400">No pending drinks.</p>';
  document.getElementById('bar-promo-drink').innerHTML=getActiveBarDrinks().map(d=>`<option value="${d.id}">${d.name}</option>`).join('');
  document.getElementById('bar-promo-list').innerHTML=state.promos.length?state.promos.map(p=>{const d=findDrink(p.drinkId);return `<div class="card p-3 text-sm"><p class="font-medium">${d.name}</p><p class="text-xs text-gray-400">Promo HK$${p.price} · ${p.date}</p></div>`}).join(''):'<p class="text-sm text-gray-400">No active promos.</p>';
}
function isActivePromotion(p){
  const today=todayStr();
  return p.status==='Live' && (!p.startDate || p.startDate<=today) && (!p.date || p.date>=today) && (!p.endDate || p.endDate>=today);
}
function renderBarOverview(){
  const barId=state.barId||'bar-velvet';
  document.getElementById('bar-overview-drinks').textContent=getActiveBarDrinks().length;
  document.getElementById('bar-overview-promos').textContent=(state.promos||[]).filter(p=>p.barId===barId||(!p.barId&&getActiveBarDrinks().some(d=>d.id===p.drinkId))).filter(isActivePromotion).length;
  document.getElementById('bar-overview-posts').textContent=(state.posts||[]).filter(p=>p.type==='bar'&&p.barId===barId).length;
}
function renderBarDrinkList(){
  const list=document.getElementById('bar-drink-list'); if(!list) return;
  list.innerHTML=getActiveBarDrinks().map(d=>`<div class="card p-3 flex gap-3 items-center"><img src="${d.image||imgUrl(d.prompt)}" class="w-16 h-16 rounded-xl object-cover bg-sand" onerror="this.src='https://placehold.co/160x160/EBE4D6/1F1F1F?text=${encodeURIComponent(d.name)}'" /><div class="flex-1 min-w-0"><div class="flex items-start justify-between gap-2"><p class="font-medium text-sm truncate">${d.name}</p><span class="text-[10px] text-green-600 uppercase tracking-wider">${d.status||'Live'}</span></div><p class="text-xs text-gray-500">HK$${d.price} · ${d.abv||d.category||'Alcoholic'}</p><p class="text-[11px] text-gray-400 truncate">${d.description||d.ingredients||d.tags.join(' · ')}</p></div><div class="flex flex-col gap-1"><button onclick="editBarDrink('${d.id}')" class="pressable text-[10px] text-gold uppercase tracking-wider">Edit</button><button onclick="removeBarDrink('${d.id}')" class="pressable text-[10px] text-gray-400 uppercase tracking-wider">Remove</button><button onclick="promoteDrink('${d.id}')" class="pressable text-[10px] text-dark uppercase tracking-wider">Promote</button></div></div>`).join('');
}
function toggleBarDrinkForm(show=true){ document.getElementById('bar-add-form').classList.toggle('hidden',!show); }
function editBarDrink(id){
  const d=getActiveBarDrinks().find(x=>x.id===id); if(!d) return; toggleBarDrinkForm(true);
  document.getElementById('bar-drink-name').value=d.name; document.getElementById('bar-drink-image').value=d.image||''; document.getElementById('bar-drink-price').value=d.price||''; document.getElementById('bar-drink-desc').value=d.description||d.ingredients||''; document.getElementById('bar-drink-flavour').value=(d.tags||[]).join(', '); document.getElementById('bar-drink-mood').value=(d.moods||[]).join(', '); document.getElementById('bar-drink-occasion').value=(d.occasions||[]).join(', '); document.getElementById('bar-drink-category').value=d.category||d.abv||'Alcoholic'; document.getElementById('bar-add-form').dataset.editingId=id;
}
function removeBarDrink(id){
  const d=getActiveBarDrinks().find(x=>x.id===id); if(!d) return; getActiveBar().drinks=getActiveBarDrinks().filter(x=>x.id!==id); state.barRemovedDrinks=state.barRemovedDrinks||[]; if(!state.barRemovedDrinks.includes(id)) state.barRemovedDrinks.push(id); state.barDrinks=(state.barDrinks||[]).filter(x=>x.id!==id); saveState(); renderBarDashboard(); showToast(`${d.name} removed from your menu`);
}
function barUpload(){
  const name=document.getElementById('bar-drink-name').value.trim(), image=document.getElementById('bar-drink-image').value.trim(), price=document.getElementById('bar-drink-price').value, desc=document.getElementById('bar-drink-desc').value.trim(), tags=document.getElementById('bar-drink-flavour').value.split(',').map(s=>s.trim()).filter(Boolean), moods=document.getElementById('bar-drink-mood').value.split(',').map(s=>s.trim()).filter(Boolean), occasions=document.getElementById('bar-drink-occasion').value.split(',').map(s=>s.trim()).filter(Boolean), category=document.getElementById('bar-drink-category').value;
  if(!name||!price||!desc) return showToast('Add a name, price, and description');
  const form=document.getElementById('bar-add-form'), editingId=form.dataset.editingId;
  if(editingId){ const d=getActiveBarDrinks().find(x=>x.id===editingId); Object.assign(d,{name,price:Number(price),image,description:desc,ingredients:desc,tags,moods,occasions,category,abv:category}); state.barDrinks=(state.barDrinks||[]).map(x=>x.id===editingId?d:x); delete form.dataset.editingId; saveState(); renderBarDashboard(); toggleBarDrinkForm(false); showToast('Drink updated'); return; }
  const drink={id:'bar-drink-'+Date.now(),name,price:Number(price),image,description:desc,ingredients:desc,tags,moods,occasions,category,abv:category,prompt:name,status:'Live'}; getActiveBar().drinks.push(drink); state.barDrinks=state.barDrinks||[]; state.barDrinks.push({...drink,barId:getActiveBar().id}); saveState(); renderBarDashboard(); toggleBarDrinkForm(false); showToast('Drink added to your menu');
}
function barPublishPromo(){ const drinkId=document.getElementById('bar-promo-drink').value, price=document.getElementById('bar-promo-price').value, date=document.getElementById('bar-promo-date').value; if(!drinkId||!price||!date)return showToast('Select a drink, price, and date'); state.promos.push({drinkId,price:Number(price),date,status:'Live',barId:state.barId||'bar-velvet'}); saveState(); renderBarDashboard(); showToast('Promo published'); }
function promoteDrink(id){ state.pendingPromoteDrinkId=id; saveState(); go('community'); openPostForm(); }
function barScan(){ const el=document.getElementById('scan-result'); el.classList.remove('hidden'); el.textContent='Valid code · Redeemed successfully'; el.className='mt-4 text-sm font-medium text-green-600'; }

