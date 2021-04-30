<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import ChatHeader from "../../components/widgets/ChatHeader.svelte";
  import ChatInfoSidebar from "../../components/widgets/ChatInfoSidebar.svelte";
  import MessageList from "../../components/widgets/MessageList.svelte";
  import { activeChat } from "../../store";
  import {
    getChatMediaPreview,
    getAllMessages,
    messages,
getChat,
  } from "../../store/socket-store";
  export let params = {};

  let page = 0;
  let openSidebar = false;

  let chat = {};
  let participants = {};
  let id;
  let messagesData = [];

  const unsubscribe = activeChat.subscribe((value) => {
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

  onMount(() => {
    if (chat._id == null && chat._id == undefined) {
      const id = params.chatId;
      getChat(id)
    }
  });
</script>

<main class="h-full overflow-hidden flex" transition:fade>
  <div
    class="message-container h-full w-full transition-all duration-500 ease-in-out"
    style="margin-right: {openSidebar ? '300px' : '0px'};"
  >
    <ChatHeader {chat} on:openSidebar={() => (openSidebar = !openSidebar)} />
    <MessageList bind:page messages={messagesData} {participants} chatID={id} />
  </div>
  <ChatInfoSidebar
    open={openSidebar}
    {chat}
    on:close={() => (openSidebar = !openSidebar)}
  />
</main>
