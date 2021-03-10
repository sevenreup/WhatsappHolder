<script>
  export let items = [];
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  export let element;
  export let hasMore = true;
  export let horizontal = false;
  export let threshold = 0;

  let isLoadMore = false;

  const dispatch = createEventDispatcher();
  let component;

  $: {
    if (element) {
      console.log(element);
      element.addEventListener("scroll", (e) => {
        const offset = horizontal
          ? e.target.scrollWidth - e.target.clientWidth - e.target.scrollLeft
          : e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;

        if (offset <= threshold) {
          if (!isLoadMore && hasMore) {
            dispatch("loadMore");
          }
          isLoadMore = true;
        } else {
          isLoadMore = false;
        }
      });
    }
  }
</script>

<main bind:this={component}>
  {#each items as item, index (index)}
    <div><slot name="item" {item} {index}>{item}</slot></div>
  {/each}
</main>
