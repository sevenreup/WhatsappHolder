<script>
  import { onMount } from "svelte";
  import active from "svelte-spa-router/active";
  import { push } from "svelte-spa-router";
  import InfiniteScroll from "./widgets/list/InfiniteScroll.svelte";
  import SearchBar from "./widgets/SearchBar.svelte";

  let page = 0;
  // but most likely, you'll have to store a token to fetch the next page
  let nextUrl = "";
  // store all the data here.
  let data = [];
  // store the new batch of data here.
  let newBatch = [];

  async function fetchData() {
    // const response = await fetch(
    //   `https://api.openbrewerydb.org/breweries?by_city=los_angeles&page=${page}`
    // );
    newBatch = [
      { id: "1", name: "Jon A" },
      { id: "2", name: "Jon B" },
      { id: "3", name: "Jon C" },
      { id: "4", name: "Jon E" },
    ];
    console.log(newBatch);
  }

  onMount(() => {
    // load first batch onMount
    fetchData();
  });

  $: data = [...data, ...newBatch];

  let selected;
  let chatList;
</script>

<nav class="p-9">
  <SearchBar />
  <div bind:this={chatList}>
    {#each data as item}
      <li let:item>
        <div
          class="cursor-pointer rounded-3xl p-2 my-2 chat flex"
          use:active={{
            path: `/chat/${item.id}`,
            className: "bg-gradient-to-r from-blue-600 to-blue-300 text-white",
            inactiveClassName: "",
          }}
          on:click={() => {
            selected = item.id;
            push(`/chat/${item.id}`);
          }}
        >
          <img
            src="https://placeimg.com/80/80/animals"
            alt={item.name}
            class="rounded-full w-12 h-12 m-auto"
          />
          <div class="p-2">
            <span class="subtitle-1 font-semibold">{item.name}</span>
            <div class="flex">
              <span class="w-10/12 truncate"
                >This is a sample preview message</span
              >
              <span>19:08</span>
            </div>
          </div>
        </div>
      </li>
    {/each}
  </div>
  <InfiniteScroll
    hasMore={newBatch.length}
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
