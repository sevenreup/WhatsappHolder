<script>
  import { link } from "svelte-spa-router";
  let chats = [
    { id: "1", name: "Jon A" },
    { id: "2", name: "Jon B" },
    { id: "3", name: "Jon C" },
    { id: "4", name: "Jon E" },
  ];
</script>

<nav>
  {#each chats as { id, name }}
    <a href="/chat/{id}" use:link>{name}</a>
  {/each}
</nav>
