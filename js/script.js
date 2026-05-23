gsap.registerPlugin(ScrollTrigger, TextPlugin);
 
/* ═══════════════════════════════════════════
   LOADER
═══════════════════════════════════════════ */
let pct=0;
const lbar=document.getElementById('lbar');
const lpct=document.getElementById('lpct');
const ldrInterval=setInterval(()=>{
  pct+=Math.random()*14+4;
  if(pct>=100){pct=100;clearInterval(ldrInterval);finishLoader();}
  lbar.style.width=pct+'%';
  lpct.textContent=Math.floor(pct)+'%';
},80);
function finishLoader(){
  gsap.to('#loader',{opacity:0,duration:.8,delay:.3,onComplete:()=>{
    document.getElementById('loader').style.display='none';
    initHero();
  }});
}
 
/* ═══════════════════════════════════════════
   THREE.JS HERO — Wireframe Torus Knot + Particles
═══════════════════════════════════════════ */
function initHero(){
  const canvas=document.getElementById('hero-canvas');
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,1000);
  camera.position.set(0,0,6);
 
  function resize(){
    const W=canvas.parentElement.clientWidth, H=canvas.parentElement.clientHeight;
    renderer.setSize(W,H); camera.aspect=W/H; camera.updateProjectionMatrix();
  }
  resize(); window.addEventListener('resize',resize);
 
  // Primary torus knot — wireframe
  const tkG=new THREE.TorusKnotGeometry(1.9,.52,200,28,2,3);
  const tkM=new THREE.MeshBasicMaterial({color:0xE8A400,wireframe:true,transparent:true,opacity:.16});
  const tk=new THREE.Mesh(tkG,tkM);
  tk.position.set(3.8,-.2,0);
  scene.add(tk);
 
  // Secondary torus — thinner orbit ring
  const t2G=new THREE.TorusGeometry(3.1,.018,16,140);
  const t2M=new THREE.MeshBasicMaterial({color:0xFFD166,transparent:true,opacity:.12});
  const t2=new THREE.Mesh(t2G,t2M);
  t2.position.set(3.8,-.2,0);
  t2.rotation.x=Math.PI/3.2;
  scene.add(t2);
 
  // Third ring — teal
  const t3G=new THREE.TorusGeometry(2.4,.012,16,120);
  const t3M=new THREE.MeshBasicMaterial({color:0x00D4AA,transparent:true,opacity:.1});
  const t3=new THREE.Mesh(t3G,t3M);
  t3.position.set(3.8,-.2,0);
  t3.rotation.y=Math.PI/4;
  scene.add(t3);
 
  // Icosahedron floating nodes
  const nodes=[];
  for(let i=0;i<12;i++){
    const g=new THREE.IcosahedronGeometry(.06+Math.random()*.09,0);
    const m=new THREE.MeshBasicMaterial({color:i%3===0?0x00D4AA:0xFFD166,wireframe:true,transparent:true,opacity:.55});
    const mesh=new THREE.Mesh(g,m);
    mesh.position.set((Math.random()-.5)*14,(Math.random()-.5)*8,(Math.random()-.5)*5);
    mesh.userData={spd:.4+Math.random()*.8,ph:Math.random()*Math.PI*2};
    scene.add(mesh); nodes.push(mesh);
  }
 
  // Line network connecting nodes
  const lineGeo=new THREE.BufferGeometry();
  const linePositions=[];
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      const d=nodes[i].position.distanceTo(nodes[j].position);
      if(d<7){
        linePositions.push(nodes[i].position.x,nodes[i].position.y,nodes[i].position.z);
        linePositions.push(nodes[j].position.x,nodes[j].position.y,nodes[j].position.z);
      }
    }
  }
  const lineBuf=new Float32Array(linePositions);
  lineGeo.setAttribute('position',new THREE.BufferAttribute(lineBuf,3));
  scene.add(new THREE.LineSegments(lineGeo,new THREE.LineBasicMaterial({color:0xE8A400,transparent:true,opacity:.06})));
 
  // Star particles
  const pG=new THREE.BufferGeometry();
  const pPos=new Float32Array(400*3);
  for(let i=0;i<400*3;i++)pPos[i]=(Math.random()-.5)*22;
  pG.setAttribute('position',new THREE.BufferAttribute(pPos,3));
  scene.add(new THREE.Points(pG,new THREE.PointsMaterial({color:0xE8A400,size:.022,transparent:true,opacity:.5})));
 
  let mx=0,my=0;
  window.addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-.5)*2;my=-(e.clientY/innerHeight-.5)*2;});
 
  let time=0;
  (function tick(){
    requestAnimationFrame(tick);
    time+=.007;
    tk.rotation.x=time*.35;
    tk.rotation.y=time*.55;
    t2.rotation.z=time*.18;
    t3.rotation.x=time*.12;t3.rotation.z=-time*.22;
    nodes.forEach(n=>{
      n.rotation.x+=.01*n.userData.spd;
      n.rotation.y+=.008*n.userData.spd;
      n.position.y+=Math.sin(time*n.userData.spd+n.userData.ph)*.003;
    });
    camera.position.x+=(mx*1.2-camera.position.x)*.04;
    camera.position.y+=(my*.8-camera.position.y)*.04;
    camera.lookAt(0,0,0);
    renderer.render(scene,camera);
  })();
 
  // GSAP hero entrance
  const chars=document.querySelectorAll('.hero-title .char');
  gsap.to(chars,{y:'0%',duration:1,stagger:.04,ease:'expo.out',delay:.1});
  gsap.to('.hero-eyebrow',{opacity:1,y:0,duration:.8,ease:'power3.out',delay:.05});
  gsap.to('.hero-sub',{opacity:1,y:0,duration:.9,ease:'power3.out',delay:.55});
  gsap.to('.hero-btns',{opacity:1,y:0,duration:.9,ease:'power3.out',delay:.7});
  gsap.to('#hstats',{opacity:1,duration:1,delay:1,ease:'power2.out'});
}
 
