<script>
  import { createEventDispatcher } from "svelte";
  import { getApiPath } from "../../util/appUtil";

  export let chat;
  const dispatch = createEventDispatcher();

  $: image = getApiPath(chat.img);
</script>

<header class="w-full">
  <div class="flex p-6 justify-between">
    <div class="flex cursor-pointer" on:click={() => dispatch("openSidebar")}>
      <img src={image} alt="profile" class="rounded-lg w-12 h-12 m-auto" />
      <span class="text-xl p-2 font-bold">{chat.name}</span>
    </div>

    {#if chat.isGroup}
      <!-- content here -->
    {:else}{/if}
  </div>
</header>
