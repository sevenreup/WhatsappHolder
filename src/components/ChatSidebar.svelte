<script>
  import { onMount } from "svelte";
  import active from "svelte-spa-router/active";
  import { push, replace } from "svelte-spa-router";
  import InfiniteScroll from "./widgets/list/InfiniteScroll.svelte";
  import SearchBar from "./widgets/SearchBar.svelte";
  import { getAllChats, chats } from "../store/socket-store";
  import { activeChat } from "../store";

  async function fetchData() {
    await getAllChats();
  }

  onMount(() => {
    fetchData();
  });

  let data = [];
  const unsubscribe = chats.subscribe((value) => {
    data = value;
  });
  let page = 0;
  let selected;
  let chatList;
  let sidebar;
</script>

<nav bind:clientWidth={sidebar}>
  <SearchBar width={sidebar} />
  <div class="p-9 mt-5" bind:this={chatList}>
    {#each data as item}
      <div
        class="cursor-pointer rounded-3xl p-2 my-2 chat flex"
        use:active={{
          path: `/chat/${item.id}`,
          className: "bg-gradient-to-r from-blue-600 to-blue-300 text-white",
          inactiveClassName: "",
        }}
        on:click={() => {
          selected = item.id;
          activeChat.set(item)
          push(`/chat/${item.id}`);
        }}
      >
        <img
          src="https://placeimg.com/80/80/animals"
          alt={item.doc.name}
          class="rounded-full w-12 h-12 m-auto"
        />
        <div class="p-2">
          <span class="subtitle-1 font-semibold">{item.doc.name}</span>
          <div class="flex">
            <span class="w-10/12 truncate"
              >This is a sample preview message</span
            >
            <span>19:08</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <InfiniteScroll
    hasMore={data.length}
    threshold={100}
    elementScroll={chatList}
    on:loadMore={() => {
      page++;
      fetchData();
    }}
  />
</nav>

<style>
  nav {
    overflow-y: scroll;
  }

  .chat {
  }
</style>
