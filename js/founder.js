
gsap.registerPlugin(ScrollTrigger);

/* ═══ LOADER ═══ */
let pct = 0;
const lbar = document.getElementById('lbar');
const lpct = document.getElementById('lpct');
const ldrInt = setInterval(() => {
  pct += Math.random() * 12 + 4;
  if (pct >= 100) { pct = 100; clearInterval(ldrInt); setTimeout(finishLoader, 400); }
  lbar.style.width = pct + '%';
  lpct.textContent = Math.floor(pct) + '%';
}, 70);

function finishLoader() {
  gsap.to('#ldr', { opacity: 0, duration: 0.9, ease: 'power2.inOut', onComplete: () => {
    document.getElementById('ldr').classList.add('hide');
    startSite();
  }});
}

/* ═══ TICKER ═══ */
const TICKS = ['CEO & Founder','80+ Research Papers','60+ IPR Patents',
  'Smart India Hackathon ×4','70+ Projects Built','IIT Madras','NIT Trichy',
  'Qatar University','BBW Germany','BITS Pilani Dubai','Ministry of AYUSH',
  'AICTE YUKTI','Caterpillar Award','Bosch Innovation','L&T Techgium',
  'KPIT Sparkle','7 SIH Victories','3 Continents'];
const tInner = document.getElementById('ticker-inner');
const full = [...TICKS, ...TICKS];
tInner.innerHTML = full.map(t =>
  `<div class="tick-i">${t}<span class="tick-dot"></span></div>`
).join('');

/* ═══ TIMELINE MARQUEE DATA ═══ */
const TL_CARDS = [
  {yr:'2018 to Present', title:'CEO and Founder', org:'Nakaza Automations LLP', desc:'Built a national innovation powerhouse: 60+ patents, 80+ papers, 70+ projects across India and globally.'},
  {yr:'2019 to 2024', title:'SIH Coach, 4 Editions', org:'MHRD-AICTE, Smart India Hackathon', desc:'Led 7 student teams to victory across four consecutive SIH editions, an unparalleled coaching legacy.'},
  {yr:'2020 to Present', title:'International Research Mentor', org:'Qatar, Germany and Dubai', desc:'Mentoring PhD and PG scholars at Qatar University, BBW Germany, and BITS Pilani Dubai Campus.'},
  {yr:'2021', title:'AICTE YUKTI Qualifier', org:'Ministry of Education, AICTE', desc:'Cleared the AICTE YUKTI Innovation Challenge securing national recognition and funding.'},
  {yr:'2020', title:'Ministry of AYUSH Grant', org:'Government of India', desc:'Received government support for the Automated Kashaya Machine innovation project.'},
  {yr:'2019 to Present', title:'IPR and Patent Expert', org:'National and International', desc:'60+ patents secured across robotics, AI, healthcare, and agricultural automation systems.'},
  {yr:'2019 to Present', title:'Research Author', org:'Scopus Indexed Journals', desc:'80+ papers published in internationally recognised journals across engineering domains.'},
];
const tmqTrack = document.getElementById('tmq-track');
const allCards = [...TL_CARDS, ...TL_CARDS];
tmqTrack.innerHTML = allCards.map(c => `
  <div class="tcard">
    <div class="tcard-yr">${c.yr}</div>
    <div class="tcard-title">${c.title}</div>
    <div class="tcard-org">${c.org}</div>
    <p class="tcard-desc">${c.desc}</p>
  </div>`
).join('');

