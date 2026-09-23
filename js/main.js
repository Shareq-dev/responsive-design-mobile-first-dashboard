document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('atlas-theme');
  if (savedTheme === 'dark') root.dataset.theme = 'dark';

  document.querySelectorAll('[data-notifications]').forEach((button) => {
    button.querySelector('.notification-count')?.remove();
    button.setAttribute('aria-label', 'View notifications');
    button.addEventListener('click', () => {
      button.classList.toggle('is-read');
      button.setAttribute('aria-label', button.classList.contains('is-read')
        ? 'View notifications, recently updated'
        : 'View notifications');
    });
  });

  const headerActions = document.querySelector('.header-actions');
  if (headerActions) {
    const themeButton = document.createElement('button');
    themeButton.type = 'button';
    themeButton.className = 'theme-button';
    themeButton.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
    headerActions.insertBefore(themeButton, headerActions.querySelector('.menu-button'));

    const updateThemeButton = () => {
      const dark = root.dataset.theme === 'dark';
      themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.innerHTML = dark
        ? '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"></path></svg>';
    };

    themeButton.addEventListener('click', () => {
      const dark = root.dataset.theme !== 'dark';
      root.dataset.theme = dark ? 'dark' : 'light';
      localStorage.setItem('atlas-theme', dark ? 'dark' : 'light');
      updateThemeButton();
    });
    updateThemeButton();
  }

  document.querySelectorAll('[data-report-download]').forEach((button) => {
    button.addEventListener('click', () => {
      button.textContent = 'Report queued';
      button.disabled = true;
    });
  });
  document.querySelectorAll('[data-profile-edit]').forEach((button) => {
    button.addEventListener('click', () => { window.location.href = 'settings.html#workspace-profile'; });
  });
  const progress = document.querySelector('.progress-track');
  if (progress) {
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');
    progress.setAttribute('aria-valuenow', '78');
    progress.setAttribute('aria-label', 'Team capacity');
  }
});
