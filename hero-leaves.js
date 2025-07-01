document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.hero-floating-anim');
  if (!container) return;

  // Three SVG leaf icons (all green)
  const leafSVGs = [
    // SVG 1: new provided
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64" xml:space="preserve"><path style="fill:#aad15d" d="M24.07 57.7s7.798 13.234 24.172 1.342c-8.19.519-11.708-2.664-10.758-3.936.95-1.272 15.624-.991 16.392-2.471.768-1.48 8.617-10.695 3.751-10.198s-22.418 7.369-22.601.757 21.731-.658 24.51-8.682c2.78-8.024-.287-7.994-3.228-7.485s-9.064 1.59-5.735-2.35c3.33-3.94 6.705-6.227 5.659-8.773s-3.672-6.73-3.672-6.73-7.402 11.916-9.361 8.327S49.891 6.794 48.943 5.12C47.995 3.445 43.512 0 43.512 0L24.07 57.7z"/><path style="fill:#90b74b" d="M24.073 57.865S9.865 63.702 3.998 44.334c6.213 5.361 10.94 4.949 10.951 3.362.011-1.588-11.853-10.227-11.571-11.871.283-1.644-.407-13.728 3.17-10.393s13.415 19.414 17.555 14.255-16.92-13.65-14.288-21.724 5.057-6.198 7.094-4.016 6.264 6.742 5.99 1.591-1.582-9.013.789-10.41 6.991-3.145 6.991-3.145-1.298 13.968 2.43 12.291S34.243 1.699 36.01.937c1.767-.762 7.42-.8 7.42-.8L24.073 57.865z"/></svg>`,
    // SVG 2: previous
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64" xml:space="preserve"><path style="fill:#aad15d" d="M28.851 47.462s8.957 9.769 26.969 8.529c-6.582-10.147-26.707-10.234-26.707-10.234s10.115-.992 15.024-2.85c4.908-1.859 14.992-11.954 19.035-13.288 4.044-1.333-7.607-2.776-15.949.933S29.783 43.64 29.783 43.64s11.511-15.344 12.05-25.558 3.873-16.157 3.873-16.157-14.994 8.769-17.049 20.97-.52 22.515-.52 22.515"/><path style="fill:#90b74b" d="M27.752 46.952S15.205 51.221 0 41.486c10.646-5.741 28.341 3.844 28.341 3.844s-8.397-5.726-11.811-9.713S9.119 17.933 6.211 14.822s8.006 1.217 13.542 8.476 9.016 19.854 9.016 19.854"/><path style="fill:#90b74b" d="m29.391 47.133-3.644 14.943-1.724-1.083 3.549-15.003z"/></svg>`,
    // SVG 3: new provided (replace previous realistic filled leaf)
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64" xml:space="preserve"><path style="fill:none;stroke:#aad15d;stroke-width:3;stroke-miterlimit:10" d="M36.73 17.54 12.924 64M13.378 37.57l5.252 15.295 16.058-4.376M23.875 19.922l4.395 14.129 15.763-3.801"/><path style="fill:#90b74b" d="M24.51 51.262s1.237-10.869 12.883-8.053c11.646 2.816 10.133 2.93 10.133 2.93s-5.777 4.083-8.252 6.783c-2.632 2.87-11.156 7.087-14.764-1.66zm24.207-16.77c2.476-2.7 8.252-6.783 8.252-6.783s1.513-.114-10.133-2.93-12.883 8.053-12.883 8.053c3.609 8.746 12.132 4.53 14.764 1.66z"/><path style="fill:#aad15d" d="M7.146 36.46c.745-3.586.685-10.66.685-10.66s-.791-1.294 8.297 6.514.989 15.161.989 15.161C7.91 49.655 6.354 40.273 7.146 36.46zm19.414-7.416s8.1-7.353-.989-15.161-8.296-6.513-8.296-6.513.06 7.074-.685 10.66c-.793 3.813.764 13.194 9.97 11.014z"/><path style="fill:#90b74b" d="M35.598 19.748S29.584 5.704 45.716 0c4.761 12.707-4.63 20.863-10.118 19.748z"/></svg>`,
    // SVG 4: green outline
    // `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#43A047" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M44.08 4.07S6.27.48 8.07 40L8 39.93C47.61 41.72 44 4 44 4M39 9 5 43M38 16h-5M34 23h-9M30 29H19M21 35h-8M36 9v3M29 11v7M23 14v11M17 20v11"/></svg>`
  ];

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createLeaf(i) {
    const el = document.createElement('div');
    el.className = 'floating-leaf';
    el.innerHTML = leafSVGs[Math.floor(Math.random() * leafSVGs.length)];
    const left = randomBetween(5, 90); // vw
    const duration = randomBetween(8, 16); // seconds
    const delay = randomBetween(0, 8); // seconds
    el.style.left = left + 'vw';
    el.style.top = '-10vh';
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = delay + 's';
    el.style.opacity = randomBetween(0.5, 0.85);
    el.style.transform = `rotate(${randomBetween(-20, 20)}deg)`;
    container.appendChild(el);
    el.addEventListener('animationend', () => {
      el.remove();
      setTimeout(() => container.appendChild(createLeaf(i)), 1000);
    });
    return el;
  }

  function createParticle() {
    const el = document.createElement('div');
    el.className = 'floating-particle';
    const left = randomBetween(10, 95); // vw
    const duration = randomBetween(7, 14); // seconds
    const delay = randomBetween(0, 7); // seconds
    el.style.left = left + 'vw';
    el.style.top = '-10vh';
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = delay + 's';
    el.style.opacity = randomBetween(0.3, 0.7);
    container.appendChild(el);
    el.addEventListener('animationend', () => {
      el.remove();
      setTimeout(() => container.appendChild(createParticle()), 1000);
    });
    return el;
  }

  // Initial population
  const numLeaves = 8;
  const numParticles = Math.floor(numLeaves * 0.5); // 50% of leaves
  for (let i = 0; i < numLeaves; ++i) createLeaf(i);
  for (let i = 0; i < numParticles; ++i) createParticle();
}); 