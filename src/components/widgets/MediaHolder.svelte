<script>
  export let attachment;
</script>

{#if attachment.ext == "mp3"}
  <!-- content here -->
{:else if attachment.ext == "mp4"}
  <!-- else if content here -->
{:else}
  <!-- else content here -->
{/if}
