<script>
  import { createEventDispatcher } from "svelte";
  import Collapsable from "./Collapsable.svelte";
  import { sideInfo } from "../../store/socket-store";
  import { push } from "svelte-spa-router";
  import AttachmentList from "./list/AttachmentList.svelte";
  import IoIosClose from "svelte-icons/io/IoIosClose.svelte";
  import EditChat from "./modal/EditChat.svelte";

  export let open = false;
  export let user = {};
  const dispatch = createEventDispatcher();

  let files = [];

  const unsub = sideInfo.subscribe((value) => {
    files = value;
  });

  let openEdit = false;

  console.log({ user });
</script>

<main
  class="h-full fixed right-0 transition duration-500 ease-in-out overflow-x-scroll"
  style="width: 300px; {!open ? 'transform: translateX(300px)' : ''}"
>
  <div>
    <button
      class="icon bg-white rounded-full"
      on:click={() => dispatch("close")}
    >
      <IoIosClose />
    </button>
  </div>
  <div class="p-2">
    <img src={user.img} alt="profile" class="rounded-full w-28 h-28 m-auto" />
    <p class="text-center text-2xl font-bold mt-2">{user.name}</p>
  </div>

  <Collapsable>
    <h2 slot="title" class="text-lg font-bold">Information</h2>
    <div slot="body" class="mt-2">
      {user.desc !== undefined ? user.desc : "Imported"}
    </div>
  </Collapsable>
  <div class="p-2 mt-3">
    <h2 class="p-2 text-lg font-bold">Shared files</h2>
    <div class="flex flex-row flex-wrap">
      <AttachmentList {files} id={user._id} />
      {#if files.length > 0}
        <div
          class="bg-gray-300 w-28 h-28 rounded-lg m-1"
          on:click={() => push(`/chat/${user._id}/media`)}
        >
          <div class="w-28 h-28 flex flex-col justify-center">
            <span class="text-center font-bold">more</span>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <button
    class="w-full bg-white p-2 rounded-lg flex"
    on:click={() => (openEdit = true)}
  >
    <div class="icon"><IoIosClose /></div>
    <p class="m-auto">Edit Chat</p>
  </button>
  <EditChat bind:open={openEdit} />
</main>
