import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    if (typeof window === 'undefined') return;

    const hideStatusColumn = () => {
      // Find all table headers in the list view
      const headers = document.querySelectorAll('table thead th');

      headers.forEach((th, index) => {
        const text = th.textContent?.trim().toLowerCase();
        if (text === 'status') {
          // Hide the header cell
          (th as HTMLElement).style.display = 'none';

          // Hide the matching cell in every row (same column index)
          const rows = document.querySelectorAll('table tbody tr');
          rows.forEach((row) => {
            const cell = row.children[index] as HTMLElement | undefined;
            if (cell) cell.style.display = 'none';
          });
        }
      });
    };

    hideStatusColumn();

    const observer = new MutationObserver(() => {
      hideStatusColumn();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
};