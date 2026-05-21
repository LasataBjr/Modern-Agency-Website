/* ── NAV ── */
const navEl=document.getElementById('nav');
window.addEventListener('scroll',()=>
    navEl.classList.toggle('scrolled',scrollY>40)
);

/* ── scrollspy navigation/ NAV ACTIVE HIGHLIGHT ── */
document.addEventListener('DOMContentLoaded', () => {
  const sections = ['hero', 'services', 'about', 'process', 'projects', 'testimonials', 'contact'];
  const navLinks = document.querySelectorAll('.nav-pill a');
  
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {        
        navLinks.forEach(a => 
            a.classList.remove('active') // Clear old highlights safely    
       
        );    
        const activeLink = document.querySelector(
            `.nav-pill a[href="#${entry.target.id}"]` // Find and highlight the matching navbar item
        );  
        if (activeLink)
            activeLink.classList.add('active');
      }
    });
  }, { 
    threshold: 0.4, //trigger the change when 40% of a section enters the viewport avoiding flickering
    rootMargin: "-10% 0px -40% 0px" // Tip: If sections are massive, add a rootMargin to catch long pages earlier!
  });

   sections.forEach(id => {   // Start watching every valid HTML section on layout
    const el = document.getElementById(id);
    if (el) secObs.observe(el);
  });
});

