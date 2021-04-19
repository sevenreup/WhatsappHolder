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
  
  export let page = 0;
  export let messages = {}
  export let participants = {};

  let messageList;

  function getAuthor(id) {
    for(const key in participants) {
      const obj = participants[key]
      if (obj.id == id) {
        return obj
      }
    }
    return {}
  }

</script>

<div class="list flex relative mb-3 h-full p-3 w-full" bind:this={messageList}>
  <MesageInfiniteList
    items={messages}
    element={messageList}
    hasMore={messages.length}
    on:loadMore={() => {
      page++;
      // fetchData();
    }}
    let:index
    let:item
  >
    <li class="block relative" slot="item"><Message {item} author={getAuthor(item.author)}/></li>
  </MesageInfiniteList>
</div>

<style>
  .list {
    flex-flow: column nowrap;
    overflow: auto;
  }
</style>
