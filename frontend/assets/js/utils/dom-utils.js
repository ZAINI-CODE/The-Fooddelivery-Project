// Utility to load HTML partials into elements with data-include="path"

async function loadPartials() {
  const includeEls = document.querySelectorAll('[data-include]');
  for (const el of includeEls) {
    const path = el.getAttribute('data-include');
    try {
      const res = await fetch(path);
      if (!res.ok) continue;
      const html = await res.text();
      el.innerHTML = html;
    } catch (err) {
      console.error('Error loading partial', path, err);
    }
  }
}

// After partials loaded, allow pages to set active nav tab
function activateNavTab() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  const activePage = document.body.getAttribute('data-page');
  if (!activePage) return;

  const tabs = header.querySelectorAll('.nav-tab[data-page]');
  tabs.forEach((tab) => {
    if (tab.getAttribute('data-page') === activePage) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadPartials();
  activateNavTab();
});