<script>
  import { onMount } from "svelte";
  export let src;

  let player;

  onMount(() => {});
</script>

<audio {src} bind:this={player} controls>
  <track kind="captions" />
</audio>
