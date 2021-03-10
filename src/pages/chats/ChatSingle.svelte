<script>
  import MessageList from "../../components/widgets/MessageList.svelte";
  export let params = {};

  let page = 0;
</script>

<main class="h-full flex">
  <div class="message-container h-full w-4/5">
    <div class="chat-info">{page}</div>
    <MessageList bind:page />
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
