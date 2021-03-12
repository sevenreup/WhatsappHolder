<script>
  import { push } from "svelte-spa-router";
  let links = [
    { path: "/chat", icon: "home", name: "Chats" },
    { path: "/import", icon: "import_export", name: "Import" },
  ];
</script>

<main>
  {#each links as { path, icon, name }}
    <button on:click={() => push(path)}>{name}</button>
  {/each}
</main>

<style>
  main {
  }
</style>
