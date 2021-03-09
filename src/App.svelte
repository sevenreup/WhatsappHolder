<script>
  import "smelte/src/tailwind.css";
  import Home from "./pages/Home.svelte";
  import Router, { replace } from "svelte-spa-router";
  import MainSidebar from "./components/MainSidebar.svelte";
  import AppBar from "./components/AppBar.svelte";
  import ImportChat from "./pages/ImportChat.svelte";
  import EmptyState from "./pages/EmptyState.svelte";
  import { wrap } from "svelte-spa-router/wrap";
  let routes = {
    "/": Home,
    "/chat": Home,
    "/chat/*": Home,
    "/import": ImportChat,
    "*": EmptyState,
  };

  function conditionsFailed(event) {
    replace("/err");
  }
</script>

<main class="main-grid">
  <nav class="toolbar">
    <AppBar />
  </nav>
  <nav class="sidebar">
    <MainSidebar />
  </nav>
  <section class="main">
    <Router {routes} on:conditionsFailed={conditionsFailed} />
  </section>
</main>

<style>
  .main-grid {
    display: grid;
    height: 100vh;
    grid-template-columns: 5% auto;
    grid-template-rows: 30px auto;
  }
  .sidebar {
    grid-row-start: 2;
  }
  .toolbar {
    grid-column-start: 1;
    grid-column-end: span 2;
  }
  .main {
    grid-column-start: 2;
    overflow: hidden;
  }
</style>
