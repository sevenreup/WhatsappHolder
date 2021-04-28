<script>
  import { onMount } from "svelte";
  import Router, { location } from "svelte-spa-router";
  import ChatSidebar from "../components/ChatSidebar.svelte";
  import ChatsEmpty from "./chats/ChatsEmpty.svelte";
  import ChatSingle from "./chats/ChatSingle.svelte";
  import { lastChatURL } from "../store";
  import ChatMedia from "./chats/ChatMedia.svelte";
import Modal from "../components/widgets/modal/Modal.svelte";
  export let params = {};

  const prefix = "/chat";
  const routes = {
    "/:chatId": ChatSingle,
    "/:chatId/media": ChatMedia,
    "/*": ChatsEmpty,
  };

  onMount(() => {
    location.subscribe((v) => {
      if (new RegExp("chat*").test(v)) {
        lastChatURL.set(v);
      }
    });
  });
</script>

<Modal>
  <main class="chat-grid">
    <ChatSidebar />
    <section class="chat-content overflow-y-auto p-2  bg-gray-100">
      <Router
        {routes}
        {prefix}
        on:routeLoaded={(e) => console.log(e)}
        restoreScrollState={true}
      />
    </section>
  </main>
</Modal>

<style>
  .chat-grid {
    display: grid;
    grid-template-columns: 25% auto;
    height: 100%;
    overflow: hidden;
  }

</style>
