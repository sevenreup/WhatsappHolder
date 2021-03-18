<script>
  import { slide } from "svelte/transition";
  export let items = [];
  export let key = "name";
  export let selected = null;
  let show = false;
</script>

<div class="mt-1 relative">
  <button
    type="button"
    aria-haspopup="listbox"
    aria-expanded="true"
    aria-labelledby="listbox-label"
    on:click={() => (show = !show)}
    class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    {#if selected !== null}
      <span class="flex items-center">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          class="flex-shrink-0 h-6 w-6 rounded-full"
        />
        <span class="ml-3 block truncate"> {selected[key]} </span>
      </span>
    {:else}
      <span class="flex items-center h-6">
        <span class="ml-3 block truncate">Select User</span>
      </span>
    {/if}
    <span
      class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
    >
      <!-- Heroicon name: solid/selector -->
      <svg
        class="h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
  </button>
  {#if show}
    <div
      class="absolute mt-1 w-full rounded-md bg-white shadow-lg"
      transition:slide={{ duration: 1000 }}
    >
      <ul
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-item-3"
        class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      >
        {#each items as item}
          <li
            id="listbox-item-0"
            role="option"
            class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
            on:click={() => (selected = item)}
          >
            <div class="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                alt=""
                class="flex-shrink-0 h-6 w-6 rounded-full"
              />
              <span class="ml-3 block font-normal truncate"> {item[key]} </span>
            </div>
            {#if selected === item}
              <span class="absolute inset-y-0 right-0 flex items-center pr-4">
                <!-- Heroicon name: solid/check -->
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
