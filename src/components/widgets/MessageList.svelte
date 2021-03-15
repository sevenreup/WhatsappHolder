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
    newData = loadItems(page, size, user);
  }
  
  export let page = 0;
  export let user = {}
  let items = [];
  let size = 50;
  let messageList;


  $: newData = loadItems(page, size, user)

  $: items = [...items, ...newData];
</script>

<div class="list flex relative mb-3 h-full p-3 w-full" bind:this={messageList}>
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
    flex-flow: column nowrap;
    overflow: auto;
  }
</style>
