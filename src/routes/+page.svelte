<script lang="ts">
	import Cell from '$lib/components/Cell.svelte';
	import { Generation } from '$lib/utils/generation';

	let cellArray: number[] = [];
	let iterate = false;

	let game = new Generation(30);
	game.generateRandom();

	$: if (iterate) {
		game = game;
		game.iterateGeneration();
		iterate = false;
	}

	setInterval(() => {
		iterate = true;
	}, 200);
</script>

<h1>Life</h1>
<button on:click={() => (iterate = true)}>Iterate</button>
{#key game}
	<p>{game.generationCount}</p>
{/key}
<main class="container">
	{#key iterate}
		<div class="gameboard">
			{#each game.current as row, i}
				{#each game.current as cell, j}
					<Cell isActive={game.current[i][j]} />
				{/each}
			{/each}
		</div>
	{/key}
</main>

<style lang="postcss">
	.gameboard {
		display: grid;
		gap: 2px;
		grid-template-columns: repeat(30, 1fr);
		grid-template-rows: repeat(30, 1fr);
		place-content: center;
		margin: 0 auto;
	}

	.container {
		display: flex;
		width: 100%;
	}

	main {
		padding: 1rem;
		background-color: rgba(150, 0, 0, 0.8);
	}
</style>
