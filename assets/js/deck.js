(function(){
  const cfg=window.DECK_CONFIG;
  const body=document.body, stage=document.getElementById('stage');
  const slides=[...document.querySelectorAll('#stage > .slide')];
  const n=slides.length; let cur=0;
  const $=id=>document.getElementById(id);
  const token=name=>getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const stageW=parseFloat(token('--stage-w')), stageH=parseFloat(token('--stage-h'));

  // Estudiantes
  const g=document.getElementById('students');
  if(g){const st=cfg.students, base=token(st.baseColor), extra=token(st.extraColor);
    let s='';for(let k=0;k<st.total;k++){const c=k%st.perRow,r=Math.floor(k/st.perRow);const fill=k<st.base?base:extra;
    s+=`<circle cx="${c*st.stepX+st.offsetX}" cy="${r*st.stepY+st.offsetY}" r="${st.radius}" fill="${fill}" data-a="pop" style="--i:${st.firstDelay+Math.floor(k/st.perDelay)}"/>`;}
    g.innerHTML=s;}

  function mode(){
    const scroll=window.innerWidth<cfg.scrollMaxWidth||(window.innerHeight<cfg.scrollMaxHeight&&matchMedia('(pointer: coarse)').matches);
    body.classList.toggle('m-scroll',scroll);body.classList.toggle('m-deck',!scroll);
    if(!scroll)fit();
  }
  function fit(){
    const vp=$('viewport').getBoundingClientRect();
    const s=Math.min((vp.width-cfg.stageMargin)/stageW,(vp.height-cfg.stageMargin)/stageH);
    stage.style.transform=`translate(-50%,-50%) scale(${s})`;
  }
  function go(i){
    i=Math.max(0,Math.min(n-1,i));
    slides.forEach((sl,k)=>{sl.classList.toggle('is-active',k===i);sl.classList.toggle('is-prev',k<i);sl.setAttribute('aria-hidden',k===i?'false':'true');});
    cur=i;
    $('count').textContent=String(i+1).padStart(2,'0')+' / '+n;
    $('slideTitle').textContent=slides[i].dataset.title||'';
    $('progress').style.width=((i+1)/n*100)+'%';
    const nt=slides[i].querySelector('.notes');$('notesText').textContent=nt?nt.textContent:'';
    try{history.replaceState(null,'','#'+cfg.hashPrefix+(i+1));}catch(e){}
    document.querySelectorAll('.thumb').forEach((t,k)=>t.classList.toggle('cur',k===i));
  }
  // en lectura vertical, marca qué diapositivas están en pantalla para pausar el resto
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('in-view',e.isIntersecting)),{rootMargin:'100px 0px'});slides.forEach(sl=>io.observe(sl));}
  else slides.forEach(sl=>sl.classList.add('in-view'));
  // notas visibles solo en el panel
  document.querySelectorAll('.slide .notes').forEach(a=>a.hidden=true);

  // Cuadrícula
  function buildGrid(){
    const w=$('gridWrap');w.innerHTML='';
    slides.forEach((sl,k)=>{
      const b=document.createElement('button');b.className='thumb';b.type='button';
      b.innerHTML=`<div class="frame"></div>${String(k+1).padStart(2,'0')} · ${sl.dataset.title}`;
      const c=sl.cloneNode(true);c.classList.add('is-static','is-active');c.classList.remove('is-prev');c.removeAttribute('aria-hidden');c.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));
      b.querySelector('.frame').appendChild(c);
      b.addEventListener('click',()=>{toggleGrid(false);go(k);});
      w.appendChild(b);
    });
    scaleThumbs();
  }
  function scaleThumbs(){document.querySelectorAll('.thumb .frame').forEach(f=>{const s=f.clientWidth/stageW;const c=f.firstElementChild;if(c)c.style.transform=`scale(${s})`;});}
  function toggleGrid(on){
    const el=$('grid');on=on??el.hidden;el.hidden=!on;$('btnGrid').setAttribute('aria-pressed',on);
    if(on){buildGrid();const t=document.querySelectorAll('.thumb')[cur];t&&t.focus();}
  }
  function toggleNotes(){const el=$('notes');el.hidden=!el.hidden;$('btnNotes').setAttribute('aria-pressed',!el.hidden);}
  function fs(){const d=document;try{if(!d.fullscreenElement){(d.documentElement.requestFullscreen?.()||Promise.resolve()).catch(()=>{});}else{d.exitFullscreen?.();}}catch(e){}}

  $('prev').onclick=()=>go(cur-1);$('next').onclick=()=>go(cur+1);
  $('btnGrid').onclick=()=>toggleGrid();$('btnNotes').onclick=toggleNotes;$('btnFs').onclick=fs;
  document.addEventListener('keydown',e=>{
    if(body.classList.contains('m-scroll'))return;
    if(e.metaKey||e.ctrlKey||e.altKey)return;
    const k=e.key;
    if(!$('grid').hidden){if(k==='Escape'||k==='g'||k==='G'){toggleGrid(false);e.preventDefault();}return;}
    if(['ArrowRight','PageDown',' ','Enter'].includes(k)){if(k==='Enter'&&document.activeElement&&document.activeElement.tagName==='BUTTON')return;go(cur+1);e.preventDefault();}
    else if(['ArrowLeft','PageUp','Backspace'].includes(k)){go(cur-1);e.preventDefault();}
    else if(k==='Home'){go(0);}else if(k==='End'){go(n-1);}
    else if(k==='g'||k==='G'){toggleGrid(true);}
    else if(k==='n'||k==='N'){toggleNotes();}
    else if(k==='f'||k==='F'){fs();}
  });
  // Deslizar en pantallas táctiles
  let x0=null;$('viewport').addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
  $('viewport').addEventListener('touchend',e=>{if(x0===null||body.classList.contains('m-scroll'))return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>cfg.swipeThreshold)go(cur+(dx<0?1:-1));x0=null;});

  window.addEventListener('resize',()=>{mode();if(!$('grid').hidden)scaleThumbs();});
  mode();
  const m=new RegExp('^#'+cfg.hashPrefix+'(\\d+)$').exec(location.hash);go(m?parseInt(m[1],10)-1:0);
  if(m&&body.classList.contains('m-scroll'))slides[cur].scrollIntoView();
  requestAnimationFrame(()=>requestAnimationFrame(()=>body.classList.remove('preload')));
})();
