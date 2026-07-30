import type { StrapiApp } from "@strapi/strapi/admin";
import ExportToExcelButton from "./components/ExportToExcelButton";

export default {
  config: {
    locales: [],
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome to Wealth Longue",
        "Auth.form.welcome.subtitle": "Sign in to manage your website",
      },
    },
  },
  register(app: StrapiApp) {
    app.getPlugin("content-manager").injectComponent("listView", "actions", {
      name: "export-to-excel-button",
      Component: ExportToExcelButton,
    });
  },
  bootstrap(app: StrapiApp) {
    if (typeof window === "undefined") return;

    // ---- Patch 1: Hide the Status column in list views ----
    const hideStatusColumn = () => {
      const headers = document.querySelectorAll("table thead th");

      headers.forEach((th, index) => {
        const text = th.textContent?.trim().toLowerCase();
        if (text === "status") {
          (th as HTMLElement).style.display = "none";

          const rows = document.querySelectorAll("table tbody tr");
          rows.forEach((row) => {
            const cell = row.children[index] as HTMLElement | undefined;
            if (cell) cell.style.display = "none";
          });
        }
      });
    };

    // ---- Patch 2: Rewrite "This value is required." to use field name ----
    const patchRequiredErrors = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
      );
      const nodesToFix: Text[] = [];

      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.textContent?.trim() === "This value is required.") {
          nodesToFix.push(node as Text);
        }
      }

      nodesToFix.forEach((textNode) => {
        const errorEl = textNode.parentElement;
        if (!errorEl) return;

        let wrapper: HTMLElement | null = errorEl;
        let label: HTMLLabelElement | null = null;

        for (let i = 0; i < 5 && wrapper; i++) {
          label = wrapper.querySelector("label");
          if (label) break;
          wrapper = wrapper.parentElement;
        }

        if (label) {
          const fieldName = label.textContent?.replace("*", "").trim();
          if (fieldName) {
            textNode.textContent = `${fieldName} is required.`;
          }
        }
      });
    };

    const runAllPatches = () => {
      hideStatusColumn();
      patchRequiredErrors();
    };

    runAllPatches();

    const observer = new MutationObserver(() => {
      runAllPatches();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  },
};
