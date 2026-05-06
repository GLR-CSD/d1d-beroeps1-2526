const GROUPS = [
  {
    name: "Festune",
    projectName: "Promote It",
    projectUrl: "",
    githubUrl: "",
    scrumUrl: "",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.",
    hasProject: true,
    illustrationColors: ["#1e3a5f", "#2563eb", "#0ea5e9", "#7dd3fc"],
    members: [
      { name: "Atakan", img: "./images/atakan.jpg", color: "#4338ca", bg: "#1e1b4b" },
      { name: "Mark", img: "./images/mark.jpg", color: "#0891b2", bg: "#0c1a2e" },
      { name: "Senna", img: "./images/senna.jpg", color: "#7c3aed", bg: "#2e1065" },
      { name: "Emre", img: "./images/emre.jpg", color: "#0d9488", bg: "#042f2e" },
    ]
  },
  {
    name: "Meteor://Strike",
    projectName: "Moviemaker",
    projectUrl: "",
    githubUrl: "",
    scrumUrl: "",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.",
    hasProject: false,
    illustrationColors: ["#3d1a1a", "#dc2626", "#f97316", "#fbbf24"],
    members: [
      { name: "Jeremy", img: "./images/jeremy.jpg", color: "#b91c1c", bg: "#3d0000" },
      { name: "Alex", img: "./images/alex.jpg", color: "#d97706", bg: "#3d2200" },
      { name: "Casper", img: "./images/casper.jpg", color: "#db2777", bg: "#3d0028" },
      { name: "Jop", img: "./images/jop.png", color: "#db2777", bg: "#3d0028" },
    ]
  },
  {
    name: "koeienstal",
    projectName: "Promote It",
    projectUrl: "",
    githubUrl: "https://github.com/103604/de-koeienstall",
    scrumUrl: "",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.",
    hasProject: true,
    illustrationColors: ["#0d2818", "#15803d", "#4ade80", "#bbf7d0"],
    members: [
      { name: "Luigi", img: "./images/luigi.jpg", color: "#15803d", bg: "#052e16" },
      { name: "Ruben", img: "./images/ruben.jpg", color: "#059669", bg: "#022c22" },
      { name: "Teun", img: "./images/teun.jpg", color: "#0d9488", bg: "#042f2e" },
      { name: "Olivier", img: "./images/olivier.jpg", color: "#65a30d", bg: "#1a2e05" },
    ]
  },
  {
    name: "SCT",
    projectName: "Promote It",
    projectUrl: "",
    githubUrl: "",
    scrumUrl: "",
    description: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed perspiciatis.",
    hasProject: false,
    illustrationColors: ["#2d1b4e", "#7c3aed", "#a78bfa", "#c4b5fd"],
    members: [
      { name: "Kai", img: "./images/kai.jpg", color: "#7c3aed", bg: "#2e1065" },
      { name: "Nikhil", img: "./images/nikhil.jpg", color: "#6d28d9", bg: "#2e1065" },
      { name: "Carlos", img: "./images/carlos.jpg", color: "#8b5cf6", bg: "#1e1b4b" },
    ]
  }
];

function drawIllustration(canvas, colors, seed) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth || 340;
  const h = canvas.height = canvas.offsetHeight || 191;
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, w, h);
  const r = new (function(s){this.n=s;this.r=function(){this.n=(this.n*16807)%2147483647;return(this.n-1)/2147483646;}})(seed||42);
  for(let i=0;i<6;i++){
    const x=r.r()*w;
    const y=r.r()*h;
    const rad=40+r.r()*100;
    const c=colors[1+Math.floor(r.r()*(colors.length-1))];
    const g=ctx.createRadialGradient(x,y,0,x,y,rad);
    g.addColorStop(0,c+'99');
    g.addColorStop(1,'transparent');
    ctx.fillStyle=g;
    ctx.fillRect(0,0,w,h);
  }
  for(let i=0;i<3;i++){
    ctx.strokeStyle=colors[colors.length-1]+'40';
    ctx.lineWidth=0.5;
    ctx.beginPath();
    const x1=r.r()*w, y1=r.r()*h, x2=r.r()*w, y2=r.r()*h;
    ctx.moveTo(x1,y1);
    ctx.bezierCurveTo(r.r()*w,r.r()*h,r.r()*w,r.r()*h,x2,y2);
    ctx.stroke();
  }
}

