const { chromium } = require('playwright');

const baseUrl = 'http://127.0.0.1:8080';
const pages = [
  '/index.html',
  '/pages/users.html',
  '/pages/reports.html',
  '/pages/settings.html',
  '/pages/profile.html',
];
const viewports = [
  [320, 800], [360, 800], [375, 812], [390, 844], [414, 896], [480, 800], [600, 900],
  [768, 900], [820, 1180], [900, 900], [1024, 900], [1200, 900], [1280, 800], [1366, 900], [1440, 900],
];

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
  });
  const failures = [];

  for (const theme of ['light', 'dark']) {
    for (const [width, height] of viewports) {
      const context = await browser.newContext({ viewport: { width, height } });
      await context.addInitScript((value) => localStorage.setItem('atlas-theme', value), theme);
      const page = await context.newPage();

      for (const path of pages) {
        const errors = [];
        page.removeAllListeners('console');
        page.removeAllListeners('pageerror');
        page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
        await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });

        const result = await page.evaluate(() => {
          const visible = (element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
          };
          const describe = (element) => {
            const id = element.id ? `#${element.id}` : '';
            const classes = [...element.classList].slice(0, 3).map((name) => `.${name}`).join('');
            return `${element.tagName.toLowerCase()}${id}${classes}`;
          };
          const intentionallyOffCanvas = (element) => element.closest('.sidebar:not(.is-open)')
            && getComputedStyle(document.querySelector('.sidebar')).position === 'fixed';
          const overflowers = [...document.querySelectorAll('body *')]
            .filter(visible)
            .filter((element) => !intentionallyOffCanvas(element))
            .filter((element) => {
              if (element.closest('.table-wrap, .table-container')) return false;
              const rect = element.getBoundingClientRect();
              return rect.left < -0.5 || rect.right > innerWidth + 0.5;
            })
            .map(describe)
            .slice(0, 12);
          const clippedText = [...document.querySelectorAll('body *')]
            .filter(visible)
            .filter((element) => !element.classList.contains('sr-only') && element.tagName !== 'CAPTION')
            .filter((element) => !intentionallyOffCanvas(element))
            .filter((element) => element.childElementCount === 0 && element.textContent.trim())
            .filter((element) => {
              const style = getComputedStyle(element);
              const clipsX = ['hidden', 'clip'].includes(style.overflowX);
              const clipsY = ['hidden', 'clip'].includes(style.overflowY);
              return (clipsX && element.scrollWidth > element.clientWidth + 2)
                || (clipsY && element.scrollHeight > element.clientHeight + 2);
            })
            .map(describe)
            .slice(0, 12);
          const header = document.querySelector('.site-header');
          const brand = document.querySelector('.brand');
          const actions = document.querySelector('.header-actions');
          const headerOverlap = header && brand && actions
            ? brand.getBoundingClientRect().right > actions.getBoundingClientRect().left + 0.5
            : false;
          const assertions = [];
          const sidebar = document.querySelector('.sidebar');
          if (sidebar) {
            const position = getComputedStyle(sidebar).position;
            if (innerWidth >= 1024 && position !== 'static') assertions.push(`desktop sidebar position: ${position}`);
            if (innerWidth < 1024 && position !== 'fixed') assertions.push(`mobile sidebar position: ${position}`);
          }
          const settingsLayout = document.querySelector('.settings-layout');
          if (settingsLayout && innerWidth >= 1024) {
            const nav = document.querySelector('.settings-nav');
            const columns = getComputedStyle(settingsLayout).gridTemplateColumns.split(' ').length;
            if (columns < 2) assertions.push('settings layout is not two columns');
            if (getComputedStyle(nav).display !== 'grid') assertions.push('settings navigation is not vertical grid');
            if (nav.scrollWidth > nav.clientWidth + 1) assertions.push('settings navigation overflows');
          }
          const profileCard = document.querySelector('.profile-card');
          const largeAvatar = document.querySelector('.profile-card .large-avatar');
          if (profileCard && largeAvatar) {
            const cardRect = profileCard.getBoundingClientRect();
            const avatarRect = largeAvatar.getBoundingClientRect();
            const offset = Math.abs((cardRect.left + cardRect.width / 2) - (avatarRect.left + avatarRect.width / 2));
            if (offset > 2) assertions.push(`profile avatar off-center by ${offset.toFixed(1)}px`);
          }
          const tableWrap = document.querySelector('.table-wrap');
          if (tableWrap && tableWrap.getBoundingClientRect().right > innerWidth + 1) assertions.push('table wrapper exceeds viewport');
          for (const selector of ['.chart', '.report-grid', '.settings-form', '.profile-grid', '.quick-actions']) {
            for (const element of document.querySelectorAll(selector)) {
              if (element.scrollWidth > element.clientWidth + 1) assertions.push(`${selector} has internal overflow`);
            }
          }
          const reportGrid = document.querySelector('.report-grid');
          if (reportGrid) {
            const cards = [...reportGrid.children].filter((element) => !element.classList.contains('sr-only'));
            const rects = cards.map((element) => element.getBoundingClientRect());
            if (innerWidth < 768) {
              const fullWidth = rects.every((rect) => Math.abs(rect.width - reportGrid.clientWidth) <= 1);
              const stacked = rects.every((rect, index) => index === 0 || rect.top >= rects[index - 1].bottom - 1);
              if (!fullWidth) assertions.push('mobile report cards are not full width');
              if (!stacked) assertions.push('mobile report cards are not stacked');
            }
            if (innerWidth >= 768 && getComputedStyle(reportGrid).gridTemplateColumns.split(' ').length < 2) {
              assertions.push('tablet/desktop report grid is not two columns');
            }
          }
          const dialog = document.querySelector('dialog');
          if (dialog) {
            const dialogRect = dialog.getBoundingClientRect();
            if (dialogRect.left < -0.5 || dialogRect.right > innerWidth + 0.5 || dialogRect.top < -0.5 || dialogRect.bottom > innerHeight + 0.5) {
              assertions.push('dialog exceeds viewport');
            }
          }
          if (document.documentElement.dataset.theme === 'dark') {
            for (const selector of ['body', '.site-header', '.panel', '.site-footer']) {
              const element = document.querySelector(selector);
              if (element && getComputedStyle(element).backgroundColor === 'rgb(255, 255, 255)') {
                assertions.push(`${selector} remains white in dark theme`);
              }
            }
          }
          return {
            documentOverflow: document.documentElement.scrollWidth > innerWidth + 1,
            overflowers,
            clippedText,
            rootWidth: document.documentElement.scrollWidth,
            headerOverlap,
            assertions,
            theme: document.documentElement.dataset.theme || 'light',
          };
        });

        if (result.documentOverflow || result.overflowers.length || result.clippedText.length || result.headerOverlap || result.assertions.length || errors.length) {
          failures.push({ theme, width, height, path, ...result, errors });
        }

        if (path.endsWith('/users.html')) {
          const openButton = await page.locator('[data-open-user]').first();
          if (await openButton.count()) {
            await openButton.click();
            const dialogResult = await page.evaluate(() => {
              const dialog = document.querySelector('dialog');
              if (!dialog?.open) return 'dialog did not open';
              const rect = dialog.getBoundingClientRect();
              return rect.left < -0.5 || rect.right > innerWidth + 0.5 || rect.top < -0.5 || rect.bottom > innerHeight + 0.5
                ? 'dialog exceeds viewport after opening'
                : null;
            });
            if (dialogResult) failures.push({ theme, width, height, path, assertions: [dialogResult] });
            await page.keyboard.press('Escape');
          }
        }
      }
      await context.close();
    }
  }

  await browser.close();
  if (failures.length) {
    console.log(JSON.stringify(failures, null, 2));
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${pages.length * viewports.length * 2} page/viewport/theme combinations`);
  }
})();
