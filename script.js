/* ====== بيانات الأنميات (تقدر تزيد عليها بسهولة) ====== */
const animeDB = [
  {
    id: "aot",
    title: "Attack on Titan",
    img: "https://i.imgur.com/u6lZt3y.jpg",
    synopsis: "بشرية محاصرة وراء جدران لحمايتهم من العمالقة...",
    genres: ["اكشن","دراما","خارق"],
    episodes: [
      { ep:1, title:"البدء", video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
      { ep:28, title:"النهاية الكبرى", video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }
    ]
  },
  {
    id: "demon",
    title: "Demon Slayer",
    img: "https://i.imgur.com/tGbaZCY.jpg",
    synopsis: "قصة تانجيرو لي ولى صياد شياطين...",
    genres: ["اكشن","فانتازيا"],
    episodes: [
      { ep:1, title:"بداية الرحلة", video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
      { ep:12, title:"قوة اللهب", video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }
    ]
  },
  {
    id: "onepiece",
    title: "One Piece",
    img: "https://i.imgur.com/8Km9tLL.jpg",
    synopsis: "لوفي وطاقمه في رحلة للبحث عن الكنز الأعظم...",
    genres: ["مغامرات","كوميديا"],
    episodes: [
      { ep:1, title:"أنا لوفي!", video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
      { ep:1052, title:"المعركة الكبرى", video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }
    ]
  },
  {
    id: "mha",
    title: "My Hero Academia",
    img: "https://i.imgur.com/2WZt6tS.jpg",
    synopsis: "أبطال مدرسة UA و الرحلة لإصلاح العالم...",
    genres: ["اكشن","مدرسي"],
    episodes: [
      { ep:1, title:"بطل جديد", video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }
    ]
  },
  {
    id: "naruto",
    title: "Naruto",
    img: "https://i.imgur.com/3V8V7j9.jpg",
    synopsis: "ناروتو وطريقه ليصبح الهوكاجي...",
    genres: ["اكشن","مغامرات"],
    episodes: [
      { ep:1, title:"النيبودا", video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }
    ]
  },
  {
    id: "bleach",
    title: "Bleach",
    img: "https://i.imgur.com/4AiXzf8.jpg",
    synopsis: "إيشيغو وقصة روح الموت...",
    genres: ["اكشن","خارق"],
    episodes: [
      { ep:1, title:"روح الموت", video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }
    ]
  },
  /* زيد هنا أي أنميات بغيتي بنفس الصيغة */
];

/* ====== helpers ====== */
const el=(t,cls='',attrs={})=>{const e=document.createElement(t); if(cls) e.className=cls; for(const k in attrs) e.setAttribute(k, attrs[k]); return e; }

/* render: latest (الاخيرة مبنية على الحلقة الأخيرة لكل أنمي) */
function renderLatest(){
  const latestGrid = document.getElementById('latest-grid'); latestGrid.innerHTML='';
  animeDB.forEach(a=>{
    const lastEp = a.episodes[a.episodes.length-1];
    const card = el('div','anime-card');
    const img = el('img','anime-thumb',{src:a.img, alt:a.title});
    const body = el('div','anime-body');
    const h = el('h3','anime-title'); h.textContent = a.title;
    const meta = el('div','anime-meta'); meta.textContent = `آخر: الحلقة ${lastEp.ep}`;
    const btn = el('button','watch-btn'); btn.textContent='مشاهدة';
    btn.addEventListener('click', ()=> openModal({ title:`${a.title} — حلقة ${lastEp.ep}`, meta:lastEp.title, video:lastEp.video }) );
    body.append(h, meta, btn);
    card.append(img, body);
    latestGrid.appendChild(card);
  });
}

/* render all anime grid */
function renderAll(filterGenre=''){
  const allGrid = document.getElementById('all-grid'); allGrid.innerHTML='';
  const list = filterGenre ? animeDB.filter(a=> a.genres.includes(filterGenre) ) : animeDB;
  list.forEach(a=>{
    const card = el('div','anime-card');
    const img = el('img','anime-thumb',{src:a.img, alt:a.title});
    const body = el('div','anime-body');
    const h = el('h3','anime-title'); h.textContent = a.title;
    const meta = el('div','anime-meta'); meta.textContent = a.genres.join(' • ');
    const btn = el('button','watch-btn'); btn.textContent='عرض التفاصيل';
    btn.addEventListener('click', ()=> showDetail(a.id) );
    body.append(h, meta, btn);
    card.append(img, body);
    allGrid.appendChild(card);
  });
}

/* featured */
function renderFeatured(){
  const f = document.getElementById('featured-card'); f.innerHTML='';
  const a = animeDB[0];
  if(!a) return;
  const img = el('img'); img.src=a.img;
  const info = el('div','featured-info');
  const h = el('h3'); h.textContent = a.title;
  const p = el('p','meta'); p.textContent = a.synopsis;
  const btn = el('button','btn play'); btn.textContent='شغّل الحلقة الأخيرة';
  btn.addEventListener('click', ()=> {
    const last = a.episodes[a.episodes.length-1];
    openModal({ title:`${a.title} — حلقة ${last.ep}`, meta:last.title, video:last.video });
  });
  info.append(h,p,btn);
  f.append(img, info);
}

/* show detail view */
function showDetail(id){
  const item = animeDB.find(x=>x.id===id);
  if(!item) return;
  document.getElementById('detail-view').style.display='block';
  document.querySelector('main').scrollTo(0,0);
  document.getElementById('all').style.display='none';
  document.getElementById('latest-section').style.display='none';
  document.getElementById('detail-card').innerHTML='';
  // detail card
  const card = el('div','detail-card');
  const img = el('img'); img.src=item.img;
  const meta = el('div','detail-meta');
  const h = el('h2'); h.textContent=item.title;
  const p = el('p'); p.textContent=item.synopsis;
  const tags = el('div'); tags.textContent = 'النوع: ' + item.genres.join(', ');
  meta.append(h,p,tags);
  card.append(img,meta);
  document.getElementById('detail-card').appendChild(card);
  // episodes
  const epsWrap = document.getElementById('episodes-list'); epsWrap.innerHTML='';
  const title = el('h3'); title.textContent='قائمة الحلقات';
  epsWrap.appendChild(title);
  item.episodes.slice().reverse().forEach(ep=>{
    const row = el('div','episode');
    const left = el('div'); left.textContent = `الحلقة ${ep.ep} — ${ep.title}`;
    const right = el('div');
    const play = el('button','btn small'); play.textContent='مشاهدة';
    play.addEventListener('click', ()=> openModal({ title:`${item.title} — حلقة ${ep.ep}`, meta:ep.title, video:ep.video }) );
    right.appendChild(play);
    row.append(left,right);
    epsWrap.appendChild(row);
  });
}

/* modal player */
function openModal(item){
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('modal-video');
  document.getElementById('modal-title').textContent = item.title || 'عنوان';
  document.getElementById('modal-desc').textContent = item.meta || '';
  video.src = item.video || '';
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
  video.play().catch(()=>{});
}
function closeModal(){
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('modal-video');
  video.pause(); video.src='';
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
}

/* search + filter */
function populateGenres(){
  const set = new Set();
  animeDB.forEach(a=> a.genres.forEach(g=> set.add(g)));
  const sel = document.getElementById('genre-filter');
  set.forEach(g=>{
    const opt = document.createElement('option'); opt.value=g; opt.textContent=g; sel.appendChild(opt);
  });
}
function searchAndRender(q){
  q = q.trim().toLowerCase();
  if(!q){ renderAll(); renderLatest(); return; }
  const res = animeDB.filter(a=> a.title.toLowerCase().includes(q) || a.synopsis.toLowerCase().includes(q) || a.genres.join(' ').toLowerCase().includes(q) );
  document.getElementById('all-grid').innerHTML='';
  res.forEach(a=>{
    const card = el('div','anime-card');
    const img = el('img','anime-thumb',{src:a.img});
    const body = el('div','anime-body');
    const h = el('h3','anime-title'); h.textContent = a.title;
    const meta = el('div','anime-meta'); meta.textContent = a.genres.join(' • ');
    const btn = el('button','watch-btn'); btn.textContent='عرض التفاصيل';
    btn.addEventListener('click', ()=> showDetail(a.id) );
    body.append(h,meta,btn);
    card.append(img,body);
    document.getElementById('all-grid').appendChild(card);
  });
}

/* theme toggle */
function toggleTheme(){
  const root = document.documentElement;
  if(root.style.getPropertyValue('--bg') === '#0b0b0d' || !root.style.getPropertyValue('--bg')){
    root.style.setProperty('--bg','#f6f7fb');
    root.style.setProperty('--card','#ffffff');
    root.style.setProperty('--muted','#4a4a4a');
    document.body.style.color = '#0b0b0d';
  } else {
    root.style.setProperty('--bg','#0b0b0d');
    root.style.setProperty('--card','#111217');
    root.style.setProperty('--muted','#bfbfc5');
    document.body.style.color = '#fff';
  }
}

/* init */
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('year').textContent = new Date().getFullYear();
  renderFeatured();
  renderLatest();
  renderAll();
  populateGenres();

  document.getElementById('close-modal').addEventListener('click', closeModal);
  document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  document.getElementById('search-input').addEventListener('input', e=> searchAndRender(e.target.value));
  document.getElementById('genre-filter').addEventListener('change', e=> {
    const val = e.target.value;
    renderAll(val);
  });
  document.getElementById('back-to-list').addEventListener('click', ()=>{
    document.getElementById('detail-view').style.display='none';
    document.getElementById('all').style.display='block';
    document.getElementById('latest-section').style.display='block';
  });
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
});
