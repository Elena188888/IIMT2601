/* DISCOVERY: edit this template and the functions below; keep IDs used by shared navigation. */
document.getElementById('mount-discovery').outerHTML = `<section id="screen-discovery" class="screen active">
          <div id="discovery-quiz">
            <div class="discovery-intro">
              <p class="eyebrow">AI Discovery · Siply</p>
              <h2 class="font-serif">Your evening,<br/>in a glass.</h2>
              <p>Four little questions. One personal pour.</p>
            </div>
            <div class="quiz-card">
              <div class="quiz-status"><span id="quiz-step-label" aria-live="polite">01 / 04 · Mood</span><span class="quiz-status-note">MAKE IT YOURS</span></div>
              <div id="quiz-progress" class="quiz-progress" role="progressbar" aria-label="Discovery questionnaire" aria-valuemin="1" aria-valuemax="4" aria-valuenow="1">
                <span></span><span></span><span></span><span></span>
              </div>
              <div id="quiz-stage" class="quiz-stage">
                <section class="quiz-step" data-quiz-step="0" aria-labelledby="quiz-title-0">
                  <p class="quiz-kicker">01 — THE FEELING</p>
                  <h3 id="quiz-title-0" tabindex="-1">How are you<br/>feeling tonight?</h3>
                  <p class="quiz-help">Choose the moods that feel like you.</p>
                  <div id="disc-moods" class="flex flex-wrap gap-2"></div>
                </section>
                <section class="quiz-step" data-quiz-step="1" aria-labelledby="quiz-title-1" hidden>
                  <p class="quiz-kicker">02 — THE MOMENT</p>
                  <h3 id="quiz-title-1" tabindex="-1">What’s the<br/>occasion?</h3>
                  <p class="quiz-help">A quiet moment or a night to remember?</p>
                  <div id="disc-occasions" class="flex flex-wrap gap-2"></div>
                </section>
                <section class="quiz-step" data-quiz-step="2" aria-labelledby="quiz-title-2" hidden>
                  <p class="quiz-kicker">03 — THE FLAVOUR</p>
                  <h3 id="quiz-title-2" tabindex="-1">What’s your<br/>kind of flavour?</h3>
                  <p class="quiz-help">Pick a few notes you’d love in your glass.</p>
                  <div id="disc-tastes" class="flex flex-wrap gap-2"></div>
                </section>
                <section class="quiz-step" data-quiz-step="3" aria-labelledby="quiz-title-3" hidden>
                  <p class="quiz-kicker">04 — THE FINISHING TOUCH</p>
                  <h3 id="quiz-title-3" tabindex="-1">Set your<br/>comfort zone.</h3>
                  <label for="disc-budget" class="quiz-help budget-label">Your budget per drink (HKD)</label>
                  <div class="budget-field"><span aria-hidden="true">HK$</span><input id="disc-budget" type="number" min="1" max="10000" step="1" inputmode="numeric" value="200" aria-describedby="quiz-budget-error" oninput="clearBudgetError()" /></div>
                  <p id="quiz-budget-error" class="quiz-budget-error" role="alert" hidden>Enter a budget from HK$1 to HK$10,000.</p>
                  <div class="budget-presets"><button type="button" onclick="setQuizBudget(150)">HK$150</button><button type="button" onclick="setQuizBudget(200)">HK$200</button><button type="button" onclick="setQuizBudget(300)">HK$300</button></div>
                  <p id="quiz-recap" class="quiz-recap"></p>
                </section>
              </div>
              <div class="quiz-controls">
                <button id="quiz-back" type="button" class="quiz-back pressable" onclick="changeQuizStep(-1)" disabled aria-label="Previous question">← Back</button>
                <button id="quiz-next" type="button" class="btn-primary pressable" onclick="advanceDiscovery()">Continue <span aria-hidden="true">→</span></button>
              </div>
              <p id="quiz-footer-note" class="quiz-footer-note">Select more than one, or continue to explore.</p>
            </div>
            <p class="quiz-signoff">A little intuition. A little alchemy.</p>
          </div>

          <div id="discovery-result" class="hidden pt-2">
            <div class="flex items-center gap-3 mb-4">
              <button onclick="backToDiscoveryQuiz()" class="pressable w-9 h-9 rounded-full bg-white border border-sand flex items-center justify-center"><i data-lucide="arrow-left" class="w-4 h-4"></i></button>
              <h2 class="font-serif text-lg">Your AI match</h2>
            </div>
            <div id="discovery-card-wrap" class="flip-card">
              <div id="discovery-flipper" class="flipper">
                <div class="flip-front">
                  <div id="discovery-front" class="card overflow-hidden"></div>
                </div>
                <div class="flip-back">
                  <div id="discovery-back" class="card-dark relative sheen p-5 text-center min-h-[600px] flex flex-col justify-between"></div>
                </div>
              </div>
            </div>
            <p id="final-match-msg" class="hidden text-center text-xs text-gold uppercase tracking-widest mt-3">This is your final match.</p>
          </div>
        </section>`;

    // ===== CHIPS =====
    function renderStaticChips(){
      renderChips('disc-moods', moodList);
      renderChips('disc-occasions', occasionList);
      renderChips('disc-tastes', tasteList);
    }
    function renderChips(containerId, list){
      const c = document.getElementById(containerId);
      if (!c) return;
      c.innerHTML = list.map(item => `<button onclick="toggleChip(this)" aria-pressed="false" class="chip px-4 py-2 rounded-full text-xs font-medium tracking-wide">${item}</button>`).join('');
    }
    function toggleChip(btn){ const selected=btn.classList.toggle('active'); btn.setAttribute('aria-pressed',String(selected)); }

    // ===== AI DISCOVERY =====
    let discoveryQuizStep = 0;
    let quizTransition = null;
    const quizNames = ['Mood','Occasion','Taste','Budget'];

    function updateQuizStep(focusHeading = false){
      document.querySelectorAll('[data-quiz-step]').forEach((panel,i)=>{ panel.hidden=i!==discoveryQuizStep; });
      document.getElementById('quiz-step-label').textContent = `0${discoveryQuizStep+1} / 04 · ${quizNames[discoveryQuizStep]}`;
      document.getElementById('quiz-progress').setAttribute('aria-valuenow',String(discoveryQuizStep+1));
      document.querySelectorAll('#quiz-progress span').forEach((bar,i)=>bar.classList.toggle('is-filled',i<=discoveryQuizStep));
      document.getElementById('quiz-back').disabled=discoveryQuizStep===0;
      document.getElementById('quiz-next').innerHTML=discoveryQuizStep===3?'Find my drink <span aria-hidden="true">✦</span>':'Continue <span aria-hidden="true">→</span>';
      document.getElementById('quiz-footer-note').textContent=discoveryQuizStep===3?'Your evening is ready to take shape.':'Select more than one, or continue to explore.';
      if (discoveryQuizStep===3){
        const {moods,occasions,tastes}=getDiscoveryInputs();
        document.getElementById('quiz-recap').textContent=[...moods,...occasions,...tastes].join(' · ') || 'Open to discovery. We’ll take it from here.';
      }
      if(focusHeading) document.getElementById('quiz-title-'+discoveryQuizStep).focus({preventScroll:true});
    }
    function setQuizControlsBusy(busy){
      document.getElementById('quiz-next').disabled=busy;
      document.getElementById('quiz-back').disabled=busy || discoveryQuizStep===0;
    }
    async function changeQuizStep(direction){
      if(quizTransition) return;
      const next=Math.max(0,Math.min(3,discoveryQuizStep+direction));
      if(next===discoveryQuizStep) return;
      const stage=document.getElementById('quiz-stage');
      const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setQuizControlsBusy(true);
      quizTransition={cancelled:false,animation:null};
      const transition=quizTransition;
      try {
        if(!reduce && typeof stage.animate==='function'){
          transition.animation=stage.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${-direction*14}px)`}],{duration:140,easing:'ease-in',fill:'forwards'});
          await transition.animation.finished;
        }
        if(transition.cancelled) return;
        discoveryQuizStep=next;
        updateQuizStep(true);
        if(transition.animation) transition.animation.cancel();
        if(!reduce && typeof stage.animate==='function'){
          transition.animation=stage.animate([{opacity:0,transform:`translateX(${direction*20}px)`},{opacity:1,transform:'translateX(0)'}],{duration:330,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards'});
          await transition.animation.finished;
          transition.animation.cancel();
        }
      } catch(error) {
        if(!transition.cancelled){ discoveryQuizStep=next; updateQuizStep(true); }
      } finally {
        if(quizTransition===transition){ quizTransition=null; setQuizControlsBusy(false); }
      }
    }
    function resetQuizMotion(){
      if(quizTransition){ quizTransition.cancelled=true; if(quizTransition.animation) quizTransition.animation.cancel(); quizTransition=null; }
      setQuizControlsBusy(false);
    }
    function clearBudgetError(){
      document.getElementById('quiz-budget-error').hidden=true;
      document.getElementById('disc-budget').removeAttribute('aria-invalid');
    }
    function setQuizBudget(amount){ document.getElementById('disc-budget').value=amount; clearBudgetError(); }
    function advanceDiscovery(){
      if(quizTransition) return;
      if(discoveryQuizStep<3){ changeQuizStep(1); return; }
      const budget=Number(document.getElementById('disc-budget').value);
      if(!Number.isFinite(budget)||budget<1||budget>10000){
        document.getElementById('quiz-budget-error').hidden=false;
        const input=document.getElementById('disc-budget'); input.setAttribute('aria-invalid','true'); input.focus(); return;
      }
      startDiscoveryAnimation();
    }
    function renderDiscovery(){
      document.getElementById('discovery-quiz').classList.remove('hidden');
      document.getElementById('discovery-result').classList.add('hidden');
      document.getElementById('discovery-flipper').classList.remove('flipped');
      currentDiscovery = { shuffles: 2, last: null, matchAt: null };
      resetQuizMotion();
      discoveryQuizStep=0;
      clearBudgetError();
      updateQuizStep();
    }
    function backToDiscoveryQuiz(){ renderDiscovery(); }
    function getDiscoveryInputs(){
      const moods = Array.from(document.querySelectorAll('#disc-moods .active')).map(b=>b.textContent);
      const occasions = Array.from(document.querySelectorAll('#disc-occasions .active')).map(b=>b.textContent);
      const tastes = Array.from(document.querySelectorAll('#disc-tastes .active')).map(b=>b.textContent);
      const budget = +document.getElementById('disc-budget').value || 9999;
      return {moods,occasions,tastes,budget};
    }
    function runDiscoveryMatch(){
      const {moods,occasions,tastes,budget} = getDiscoveryInputs();
      const history = state.sipLog.map(s=>s.drinkId);
      let best=null, bestScore=-1;
      for (const bar of bars){
        for (const d of bar.drinks){
          if (d.price > budget) continue;
          let score=0;
          d.tags.forEach(t=>{ if (tastes.some(ta=>ta.toLowerCase()===t.toLowerCase())) score+=3; });
          d.occasions.forEach(o=>{ if (occasions.some(oc=>oc.toLowerCase()===o.toLowerCase())) score+=3; if (moods.some(m=>o.toLowerCase().includes(m.toLowerCase()))) score+=2; });
          if (history.includes(d.id)) score-=10;
          if (score>bestScore){ bestScore=score; best={...d,bar}; }
        }
      }
      if (!best) { const bar=bars[Math.floor(Math.random()*bars.length)]; const d=bar.drinks[Math.floor(Math.random()*bar.drinks.length)]; best={...d,bar}; }
      currentDiscovery.last = best;
      currentDiscovery.matchAt = Date.now();
      renderDiscoveryResult(best);
    }

    function startDiscoveryAnimation(){
      const inputs = getDiscoveryInputs();
      const keywords = [...inputs.moods, ...inputs.occasions, ...inputs.tastes].slice(0,5);
      if (!keywords.length) keywords.push('Surprise');
      const root = document.getElementById('overlay-root');
      root.innerHTML = `
        <div class="absolute inset-0 bg-black/85 flex flex-col items-center justify-center pointer-events-auto" id="discovery-anim">
          <div class="relative w-64 h-80 flex items-center justify-center">
            <div id="keyword-stage" class="absolute inset-0"></div>
            <div class="relative w-32 h-44">
              <svg viewBox="0 0 100 140" class="w-full h-full drop-shadow-2xl">
                <path d="M20,10 Q20,110 50,130 Q80,110 80,10" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
                <defs><clipPath id="glassClip"><path d="M22,12 Q22,108 50,128 Q78,108 78,12 Z"/></clipPath></defs>
                <g clip-path="url(#glassClip)">
                  <rect id="anim-liquid" x="0" y="140" width="100" height="0" fill="url(#liquidGrad)"/>
                </g>
                <ellipse cx="50" cy="12" rx="30" ry="4" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
                <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E8C87A"/><stop offset="100%" stop-color="#A88B6A"/></linearGradient>
              </svg>
              <div id="anim-glow" class="absolute -inset-6 rounded-full bg-gold/20 blur-2xl glass-glow"></div>
            </div>
          </div>
          <p class="text-white/60 text-xs uppercase tracking-[0.2em] mt-6">Crafting your match</p>
        </div>`;
      const stage = document.getElementById('keyword-stage');
      keywords.forEach((k,i)=>{
        const span = document.createElement('span');
        span.className='keyword'; span.textContent = k;
        span.style.setProperty('--tx', (Math.random()-0.5)*220);
        span.style.setProperty('--ty', (Math.random()-0.5)*180 - 60);
        span.style.left='50%'; span.style.top='45%'; span.style.marginLeft='-20px';
        span.style.animationDelay = (i*0.35)+'s';
        stage.appendChild(span);
      });
      setTimeout(()=>{ const liquid = document.getElementById('anim-liquid'); if (liquid){ liquid.setAttribute('y','20'); liquid.setAttribute('height','120'); } }, 800);
      setTimeout(()=>{ const glow = document.getElementById('anim-glow'); if (glow) glow.classList.add('lit'); }, 2200);
      setTimeout(()=>{ root.innerHTML=''; runDiscoveryMatch(); }, 3200);
    }

    function renderDiscoveryResult(drink){
      document.getElementById('discovery-quiz').classList.add('hidden');
      document.getElementById('discovery-result').classList.remove('hidden');
      document.getElementById('discovery-flipper').classList.remove('flipped');
      const img = imgUrl(drink.prompt);
      const shuffles = currentDiscovery.shuffles;
      document.getElementById('discovery-front').innerHTML = `
        <div class="relative h-72 bg-sand">
          <img src="${img}" alt="${drink.name}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x700/EBE4D6/1F1F1F?text=${encodeURIComponent(drink.name)}'" />
        </div>
        <div class="p-6 text-center">
          <p class="eyebrow mb-1">${drink.bar.name}</p>
          <h3 class="font-serif text-3xl mb-2">${drink.name}</h3>
          <p class="text-sm text-gray-500 mb-4">${drink.ingredients}</p>
          <div class="flex justify-center gap-2 mb-5">
            ${drink.tags.map(t=>`<span class="text-[10px] uppercase tracking-wider bg-cream px-3 py-1.5 rounded-full">${t}</span>`).join('')}
          </div>
          <p class="text-[10px] uppercase tracking-[0.2em] text-gold mb-1">Available for 24 hours</p>
          <p id="disc-countdown" class="font-serif text-xl text-dark mb-6">23:59:59</p>
          <p class="text-xs text-gray-400 mb-4">Accept the drink?</p>
          <div class="flex gap-3 mb-3">
            <button onclick="acceptDiscovery()" class="pressable flex-1 btn-primary text-sm uppercase tracking-widest">Yes</button>
            <button id="disc-no" onclick="rejectDiscovery()" class="pressable flex-1 btn-outline text-sm uppercase tracking-widest">No</button>
          </div>
          <p class="text-[10px] text-gray-400 uppercase tracking-wider ${shuffles===0?'hidden':''}">${shuffles} ${shuffles===1?'reshuffle':'reshuffles'} left</p>
        </div>`;
      renderDiscoveryBack(drink);
      startCountdown('disc-countdown', currentDiscovery.matchAt);
      setTimeout(()=>lucide.createIcons(), 10);
    }

    function renderDiscoveryBack(drink){
      const qrId = 'disc-qr-' + Date.now();
      document.getElementById('discovery-back').innerHTML = `
        <div class="text-center">
          <p class="eyebrow mb-2">Your Order</p>
          <h3 class="font-serif text-2xl text-white mb-1">${drink.name}</h3>
          <p class="text-sm text-white/60">${drink.bar.name}</p>
        </div>
        <div class="bg-white/5 rounded-2xl p-6 relative sheen mx-auto w-56">
          <div id="${qrId}" class="qr-gold flex justify-center"></div>
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A66B" stroke-width="1.2"><path d="M8 21h8M12 21V11m0 0c-2.5 0-4.5-2-4.5-4.5S9.5 2 12 2s4.5 2 4.5 4.5S14.5 11 12 11Z"/></svg>
          </div>
        </div>
        <div class="space-y-3">
          <p class="text-[10px] uppercase tracking-[0.2em] text-gold">Show this code at the bar</p>
          <button onclick="saveDiscoveryToWallet()" class="pressable w-full btn-gold text-sm uppercase tracking-widest">Save to QR Code Wallet</button>
          <button onclick="flipDiscoveryBack()" class="pressable w-full border border-white/20 text-white rounded-full py-3 text-xs uppercase tracking-widest">Flip back</button>
        </div>`;
      setTimeout(()=>{
        const code = `ORDER|${drink.bar.id}|${drink.id}|${currentDiscovery.matchAt}`;
        new QRCode(document.getElementById(qrId), { text: code, width: 150, height: 150, colorDark:'#000000', colorLight:'#ffffff' });
      }, 0);
    }

    function acceptDiscovery(){ document.getElementById('discovery-flipper').classList.add('flipped'); }
    function flipDiscoveryBack(){ document.getElementById('discovery-flipper').classList.remove('flipped'); }
    function rejectDiscovery(){
      if (currentDiscovery.shuffles <= 0) return;
      currentDiscovery.shuffles--;
      if (currentDiscovery.shuffles === 0){
        const no = document.getElementById('disc-no'); if (no) no.classList.add('hidden');
        document.getElementById('final-match-msg').classList.remove('hidden');
      }
      const root = document.getElementById('overlay-root');
      root.innerHTML = `<div class="absolute inset-0 bg-black/80 flex items-center justify-center pointer-events-auto"><div class="text-center"><div class="w-16 h-16 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div><p class="text-white/60 text-xs uppercase tracking-[0.2em]">Reshuffling</p></div></div>`;
      setTimeout(()=>{ root.innerHTML=''; runDiscoveryMatch(); }, 1200);
    }

    function saveDiscoveryToWallet(){
      const drink = currentDiscovery.last;
      state.savedQrs.push({id:'qr-'+Date.now(), drinkId:drink.id, barId:drink.bar.id, promo:false, savedAt:Date.now()});
      saveState();
      flyCardToProfile(document.getElementById('discovery-card-wrap'));
      showToast('Your QR code has been saved to your wallet.');
      setTimeout(()=>{ backToDiscoveryQuiz(); }, 900);
    }

