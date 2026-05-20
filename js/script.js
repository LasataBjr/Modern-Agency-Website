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

/* ── FAQ ── */
document.querySelectorAll('.faq-q').forEach(b=>{
  b.addEventListener('click',()=>{
    const it=b.parentElement, //.faq-item
    op=it.classList.contains('open'); //return true =open, false = closed
    // only one question can be expanded at a time
    document.querySelectorAll('.faq-item').forEach(i=>
      i.classList.remove('open'));
      if(!op)
        it.classList.add('open')
  })
});