/* ── PARTICLE BG CANVAS ── */
(()=>{
  const c = document.getElementById('bgc'),ctx=c.getContext('2d');
  let W,H,pts=[];

  const rsz=()=>{
    W = c.width=window.innerWidth;
    H = c.height=window.innerHeight
  };
  rsz();
  window.addEventListener('resize',rsz);
  class P{

    constructor(){
      this.reset();
    }

    reset(){
      this.x = Math.random()*W;
      this.y = Math.random()*H;
      this.vx = (Math.random()-.5)*.35;
      this.vy=(Math.random()-.5)*.35;
      this.r=Math.random()*1.5+.3;
      this.a=Math.random()*.5+.15;
      this.col=Math.random()>.5?'0,240,255':'168,85,247';
    }

    tick(){
      this.x+=this.vx;
      this.y+=this.vy;
      if(this.x<0||this.x>W||this.y<0||this.y>H)
        this.reset();
    }

    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${this.col},${this.a})`;
      ctx.fill();
    }
  }
  for(let i=0;i<140;i++)pts.push(new P());
  const D=110;
  (function fr(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{p.tick();p.draw()});
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.hypot(dx,dy);
      if(d<D){
        ctx.beginPath();
        ctx.moveTo(pts[i].x,pts[i].y);
        ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle=`rgba(0,240,255,${(1-d/D)*.12})`;
        ctx.lineWidth=.5;ctx.stroke();
      }
    }
    requestAnimationFrame(fr);
  })();
})();

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t = document.querySelector(a.getAttribute('href'));
    if(t){
      e.preventDefault();
      t.scrollIntoView({behavior:'smooth'})
    }
  })
});

/* ── CURSOR TRAIL ── */
let mouseX=0,
    mouseY=0,
    trail=[];

    document.addEventListener('mousemove',e=>{
      mouseX=e.clientX;
      mouseY=e.clientY
    });

  // Immediately Invoked Function Expression (IIFE)  define function + run immediately
  (function trailFr()
  {
    // Adds latest mouse coordinates into array.
    trail.push({
      x:mouseX,
      y:mouseY,
      a:1
    });
    if(trail.length>12)
      trail.shift();

    trail.forEach((p,i)=>{
        const dot=document.createElement('div');
        dot.style.cssText=`position:fixed;
        left:${p.x}px;
        top:${p.y}px;
        width:${3-(i*.2)}px;
        height:${3-(i*.2)}px;
        border-radius:50%;
        background:rgba(0,240,255,${i/trail.length*.4});
        pointer-events:none;
        z-index:9997;
        transform:translate(-50%,-50%)`;
        document.body.appendChild(dot);
          setTimeout(()=>
            dot.remove(),50
        );
    });
    requestAnimationFrame(trailFr);
  })();

/* ── SCROLL REVEAL ── */
const ro = new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      ro.unobserve(e.target)
    }
  })
},{threshold:.08});

document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>
  ro.observe(el)
);


/* ──  Typewriter Animation Effect for Hero section ── */
const words = [
  'DIGITAL FUTURE',
  'AI ECOSYSTEM',
  'INTELLIGENT WEB',
  'NEURAL FRONTIER'
];

let wi = 0, // word index
    ci = 0, // character index
    del = false;   // deleting flag false = typing, true = deleting

const tyEl = document.getElementById('htyped');

function type() {
  const w = words[wi];

  if (!del) {
    tyEl.textContent = w.slice(0, ci + 1) +'|';
    ci++;

    if (ci === w.length) {
      del = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    tyEl.textContent = w.slice(0, ci - 1) +'|';
    ci--;

    if (ci === 0) {
      del = false;
      wi = (wi + 1) % words.length;
    }
  }

  setTimeout(type, del ? 45 : 85);
}

setTimeout(type, 1800);

/* ── SCAN TEXT LOOP ── */
const msgs=[
        'SYSTEM ONLINE // NEXUS v4.0.1 // ALL NODES ACTIVE',
        'NEURAL NETWORKS INITIALIZED // PROCESSING CAPACITY: 98.7%',
        'SECURE CONNECTION ESTABLISHED // ENCRYPTION: AES-256',
        'AWAITING INPUT // READY TO BUILD THE FUTURE'
    ];
let si=0; // scan index
const se=document.getElementById('scan-text');
setInterval(()=>{
    si=(si+1)%msgs.length;
    se.textContent=msgs[si]
},3500);

/* ── COUNTERS (event-driven programming)── */
function animC(el, t, d = 1800) {
  let start = null;

  function step(ts) {
    if (!start) start = ts;

    const progress = Math.min((ts - start) / d, 1);

    el.textContent = Math.floor(progress * t);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = t;
    }
  }

  requestAnimationFrame(step);
}
const cobs = new IntersectionObserver(es=>{
    es.forEach(e=>{
        if(e.isIntersecting){
            animC(e.target,+e.target.dataset.t);
            cobs.unobserve(e.target)
        }})},{threshold:.5});

document.querySelectorAll('.ctr').forEach(c=>cobs.observe(c));

/* ── TESTIMONIAL SLIDER ── */
document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.tslider'); // The window wrapper
  const track = document.getElementById('ttrack');
  const btnNext = document.getElementById('snext');
  const btnPrev = document.getElementById('sprev');
  
  let currentIndex = 0;
  let autoScrollTimer = null;

  // 1. Dynamic Width Calculator Matrix
  function getSlideShift() {
    if (!track || track.children.length === 0) return 0;
    const cardWidth = track.children[0].getBoundingClientRect().width;
    const gapWidth = 24; // 1.5rem gap match
    return cardWidth + gapWidth;
  }

  function updateSliderPosition() {
    const shiftAmount = getSlideShift();
    track.style.transform = `translateX(-${currentIndex * shiftAmount}px)`;
  }

  function getMaxIndex() {
    const totalCards = track.children.length;
    if (totalCards === 0) return 0;
    const visibleCards = Math.round(track.parentElement.getBoundingClientRect().width / getSlideShift());
    const maxIdx = totalCards - visibleCards;
    return maxIdx > 0 ? maxIdx : 0;
  }

  function slideNext() {
    const maxIndex = getMaxIndex();
    if (currentIndex >= maxIndex) {
      currentIndex = 0; // Cycles loop straight back to the start index
    } else {
      currentIndex++;
    }
    updateSliderPosition();
  }

  function slidePrev() {
    if (currentIndex <= 0) {
      currentIndex = getMaxIndex();
    } else {
      currentIndex--;
    }
    updateSliderPosition();
  }

  // 2. High-Performance Timer System
  function startAutoScroll() {
    stopAutoScroll(); 
    autoScrollTimer = setInterval(slideNext, 4000); // 4-second intervals
  }

  function stopAutoScroll() {
    if (autoScrollTimer) clearInterval(autoScrollTimer);
  }

  // 3. Arrow Interaction Controls
  btnNext.addEventListener('click', () => {
    stopAutoScroll();
    slideNext();
    startAutoScroll();
  });

  btnPrev.addEventListener('click', () => {
    stopAutoScroll();
    slidePrev();
    startAutoScroll();
  });

  // 4. THE INTERACTIVE HOVER TRACKING PAUSE ENGINE
  if (sliderContainer) {
    // Halts the scroll logic instantly when mouse cursor enters the tracking space
    sliderContainer.addEventListener('mouseenter', () => {
      stopAutoScroll();
    });

    // Re-initializes clean automated countdown ticker loops when mouse moves out
    sliderContainer.addEventListener('mouseleave', () => {
      startAutoScroll();
    });
  }

  window.addEventListener('resize', () => {
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    updateSliderPosition();
  });

  // Initialize System loops on page completion
  startAutoScroll();
});



/* ── FAQ ── */
document.querySelectorAll('.faq-q').forEach(b=>{

  b.addEventListener('click',()=>{

    const it=b.parentElement, //.faq-item
    op=it.classList.contains('open'); //return true =open, false = closed
    
    // only one question can be expanded at a time
    document.querySelectorAll('.faq-item').forEach(i=>
      i.classList.remove('open'));

      // Open clicked one if previously closed
      if(!op)
        it.classList.add('open')
  })
});