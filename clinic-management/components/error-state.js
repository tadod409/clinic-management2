class ErrorState {

    render({
        containerId,
        title = "Something went wrong",
        message = "Unable to load data from the server.",
        buttonText = "Try Again",
        buttonId = "retryButton",
        icon = "error"
    }) {

        const container = document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = `

<div class="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-xl border border-red-200 shadow-sm">

    <div class="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">

        <span class="material-symbols-outlined text-red-600 text-5xl">

            ${icon}

        </span>

    </div>

    <h2 class="text-xl font-semibold text-gray-800 mb-2">

        ${title}

    </h2>

    <p class="text-gray-500 text-center max-w-lg mb-6">

        ${message}

    </p>

    <button
        id="${buttonId}"
        class="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">

        ${buttonText}

    </button>

</div>

`;

    }

}

export default new ErrorState();