class EmptyState {

    render({
        containerId,
        icon = "folder_open",
        title = "No Data Found",
        message = "There are no records to display.",
        buttonText = "",
        buttonId = "",
        illustration = ""
    }) {

        const container = document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = `

<div class="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-xl border border-gray-200 shadow-sm">

    ${
        illustration
            ? `<img src="${illustration}" class="w-52 mb-6 select-none" alt="Empty State">`
            : `
            <div class="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">

                <span class="material-symbols-outlined text-blue-600 text-5xl">

                    ${icon}

                </span>

            </div>
            `
    }

    <h2 class="text-xl font-semibold text-gray-800 mb-2">

        ${title}

    </h2>

    <p class="text-gray-500 text-center max-w-md mb-6">

        ${message}

    </p>

    ${
        buttonText
            ? `
            <button
                id="${buttonId}"
                class="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">

                ${buttonText}

            </button>
            `
            : ""
    }

</div>

`;

    }

}

export default new EmptyState();