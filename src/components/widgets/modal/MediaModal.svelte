<script>
  import MediaHolder from "../MediaHolder.svelte";

  export let attachment;
  export let path;
</script>

<div>
  <MediaHolder {attachment} {path} />
</div>
