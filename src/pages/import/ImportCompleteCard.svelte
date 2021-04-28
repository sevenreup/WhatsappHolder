<script>
  import { createEventDispatcher } from "svelte";
  import UserSelect from "../../components/widgets/UserSelect.svelte";
  import { createFieldValidator } from "../../components/validation/validation";
  import { requiredValidator } from "../../components/validation/validators";
  const dispatch = createEventDispatcher();

  export let users = [];

  const [validity, validate] = createFieldValidator(requiredValidator());

  let name = null;
  let useImports = false;
  let selected = null;
</script>

<div>
  <div class="text-left">
    <label for="">Chat name</label>
    <input
      class="mt-2 px-3 py-3 placeholder-blue-300 text-blue-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
      type="text"
      placeholder="Type or select chat name"
      required
      class:border-red-500={!$validity.valid}
      use:validate={name}
      bind:value={name}
      list="users"
    />
    <datalist id="users">
      {#each users as user}
        <option value={user} />
      {/each}
    </datalist>
    {#if $validity.dirty && !$validity.valid}
      <span class="text-red-500">{$validity.message}</span>
    {/if}
  </div>
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
      on:click={() => {
        if (name.length > 0) {
          dispatch("completed", { selectedUser: selected, useImports, name });
        }
      }}
      class="w-full p-2 bg-blue-800 text-white rounded-xl">Finish</button
    >
  </div>
</div>