/* ═══ PROJECTS ═══ */
const PROJS = [
  {n:'Pneumatic Auto Feed Punching & Riveting Machine',c:'auto'},
  {n:'Agrobot — Farm Automation System',c:'robotics'},
  {n:'Fire Fighting Robot',c:'robotics'},
  {n:'Robotic Hand / Arm',c:'robotics'},
  {n:'Fully Automated Stair Climbing Robot',c:'robotics'},
  {n:'Automated Water Hyacinth Remover',c:'auto'},
  {n:'Robotic Snake (Arduino)',c:'robotics'},
  {n:'Hand Gesture Controlled Robot',c:'robotics'},
  {n:'RFID Based Door Lock',c:'iot'},
  {n:'Obstacle Avoiding Robot',c:'robotics'},
  {n:'Smart Garbage Van Tracking',c:'iot'},
  {n:'Accident Detection & Monitoring System',c:'iot'},
  {n:'AI Based Smart Parking System',c:'ai'},
  {n:'Air Pollution Monitoring System',c:'iot'},
  {n:'AI Based Bore-Well Rescue System',c:'ai'},
  {n:'Automated Elderly Safety Kit',c:'iot'},
  {n:'Automatic Sanitizing Machine',c:'auto'},
  {n:'3D Printer Build',c:'auto'},
  {n:'Plug-In-Kit For EV Ready Charging',c:'auto'},
  {n:'Automated Kashaya Machine',c:'auto'},
  {n:'AR & VR Related Projects',c:'drone'},
  {n:'AI Based Smart Toilet',c:'ai'},
  {n:'Wall Climbing Robot',c:'robotics'},
  {n:'AI Based Kashaya Making Machine',c:'ai'},
  {n:'Quad Bike',c:'auto'},
  {n:'FarmBot Agriculture System',c:'robotics'},
  {n:'Robotic Arm with Mecanum Wheels',c:'robotics'},
  {n:'Colour Sorting Machine',c:'auto'},
  {n:'3D Wire Bending Machine',c:'auto'},
  {n:'Agro Drone',c:'drone'},
  {n:'Smart Water Monitoring (IoT)',c:'iot'},
  {n:'CNC Machine Using Arduino',c:'auto'},
  {n:'Laser Engraving Machine',c:'auto'},
  {n:'Plastic Filament Extruder',c:'auto'},
  {n:'Line Follower Robot',c:'robotics'},
  {n:'Smart AI Liquid Level Monitor',c:'ai'},
  {n:'Theft Detecting Alarm',c:'iot'},
  {n:'Smart Dam Monitoring System',c:'iot'},
  {n:'Pneumatic Coconut Fibre Remover',c:'auto'},
  {n:'Modern E-Bike',c:'auto'},
  {n:'Gas Leakage Monitoring System',c:'iot'},
  {n:'Blind Stick',c:'ai'},
  {n:'Hover Craft',c:'drone'},
  {n:'CNC Plotter Using Arduino',c:'auto'},
  {n:'RFID Attendance Monitoring',c:'iot'},
  {n:'Biometric Attendance Monitoring',c:'iot'},
  {n:'Home Automation Using IoT',c:'iot'},
  {n:'Medi-Drone (Medical Delivery)',c:'drone'},
  {n:'Quadcopter',c:'drone'},
  {n:'Automated Drug Dispenser',c:'ai'},
  {n:'Smart Dustbin',c:'iot'},
  {n:'Water Management System (IoT)',c:'iot'},
  {n:'Automatic Pet Feeder',c:'iot'},
  {n:'Automatic Salad Making Machine',c:'auto'},
  {n:'Automatic Pneumatic Vehicle Bumper',c:'auto'},
  {n:'Automatic Pneumatic Cane Crusher',c:'auto'},
];
const dotCls = {robotics:'',iot:'iot',ai:'ai',auto:'auto',drone:'drone'};
function fp(f, btn) {
  document.querySelectorAll('.pf').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  const list = f === 'all' ? PROJS : PROJS.filter(p => p.c === f);
  const g = document.getElementById('pgrid');
  g.innerHTML = list.map(p =>
    `<div class="ptile"><div class="ptdot ${dotCls[p.c]||''}"></div><h4>${p.n}</h4></div>`
  ).join('');
  gsap.from('.ptile', {y:18,opacity:0,duration:.4,stagger:.025,ease:'power2.out'});
}
fp('all', document.querySelector('.pf.on'));

/* ═══ EMAILJS CONFIG ═══ */
const EMAILJS_PUBLIC_KEY = 'HiJXFyKf7Z-ybuZRD';
const EMAILJS_SERVICE_ID = 'service_ffrlng8';
const EMAILJS_TEMPLATE_ID = 'template_x0of7w6';

(function initEmailJS(){
  if(typeof emailjs !== 'undefined'){
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } else {
    window.addEventListener('load', () => emailjs.init(EMAILJS_PUBLIC_KEY));
  }
})();

