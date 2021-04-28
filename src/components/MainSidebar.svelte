<script>
  import { push } from "svelte-spa-router";
  import { lastChatURL } from "../store";
  import ChatIcon from "./icons/ChatIcon.svelte";
  import ImportIcon from "./icons/ImportIcon.svelte";
  import active from "svelte-spa-router/active";

  let currentHome = "/chat";
  const unsubscribe = lastChatURL.subscribe((value) => {
    currentHome = value;
  });

  let links = [{ path: "/import", icon: ImportIcon, name: "Import" }];
</script>

<main class="flex flex-col">
  <button
    on:click={() => push(currentHome)}
    use:active={{
      path: "/chat/*",
      className:
        "bg-gradient-to-r from-green-400 to-blue-500 text-white active",
      inactiveClassName: "",
    }}
    class="cursor-pointer m-auto  my-2 rounded-full p-2 fill-current text-gray-400 bg-gray-100 hover:bg-gray-300 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
  >
    <svelte:component this={ChatIcon} classList="w-6 h-6" />
  </button>
  {#each links as { path, icon, name }}
    <button
      on:click={() => push(path)}
      use:active={{
        path: path,
        className: "bg-gradient-to-r from-green-400 to-blue-500 text-white active",
        inactiveClassName: "",
      }}
      class="cursor-pointer m-auto w-10 h-10 my-2 rounded-full p-2 fill-current text-gray-400 bg-gray-100 hover:bg-gray-300  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
    >
      <svelte:component this={icon} classList="w-6 h-6" />
    </button>
  {/each}
</main>
