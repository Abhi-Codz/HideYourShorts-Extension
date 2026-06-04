let observer = null;

async function applySettings() {

    const settings = await getSettings();

    if (!settings.enabled) {
        restoreVisibility();
        return;
    }

    if (settings.hideHomeShorts) {
        hideHomeShorts();
    }

    if (settings.hideSearchShorts) {
        hideSearchShorts();
    }

    if (settings.hideSidebarShorts) {
        hideSidebarShorts();
    }

}

function restoreVisibility() {

    document
        .querySelectorAll(
            '[data-shorts-cleaner-hidden="true"]'
        )
        .forEach(el => {

            el.style.display = "";
            el.removeAttribute(
                "data-shorts-cleaner-hidden"
            );

        });

}

function startObserver() {

    applySettings();

    observer = new MutationObserver(() => {
        applySettings();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

}

chrome.runtime.onMessage.addListener(
    (message) => {

        if (
            message.type ===
            "settingsUpdated"
        ) {
            applySettings();
        }

    }
);
startObserver();