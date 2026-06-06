/*function hideSearchShorts() {

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
*/

function hideSearchShorts() {

    document
        .querySelectorAll(
            "grid-shelf-view-model"
        )
        .forEach(shelf => {

            const text =
                shelf.textContent
                    ?.toLowerCase() || "";

            if (
                text.includes("shorts")
            ) {

                const heading =
                    shelf.querySelector(
                        "h1,h2,h3,h4"
                    );

                if (
                    heading &&
                    heading.textContent
                        .trim()
                        .toLowerCase() ===
                    "shorts"
                ) {

                    shelf.style.display =
                        "none";

                }

            }

        });
}