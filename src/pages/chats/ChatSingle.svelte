<script>
  import MessageList from "../../components/widgets/MessageList.svelte";
  import { loadItems, loadMore } from "../../util/moc";
  export let params = {};

  let filter = "";
  let allItems = loadItems();

  $: messages = allItems.filter((i) => i.message.includes(filter));

  let scrollToIndex = undefined;
</script>

<main class="h-full flex">
  <div class="message-container h-full w-4/5">
    <div class="chat-info">{params.chatId}</div>
    <MessageList items={messages} bind:scrollToIndex />
  </div>
  <div class="sidebar h-full h-1/5">this is side bar</div>
</main>

<style>
  main {
  }
  .chat-info {
    width: auto;
  }
</style>
