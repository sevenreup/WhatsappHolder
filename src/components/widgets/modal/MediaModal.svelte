<script>
  import MediaHolder from "../MediaHolder.svelte";

  export let attachment;
  export let path;
</script>

<div>
  <h4>Video</h4>
  <MediaHolder {attachment} {path} />
</div>
