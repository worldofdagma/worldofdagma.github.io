// Trailer: YouTube embeds require an HTTP referrer and fail on file:// URLs.
const heroVideo = document.querySelector('.hero-video');
const trailerFrame = heroVideo?.querySelector('iframe');
if (heroVideo && trailerFrame) {
  if (window.location.protocol === 'file:' || new URLSearchParams(window.location.search).has('localVideo')) {
    heroVideo.classList.add('is-local-preview');
  } else {
    trailerFrame.src = trailerFrame.dataset.src;
  }
}
// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

// In-game showcase
const showcaseSlides = [
  {
    src: './assets/InGameView/1%20(1).webp',
    alt: 'Character creation in World of Dagma',
    title: 'Create Your Hero',
    label: 'Character Customization',
    text: 'Choose your hair, outfit and style before stepping into the world of Dagma.'
  },
  {
    src: './assets/InGameView/1%20(2).webp',
    alt: 'Frost Fang combat in World of Dagma',
    title: 'Master Your Skills',
    label: 'Fast-Paced Combat',
    text: 'Combine weapons and abilities, read the battlefield and defeat dangerous enemies.'
  },
  {
    src: './assets/InGameView/1%20(3).webp',
    alt: 'Quest and combat interface',
    title: 'Answer the Call',
    label: 'Quests & Rewards',
    text: 'Meet new characters, accept missions and earn rewards across your adventure.'
  },
  {
    src: './assets/InGameView/1%20(4).webp',
    alt: 'Exploring the world of Dagma',
    title: 'Discover New Lands',
    label: 'Open-World Exploration',
    text: 'Leave the familiar paths behind and uncover new places throughout Dagma.'
  },
  {
    src: './assets/InGameView/1%20(5).webp',
    alt: 'Gathering resources in Dagma',
    title: 'Gather & Create',
    label: 'Crafting',
    text: 'Collect useful resources and turn your discoveries into powerful equipment.'
  },
  {
    src: './assets/InGameView/1%20(6).webp',
    alt: 'An adventure scene in Dagma',
    title: 'Build Your Story',
    label: 'A World of Adventure',
    text: 'Every road leads to a new encounter, challenge or story waiting to be told.'
  },
  {
    src: './assets/InGameView/1%20(7).webp',
    alt: 'World view from the Dagma beta',
    title: 'The Journey Continues',
    label: 'Beta World',
    text: 'Explore the latest beta world while new regions, quests and systems take shape.'
  }
];

const showcaseImage = document.getElementById('showcaseImage');
const showcaseTitle = document.getElementById('showcaseTitle');
const showcaseLabel = document.getElementById('showcaseLabel');
const showcaseText = document.getElementById('showcaseText');
const showcaseNumber = document.getElementById('showcaseNumber');
const showcaseDots = document.getElementById('showcaseDots');
let showcaseIndex = 0;

function renderShowcase(index) {
  if (!showcaseImage || !showcaseDots) return;
  showcaseIndex = (index + showcaseSlides.length) % showcaseSlides.length;
  const slide = showcaseSlides[showcaseIndex];
  showcaseImage.classList.add('is-changing');
  window.setTimeout(() => {
    showcaseImage.src = slide.src;
    showcaseImage.alt = slide.alt;
    showcaseTitle.textContent = slide.title;
    showcaseLabel.textContent = slide.label;
    showcaseText.textContent = slide.text;
    showcaseNumber.textContent = String(showcaseIndex + 1).padStart(2, '0');
    showcaseDots.querySelectorAll('button').forEach((dot, i) =>
      dot.classList.toggle('active', i === showcaseIndex)
    );
    showcaseImage.classList.remove('is-changing');
  }, 120);
}

if (showcaseImage && showcaseDots) {
  showcaseSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Show screenshot ' + (i + 1));
    dot.addEventListener('click', () => renderShowcase(i));
    showcaseDots.appendChild(dot);
  });
  showcaseDots.firstElementChild?.classList.add('active');
  document.getElementById('showcasePrev')?.addEventListener('click', () => renderShowcase(showcaseIndex - 1));
  document.getElementById('showcaseNext')?.addEventListener('click', () => renderShowcase(showcaseIndex + 1));
  showcaseImage.addEventListener('click', () => openLB(showcaseImage.src));
}

document.querySelectorAll('.showcase-tile img').forEach(img =>
  img.addEventListener('click', () => openLB(img.src))
);
// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
function openLB(src) {
  if (!lb || !lbImg) return;
  lbImg.src = src;
  lb.classList.add('open');
}
document.getElementById('lbClose')?.addEventListener('click', () => lb.classList.remove('open'));
lb?.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb?.classList.remove('open'); });
