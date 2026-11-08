/* COMMUNITY: edit this template and the functions below; keep IDs used by shared navigation. */
document.getElementById('mount-community').outerHTML = `<section id="screen-community" class="screen">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-serif text-2xl">Community</h2>
            <button onclick="openPostForm()" class="pressable w-9 h-9 rounded-full bg-dark text-white flex items-center justify-center"><i data-lucide="plus" class="w-4 h-4"></i></button>
          </div>
          <div id="community-feed" class="space-y-4 pb-4"></div>
        </section>`;

document.getElementById('mount-community-modal').outerHTML = `    <!-- NEW POST MODAL -->
    <div id="post-modal" class="absolute inset-0 z-[55] hidden flex items-end">
      <div class="absolute inset-0 bg-black/40" onclick="closePostForm()"></div>
      <div class="relative bg-cream rounded-t-[32px] w-full max-h-[85%] overflow-y-auto hide-scrollbar p-5 pb-8 animate-[slideUp_.3s_ease]">
        <button onclick="closePostForm()" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-sand flex items-center justify-center pressable"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
        <p class="eyebrow mb-2">New Post</p>
        <h3 class="font-serif text-xl mb-4">Share a drink</h3>
        <label class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Drink</label>
        <select id="post-drink" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-3 outline-none"></select>
        <label class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Rating</label>
        <div id="post-stars" class="flex gap-1 mb-3" data-rating="0">
          <button onclick="setPostStar(1)" class="star text-2xl text-gray-300">★</button>
          <button onclick="setPostStar(2)" class="star text-2xl text-gray-300">★</button>
          <button onclick="setPostStar(3)" class="star text-2xl text-gray-300">★</button>
          <button onclick="setPostStar(4)" class="star text-2xl text-gray-300">★</button>
          <button onclick="setPostStar(5)" class="star text-2xl text-gray-300">★</button>
        </div>
        <label class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Photo</label>
        <input id="post-photo" type="file" accept="image/*" class="w-full text-xs mb-3" />
        <label class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Review</label>
        <textarea id="post-note" rows="3" class="w-full rounded-2xl border border-sand bg-white px-4 py-3 mb-5 outline-none text-sm" placeholder="Taste notes..."></textarea>
        <button onclick="submitPost()" class="pressable w-full btn-primary text-sm uppercase tracking-widest">Publish</button>
      </div>
    </div>

`;
    // ===== COMMUNITY =====
    function renderCommunity(){
      const select = document.getElementById('post-drink');
      select.innerHTML = bars.flatMap(b=>b.drinks.map(d=>`<option value="${d.id}" data-bar="${b.id}">${d.name} @ ${b.name}</option>`)).join('');
      document.getElementById('community-feed').innerHTML = state.posts.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).map(p=>postCard(p)).join('');
      setTimeout(()=>lucide.createIcons(), 10);
    }
    function postCard(post){
      const d = findDrink(post.drinkId); const b = findBar(post.barId);
      return `
        <div class="card p-4">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-sand flex items-center justify-center text-sm font-medium text-dark">${post.user[0]}</div>
            <div>
              <p class="text-sm font-medium">${post.user}</p>
              <p class="text-[10px] text-gray-400">${formatDate(post.date)}</p>
            </div>
          </div>
          <div class="h-56 rounded-2xl bg-sand overflow-hidden mb-3">
            <img src="${post.photo || imgUrl(d.prompt)}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x500/EBE4D6/1F1F1F?text=${encodeURIComponent(d.name)}'" />
          </div>
          <div class="flex justify-between items-start mb-2">
            <div>
              <h4 class="font-serif text-xl">${d.name}</h4>
              <p class="text-xs text-gray-400">@ ${b.name}</p>
            </div>
            <div class="text-gold text-sm">${'★'.repeat(post.rating)}${'☆'.repeat(5-post.rating)}</div>
          </div>
          <p class="text-sm text-gray-600 mb-3">${post.note}</p>
          <div class="flex items-center gap-5 text-gray-400 text-xs mb-3">
            <button id="like-btn-${post.id}" onclick="likePost('${post.id}')" class="pressable flex items-center gap-1 ${post.likedByMe?'text-gold':''}">
              <i data-lucide="heart" class="w-4 h-4 ${post.likedByMe?'fill-gold':''}"></i> ${post.likes}
            </button>
            <button onclick="toggleComments('${post.id}')" class="pressable flex items-center gap-1">
              <i data-lucide="message-circle" class="w-4 h-4"></i> ${post.comments.length}
            </button>
          </div>
          <div id="comments-${post.id}" class="hidden border-t border-sand/60 pt-3">
            <div class="space-y-2 mb-3">
              ${post.comments.map(c=>`<div class="text-xs"><span class="font-medium">${c.user}</span> <span class="text-gray-500">${c.text}</span></div>`).join('')}
            </div>
            <div class="flex gap-2">
              <input id="comment-inp-${post.id}" type="text" class="flex-1 rounded-full border border-sand bg-white px-3 py-2 text-xs outline-none" placeholder="Add a comment..." />
              <button onclick="addComment('${post.id}')" class="pressable px-3 py-2 rounded-full bg-dark text-white text-xs">Send</button>
            </div>
          </div>
        </div>`;
    }
    function likePost(id){
      const p = state.posts.find(x=>x.id===id);
      if (!p) return;
      if (!p.likedByMe){
        p.likedByMe = true; p.likes++;
        const d = findDrink(p.drinkId);
        flyHeartToProfile(document.getElementById('like-btn-'+id), d);
        if (!state.wishlist.find(w=>w.drinkId===d.id)) state.wishlist.push({drinkId:d.id, barId:p.barId, savedAt:Date.now()});
        saveState();
        showToast('Saved to Want to Try');
      }
      renderCommunity();
    }
    function flyHeartToProfile(btnEl, drink){
      const rect = btnEl.getBoundingClientRect();
      const target = document.getElementById('header-profile').getBoundingClientRect();
      const img = document.createElement('img');
      img.src = imgUrl(drink.prompt);
      img.className = 'fly-clone';
      img.style.width='36px'; img.style.height='36px';
      img.style.borderRadius='999px';
      img.style.left = rect.left + 'px';
      img.style.top = rect.top + 'px';
      (document.querySelector('.phone-screen') || document.body).appendChild(img);
      requestAnimationFrame(()=>{
        const dx = target.left + target.width/2 - rect.left - rect.width/2;
        const dy = target.top + target.height/2 - rect.top - rect.height/2;
        img.style.transform = `translate(${dx}px, ${dy}px) scale(0.1)`;
        img.style.opacity = '0';
      });
      setTimeout(()=>img.remove(), 700);
      const icon = document.getElementById('header-profile');
      icon.classList.add('gold-glow');
      setTimeout(()=>icon.classList.remove('gold-glow'), 1200);
    }

    function toggleComments(id){
      const el = document.getElementById('comments-'+id);
      if (el) el.classList.toggle('hidden');
    }
    function addComment(id){
      const inp = document.getElementById('comment-inp-'+id);
      const text = inp.value.trim();
      if (!text) return;
      const p = state.posts.find(x=>x.id===id);
      p.comments.push({user: state.user?.name || 'You', text, date: new Date().toISOString()});
      saveState();
      renderCommunity();
    }

    function openPostForm(){
      setPostStar(0);
      document.getElementById('post-photo').value='';
      document.getElementById('post-note').value='';
      document.getElementById('post-modal').classList.remove('hidden');
    }
    function closePostForm(){ document.getElementById('post-modal').classList.add('hidden'); }
    function setPostStar(n){
      document.querySelectorAll('#post-stars .star').forEach((s,i)=>{
        s.classList.toggle('text-gold', i < n);
        s.classList.toggle('text-gray-300', i >= n);
      });
      document.getElementById('post-stars').dataset.rating = n;
    }
    async function submitPost(){
      const select = document.getElementById('post-drink');
      const drinkId = select.value;
      const barId = select.options[select.selectedIndex].dataset.bar;
      const rating = +document.getElementById('post-stars').dataset.rating || 5;
      const note = document.getElementById('post-note').value.trim();
      const file = document.getElementById('post-photo').files[0];
      let photo = null;
      if (file) photo = await new Promise(res=>{ const r=new FileReader(); r.onload=e=>res(e.target.result); r.readAsDataURL(file); });
      state.posts.unshift({
        id:'p'+Date.now(), user: state.user?.name || 'You', drinkId, barId, rating, note, photo, likes:0,
        likedByMe:false, date:new Date().toISOString(), comments:[]
      });
      saveState();
      closePostForm();
      renderCommunity();
      showToast('Post published');
    }

