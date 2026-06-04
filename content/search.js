function hideSearchShorts() {

    if (!location.pathname.startsWith("/results")) {
        return;
    }

    document
        .querySelectorAll("yt-grid-shelf-view-model")
        .forEach(el => {
            el.style.display = "none";
        });

    document
        .querySelectorAll("a[href*='/shorts/']")
        .forEach(link => {

            const card =
                link.closest("yt-grid-shelf-view-model, yt-grid-shelf-view-model-grid-shelf-item");

            if (card) {
                card.style.display = "none";
            }

        });
}

hideSearchShorts();
window.addEventListener('yt-page-data-updated', hideSearchShorts);