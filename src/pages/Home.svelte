<script>
  import Router from "svelte-spa-router";
  import ChatSidebar from "../components/ChatSidebar.svelte";
  import ChatsEmpty from "./chats/ChatsEmpty.svelte";
  import ChatSingle from "./chats/ChatSingle.svelte";
  export let params = {};

  const prefix = "/chat";
  const routes = {
    "/:chatId/*": ChatSingle,
    "/*": ChatsEmpty,
  };

  console.log(params);
</script>

<main class="chat-grid">
  <ChatSidebar />
  <section class="chat-content overflow-y-auto p-2  bg-gray-100">
    <Router {routes} {prefix} on:routeLoaded={(e) => console.log(e)} restoreScrollState={true}/>
  </section>
</main>

<style>
  .chat-grid {
    display: grid;
    grid-template-columns: 25% auto;
    height: 100%;
    overflow: hidden;
  }
</style>
