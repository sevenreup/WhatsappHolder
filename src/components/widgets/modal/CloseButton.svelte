<script>
  import IoIosClose from "svelte-icons/io/IoIosClose.svelte";
  export let onClose;
</script>

<button class="icon bg-white rounded-full" on:click={onClose}>
  <IoIosClose />
</button>

<style>
  button {
    position: absolute;
    top: -3rem;
    right: 0;
  }
</style>
