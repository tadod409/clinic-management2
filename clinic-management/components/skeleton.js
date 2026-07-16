class Skeleton {

    card(containerId, count = 4) {

        const container = document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = Array.from({ length: count }).map(() => `

<div class="bg-white rounded-xl shadow border p-6 animate-pulse">

    <div class="w-12 h-12 rounded-lg bg-gray-200 mb-4"></div>

    <div class="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>

    <div class="h-3 bg-gray-200 rounded w-1/2"></div>

</div>

`).join("");

    }

    table(containerId, rows = 8, columns = 6) {

        const container = document.getElementById(containerId);

        if (!container) return;

        let header = "";

        let body = "";

        for (let i = 0; i < columns; i++) {

            header += `
<th class="px-6 py-3">
    <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
</th>
`;

        }

        for (let r = 0; r < rows; r++) {

            let row = "";

            for (let c = 0; c < columns; c++) {

                row += `
<td class="px-6 py-4">
    <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
</td>
`;

            }

            body += `<tr>${row}</tr>`;

        }

        container.innerHTML = `

<div class="overflow-x-auto bg-white rounded-xl shadow border">

<table class="min-w-full">

<thead>

<tr>

${header}

</tr>

</thead>

<tbody>

${body}

</tbody>

</table>

</div>

`;

    }

    profile(containerId) {

        const container = document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = `

<div class="bg-white rounded-xl shadow border p-6 animate-pulse">

    <div class="flex items-center gap-5">

        <div class="w-24 h-24 rounded-full bg-gray-200"></div>

        <div class="flex-1">

            <div class="h-6 w-48 bg-gray-200 rounded mb-3"></div>

            <div class="h-4 w-64 bg-gray-200 rounded mb-2"></div>

            <div class="h-4 w-32 bg-gray-200 rounded"></div>

        </div>

    </div>

</div>

`;

    }

    list(containerId, count = 6) {

        const container = document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = Array.from({ length: count }).map(() => `

<div class="flex items-center gap-4 bg-white rounded-xl border shadow p-4 animate-pulse">

    <div class="w-12 h-12 rounded-full bg-gray-200"></div>

    <div class="flex-1">

        <div class="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>

        <div class="h-3 w-1/2 bg-gray-200 rounded"></div>

    </div>

</div>

`).join("");

    }

    custom(containerId, html) {

        const container = document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = html;

    }

    clear(containerId) {

        const container = document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = "";

    }

}

export default new Skeleton();