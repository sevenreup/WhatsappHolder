<script>
  import { push } from "svelte-spa-router";
  import { Button } from "smelte";
  let links = [
    { path: "/chat", icon: "home", name: "Chats" },
    { path: "/import", icon: "import_export", name: "Import" },
  ];
</script>

<main>
  {#each links as { path, icon, name }}
    <Button {icon} text on:click={() => push(path)}>{name}</Button>
  {/each}
</main>

<style>
  main {
  }
</style>
