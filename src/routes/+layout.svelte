<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav>
	<a href="/" class:active={$page.route.id === '/'}>Russglish</a>
	<a href="/lexicon" class:active={$page.route.id?.startsWith('/lexicon')}>Lexikon</a>
	<a href="/texts" class:active={$page.route.id?.startsWith('/texts')}>Text</a>
</nav>

<slot />

<style>
	nav {
		background-color: rgba(0, 0, 0, 0.9);
		padding: 16px;
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: center;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	nav a {
		color: white;
		text-decoration: none;
	}

	nav a:hover {
		text-decoration: underline;
	}

	a.active {
		font-weight: bold;
	}
</style>
