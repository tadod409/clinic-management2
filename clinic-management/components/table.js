class Table {

    render({
        containerId,
        columns = [],
        rows = [],
        loading = false,
        emptyMessage = "No data available."
    }) {

        const container = document.getElementById(containerId);

        if (!container) return;

        // Loading State
        if (loading) {
            container.innerHTML = `
                <div class="animate-pulse space-y-3">
                    ${Array.from({ length: 8 }).map(() => `
                        <div class="h-12 rounded bg-gray-200"></div>
                    `).join("")}
                </div>
            `;
            return;
        }

        // Empty State
        if (!rows.length) {
            container.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    ${emptyMessage}
                </div>
            `;
            return;
        }

        container.innerHTML = `
<div class="overflow-x-auto bg-white rounded-xl shadow border">

<table class="min-w-full divide-y divide-gray-200">

<thead class="bg-gray-50">

<tr>

${columns.map(col => `
<th
class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
${col.label}
</th>
`).join("")}

</tr>

</thead>

<tbody class="divide-y divide-gray-100">

${rows.map(row => `

<tr class="hover:bg-gray-50 transition">

${columns.map(col => `
<td class="px-6 py-4 whitespace-nowrap">

${typeof col.render === "function"
    ? col.render(row)
    : row[col.key] ?? "-"}

</td>
`).join("")}

</tr>

`).join("")}

</tbody>

</table>

</div>
`;
    }

}

export default new Table();