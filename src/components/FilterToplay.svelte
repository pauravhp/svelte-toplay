<script lang="ts">
	import type { FiltersType } from "$root/types/types";

	type SetFilterType = (newFilter: FiltersType) => void;

	export let selectedFilter: FiltersType;
	export let setFilter: SetFilterType;

	let filters: FiltersType[] = ["all", "active", "completed"];
</script>

<div class="filters">
	{#each filters as filter}
		<button
			class="filter"
			on:click={() => setFilter(filter)}
			class:selected={selectedFilter === filter}>{filter}</button
		>
	{/each}
</div>

<style>
	.filters {
		display: flex;
		gap: var(--spacing-4);
	}

	.filter {
		text-transform: capitalize;
		padding: var(--spacing-4) var(--spacing-8);
		border: 1px solid transparent;
		border-radius: var(--radius-base);
	}

	.filter:hover {
		border: 1px solid var(--color-highlight);
	}

	.selected {
		border-color: var(--color-highlight);
	}
</style>
