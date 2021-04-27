<script>
  import AttachmentCard from "../AttachmentCard.svelte";

  export let files = [];
  export let id;
  export let isLarge = false;
</script>

{#each files as file}
  <AttachmentCard attachment={file.attachment} {id} {isLarge}/>
{/each}
