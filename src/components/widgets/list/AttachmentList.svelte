<script>
  import AttachmentCard from "../AttachmentCard.svelte";
  import MediaModal from "../modal/MediaModal.svelte";
  export let files = [];
  export let id;
  export let isLarge = false;

  let open = false;
  let attachment;
</script>

{#each files as file}
  <AttachmentCard
    attachment={file.attachment}
    {id}
    {isLarge}
    on:click={() => {
      attachment = file.attachment;
      open = true;
    }}
  />
{/each}

{#if open}
  <MediaModal {attachment} path={id} bind:open />
{/if}
