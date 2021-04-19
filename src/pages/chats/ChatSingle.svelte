<script>
  import { fade } from "svelte/transition";
  import ChatHeader from "../../components/widgets/ChatHeader.svelte";
  import ChatInfoSidebar from "../../components/widgets/ChatInfoSidebar.svelte";
  import MessageList from "../../components/widgets/MessageList.svelte";
  import { activeChat } from "../../store";
  export let params = {};

  let page = 0;
  let openSidebar = false;

  let user = {};
  let participants = {};

  const unsubscribe = activeChat.subscribe(value => {
    user = value.doc
    participants = value.doc.users
    console.log(participants);
  })
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
    <MessageList bind:page messages={user.messages} {participants}/>
  </div>
  <ChatInfoSidebar
    open={openSidebar}
    {user}
    on:close={() => (openSidebar = !openSidebar)}
  />
</main>
