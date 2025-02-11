<script lang="ts">
	type ClearCompletedType = () => void;
	type completedToplaysType = number;

	export let clearCompleted: ClearCompletedType;
	export let completedToplays: completedToplaysType;
</script>

<button
	on:click={clearCompleted}
	class:hidden={completedToplays === 0}
	class="clear-completed"
>
	Clear completed
</button>
