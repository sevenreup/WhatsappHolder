<script>
  import { onMount, tick } from "svelte";
  import * as animateScroll from "svelte-scrollto";
  import { loadItems } from "../../util/moc";
  import MesageInfiniteList from "./list/MesageInfiniteList.svelte";
  import Message from "./Message.svelte";

  animateScroll.setGlobalOptions({
    container: "#message-holder",
    duration: 100,
  });

  async function fetchData() {
    newData = loadItems(page, size);
  }

  let items = [];
  let newData = [];
  export let page = 0;
  let size = 50;
  let messageList;

  onMount(() => {
    fetchData();
  });

  $: items = [...items, ...newData];
</script>

<div class="list mb-3 bg-gray-100 h-full p-3" bind:this={messageList}>
  <MesageInfiniteList
    {items}
    element={messageList}
    hasMore={newData.length}
    on:loadMore={() => {
      page++;
      fetchData();
    }}
    let:index
    let:item
  >
    <li class="block relative" slot="item"><Message {item} /></li>
  </MesageInfiniteList>
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
