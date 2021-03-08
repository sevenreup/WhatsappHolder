<script>
  export let name;
  import Home from "./pages/Home.svelte";
  import Chat from "./pages/Chat.svelte";
  import Router from 'svelte-spa-router'
  let routes = {
	  '/': Home,
	  '/chat': Chat
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <Router {routes}/>
</main>