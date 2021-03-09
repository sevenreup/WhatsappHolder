<script>
  import Router from "svelte-spa-router";
  import ChatSidebar from "../components/ChatSidebar.svelte";
  import ChatsEmpty from "./chats/ChatsEmpty.svelte";
  import ChatSingle from "./chats/ChatSingle.svelte";

  const prefix = "/chat";
  const routes = {
    "/:chatId": ChatSingle,
    "/*": ChatsEmpty,
  };
</script>

<main class="chat-grid">
  <ChatSidebar />
  <section class="chat-content">
    <Router {routes} {prefix} />
  </section>
</main>

<style>
  .chat-grid {
    display: grid;
    grid-template-columns: 35% auto;
    height: 100%;
    overflow: hidden;
  }
  .chat-content {
  }
</style>
