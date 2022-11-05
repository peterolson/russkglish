<nav>
	<a href="/">Home</a>
	<a href="/lexicon">Lexicon</a>
	<a href="/texts">Texts</a>
</nav>
<main data-sveltekit-prefetch>
	<slot />
</main>

<style>
	nav {
		background-color: white;
		padding: 8px;
		display: flex;
		gap: 8px;
		justify-content: center;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	main {
		background-color: white;
		padding: 4px 24px;
	}
</style>
