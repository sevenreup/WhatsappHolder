<script>
  import { createEventDispatcher } from "svelte";
  import Collapsable from "./Collapsable.svelte";

  export let open = false;
  export let user = {};
  const dispatch = createEventDispatcher();

  let files = [
    { type: "img", url: "https://placeimg.com/100/100/animals" },
    { type: "img", url: "https://placeimg.com/100/100/animals" },
    { type: "img", url: "https://placeimg.com/100/100/animals" },
    { type: "img", url: "https://placeimg.com/100/100/animals" },
    { type: "img", url: "https://placeimg.com/100/100/animals" },
    { type: "more" },
  ];
</script>

<main
  class="h-full fixed right-0 transition duration-500 ease-in-out overflow-x-scroll"
  style="width: 300px; {!open ? 'transform: translateX(300px)' : ''}"
>
<div>
  <button on:click={() => dispatch('close')}>
    close
  </button>
</div>
  <div class="p-2">
    <img
      src="https://placeimg.com/100/100/animals"
      alt="profile"
      class="rounded-full w-28 h-28 m-auto"
    />
    <p class="text-center text-2xl font-bold mt-2">{user.name}</p>
  </div>

  <Collapsable>
    <h2 slot="title" class="text-lg font-bold">Information</h2>
    <div slot="body" class="mt-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
      eaque ratione ipsam quos autem quia voluptatem aliquid eius assumenda est
      cupiditate iure libero atque molestias! Ut magnam sunt et aliquid!
    </div>
  </Collapsable>
  <div class="p-2 mt-3">
    <h2 class="p-2 text-lg font-bold">Shared files</h2>
    <div class="flex flex-row flex-wrap">
      {#each files as file}
        {#if file.type == "img"}
          <div class="m-1">
            <img src={file.url} alt="profile" class="rounded-lg w-28 h-28" />
          </div>
        {:else if file.type == "more"}
          <div class="bg-gray-300 w-28 h-28 rounded-lg m-1">
            <div class="w-28 h-28 flex flex-col justify-center">
              <span class="text-center font-bold">more</span>
            </div>
          </div>
        {:else}
          <span>ass</span>
        {/if}
      {/each}
    </div>
  </div>
</main>
