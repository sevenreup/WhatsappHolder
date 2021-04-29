<script>
  import { Modal } from "attractions";
  import MediaHolder from "../MediaHolder.svelte";

  export let open = false;
  export let attachment;
  export let path;
</script>

<Modal bind:open>
  <div>
    <MediaHolder {attachment} {path} />
  </div>
</Modal>
