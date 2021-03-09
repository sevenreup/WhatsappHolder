<script>
  import { onMount, tick } from "svelte";
  import * as animateScroll from "svelte-scrollto";
  import VirtualList from "./list/VirtualList.svelte";
  import Message from "./Message.svelte";

  animateScroll.setGlobalOptions({
    container: "#message-holder",
    duration: 100,
  });

  export let items = [];
  export let start = 0;
  export let end = 0;
  export let scrollToIndex = undefined;

  onMount(() => {
    console.log(items.length);
    scrollToIndex(end);
    animateScroll.scrollTo({ element: `post-${end}` });
    animateScroll.scrollToBottom()
  });
</script>

<div class="list h-full">
  {scrollToIndex} <br />
  {start} <br />
  {end}
  <VirtualList
    {items}
    bind:start
    bind:end
    bind:scrollToIndex
    let:item
    vId="message-holder"
  >
    <Message {item} />
  </VirtualList>
</div>

<style>
  .list {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    overflow: auto;
    border: 1px solid;
  }
</style>
