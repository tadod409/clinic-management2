class Modal {

    constructor() {
        this.modal = null;
        this.content = null;
    }

    init() {

        if (document.getElementById("app-modal")) return;

        document.body.insertAdjacentHTML("beforeend", `

<div
id="app-modal"
class="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 backdrop-blur-sm">

    <div
        class="relative w-full max-w-2xl mx-4 rounded-xl bg-white shadow-2xl animate-[fadeIn_.2s_ease]">

        <div
            class="flex items-center justify-between border-b px-6 py-4">

            <h2
                id="modal-title"
                class="text-lg font-semibold">
            </h2>

            <button
                id="modal-close"
                class="rounded p-2 hover:bg-gray-100">

                <span class="material-symbols-outlined">

                    close

                </span>

            </button>

        </div>

        <div
            id="modal-body"
            class="max-h-[70vh] overflow-y-auto p-6">
        </div>

        <div
            id="modal-footer"
            class="hidden border-t px-6 py-4 flex justify-end gap-3">
        </div>

    </div>

</div>

`);

        this.modal = document.getElementById("app-modal");
        this.content = document.getElementById("modal-body");

        document
            .getElementById("modal-close")
            .addEventListener("click", () => this.close());

        this.modal.addEventListener("click", e => {

            if (e.target === this.modal) {

                this.close();

            }

        });

    }

    open({
        title = "",
        body = "",
        footer = "",
        width = "max-w-2xl"
    }) {

        this.init();

        const box = this.modal.querySelector("div");

        box.className =
            `relative w-full ${width} mx-4 rounded-xl bg-white shadow-2xl`;

        document.getElementById("modal-title").innerHTML = title;

        document.getElementById("modal-body").innerHTML = body;

        const footerElement =
            document.getElementById("modal-footer");

        if (footer) {

            footerElement.classList.remove("hidden");

            footerElement.innerHTML = footer;

        } else {

            footerElement.classList.add("hidden");

            footerElement.innerHTML = "";

        }

        this.modal.classList.remove("hidden");

        this.modal.classList.add("flex");

        document.body.classList.add("overflow-hidden");

    }

    close() {

        if (!this.modal) return;

        this.modal.classList.add("hidden");

        this.modal.classList.remove("flex");

        document.body.classList.remove("overflow-hidden");

    }

    setBody(html) {

        document.getElementById("modal-body").innerHTML = html;

    }

    setTitle(title) {

        document.getElementById("modal-title").innerHTML = title;

    }

    setFooter(html) {

        const footer =
            document.getElementById("modal-footer");

        footer.innerHTML = html;

        footer.classList.remove("hidden");

    }

}

export default new Modal();