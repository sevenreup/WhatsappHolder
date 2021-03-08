<script>
  export let name;
  import "smelte/src/tailwind.css" ;
  import Home from "./pages/Home.svelte";
  import Chat from "./pages/Chat.svelte";
  import Router from 'svelte-spa-router'
  import Button from "smelte/src/components/Button";
  let routes = {
	  '/': Home,
	  '/chat': Chat
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <div class="py-2">
    <Button light>Button</Button>
  </div>
  <Router {routes}/>
</main>