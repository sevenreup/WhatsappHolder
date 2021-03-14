<script>
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';
  import { location } from "svelte-spa-router";
  import ChatHeader from "../../components/widgets/ChatHeader.svelte";
  import ChatInfoSidebar from "../../components/widgets/ChatInfoSidebar.svelte";
  import MessageList from "../../components/widgets/MessageList.svelte";
  export let params = {};

  let page = 0;
  let openSidebar = false;

  $: user = {
    id: params.chatId,
    name: "Jon A (" + params.chatId + ")",
    isGroup: params.chatId % 3,
  };

  onMount(() => {
    location.subscribe((v) => console.log(v, params));
    console.log(location);
  });
</script>

<main class="h-full overflow-hidden flex" transition:fade>
  <div
    class="message-container h-full w-full transition-all duration-500 ease-in-out"
    style="margin-right: {openSidebar ? '300px' : '0px'};"
  >
    <ChatHeader
      chat={user}
      on:openSidebar={() => (openSidebar = !openSidebar)}
    />
    <MessageList bind:page />
  </div>
  <ChatInfoSidebar
    open={openSidebar}
    {user}
    on:close={() => (openSidebar = !openSidebar)}
  />
</main>
