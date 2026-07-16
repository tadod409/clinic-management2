class Pagination {

    constructor() {
        this.onChange = null;
    }

    render(containerId, pagination, onChange) {

        const container = document.getElementById(containerId);

        if (!container) return;

        this.onChange = onChange;

        const {
            page = 1,
            totalPages = 1,
            totalItems = 0,
            perPage = 10
        } = pagination;

        if (totalPages <= 1) {
            container.innerHTML = "";
            return;
        }

        let pages = "";

        const start = Math.max(1, page - 2);
        const end = Math.min(totalPages, page + 2);

        for (let i = start; i <= end; i++) {

            pages += `
                <button
                    class="
                        page-btn
                        px-3
                        py-2
                        rounded-lg
                        border
                        transition
                        ${
                            i === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white hover:bg-gray-100 border-gray-300"
                        }
                    "
                    data-page="${i}">
                    ${i}
                </button>
            `;
        }

        container.innerHTML = `

<div class="flex flex-col md:flex-row items-center justify-between gap-4">

    <div class="text-sm text-gray-500">

        Showing
        <strong>${Math.min((page - 1) * perPage + 1, totalItems)}</strong>

        -

        <strong>${Math.min(page * perPage, totalItems)}</strong>

        of

        <strong>${totalItems}</strong>

    </div>

    <div class="flex items-center gap-2">

        <button
            id="prevPage"
            class="px-3 py-2 rounded-lg border hover:bg-gray-100"
            ${page === 1 ? "disabled" : ""}>

            Previous

        </button>

        ${pages}

        <button
            id="nextPage"
            class="px-3 py-2 rounded-lg border hover:bg-gray-100"
            ${page === totalPages ? "disabled" : ""}>

            Next

        </button>

    </div>

</div>

`;

        this.events(page, totalPages);

    }

    events(page, totalPages) {

        document
            .querySelectorAll(".page-btn")
            .forEach(button => {

                button.onclick = () => {

                    this.onChange(Number(button.dataset.page));

                };

            });

        const prev = document.getElementById("prevPage");

        if (prev) {

            prev.onclick = () => {

                if (page > 1) {

                    this.onChange(page - 1);

                }

            };

        }

        const next = document.getElementById("nextPage");

        if (next) {

            next.onclick = () => {

                if (page < totalPages) {

                    this.onChange(page + 1);

                }

            };

        }

    }

}

export default new Pagination();