/* ═══════════════════════════════════════════
   ABOUT — Morphing Canvas (2D)
═══════════════════════════════════════════ */
(function(){
  const canvas=document.getElementById('morph-canvas');
  const parent=document.getElementById('about-canvas');
  canvas.width=parent.offsetWidth||500;
  canvas.height=parent.offsetHeight||500;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const CX=W/2,CY=H/2;
  let t=0;
 
  // Nodes for web
  const count=16;
  const pts=Array.from({length:count},(_,i)=>{
    const angle=(i/count)*Math.PI*2;
    const r=Math.min(W,H)*.3;
    return{
      bx:CX+Math.cos(angle)*r,
      by:CY+Math.sin(angle)*r,
      x:CX+Math.cos(angle)*r,
      y:CY+Math.sin(angle)*r,
      vx:(Math.random()-.5)*.4,
      vy:(Math.random()-.5)*.4,
      r,angle,
      speed:.3+Math.random()*.5,phase:Math.random()*Math.PI*2,
    };
  });
 
  // Floating labels
  const labels=['AI','IoT','ML','CAD','3D','VR','AR','CNC','UAV','IPC','RPi'];
  const fLab=labels.map((l,i)=>({
    txt:l,
    x:Math.random()*W*.8+W*.1,
    y:Math.random()*H*.8+H*.1,
    vx:(Math.random()-.5)*.25,
    vy:(Math.random()-.5)*.25,
    a:0,ta:.55+Math.random()*.3,
    size:10+Math.random()*8,
  }));
 
  function drawFrame(){
    ctx.clearRect(0,0,W,H);
    t+=.008;
 
    // Background subtle grid
    ctx.strokeStyle='rgba(232,164,0,.04)';
    ctx.lineWidth=.5;
    for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
 
    // Update pts — organic morphing
    pts.forEach((p,i)=>{
      const newAngle=p.angle+t*p.speed*.3;
      const wave=Math.sin(t*1.5+p.phase)*.12;
      const r=p.r*(1+wave);
      p.x=CX+Math.cos(newAngle)*r;
      p.y=CY+Math.sin(newAngle)*r;
    });
 
    // Draw connections between close pts
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<180){
          const alpha=1-d/180;
          ctx.strokeStyle=`rgba(232,164,0,${alpha*.3})`;
          ctx.lineWidth=alpha*.8;
          ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();
        }
      }
    }
 
    // Central morphing polygon
    ctx.beginPath();
    pts.forEach((p,i)=>{
      if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);
    });
    ctx.closePath();
    ctx.strokeStyle='rgba(232,164,0,.18)';ctx.lineWidth=1;ctx.stroke();
    ctx.fillStyle='rgba(232,164,0,.03)';ctx.fill();
 
    // Draw nodes
    pts.forEach(p=>{
      ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);
      ctx.fillStyle='rgba(232,164,0,.8)';ctx.fill();
    });
 
    // Center orb
    const pulse=1+Math.sin(t*2)*.08;
    const grad=ctx.createRadialGradient(CX,CY,0,CX,CY,60*pulse);
    grad.addColorStop(0,'rgba(232,164,0,.35)');
    grad.addColorStop(.5,'rgba(232,164,0,.08)');
    grad.addColorStop(1,'transparent');
    ctx.beginPath();ctx.arc(CX,CY,60*pulse,0,Math.PI*2);
    ctx.fillStyle=grad;ctx.fill();
    ctx.beginPath();ctx.arc(CX,CY,6,0,Math.PI*2);
    ctx.fillStyle='rgba(232,164,0,.9)';ctx.fill();
 
    // Teal ping rings
    [1.5,3].forEach(phase=>{
      const rr=((t*60+phase*60)%120);
      const a=1-rr/120;
      ctx.beginPath();ctx.arc(CX,CY,rr,0,Math.PI*2);
      ctx.strokeStyle=`rgba(0,212,170,${a*.4})`;ctx.lineWidth=1;ctx.stroke();
    });
 
    // Floating labels
    fLab.forEach(fl=>{
      fl.x+=fl.vx;fl.y+=fl.vy;
      if(fl.x<20||fl.x>W-20)fl.vx*=-1;
      if(fl.y<20||fl.y>H-20)fl.vy*=-1;
      fl.a+=(fl.ta-fl.a)*.02;
      ctx.font=`500 ${fl.size}px 'JetBrains Mono',monospace`;
      ctx.fillStyle=`rgba(232,164,0,${fl.a*.6})`;
      ctx.fillText(fl.txt,fl.x,fl.y);
    });
 
    requestAnimationFrame(drawFrame);
  }
  drawFrame();
})();
 
