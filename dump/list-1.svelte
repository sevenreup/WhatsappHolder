<script>
    export let items = [];
    import { onMount, onDestroy, createEventDispatcher } from "svelte";
  
    export let element;
    export let hasMore = true;
    export let horizontal = false;
    export let threshold = 100;
    export let reverse = false;
  
    const dispatch = createEventDispatcher();
    let isLoadMore = false;
    let component;
    let beforeScrollHeight;
    let beforeScrollTop;
  
    $: {
      if (element) {
        console.log(element);
  
        if (reverse) {
          element.scrollTop = element.scrollHeight;
        }
  
        element.addEventListener("scroll", onScroll);
        element.addEventListener("resize", onScroll);
      }
    }
  
    $: if (isLoadMore && reverse) {
      element.scrollTop =
        element.scrollHeight - beforeScrollHeight + beforeScrollTop;
    }
  
    const onScroll = (e) => {
      if (!hasMore) return;
  
      let offset = 0;
  
      if (reverse) {
        offset = horizontal ? e.target.scrollLeft : e.target.scrollTop;
      } else {
        offset = horizontal
          ? e.target.scrollWidth - e.target.clientWidth - e.target.scrollLeft
          : e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;
      }
  
      if (offset <= threshold) {
        if (!isLoadMore && hasMore) {
          dispatch("loadMore");
          beforeScrollHeight = e.target.scrollHeight;
          beforeScrollTop = e.target.scrollTop;
        }
  
        isLoadMore = true;
      } else {
        isLoadMore = false;
      }
    };
  
    onDestroy(() => {
      if (element) {
        element.removeEventListener("scroll", null);
        element.removeEventListener("resize", null);
      }
    });
  </script>
  
  <main bind:this={component}>
    {#each items as item, index (index)}
      <div><slot name="item" {item} {index}>{item}</slot></div>
    {/each}
  </main>
  