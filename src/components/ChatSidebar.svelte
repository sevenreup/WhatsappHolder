<script>
  import { onMount } from "svelte";
  import active from "svelte-spa-router/active";
  import { push, replace } from "svelte-spa-router";
  import InfiniteScroll from "./widgets/list/InfiniteScroll.svelte";
  import SearchBar from "./widgets/SearchBar.svelte";
  import { getAllChats, chats, searchChat } from "../store/socket-store";
  import { getApiPath } from "../util/appUtil";

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
  let text = "";

  function search(text) {
    if (text.length >= 2) {
      searchChat(text);
    }
  }

  $: search(text);
</script>

<nav bind:clientWidth={sidebar}>
  <SearchBar
    width={sidebar}
    bind:text
    on:clear={() => {
      getAllChats();
    }}
  />
  <div class="p-9 mt-5" bind:this={chatList}>
    {#each data as item}
      <div
        class="cursor-pointer rounded-3xl p-2 my-2 chat"
        use:active={{
          path: `/chat/${item._id}`,
          className: "bg-gradient-to-r from-green-400 to-blue-500 text-white",
          inactiveClassName: "",
        }}
        on:click={() => {
          selected = item._id;
          push(`/chat/${item._id}`);
        }}
      >
        <div class="w-full flex justify-end">
          <span class="text-right font-bold">19:08</span>
        </div>
        <div class="flex">
          <img
            src={getApiPath(item.img)}
            alt={item.name}
            class="rounded-full w-12 h-12 m-auto"
          />
          <div class="p-1 pl-2">
            <span class="subtitle-1 font-semibold">{item.name}</span>
            <span class="text"
              >This is a sample preview message and it view message.</span
            >
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

  .chat .text {
    /* width: 300px; */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