/* ═══════════════════════════════════════════
   SERVICES BG — Flowing lines canvas
═══════════════════════════════════════════ */
(function(){
  const canvas=document.getElementById('svc-canvas');
  const sec=document.getElementById('services');
  canvas.width=sec.offsetWidth||1400;
  canvas.height=sec.offsetHeight||800;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const lines=Array.from({length:8},(_,i)=>({
    y:H*(i+.5)/8, amp:20+Math.random()*40,
    freq:.002+Math.random()*.003, phase:Math.random()*Math.PI*2, spd:.003+Math.random()*.003
  }));
  let t=0;
  (function draw(){
    requestAnimationFrame(draw); t+=.5;
    ctx.clearRect(0,0,W,H);
    lines.forEach((l,i)=>{
      ctx.beginPath();
      for(let x=0;x<=W;x+=3){
        const y=l.y+Math.sin(x*l.freq+t*l.spd+l.phase)*l.amp;
        i===0&&x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        if(i!==0&&x===0)ctx.moveTo(x,y);
      }
      const alpha=.04+.03*Math.sin(t*.02+i);
      ctx.strokeStyle=`rgba(232,164,0,${alpha})`;
      ctx.lineWidth=1;ctx.stroke();
    });
  })();
})();
 
/* ═══════════════════════════════════════════
   TICKER
═══════════════════════════════════════════ */
const TICKER_ITEMS=['ROBOTICS','AUTOMATION','ARTIFICIAL INTELLIGENCE','IoT SYSTEMS','DRONE TECH','AR & VR','EMBEDDED SYSTEMS','IPR PATENTS','SMART INDIA HACKATHON','RESEARCH & MENTORSHIP','3D PRINTING','RASPBERRY PI'];
const tk=document.getElementById('ticker');
const full=[...TICKER_ITEMS,...TICKER_ITEMS,...TICKER_ITEMS,...TICKER_ITEMS];
tk.innerHTML=full.map(i=>`<span class="ticker-item"><span class="ticker-sep"></span>${i}</span>`).join('');
 
