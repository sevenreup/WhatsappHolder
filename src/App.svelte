<script>
  import Home from "./pages/Home.svelte";
  import Router, { replace } from "svelte-spa-router";
  import MainSidebar from "./components/MainSidebar.svelte";
  import AppBar from "./components/AppBar.svelte";
  import ImportChat from "./pages/import/ImportChat.svelte";
  import EmptyState from "./pages/EmptyState.svelte";
  import Tailwind from "./components/Tailwind.svelte";
  import Socket from "./components/Socket.svelte";
  import { openLinkElectron } from "./store/socket-store";

  let routes = {
    "/": Home,
    "/chat": Home,
    "/chat/*": Home,
    "/import": ImportChat,
    "*": EmptyState,
  };

  window.openLinkInBrowser = (event) => {
    event.preventDefault();
    const anchor = event.target.closest("a");
    if (!anchor) return;
    openLinkElectron(anchor.getAttribute("href"));
  };
  function conditionsFailed(event) {
    replace("/err");
  }
</script>

<Tailwind />
<Socket />
<AppBar />
<main class="main-grid">
  <nav class="sidebar">
    <MainSidebar />
  </nav>
  <section class="main">
    <Router
      {routes}
      on:conditionsFailed={conditionsFailed}
      restoreScrollState={true}
    />
  </section>
</main>

<style>
  .main-grid {
    display: grid;
    height: 100vh;
    overflow: hidden;   
    padding-top: 30px;
    grid-template-columns: 5% auto;
  }
  .main {
    overflow: hidden;
 
  }
</style>