/* ═══ CONTACT FORM — EmailJS ═══ */
function doSend() {
  const fn  = document.getElementById('fn').value.trim();
  const fe  = document.getElementById('fe').value.trim();
  const fp2 = document.getElementById('fp2').value.trim();
  const fs  = document.getElementById('fs').value;
  const fo  = document.getElementById('fo').value.trim();
  const fm  = document.getElementById('fm').value.trim();
  const msg = document.getElementById('fmsg');
  const btn = document.getElementById('sbtn');

  if(!fn||!fe||!fm){
    msg.className='fmsg er';
    msg.textContent='⚠ Please fill in name, email and message.';
    return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fe)){
    msg.className='fmsg er';
    msg.textContent='⚠ Please enter a valid email.';
    return;
  }

  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'SENDING…';
  btn.style.opacity = '.7';
  msg.className = 'fmsg';
  msg.textContent = '';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:    fn,
    from_email:   fe,
    phone:        fp2 || '',
    service:      fs  || '',
    organization: fo  || '',
    message:      fm
  })
  .then(() => {
    msg.className = 'fmsg ok';
    msg.textContent = '✓ Message sent! We’ll respond within 24 hours.';
    ['fn','fe','fp2','fs','fo','fm'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.value = '';
    });
  })
  .catch(err => {
    console.error('EmailJS error:', err);
    msg.className = 'fmsg er';
    msg.textContent = '⚠ Failed to send. Please try again or email us directly.';
  })
  .finally(() => {
    btn.disabled = false;
    btn.textContent = originalText;
    btn.style.opacity = '1';
  });
}

/* ═══ MAIN SITE INIT ═══ */
function startSite() {
  initHeroThree();
  initAboutThree();
  initHeroAnim();
  initScrollAnims();
  initCounters();
  initNav();
  initCursor();
  initMagnetic();
}