/* ═══════════════════════════════════════════
   NAV SCROLL
═══════════════════════════════════════════ */
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('stuck',scrollY>80);
});
 
/* ═══════════════════════════════════════════
   GSAP SCROLL ANIMATIONS
═══════════════════════════════════════════ */
// About pillars
gsap.from('.pillar',{
  scrollTrigger:{trigger:'#about',start:'top 60%'},
  y:50,opacity:0,duration:.8,stagger:.12,ease:'power3.out'
});
gsap.from('.about-right p',{
  scrollTrigger:{trigger:'#about',start:'top 55%'},
  y:30,opacity:0,duration:.8,stagger:.15,ease:'power2.out'
});
gsap.from('#about-canvas',{
  scrollTrigger:{trigger:'#about',start:'top 65%'},
  x:-60,opacity:0,duration:1,ease:'power3.out'
});
 
// Founder
gsap.from('#fcard',{
  scrollTrigger:{trigger:'#founder',start:'top 60%'},
  x:-60,opacity:0,duration:1,ease:'power3.out'
});
gsap.from('.founder-info',{
  scrollTrigger:{trigger:'#founder',start:'top 60%'},
  x:60,opacity:0,duration:1,ease:'power3.out'
});
// Founder info text
gsap.from('.founder-info p',{
  scrollTrigger:{trigger:'#founder',start:'top 60%'},
  y:30,opacity:0,duration:.8,stagger:.15,ease:'power2.out'
});
 
// VM cards
gsap.from('.vm-card',{
  scrollTrigger:{trigger:'.vm-grid',start:'top 65%'},
  y:60,opacity:0,duration:.9,stagger:.18,ease:'power3.out'
});
 
// Services
gsap.from('.svc-card',{
  scrollTrigger:{trigger:'.svc-grid',start:'top 65%'},
  y:50,opacity:0,duration:.7,stagger:.08,ease:'power2.out'
});
 
// Stats counter
const statCells=document.querySelectorAll('.stat-num[data-target]');
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target;
    const target=+el.dataset.target;
    const suffix=el.dataset.suffix||'';
    gsap.to({n:0},{n:target,duration:2.2,ease:'power2.out',
      onUpdate:function(){el.textContent=Math.round(this.targets()[0].n)+suffix;}
    });
    counterObserver.unobserve(el);
  });
},{threshold:.4});
statCells.forEach(el=>counterObserver.observe(el));
 
// Stat cells entrance
gsap.from('.stat-cell',{
  scrollTrigger:{trigger:'.stats-band',start:'top 70%'},
  y:40,opacity:0,duration:.7,stagger:.1,ease:'power2.out'
});
 
// Projects grid
gsap.from('.proj-grid',{
  scrollTrigger:{trigger:'#projects',start:'top 65%'},
  y:40,opacity:0,duration:.8,ease:'power2.out'
});
 
// Contact
gsap.from('.contact-left',{
  scrollTrigger:{trigger:'#contact',start:'top 65%'},
  x:-50,opacity:0,duration:1,ease:'power3.out'
});
gsap.from('.form-box',{
  scrollTrigger:{trigger:'#contact',start:'top 65%'},
  x:50,opacity:0,duration:1,ease:'power3.out'
});
 
// Generic headings
document.querySelectorAll('.sh').forEach(el=>{
  gsap.from(el,{
    scrollTrigger:{trigger:el,start:'top 82%'},
    y:40,opacity:0,duration:.8,ease:'power3.out'
  });
});
document.querySelectorAll('.tag,.rule').forEach(el=>{
  gsap.from(el,{
    scrollTrigger:{trigger:el,start:'top 85%'},
    x:-20,opacity:0,duration:.6,ease:'power2.out'
  });
});
 
