<script lang="ts">
	import type { BoardGame, FiltersType } from "$root/types/types";
	import AddToplay from "./AddToplay.svelte";
	import ClearToplay from "./ClearToplay.svelte";
	import FilterToplay from "./FilterToplay.svelte";
	import Toplay from "./Toplay.svelte";
	import ToplaysLeft from "./ToplaysLeft.svelte";
	import { tick } from "svelte";

	// state
	let selectedFilter: FiltersType = "all";

	let filtering = false;

	let toplays: BoardGame[] = [
		{ id: "1e4a59703af84", name: "Wingspan", year: "2022", completed: true },
		{ id: "9e09bcd7b9349", name: "Catan", year: "2022", completed: false },
		{ id: "9e4273a51a37c", name: "Monopoly", year: "2022", completed: false },
		{ id: "53ae48bf605cc", name: "Risk", year: "2022", completed: false },
	];

	$: toplaysAmount = toplays.length;

	$: incompleteToplays = toplays.filter((bg) => !bg.completed).length;

	$: filteredToplays = filterToplays(toplays, selectedFilter);

	$: completedToplays = toplays.filter((bg) => bg.completed).length;

	$: duration = filtering ? 0 : 250;

	function addBG(bg: BoardGame): void {
		console.log(bg);
		toplays = [...toplays, bg];
	}

	function completeToplay(id: String): void {
		toplays = toplays.map((bg) => {
			if (bg.id === id) {
				bg.completed = !bg.completed;
			}
			return bg;
		});
	}

	function removeToplay(id: String): void {
		toplays = toplays.filter((bg) => bg.id !== id);
	}

	function editToplayName(id: String, newText: string): void {
		let currentToplay = toplays.findIndex((bg) => bg.id === id);
		toplays[currentToplay].name = newText;
	}

	function filterToplays(
		toplays: BoardGame[],
		filter: FiltersType
	): BoardGame[] {
		switch (filter) {
			case "all":
				console.log(toplays);
				return toplays;
			case "active":
				return toplays.filter((bg) => !bg.completed);
			case "completed":
				return toplays.filter((bg) => bg.completed);
		}
	}

	async function setFilter(newFilter: FiltersType): Promise<void> {
		filtering = true;
		await tick();
		selectedFilter = newFilter;
		await tick();
		filtering = false;
	}

	function clearCompleted(): void {
		toplays = toplays.filter((bg) => !bg.completed);
	}
</script>

<main>
	<h1 class="title">To Play</h1>

	<section class="todos">
		<AddToplay {addBG} />

		{#if toplaysAmount}
			<ul class="todo-list">
				{#each filteredToplays as bg}
					<Toplay
						{bg}
						{completeToplay}
						{removeToplay}
						{editToplayName}
						{duration}
					/>
				{/each}
			</ul>

			<div class="actions">
				<ToplaysLeft {incompleteToplays} />
				<FilterToplay {selectedFilter} {setFilter} />
				<ClearToplay {clearCompleted} {completedToplays} />
			</div>
		{/if}
	</section>
</main>

<style>
	/* Todos */

	.title {
		font-size: var(--font-80);
		font-weight: inherit;
		text-align: center;
		color: var(--color-title);
	}

	.todos {
		--width: 500px;
		--todos-bg: hsl(0 0% 98%);
		--todos-text: hsl(220 20% 14%);

		width: var(--width);
		color: var(--todos-text);
		background-color: var(--todos-bg);
		border-radius: var(--radius-base);
		border: 1px solid var(--color-gray-90);
		box-shadow: 0 0 4px var(--shadow-1);
	}

	.todo-list {
		list-style: none;
	}

	.actions {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-8) var(--spacing-16);
		font-size: 0.9rem;
		border-top: 1px solid var(--color-gray-90);
	}

	.actions:before {
		content: "";
		height: 40px;
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		box-shadow:
			0 1px 1px hsla(0, 0%, 0%, 0.2),
			0 8px 0 -3px hsl(0, 0%, 96%),
			0 9px 1px -3px hsla(0, 0%, 0%, 0.2),
			0 16px 0 -6px hsl(0, 0%, 96%),
			0 17px 2px -6px hsla(0, 0%, 0%, 0.2);
		z-index: -1;
	}
</style>
