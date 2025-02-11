<script lang="ts">
	export let incompleteToplays: number;
</script>

<span class="todo-count">
	{incompleteToplays}
	{incompleteToplays === 1 ? "item" : "items"} left
</span>