/* ═══════════════════════════════════════════
   PROJECTS DATA
═══════════════════════════════════════════ */
const PROJS=[
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
  {n:'Automatic Sanitizing Mission',c:'auto'},
  {n:'3D Printer',c:'auto'},
  {n:'Plug-In-Kit For EV Ready Charging',c:'auto'},
  {n:'Automobile Prototyping',c:'auto'},
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
  {n:'Plastic Filament Extruder Machine',c:'auto'},
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
const dotCls={robotics:'',iot:'iot',ai:'ai',auto:'auto',drone:'drone'};
function fp(f,btn){
  document.querySelectorAll('.pf').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  const list=f==='all'?PROJS:PROJS.filter(p=>p.c===f);
  const g=document.getElementById('pgrid');
  g.innerHTML=list.map(p=>`<div class="ptile"><div class="ptile-dot ${dotCls[p.c]||''}"></div><h4>${p.n}</h4></div>`).join('');
  gsap.from('.ptile',{y:20,opacity:0,duration:.4,stagger:.03,ease:'power2.out'});
}
/* ═══════════════════════════════════════════
   EMAILJS INIT
═══════════════════════════════════════════ */
(function(){
  if(typeof emailjs !== 'undefined') emailjs.init('r5myOo9q7ksQUpunX');
  else window.addEventListener('load', () => emailjs.init('r5myOo9q7ksQUpunX'));
})();

/* ═══════════════════════════════════════════
   NOTIFICATION TOAST
═══════════════════════════════════════════ */
function showToast(message, type){
  const existing = document.getElementById('nakaza-toast');
  if(existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'nakaza-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position:'fixed', top:'24px', right:'24px', zIndex:'99999',
    padding:'16px 24px', borderRadius:'8px',
    fontFamily:"'JetBrains Mono',monospace", fontSize:'.75rem',
    letterSpacing:'.06em', fontWeight:'500',
    background: type==='ok' ? 'rgba(0,212,170,.12)' : 'rgba(232,164,0,.12)',
    border: type==='ok' ? '1px solid rgba(0,212,170,.35)' : '1px solid rgba(232,164,0,.35)',
    color: type==='ok' ? '#00D4AA' : '#E8A400',
    backdropFilter:'blur(20px)',
    boxShadow:'0 8px 32px rgba(0,0,0,.4)',
    opacity:'0', transform:'translateY(-12px)',
    transition:'opacity .4s ease, transform .4s ease',
    maxWidth:'320px'
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-12px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ═══════════════════════════════════════════
   CONTACT FORM — EmailJS
═══════════════════════════════════════════ */
function doSend(){
  const fn  = document.getElementById('fn').value.trim();
  const fe  = document.getElementById('fe').value.trim();
  const fp2 = document.getElementById('fp2').value.trim();
  const fs  = document.getElementById('fs').value;
  const fo  = document.getElementById('fo').value.trim();
  const fm  = document.getElementById('fm').value.trim();
  const msg = document.getElementById('fmsg');
  const btn = document.getElementById('sbtn');

  if(!fn||!fe||!fm){
    msg.className='f-msg er';
    msg.textContent='⚠  Please fill in your name, email and message.';
    return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fe)){
    msg.className='f-msg er';
    msg.textContent='⚠  Please enter a valid email address.';
    return;
  }

  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'SENDING…';
  btn.style.opacity = '.7';
  msg.className = 'f-msg';
  msg.textContent = '';

  emailjs.send('service_5xc8o5j', 'template_goqtxtp', {
    from_name:    fn,
    from_email:   fe,
    phone:        fp2,
    service:      fs,
    organization: fo,
    message:      fm
  })
  .then(() => {
    msg.className = 'f-msg ok';
    msg.textContent = '✓  Message sent! We respond within 24 hours.';
    showToast('✓ Message sent successfully!', 'ok');
    document.getElementById('fn').value='';
    document.getElementById('fe').value='';
    document.getElementById('fp2').value='';
    document.getElementById('fs').value='';
    document.getElementById('fo').value='';
    document.getElementById('fm').value='';
  })
  .catch(err => {
    console.error('EmailJS error:', err);
    msg.className = 'f-msg er';
    msg.textContent = '⚠  Failed to send. Please try again.';
    showToast('⚠ Failed to send message. Please try again.', 'err');
  })
  .finally(() => {
    btn.disabled = false;
    btn.textContent = originalText;
    btn.style.opacity = '1';
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  fp('all',document.querySelector('.pf.on'));
});