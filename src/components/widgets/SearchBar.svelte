<script>
  import { TextField } from "attractions";
  import { SearchIcon } from "svelte-feather-icons";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let width;
  export let text = "";
</script>

<div class="searchbar fixed p-2" style="width: {width}px;">
  <form action="">
    <TextField
      withItem
      type="search"
      placeholder="Search"
      bind:value={text}
      on:input={(value, nativeEvent) => {
        console.log({ value, nativeEvent });
        const text = value.detail.valaue;

        if (text !== null && text !== undefined) {
          if (text.length <= 0) {
            dispatch("clear");
          }
        } else {
          dispatch("clear");
        }
      }}
    >
      <SearchIcon class="item" size="24" />
    </TextField>
    <div
      class="absolute left-0 top-0 pb-2 pl-4 pt-4 text-xs text-gray-700 z-10"
    />
  </form>
</div>

<style>
</style>
