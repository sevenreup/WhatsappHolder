<script>
  export let width;
</script>

<div class="searchbar fixed p-2" style="width: {width}px;">
  <form action="">
    <input
      type="text"
      placeholder="Search"
      class="pb-2 pt-2 rounded-full text-black dark:text-gray-100 w-full caret-primary-500 bg-gray-100 dark:bg-dark-600 pr-4 pl-10 "
    />
    <div
      class="absolute left-0 top-0 pb-2 pl-4 pt-4 text-xs text-gray-700 z-10"
    >
      <i class="material-icons icon text-xl select-none duration-200 ease-in"
        >search</i
      >
    </div>
  </form>
</div>

<style>
</style>