function buildCard(group, index) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.index = index;

  const linkWrap = document.createElement('a');
  linkWrap.className = 'card-illustration';
  if(group.projectUrl) { linkWrap.href = group.projectUrl; linkWrap.target='_blank'; }
  else { linkWrap.style.cursor = 'default'; }

  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  linkWrap.appendChild(canvas);

  const meta = document.createElement('div');
  meta.className = 'card-meta-overlay';
  meta.textContent = group.projectName;
  linkWrap.appendChild(meta);

  const badge = document.createElement('div');
  badge.className = 'group-badge';
  badge.textContent = group.name;
  linkWrap.appendChild(badge);

  card.appendChild(linkWrap);

  const body = document.createElement('div');
  body.className = 'card-body';

  const team = document.createElement('div');
  team.className = 'card-team';
  group.members.forEach(m => {
    const wrap = document.createElement('div');
    wrap.className = 'member';
    const av = document.createElement('div');
    av.className = 'member-avatar';
    av.style.background = m.bg;
    av.title = m.name;

    if (m.img && m.img.includes('.')) {
    const imgEl = document.createElement('img');
    imgEl.src = m.img;
    imgEl.alt = m.name;
    imgEl.style.cssText = 'width:100%;height:100%;border-radius:50%;object-fit:cover;';
    av.appendChild(imgEl);
    } else {
    av.style.color = m.color;
    av.textContent = m.img; // initialen als fallback
    }
    const nm = document.createElement('div');
    nm.className = 'member-name';
    nm.textContent = m.name;
    wrap.appendChild(av);
    wrap.appendChild(nm);
    team.appendChild(wrap);
  });
  body.appendChild(team);

  const desc = document.createElement('p');
  desc.className = 'card-description';
  desc.textContent = group.description;
  body.appendChild(desc);

  const links = document.createElement('div');
  links.className = 'card-links';

  if(group.githubUrl) {
    const gh = document.createElement('a');
    gh.className = 'link-pill';
    gh.href = group.githubUrl;
    gh.target = '_blank';
    gh.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg> GitHub`;
    links.appendChild(gh);
    console.log("Github",gh)
  }

  if(group.scrumUrl) {
    const sc = document.createElement('a');
    sc.className = 'link-pill';
    sc.href = group.scrumUrl;
    sc.target = '_blank';
    sc.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> Scrumboard';
    links.appendChild(sc);
  }

  if(!group.githubUrl && !group.scrumUrl) {
    const none = document.createElement('span');
    none.style.fontSize = '11.5px';
    none.style.color = 'var(--c-muted)';
    none.textContent = 'Geen links beschikbaar';
    links.appendChild(none);
  }

  body.appendChild(links);

  const btn = document.createElement('button');
  btn.className = 'btn-project';
  btn.textContent = 'Bekijk project';
  if(!group.hasProject || !group.projectUrl) btn.disabled = true;
  else btn.addEventListener('click', () => window.open(group.projectUrl, '_blank'));
  body.appendChild(btn);

  card.appendChild(body);

  setTimeout(() => {
    drawIllustration(canvas, group.illustrationColors, index * 137 + 7);
  }, 50);

  return card;
}

let current = 0;
const total = GROUPS.length;
const track = document.getElementById('carouselTrack');
const dotsEl = document.getElementById('navDots');
const cards = [];

GROUPS.forEach((g, i) => {
  const card = buildCard(g, i);
  track.appendChild(card);
  cards.push(card);

  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(dot);
});

function goTo(idx) {
  current = ((idx % total) + total) % total;
  updateCarousel();
}

function updateCarousel() {
  const dots = dotsEl.querySelectorAll('.dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === current));

  const count = cards.length;
  cards.forEach((card, i) => {
    const offset = ((i - current + count) % count);
    const normalized = offset > count / 2 ? offset - count : offset;

    const absOff = Math.abs(normalized);
    const sign = normalized < 0 ? -1 : 1;

    const tx = sign * Math.min(absOff, 2) * 220;
    const tz = -Math.abs(normalized) * 120 - (absOff > 0 ? 60 : 0);
    const ry = sign * Math.min(absOff, 2) * 28;
    const scale = absOff === 0 ? 1 : absOff === 1 ? 0.82 : 0.65;
    const opacity = absOff === 0 ? 1 : absOff === 1 ? 0.55 : 0.2;
    const zIndex = 10 - absOff;
    const pointer = absOff === 0 ? 'auto' : 'none';

    card.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`;
    card.style.opacity = opacity;
    card.style.zIndex = zIndex;
    card.style.pointerEvents = pointer;
    card.classList.toggle('card-active', absOff === 0);
  });
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

cards.forEach((card, i) => {
  card.addEventListener('click', e => {
    if(e.target.closest('a') || e.target.closest('button')) return;
    const offset = ((i - current + total) % total);
    const normalized = offset > total / 2 ? offset - total : offset;
    if(normalized !== 0) goTo(i);
  });
});

updateCarousel();