/* ═══ THREE.JS HERO ═══ */
function initHeroThree() {
  const canvas = document.getElementById('hcanvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 6);

  function resize() {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // Wireframe torus knot – gold
  const tkG = new THREE.TorusKnotGeometry(1.9, 0.52, 200, 28, 2, 3);
  const tkM = new THREE.MeshBasicMaterial({ color: 0xE8A400, wireframe: true, transparent: true, opacity: 0.14 });
  const tk = new THREE.Mesh(tkG, tkM);
  tk.position.set(3.8, -0.2, 0);
  scene.add(tk);

  // Orbit ring
  const t2G = new THREE.TorusGeometry(3.1, 0.018, 16, 140);
  const t2M = new THREE.MeshBasicMaterial({ color: 0xFFD166, transparent: true, opacity: 0.1 });
  const t2 = new THREE.Mesh(t2G, t2M);
  t2.rotation.x = Math.PI / 3;
  t2.position.set(3.8, 0, 0);
  scene.add(t2);

  // Secondary torus knot – teal
  const tk2G = new THREE.TorusKnotGeometry(1.1, 0.28, 150, 20, 3, 4);
  const tk2M = new THREE.MeshBasicMaterial({ color: 0x00D4AA, wireframe: true, transparent: true, opacity: 0.1 });
  const tk2 = new THREE.Mesh(tk2G, tk2M);
  tk2.position.set(-3.5, 1, 0.5);
  scene.add(tk2);

  // Particles
  const pCount = 1400;
  const pPos = new Float32Array(pCount * 3);
  const pCol = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i*3]   = (Math.random()-0.5)*24;
    pPos[i*3+1] = (Math.random()-0.5)*16;
    pPos[i*3+2] = (Math.random()-0.5)*12;
    const r = Math.random();
    if (r > 0.6)      { pCol[i*3]=0.91; pCol[i*3+1]=0.64; pCol[i*3+2]=0; }
    else if (r > 0.3) { pCol[i*3]=0;    pCol[i*3+1]=0.83; pCol[i*3+2]=0.67; }
    else              { pCol[i*3]=0.9;  pCol[i*3+1]=0.94; pCol[i*3+2]=1; }
  }
  const pG = new THREE.BufferGeometry();
  pG.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pG.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));
  const pM = new THREE.PointsMaterial({ size: 0.028, vertexColors: true, transparent: true, opacity: 0.7 });
  const pts = new THREE.Points(pG, pM);
  scene.add(pts);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / innerWidth  - 0.5) * 2;
    my = -(e.clientY / innerHeight - 0.5) * 2;
  });

  (function animate() {
    requestAnimationFrame(animate);
    tk.rotation.x  += 0.003; tk.rotation.y  += 0.004;
    t2.rotation.z  += 0.002;
    tk2.rotation.x += 0.005; tk2.rotation.y -= 0.003;
    pts.rotation.y += 0.0006; pts.rotation.x += 0.0003;
    camera.position.x += (mx * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (my * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  })();
}

/* ═══ THREE.JS ABOUT CANVAS ═══ */
function initAboutThree() {
  const box = document.getElementById('acanvas-box');
  const canvas = document.getElementById('acanvas');

  // Force canvas size to match container
  function setSize() {
    const w = box.offsetWidth;
    const h = box.offsetHeight || w; // fallback square
    canvas.width  = w;
    canvas.height = h;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 4;

  setSize();
  window.addEventListener('resize', setSize);

  // Wireframe icosahedron
  const icoG = new THREE.IcosahedronGeometry(1.6, 1);
  const icoM = new THREE.MeshBasicMaterial({ color: 0xE8A400, wireframe: true, transparent: true, opacity: 0.26 });
  const ico  = new THREE.Mesh(icoG, icoM);
  scene.add(ico);

  // Inner sphere
  const sphG = new THREE.SphereGeometry(1.1, 32, 32);
  const sphM = new THREE.MeshBasicMaterial({ color: 0x00D4AA, wireframe: true, transparent: true, opacity: 0.1 });
  const sph  = new THREE.Mesh(sphG, sphM);
  scene.add(sph);

  // Orbit ring
  const rG = new THREE.TorusGeometry(2.2, 0.012, 12, 100);
  const rM = new THREE.MeshBasicMaterial({ color: 0xFFD166, transparent: true, opacity: 0.2 });
  const ring = new THREE.Mesh(rG, rM);
  ring.rotation.x = Math.PI / 2.5;
  scene.add(ring);

  // Glowing dot on ring
  const dG = new THREE.SphereGeometry(0.06, 12, 12);
  const dM = new THREE.MeshBasicMaterial({ color: 0xE8A400 });
  const dot = new THREE.Mesh(dG, dM);
  scene.add(dot);

  // Particles
  const ppC = 600;
  const ppP = new Float32Array(ppC * 3);
  for (let i = 0; i < ppC; i++) {
    ppP[i*3]   = (Math.random()-0.5)*8;
    ppP[i*3+1] = (Math.random()-0.5)*8;
    ppP[i*3+2] = (Math.random()-0.5)*4;
  }
  const ppG = new THREE.BufferGeometry();
  ppG.setAttribute('position', new THREE.BufferAttribute(ppP, 3));
  const ppM = new THREE.PointsMaterial({ size: 0.04, color: 0xE8A400, transparent: true, opacity: 0.4 });
  const pp  = new THREE.Points(ppG, ppM);
  scene.add(pp);

  // Save original positions for morphing
  const pos    = icoG.attributes.position;
  const origPx = new Float32Array(pos.array);

  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += 0.012;
    for (let i = 0; i < pos.count; i++) {
      const ox=origPx[i*3], oy=origPx[i*3+1], oz=origPx[i*3+2];
      const n = Math.sin(t+ox*2)*Math.cos(t*0.7+oy*2)*0.18;
      pos.setXYZ(i, ox+ox*n, oy+oy*n, oz+oz*n);
    }
    pos.needsUpdate = true;
    ico.rotation.x  += 0.004; ico.rotation.y  += 0.006;
    sph.rotation.y  -= 0.008;
    ring.rotation.z += 0.003;
    const angle = t * 0.6;
    dot.position.set(2.2*Math.cos(angle), 2.2*Math.sin(angle)*0.4, 2.2*Math.sin(angle)*0.9);
    pp.rotation.y += 0.001;
    renderer.render(scene, camera);
  })();
}

