<script>
   import { createEventDispatcher } from "svelte";
  import UserSelect from "../../components/widgets/UserSelect.svelte";
  const dispatch = createEventDispatcher();

  export let users = [];
  let useImports = false;
  let selected = null;
</script>

<div>
  <div class="flex justify-between items-center p-5">
    <h2>You are available in this chat</h2>
    <div
      on:click={() => (useImports = !useImports)}
      class="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out {useImports
        ? 'bg-green-400'
        : ''}"
    >
      <div
        class="bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out {useImports
          ? 'translate-x-5'
          : ''}"
      />
    </div>
  </div>
  {#if useImports}
    <div>
      <div>
        <label class="block text-sm font-medium text-gray-700" for="user"
          >Select your user name</label
        >
        <UserSelect items={users} bind:selected />
      </div>
    </div>
  {/if}

  <div class="mt-4">
    <button
      on:click={() =>
        dispatch("completed", { selectedUser: selected, useImports })}
      class="w-full p-2 bg-blue-800 text-white rounded-xl">Finish</button
    >
  </div>
</div>
