(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const seasonData = {
    '2026': {
      wins:'04', avg:'64.8', drive:'318', top10:'12', played:18, delta:'2.4',
      form:[68.2,66.0,66.8,67.3,65.3,66.0], labels:['APR 12','MAY 03','JUN 14','JUL 19','AUG 23','OCT 18'],
      stats:[['Season wins','4','1st on tour'],['Scoring average','64.8','2.4 better than 2025'],['Driving distance','318 yds','3rd on tour'],['Greens in regulation','82.4%','1st on tour'],['Fairways hit','76.8%','2nd on tour'],['Putts per round','26.1','2nd on tour'],['Birdies this season','246','1st on tour'],['Eagles this season','14','1st on tour'],['Cuts made','18 / 18','A perfect season']],
      events:[
        {name:'Houston Invitational',date:'Oct 15–18, 2026',place:'1',toPar:'−24',total:264,rounds:[67,66,66,65],course:'Bayou Pines Golf Club',par:72},
        {name:'Gulf Coast Championship',date:'Aug 20–23, 2026',place:'1',toPar:'−27',total:261,rounds:[65,66,66,64],course:'Gulfside Links',par:72},
        {name:'Lone Star Classic',date:'Jul 16–19, 2026',place:'T2',toPar:'−19',total:269,rounds:[68,67,68,66],course:'Lone Star Country Club',par:72},
        {name:'Space City Open',date:'Jun 11–14, 2026',place:'1',toPar:'−21',total:267,rounds:[69,66,67,65],course:'Space City Golf Club',par:72},
        {name:'Bluebonnet Pro-Am',date:'May 1–3, 2026',place:'1',toPar:'−18',total:198,rounds:[67,66,65],course:'Bluebonnet Golf Club',par:72}
      ],
      moments:[
        {type:'course',tag:'SHOT OF THE SEASON',title:'One swing. One perfect ace.',sub:'Houston Invitational · Hole 16',visual:'ACE',date:'OCT 17, 2026',body:'A 172-yard par 3. A perfectly flighted 8-iron. Two bounces, a little roll, and straight into the cup. Joe’s first ace of the season brought the home crowd to its feet.',stats:[['172','YARDS'],['8-iron','CLUB'],['1','STROKE']]},
        {type:'score',tag:'CAREER BEST',title:'A round for the record books.',sub:'Gulf Coast practice round · 59',visual:'59',date:'AUG 19, 2026',body:'Thirteen under par. Eleven birdies and an eagle. Joe’s career-low 59 came in the practice round before his Gulf Coast victory. A day when absolutely everything found the bottom of the cup.',stats:[['59','STROKES'],['−13','TO PAR'],['11','BIRDIES']]},
        {type:'win',tag:'HOMETOWN VICTORY',title:'Houston, this one’s for you.',sub:'Houston Invitational · Champion',visual:'trophy',date:'OCT 18, 2026',body:'A final-round 65. A three-shot victory. Win number four. Joe closed out his breakout season with a title in his hometown and a moment made for the people who have been there from the start.',stats:[['1st','FINISH'],['−24','TO PAR'],['4','SEASON WINS']]}
      ]
    },
    '2025': {
      wins:'02',avg:'67.2',drive:'311',top10:'09',played:20,delta:'1.1',
      form:[69.1,68.7,67.3,68.3,67.0,67.8],labels:['APR 13','MAY 04','JUN 15','JUL 20','AUG 24','OCT 19'],
      stats:[['Season wins','2','5th on tour'],['Scoring average','67.2','1.1 better than 2024'],['Driving distance','311 yds','7th on tour'],['Greens in regulation','76.2%','8th on tour'],['Fairways hit','72.1%','6th on tour'],['Putts per round','27.4','9th on tour'],['Birdies this season','201','6th on tour'],['Eagles this season','9','5th on tour'],['Cuts made','19 / 20','95% cut rate']],
      events:[
        {name:'Houston Invitational',date:'Oct 16–19, 2025',place:'T3',toPar:'−17',total:271,rounds:[69,68,67,67],course:'Bayou Pines Golf Club',par:72},
        {name:'Gulf Coast Championship',date:'Aug 21–24, 2025',place:'1',toPar:'−20',total:268,rounds:[68,67,67,66],course:'Gulfside Links',par:72},
        {name:'Lone Star Classic',date:'Jul 17–20, 2025',place:'T5',toPar:'−15',total:273,rounds:[69,69,68,67],course:'Lone Star Country Club',par:72},
        {name:'Space City Open',date:'Jun 12–15, 2025',place:'1',toPar:'−19',total:269,rounds:[69,67,67,66],course:'Space City Golf Club',par:72}
      ],
      moments:[
        {type:'win',tag:'FIRST BIG MOMENT',title:'A win on the Gulf Coast.',sub:'Gulf Coast Championship · Champion',visual:'trophy',date:'AUG 24, 2025',body:'A composed final-round 66 sealed a two-shot victory at Gulfside Links. The win proved Joe could do more than keep up. He could set the pace.',stats:[['1st','FINISH'],['−20','TO PAR'],['66','FINAL ROUND']]},
        {type:'score',tag:'FINAL-ROUND FIRE',title:'Six birdies. Zero doubts.',sub:'Space City Open · Final round',visual:'66',date:'JUN 15, 2025',body:'Six birdies, no bogeys and one breakthrough win. Joe’s composed final round at the Space City Open set the stage for an even bigger year ahead.',stats:[['66','STROKES'],['6','BIRDIES'],['0','BOGEYS']]},
        {type:'course',tag:'HOME CROWD MOMENT',title:'Right where he belongs.',sub:'Houston Invitational · T3',visual:'T3',date:'OCT 19, 2025',body:'A tied-third finish in front of the home crowd closed the 2025 season. Two wins and nine top 10s: the start of something special.',stats:[['T3','FINISH'],['−17','TO PAR'],['9','TOP 10s']]}
      ]
    }
  };
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem('threadmark-joe-golden-v2') || '{}'); } catch {}
  let state = {season:'2026',view:'overview',owner:'Collector #001',following:!!saved.following,golden:true,transfers:Array.isArray(saved.transfers)?saved.transfers:[]};
  const persist = () => { try { localStorage.setItem('threadmark-joe-golden-v2',JSON.stringify({owner:state.owner,following:state.following,golden:state.golden,transfers:state.transfers})); } catch {} };
  const esc = str => String(str).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let toastTimer;
  function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3600);}
  const titles={overview:'Every round. Every moment.',stats:'Greatness, by the numbers.',highlights:'The moments worth keeping.',collection:'The story of this jersey.'};
  function setView(view,scroll=false){
    if(!titles[view])view='overview';state.view=view;
    $$('.view').forEach(el=>el.hidden=el.id!==view);
    $$('.tab').forEach(el=>{const active=el.dataset.view===view;el.classList.toggle('active',active);el.setAttribute('aria-selected',String(active));el.tabIndex=active?0:-1;});
    $('#section-title').textContent=titles[view];
    history.replaceState(null,'',location.pathname+location.search+(view==='overview'?'':'#player-'+view));
    if(scroll) $('.tabs-wrap').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function highlightCard(moment,index){return `<button class="highlight-card" data-moment="${index}" aria-label="Explore ${esc(moment.title)}"><div class="highlight-thumb ${moment.type}"><span class="highlight-index">MOMENT 0${index+1}</span>${moment.visual==='trophy'?icon('trophy'):`<strong class="thumb-score">${moment.visual}</strong><span class="thumb-caption">${moment.type==='score'?'STROKES':'HOLE-IN-ONE'}</span>`}<span class="highlight-open">${icon('arrow')}</span></div><div class="highlight-text"><small>${moment.tag}</small><strong>${moment.title}</strong><p>${moment.sub}</p></div></button>`;}
  function eventRow(event,index){return `<button class="event-row" data-event="${index}" aria-label="View ${esc(event.name)} scorecard"><span class="event-position ${event.place==='1'?'win-position':''}">${event.place==='1'?'1st':event.place}</span><span><span class="event-name">${event.name}</span><span class="event-date">${event.date}</span></span><strong class="event-score">${event.toPar}</strong><span class="event-total">${event.total}</span>${icon('arrow')}</button>`;}
  function renderSeason(){
    const d=seasonData[state.season];
    $('#hero-year').textContent=state.season+' SEASON';
    $('.rank-stamp strong').textContent=state.season==='2026'?'01':'05';
    $('#hero-wins').innerHTML=d.wins+`<span>${icon('trophy')}</span>`;
    $('#hero-average').textContent=d.avg;$('#hero-drive').innerHTML=d.drive+'<span>YDS</span>';
    $('#hero-top10').innerHTML=d.top10+`<span>/ ${d.played}</span>`;
    $('#form-delta').textContent=d.delta;
    $('#stats-heading').textContent=`${state.season} season breakdown`;
    $('#score-chart').innerHTML=d.form.map((val,i)=>`<div class="chart-col"><div class="chart-bar ${val===Math.min(...d.form)?'best':''}" style="height:${(val-60)*9}px"><b>${val.toFixed(1)}</b></div><span>${d.labels[i]}</span></div>`).join('');
    $('#overview-highlights').innerHTML=d.moments.map(highlightCard).join('');
    $('#all-highlights').innerHTML=d.moments.map(highlightCard).join('');
    $('#overview-results').innerHTML=d.events.slice(0,3).map(eventRow).join('');
    $('#all-results').innerHTML=d.events.map(eventRow).join('');
    $('#detailed-stats').innerHTML=d.stats.map(s=>`<div class="detail-stat"><span>${s[0]}</span><strong>${s[1]}</strong><small>${s[2]}</small></div>`).join('');
    $('#highlight-feature').innerHTML=`<div class="feature-inner"><span class="eyebrow">THE ${state.season} HIGHLIGHT COLLECTION</span><h3>${state.season==='2026'?'A little magic.<br>A whole lot of Joe.':'Where the story<br>started to take off.'}</h3><p>${state.season==='2026'?'A perfect ace. A career-low practice round. A hometown win. Get closer to the moments behind the numbers.':'Two wins. Nine top 10s. Revisit the season that set the stage for something special.'}</p><button class="btn btn-gold" data-moment="0">Explore the big moment ${icon('arrow')}</button></div>`;
  }
  function renderOwnership(){
    const owned=!!state.owner;
    $('#sidebar-claim-btn').innerHTML=owned?`View jersey record ${icon('arrow')}`:`Claim this jersey ${icon('arrow')}`;
    $('#sidebar-claim-note').textContent=owned?'Already claimed · '+state.owner:'One claim. One recorded owner.';
    $('#item-status').textContent=owned?'Already claimed · Golden 1/1':'Ready to claim';
    $('#item-owner').textContent=state.owner||'Not yet claimed';
    $('#item-claim-btn').hidden=owned;$('#transfer-button').hidden=true;
    const entries=[{title:'Created for the Houston Collection',text:'Threadmark · 2026 Golden Jersey · Item 1 / 1'}];
    if(owned)entries.push({title:'Claimed by '+(state.transfers.length?state.transfers[0].from:state.owner),text:'Initial claim registered · Claim code retired'});
    state.transfers.forEach(t=>entries.push({title:'Transferred to '+t.to,text:'From '+t.from+' · '+t.date+' · Ownership history retained'}));
    if(!owned)entries.push({title:'Your chapter starts here',text:'Claim this jersey to add your name to its story.'});
    $('#ownership-timeline').innerHTML=entries.map(e=>`<li><strong>${esc(e.title)}</strong><span>${esc(e.text)}</span></li>`).join('');
    const follow=$('#follow-button');follow.innerHTML=icon(state.following?'check':'bell')+`<span>${state.following?'Following Joe':'Follow Joe'}</span>`;follow.setAttribute('aria-pressed',String(state.following));
    $('.golden-wide h3').textContent=state.golden?'Golden rewards unlocked.':'Could yours be golden?';
    $('.golden-wide p').textContent=state.golden?'This claimed 1-of-1 jersey includes a signed edition, two event passes and a player photo experience.':'Claim your apparel to reveal the Golden Jersey experience.';
    $('.golden-wide button').innerHTML=(state.golden?'View golden rewards':'Try the Golden Jersey reveal')+' '+icon('star');
  }
  const modal=$('#modal');let modalReturnFocus;
  function openModal(content){modalReturnFocus=document.activeElement;$('#modal-content').innerHTML=content;if(!modal.open)modal.showModal();setTimeout(()=>{const field=$('input',modal);if(field)field.focus();},30);}
  function closeModal(){modal.close();if(modalReturnFocus&&modalReturnFocus.isConnected)modalReturnFocus.focus();}
  function showScan(){openModal(`<span class="eyebrow dark-eyebrow">THE THREADMARK EXPERIENCE</span><h2 id="modal-title" class="modal-heading">Golden Jersey.<br>Verified connection.</h2><p class="modal-description">You scanned the tag on Joe Pogge’s Golden Jersey. This unique edition is already registered to Collector #001.</p><div class="scan-preview"><div class="scan-photo"><img src="assets/hem-tag.png" alt="Threadmark QR tag sewn into an apparel hem"><div class="scan-frame"></div><div class="scan-line"></div></div><div><span class="eyebrow dark-eyebrow">TAG DETECTED</span><strong>Joe Pogge<br>Golden Jersey</strong><small>TM-JP-GOLD-0001 · Edition 1 / 1</small><span class="verified-badge">${icon('check')}Matched · 1 of 1 · Claimed</span></div></div><div class="scan-steps"><span>01 Scan</span><span>02 Meet the player</span><span>03 View ownership</span></div><button class="btn btn-dark full" data-action="open-player">Open Joe’s player profile ${icon('arrow')}</button>`);}
  function showClaim(){if(state.owner){setView('collection',true);toast('This jersey is registered to '+state.owner+'.');return;}
    openModal(`<div class="modal-icon">${icon('lock')}</div><span class="eyebrow dark-eyebrow">YOUR FIRST CHAPTER</span><h2 id="modal-title" class="modal-heading">Make it yours.</h2><p class="modal-description">Claim your Joe Pogge Golden Jersey and connect your name to its story. This tag can have one recorded owner at a time.</p><form id="claim-form"><label class="form-field">Your name<input name="owner" required maxlength="60" autocomplete="off" placeholder="e.g. Michael"></label><div class="edition-line"><span>TM-JP-GOLD-0001</span><span>1 / 1</span></div><button class="btn btn-dark full" type="submit">Claim jersey record ${icon('arrow')}</button></form>`);
  }
  function showTransfer(){if(!state.owner)return showClaim();openModal(`<div class="modal-icon">${icon('arrow')}</div><span class="eyebrow dark-eyebrow">THE NEXT CHAPTER</span><h2 id="modal-title" class="modal-heading">Pass on the jersey.<br>Keep its history.</h2><p class="modal-description">Transfer this item from <strong>${esc(state.owner)}</strong> to its next owner. Its player connection and complete ownership record travel with it.</p><form id="transfer-form"><label class="form-field">New owner’s name<input name="owner" required maxlength="60" autocomplete="off" placeholder="Who gets the next chapter?"></label><button class="btn btn-dark full" type="submit">Confirm transfer ${icon('arrow')}</button></form>`);}
  function showGolden(){openModal(`<div class="gold-reveal"><span class="eyebrow">JOE POGGE · GOLDEN JERSEY · 1 OF 1</span><h2 id="modal-title" class="modal-heading">Golden rewards unlocked.</h2><img src="assets/pogge-golf-shirt.png" alt="Navy golf shirt with a sewn-in Threadmark hem tag"><p>Already claimed by Collector #001.<br>These benefits belong to this jersey’s registered owner.</p><div class="gold-reward-grid"><div><strong>Signed golf shirt</strong>Numbered 1 of 1</div><div><strong>2 event passes</strong>A day at the course</div><div><strong>Meet Joe</strong>Player photo experience</div></div><button class="btn btn-dark full" data-action="golden-complete">View jersey record ${icon('arrow')}</button></div>`);}
  function confetti(){const colors=['#c6a363','#ead9a6','#496943','#f2edcf'];$('#confetti').innerHTML=Array.from({length:55},()=>`<i class="confetti-piece" style="left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*4)]};animation-delay:${Math.random()*.8}s;transform:rotate(${Math.random()*180}deg)"></i>`).join('');setTimeout(()=>$('#confetti').innerHTML='',3700);}
  function showMoment(index){const m=seasonData[state.season].moments[index];if(!m)return;openModal(`<span class="eyebrow dark-eyebrow">${m.tag} · ${m.date}</span><h2 id="modal-title" class="modal-heading">${m.title}</h2><div class="moment-visual">${m.visual==='trophy'?icon('trophy'):`<strong>${m.visual}</strong>`}</div><p class="modal-description">${m.body}</p><div class="moment-stats">${m.stats.map(s=>`<div><strong>${s[0]}</strong>${s[1]}</div>`).join('')}</div>`);}
  function showEvent(index){const e=seasonData[state.season].events[index];if(!e)return;openModal(`<span class="eyebrow dark-eyebrow">${e.date} · SCORECARD</span><h2 id="modal-title" class="modal-heading">${e.name}</h2><p class="modal-description">${e.course} · Par ${e.par}<br>Joe Pogge · Finish: ${e.place==='1'?'Champion':e.place}</p><div class="rounds">${e.rounds.map((r,i)=>`<div><span>ROUND ${i+1}</span><strong>${r}</strong></div>`).join('')}</div><div class="score-total"><strong>${e.toPar}</strong>${e.total} TOTAL STROKES</div>`);}
  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-action],[data-view],[data-moment],[data-event]');if(!target)return;
    if(target.dataset.view){setView(target.dataset.view,!target.classList.contains('tab'));return;}
    if(target.dataset.moment!==undefined){showMoment(Number(target.dataset.moment));return;}
    if(target.dataset.event!==undefined){showEvent(Number(target.dataset.event));return;}
    switch(target.dataset.action){
      case 'scan':showScan();break;
      case 'open-player':closeModal();setView('overview');window.scrollTo({top:0,behavior:'smooth'});toast('Tag matched. Welcome to Joe’s player profile.');break;
      case 'follow':state.following=!state.following;persist();renderOwnership();toast(state.following?'You’re following Joe. Season updates are on.':'You’ve unfollowed Joe.');break;
      case 'claim':showClaim();break;
      case 'transfer':showTransfer();break;
      case 'golden':showGolden();break;
      case 'reveal-golden':showGolden(true);break;
      case 'golden-complete':state.golden=true;persist();renderOwnership();closeModal();setView('collection',true);toast('Golden Jersey · 1 of 1 · Already claimed.');break;
      case 'reset':openModal(`<span class="eyebrow dark-eyebrow">READY FOR ANOTHER WALKTHROUGH?</span><h2 id="modal-title" class="modal-heading">Reset your view.</h2><p class="modal-description">Return to the current season and reset your follow setting and local viewing history.</p><button class="btn btn-dark full" data-action="confirm-reset">Reset view ${icon('arrow')}</button>`);break;
      case 'confirm-reset':state={season:'2026',view:'overview',owner:'Collector #001',following:false,golden:true,transfers:[]};persist();$('#season-select').value='2026';renderSeason();renderOwnership();closeModal();setView('overview');window.scrollTo({top:0,behavior:'smooth'});toast('View reset.');break;
    }
  });
  document.addEventListener('submit',event=>{
    if(!['claim-form','transfer-form'].includes(event.target.id))return;event.preventDefault();
    const name=new FormData(event.target).get('owner').trim();if(!name){$('input',event.target).setCustomValidity('Enter a name to continue.');$('input',event.target).reportValidity();return;}
    if(event.target.id==='claim-form'){
      if(state.owner){closeModal();return;}
      state.owner=name;persist();renderOwnership();closeModal();setView('collection',true);toast('It’s yours, '+name+'. Your ownership record is live.');
    }else{
      if(name.toLowerCase()===state.owner.toLowerCase()){const field=$('input',event.target);field.setCustomValidity('Choose a different name for the new owner.');field.reportValidity();return;}
      state.transfers.push({from:state.owner,to:name,date:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})});state.owner=name;persist();renderOwnership();closeModal();toast('Transferred to '+name+'. The history stays with the jersey.');
    }
  });
  document.addEventListener('input',event=>{if(event.target.matches('input'))event.target.setCustomValidity('');});
  $('#season-select').addEventListener('change',event=>{state.season=event.target.value;renderSeason();toast(state.season==='2025'?'You’re exploring Joe’s 2025 season archive.':'Back to Joe’s 2026 season.');});
  $('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal();}});
  $$('.tab').forEach((tab,index)=>tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%4;if(event.key==='ArrowLeft')next=(index+3)%4;if(event.key==='Home')next=0;if(event.key==='End')next=3;if(next!==undefined){event.preventDefault();const el=$$('.tab')[next];setView(el.dataset.view);el.focus();}}));
  $('.brand').addEventListener('click',event=>{event.preventDefault();setView('overview');window.scrollTo({top:0,behavior:'smooth'});});
  renderSeason();renderOwnership();setView(location.hash.replace(/^#(?:player-)?/,''));
})();
