<script>
  import { slide } from "svelte/transition";
  let visible = false;
</script>

<div
  class="p-4 mt-2 bg-white rounded-3xl"
  on:click={() => (visible = !visible)}
>
  <slot name="title"><span>This title</span></slot>
  {#if visible}
    <div transition:slide>
      <slot name="body" />
    </div>
  {/if}
</div>
