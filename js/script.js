//  typewriter animation effect 
const words = [
  'DIGITAL FUTURE',
  'AI ECOSYSTEM',
  'INTELLIGENT WEB',
  'NEURAL FRONTIER'
];

let wi = 0,
    ci = 0,
    del = false;

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