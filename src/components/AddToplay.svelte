<script lang="ts">
	import type { BoardGame } from "$root/types/types";
	import { createEventDispatcher } from "svelte";

	type AddBGType = (bg: BoardGame) => void;

	export let addBG: AddBGType;

	let searchQuery: string = "";
	let promise: Promise<BoardGame[]> | null = null;
	const dispatch = createEventDispatcher<{ add: BoardGame }>();

	function searchBoardGames(): void {
		if (!searchQuery.trim()) {
			promise = null;
			return;
		}
		promise = fetch(
			`https://boardgamegeek.com/xmlapi2/search?type=boardgame&query=${encodeURIComponent(searchQuery)}`
		)
			.then((response) => response.text())
			.then((text) => {
				const parser = new DOMParser();
				const xml = parser.parseFromString(text, "text/xml");
				const items = xml.querySelectorAll("item");

				return Array.from(items)
					.slice(0, 4)
					.map((item) => {
						return {
							id: item.getAttribute("id") || "",
							name:
								item.querySelector("name")?.getAttribute("value") || "Unknown",
							year:
								item.querySelector("yearpublished")?.getAttribute("value") ||
								"N/A",
							completed: false,
						};
					});
			})
			.catch((error) => {
				console.error("Error fetching board games:", error);
				return [];
			});
	}

	function addBoardGame(game: BoardGame): void {
		dispatch("add", game);
		searchQuery = "";
		promise = null;
		addBG(game);
	}
</script>

<div class="search-container">
	<input
		type="text"
		placeholder="Search for a board game..."
		bind:value={searchQuery}
		on:input={searchBoardGames}
	/>

	{#await promise}
		<p>...loading</p>
	{:then results}
		{#if results && results.length > 0}
			<ul class="search-results">
				{#each results as game}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<li on:click={() => addBoardGame(game)}>
						{game.name} ({game.year})
					</li>
				{/each}
			</ul>
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
	.search-container {
		position: relative;
		width: 100%;
	}
	input {
		width: 100%;
		padding: 8px;
		font-size: 16px;
		color: #f0f0f0;
	}
	.search-results {
		position: absolute;
		width: 100%;
		background: white;
		border: 1px solid #ccc;
		max-height: 150px;
		overflow-y: auto;
		z-index: 1000;
		top: 100%;
	}
	.search-results li {
		padding: 8px;
		cursor: pointer;
		list-style: none;
	}
	.search-results li:hover {
		background: #f0f0f0;
	}
</style>
