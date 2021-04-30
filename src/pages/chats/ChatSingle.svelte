<script>
  import { fade } from "svelte/transition";
  import ChatHeader from "../../components/widgets/ChatHeader.svelte";
  import ChatInfoSidebar from "../../components/widgets/ChatInfoSidebar.svelte";
  import MessageList from "../../components/widgets/MessageList.svelte";
  import { activeChat } from "../../store";
  import {
    getChatMediaPreview,
    getAllMessages,
    messages,
  } from "../../store/socket-store";
  export let params = {};

  let page = 0;
  let openSidebar = false;

  let chat = {};
  let participants = {};
  let id;
  let messagesData = [];

  const unsubscribe = activeChat.subscribe((value) => {
    console.log(value);
    chat = value;
    participants = value.users;
    id = value._id;
    if (id !== null && id !== undefined) {
      getAllMessages(id);
      getChatMediaPreview(id);
    }
  });

  const unsubMesages = messages.subscribe((value) => {
    messagesData = value;
  });
</script>

<main class="h-full overflow-hidden flex" transition:fade>
  <div
    class="message-container h-full w-full transition-all duration-500 ease-in-out"
    style="margin-right: {openSidebar ? '300px' : '0px'};"
  >
    <ChatHeader
      {chat}
      on:openSidebar={() => (openSidebar = !openSidebar)}
    />
    <MessageList bind:page messages={messagesData} {participants} chatID={id} />
  </div>
  <ChatInfoSidebar
    open={openSidebar}
    {chat}
    on:close={() => (openSidebar = !openSidebar)}
  />
</main>
