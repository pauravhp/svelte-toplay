<script lang="ts">
	import type { BoardGame } from "$root/types/types";
	import { fade, slide } from "svelte/transition";

	type CompleteToplayType = (id: string) => void;
	type RemoveToplayType = (id: String) => void;
	type EditToplayNameType = (id: String, newText: string) => void;
	type DurationType = number;

	export let bg: BoardGame;
	export let completeToplay: CompleteToplayType;
	export let removeToplay: RemoveToplayType;
	export let editToplayName: EditToplayNameType;
	export let duration: DurationType;

	let editing = false;

	function toggleEdit(): void {
		editing = true;
	}

	function handleEdit(event: KeyboardEvent, id: String): void {
		let pressedKey = event.key;
		let targetElement = event.target as HTMLInputElement;
		let newTodoText = targetElement.value;

		switch (pressedKey) {
			case "Escape":
				targetElement.blur();
				break;
			case "Enter":
				editToplayName(id, newTodoText);
				targetElement.blur();
				break;
		}
	}

	function handleBlur(event: FocusEvent, id: string): void {
		let targetElement = event.target as HTMLInputElement;
		let newTodoText = targetElement.value;

		editToplayName(id, newTodoText);
		targetElement.blur();
		editing = false;
	}
</script>

<li in:slide={{ duration }} out:fade={{ duration }} class:editing class="todo">
	<div class="todo-item">
		<div>
			<input
				on:change={() => completeToplay(bg.id)}
				checked={bg.completed}
				id="todo"
				class="toggle"
				type="checkbox"
			/>
			<label aria-label="Check todo" class="todo-check" for="todo"></label>
		</div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span
			class="todo-text"
			class:completed={bg.completed}
			on:dblclick={toggleEdit}>{bg.name}</span
		>
		<button
			aria-label="Remove todo"
			class="remove"
			on:click={() => removeToplay(bg.id)}
		></button>
	</div>

	{#if editing}
		<!-- svelte-ignore a11y_autofocus -->
		<input
			type="text"
			value={bg.name}
			class="edit"
			on:keydown={(event) => handleEdit(event, bg.id)}
			on:blur={(event) => handleBlur(event, bg.id)}
			autofocus
		/>
	{/if}
	<!-- <input class="edit" type="text" autofocus /> -->
</li>

<style>
	.todo {
		font-size: var(--font-24);
		font-weight: 400;
		border-bottom: 1px solid #ededed;
	}

	.todo:last-child {
		border-bottom: none;
	}

	.todo-check,
	.todo-text {
		display: block;
		padding: var(--spacing-16);
		color: var(--color-gray-28);
		transition: color 0.4s;
	}

	.todo-check {
		border-radius: 100%;
	}

	.completed {
		color: var(--color-gray-58);
		text-decoration: line-through;
	}

	.todo-item {
		position: relative;
		display: flex;
		align-items: center;
		padding: 0 var(--spacing-8);
	}

	.editing .todo-item {
		display: none;
	}

	.edit {
		width: 100%;
		padding: var(--spacing-8);
		font-size: var(--font-24);
		border: 1px solid #999;
		border-radius: var(--radius-base);
		box-shadow: inset 0 -1px 5px 0 var(--shadow-1);
	}

	.toggle {
		position: absolute;
		top: 26px;
		left: 13px;
		transform: scale(2);
		opacity: 0;
	}

	.toggle + label {
		background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: 84% 50%;
	}

	.toggle:checked + label {
		background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E");
	}

	.remove {
		display: none;
		margin-left: auto;
		font-size: var(--font-32);
		color: var(--color-gray-58);
		transition: color 0.2s ease-out;
	}

	.remove:hover {
		color: var(--color-highlight);
	}

	.remove:after {
		content: "×";
	}

	.todo:hover .remove {
		display: block;
	}
</style>
