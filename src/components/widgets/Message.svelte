<script>
import MediaHolder from "./MediaHolder.svelte";

  export let item;
  export let author;
  export let path;
</script>

{#if !item.isSystem}
  <div
    class="list-item  justify-items-end relative {item.isOwner
      ? 'sender flex justify-end'
      : 'reciever inline-flex justify-start'}"
  >
    <div class={item.isOwner ? "ml-2 order-1" : "mr-2"}>
      <img
        src="https://placeimg.com/80/80/animals"
        alt="profile"
        class="rounded-full w-12 h-12 m-auto"
      />
    </div>
    <div
      class="max-w-3xl relative {item.isOwner ? 'justify-end items-end' : ''}"
    >
      <p
        class="rounded-t-3xl p-2 text-white {item.isOwner
          ? 'bg-indigo-400  rounded-bl-3xl'
          : 'bg-blue-400 rounded-br-3xl'}"
      >
        {#if !item.isMedia}
          {item.message}
        {:else}
          <MediaHolder attachment={item.attachment} {path}/>
        {/if}
      </p>
      <div class={item.isOwner ? "text-right" : "text-left"}>
        <time>{!item.isOwner ? author.name : ""} 9: 00</time>
      </div>
    </div>
  </div>
{:else}
  <div class="flex justify-center my-2">
    <p class="rounded-3xl p-2 text-white bg-blue-200">{item.message}</p>
  </div>
{/if}

<style>
</style>