/* ═══ HERO GSAP ANIMATIONS ═══ */
function initHeroAnim() {
  // Make elements visible immediately, then animate in
  const tl = gsap.timeline({ delay: 0.05 });
  tl.from('.heyebrow',    { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' })
    .from('#hl1',         { y: '110%', opacity: 0, duration: 1,   ease: 'power4.out' }, '-=0.3')
    .from('#hl2',         { y: '110%', opacity: 0, duration: 1,   ease: 'power4.out' }, '-=0.75')
    .from('#hl3',         { y: '110%', opacity: 0, duration: 1,   ease: 'power4.out' }, '-=0.75')
    .from('#hsub',        { y: 20,    opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .from('#hbtns',       { y: 20,    opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .from('.hcs-item',    { y: 20,    opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.3')
    .from('.hscroll',     { opacity: 0, duration: 0.6 }, '-=0.2');
}

/* ═══ SCROLL ANIMATIONS ═══ */
function initScrollAnims() {
  // About section
  gsap.from('.acanvas-box', { scrollTrigger:{ trigger:'#about', start:'top 70%' }, x:-60, opacity:0, duration:1, ease:'power3.out' });
  gsap.from('.ag > div:last-child > *', { scrollTrigger:{ trigger:'#about', start:'top 65%' }, y:40, opacity:0, duration:0.8, stagger:0.12, ease:'power3.out' });

  // Stats
  gsap.from('.scell', { scrollTrigger:{ trigger:'.sband', start:'top 75%' }, y:40, opacity:0, duration:0.7, stagger:0.1, ease:'power2.out' });

  // Expertise cards
  gsap.from('.ecard', { scrollTrigger:{ trigger:'.egrid', start:'top 70%' }, y:50, opacity:0, duration:0.7, stagger:0.07, ease:'power2.out' });

  // Achievement cards
  gsap.from('.acard', { scrollTrigger:{ trigger:'.agrid', start:'top 70%' }, y:40, opacity:0, duration:0.7, stagger:0.08, ease:'power2.out' });

  // Journey marquee
  gsap.from('.tmq', { scrollTrigger:{ trigger:'#journey', start:'top 75%' }, opacity:0, y:30, duration:0.8, ease:'power2.out' });

  // Vertical timeline items
  gsap.from('.vti', { scrollTrigger:{ trigger:'.vtl', start:'top 75%' }, x:-40, opacity:0, duration:0.8, stagger:0.12, ease:'power3.out' });

  // Projects grid
  gsap.from('.pgrid', { scrollTrigger:{ trigger:'#projects', start:'top 70%' }, y:40, opacity:0, duration:0.8, ease:'power2.out' });

  // Contact
  gsap.from('.cleft > *',  { scrollTrigger:{ trigger:'#contact', start:'top 70%' }, x:-50, opacity:0, duration:0.9, stagger:0.1, ease:'power3.out' });
  gsap.from('.fbox',       { scrollTrigger:{ trigger:'#contact', start:'top 70%' }, x:50,  opacity:0, duration:0.9, ease:'power3.out' });

  // Section headings & tags
  document.querySelectorAll('.sh').forEach(el => {
    gsap.from(el, { scrollTrigger:{ trigger:el, start:'top 85%' }, y:36, opacity:0, duration:0.8, ease:'power3.out' });
  });
  document.querySelectorAll('.stag, .rule').forEach(el => {
    gsap.from(el, { scrollTrigger:{ trigger:el, start:'top 88%' }, x:-22, opacity:0, duration:0.6, ease:'power2.out' });
  });
}

/* ═══ COUNTERS ═══ */
function initCounters() {
  const cells = document.querySelectorAll('.snum[data-t]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = +el.dataset.t;
      const suf    = el.dataset.s || '';
      gsap.to({ n: 0 }, { n: target, duration: 2.2, ease: 'power2.out',
        onUpdate: function () { el.textContent = Math.round(this.targets()[0].n) + suf; }
      });
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  cells.forEach(el => obs.observe(el));
}

/* ═══ NAV ═══ */
function initNav() {
  const nav   = document.getElementById('nav');
  const links = document.querySelectorAll('.nlinks a');
  const secs  = ['hero','about','expertise','achievements','journey','projects','contact'];

  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', scrollY > 80);
    let cur = 'hero';
    secs.forEach(id => {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop - 150) cur = id;
    });
    links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + cur));
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

/* ═══ CURSOR ═══ */
function initCursor() {
  const cur  = document.getElementById('cur');
  const cur2 = document.getElementById('cur2');
  let mx=0, my=0, tx=0, ty=0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function animTrail() {
    tx += (mx - tx) * 0.1;
    ty += (my - ty) * 0.1;
    cur2.style.left = tx + 'px';
    cur2.style.top  = ty + 'px';
    requestAnimationFrame(animTrail);
  })();

  document.querySelectorAll('a, button, .ecard, .acard, .tcard, .ptile, .scell').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
  });
}

/* ═══ MAGNETIC BUTTONS ═══ */
function initMagnetic() {
  document.querySelectorAll('.btn, .ncta, .sbtn').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.3;
      const y = (e.clientY - r.top  - r.height / 2) * 0.3;
      el.style.transform = `translate(${x}px,${y}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}
