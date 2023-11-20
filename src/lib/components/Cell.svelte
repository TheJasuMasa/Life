<script lang="ts">
	export let isActive: boolean;
</script>

<div class:active={isActive} class:inactive={!isActive} class="cell"></div>

<style lang="postcss">
	.cell {
		height: 1.5rem;
		width: 1.5rem;
		border: 1px solid black;
		transition: transform 1s ease-in;
	}

	.cell:hover {
		transform: scale(1.2);
		transition: transform 0.1s ease-in;
	}

	.active {
		background: #444;
		/* transition: background-color 0.2s ease; */
		transition: background ease-in 0.2s;
	}

	.active:hover {
		background: #222;
		cursor: pointer;
		transition: background ease-in 0.2s;
	}

	.inactive {
		background: #eee;
		/* transition: background-color 0.2s ease; */
	}

	.inactive:hover {
		background: #bbb;
		cursor: pointer;
	}

	@keyframes flip {
		0% {
			transform: rotateY(0deg);
		}

		100% {
			transform: rotateY(180deg);
		}
	}
</style>
