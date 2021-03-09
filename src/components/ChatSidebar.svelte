<script>
  import { onMount } from "svelte";
  import active from "svelte-spa-router/active";
  import { List } from "smelte";
  import { push } from "svelte-spa-router";
  import InfiniteScroll from "./utils/InfiniteScroll.svelte";

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
    newBatch =  [
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
</script>

<nav>
  <List bind:value={selected} items={data} dense navigation>
    <li slot="item" let:item>
      <div
        class="cursor-pointer p-4 border-alert-50 border my-2 border-solid"
        use:active={{
          path: `/chat/${item.id}`,
          className: "bg-alert-50",
          inactiveClassName: "",
        }}
        on:click={() => {
          selected = item.id;
          push(`/chat/${item.id}`);
        }}
      >
        {selected === item.id ? "👌" : "🙅‍"}
        {item.name}
      </div>
    </li>
  </List>
  <InfiniteScroll
    hasMore={newBatch.length}
    threshold={100}
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
</style>
