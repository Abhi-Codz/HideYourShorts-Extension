let observer = null;

const SHORTS_SELECTORS = [
    "ytd-reel-shelf-renderer",
    'a[href="/shorts"]'
];

function hideShorts() {
    SHORTS_SELECTORS.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.display = "none";
        });
    });

    document.querySelectorAll("a[href*='/shorts/']").forEach(link => {
        const container =
            link.closest("ytd-rich-item-renderer") ||
            link.closest("ytd-video-renderer") ||
            link.closest("ytd-grid-video-renderer");

        if (container) {
            container.style.display = "none";
        }
    });
}

function startObserver() {
    hideShorts();

    observer = new MutationObserver(() => {
        hideShorts();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function stopObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

chrome.storage.sync.get(
    { hideShorts: true },
    ({ hideShorts }) => {
        if (hideShorts) {
            startObserver();
        }
    }
);

chrome.storage.onChanged.addListener(changes => {
    if (!changes.hideShorts) {
        return;
    }

    if (changes.hideShorts.newValue) {
        startObserver();
    } else {
        stopObserver();
        location.reload();
    }
});