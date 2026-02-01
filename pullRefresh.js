let startY = 0;
let pullDistance = 0;
const refreshThreshold = 200; // مسافة السحب مثل Safari
const maxBarWidth = 120;
const showAfter = 40; // مسافة أمان قبل الظهور

// ===== BAR =====
const bar = document.createElement('div');
bar.id = 'pull-refresh-bar';
bar.style.position = 'fixed';
bar.style.top = '0';
bar.style.left = '50%';
bar.style.transform = 'translateX(-50%)';
bar.style.width = '60px';
bar.style.height = '5px';
bar.style.background = 'gold';
bar.style.borderRadius = '3px';
bar.style.opacity = '0';
bar.style.transition = 'opacity 0.2s linear, width 0.15s linear';
bar.style.zIndex = '9999';
document.body.prepend(bar);

// ===== TEXT =====
const text = document.createElement('div');
text.id = 'pull-refresh-text';
text.innerText = 'اسحب للتحديث';
text.style.position = 'fixed';
text.style.top = '10px';
text.style.left = '50%';
text.style.transform = 'translateX(-50%)';
text.style.color = 'gold';
text.style.fontFamily = 'Amiri, serif';
text.style.fontSize = '14px';
text.style.opacity = '0';
text.style.transition = 'opacity 0.2s linear';
text.style.zIndex = '9999';
document.body.prepend(text);

// ===== TOUCH START =====
document.addEventListener('touchstart', e => {
  if (window.scrollY <= 0) {
    startY = e.touches[0].clientY;
    pullDistance = 0;
    bar.style.width = '60px';
  }
}, { passive: true });

// ===== TOUCH MOVE =====
document.addEventListener('touchmove', e => {
  if (window.scrollY <= 0 && startY > 0) {
    pullDistance = e.touches[0].clientY - startY;

    if (pullDistance > showAfter) {
      const effectivePull = pullDistance - showAfter;

      const newWidth = 60 + Math.min(effectivePull / 2, maxBarWidth);
      bar.style.width = `${newWidth}px`;

      const opacity = Math.min(1, effectivePull / 150);
      bar.style.opacity = opacity;
      text.style.opacity = opacity;
    }
  }
}, { passive: true });

// ===== TOUCH END =====
document.addEventListener('touchend', () => {
  if (pullDistance > refreshThreshold) {
    text.innerText = 'Refreshing...';
    bar.style.opacity = '1';
    text.style.opacity = '1';

    setTimeout(() => {
      location.reload();
    }, 200);
  } else {
    bar.style.opacity = '0';
    text.style.opacity = '0';
  }

  startY = 0;
  pullDistance = 0;
});
