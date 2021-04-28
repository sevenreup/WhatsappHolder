<script>
  import MediaHolder from "./MediaHolder.svelte";
  import linkifyHtml from "linkifyjs/html";
  import * as linkify from "linkifyjs";

  export let item;
  export let author;
  export let path;

  function getText(text) {
    if (text !== null && text !== undefined) {
      return linkifyHtml(text, {
        defaultProtocol: "https",
        className: "underline",
        attributes: {
          onclick: `openLinkInBrowser(event)`,
        },
      });
    }
  }

  function hasLink(text) {
    if (text !== null && text !== undefined) {
      const links = linkify.find(text);
      return links.length > 0;
    }
    return false;
  }
</script>

{#if !item.isSystem}
  <div
    class="list-item my-2  justify-items-end relative {item.isOwner
      ? 'sender flex justify-end'
      : 'reciever inline-flex justify-start'}"
  >
    <!-- <div class={item.isOwner ? "ml-2 order-1" : "mr-2"}>
      <img src={item.img} alt="profile" class="rounded-full w-12 h-12 m-auto" />
    </div> -->
    <div
      class="max-w-3xl relative {item.isOwner ? 'justify-end items-end' : ''}"
    >
      <p
        class="rounded-t-3xl p-3 {item.isOwner
          ? 'owner rounded-bl-3xl text-white'
          : 'bg-white rounded-br-3xl text-gray-700'}"
      >
        {#if !item.isMedia}
          {#if hasLink(item.message)}
            {@html getText(item.message)}
          {:else}
            {item.message}
          {/if}
        {:else}
          <MediaHolder attachment={item.attachment} {path} />
        {/if}
      </p>
      <div class={item.isOwner ? "text-right" : "text-left"}>
        <span class="font-bold text-gray-600">{!item.isOwner ? author.name : ""} </span><time class="font-bold text-gray-400">9:00</time>
      </div>
    </div>
  </div>
{:else}
  <div class="flex justify-center my-2">
    <p class="rounded-3xl p-2 system">{item.message}</p>
  </div>
{/if}

<style>
  .owner {
    background-color: #7BCFCE;
  }

  .system {
    background-color: #DDF1F1;
    color: #566768;
  }
</style>
