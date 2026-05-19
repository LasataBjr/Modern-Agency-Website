/* ── NAV ── */
const navEl=document.getElementById('nav');
window.addEventListener('scroll',()=>
    navEl.classList.toggle('scrolled',scrollY>40)
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
    tyEl.textContent = w.slice(0, ci + 1);
    ci++;

    if (ci === w.length) {
      del = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    tyEl.textContent = w.slice(0, ci - 1);
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