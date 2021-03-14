<script>
  import { push } from "svelte-spa-router";
  import ChatIcon from "./icons/ChatIcon.svelte";
  import ImportIcon from "./icons/ImportIcon.svelte";
  let links = [
    { path: "/chat", icon: ChatIcon, name: "Chats" },
    { path: "/import", icon: ImportIcon, name: "Import" },
  ];
</script>

<main class="flex flex-col">
  {#each links as { path, icon, name }}
    <span on:click={() => push(path)} class="cursor-pointer m-auto">
      <svelte:component
        this={icon}
        classList="w-10 h-10 my-2 rounded-full bg-red-500 p-2"
      />
    </span>
  {/each}
</main>

<style>
</style>
