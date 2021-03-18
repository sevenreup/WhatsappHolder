<script>
  import UserSelect from "../../components/widgets/UserSelect.svelte";

  let users = Array(20)
    .fill()
    .map((_, index) => ({
      name: "p ie_" + index,
    }));
  let toggleActive = false;
</script>

<div>
  <div
    class="flex justify-between items-center p-5"
    on:click={() => (toggleActive = !toggleActive)}
  >
    <h2>Use extracted names</h2>
    <div
      class="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out {toggleActive
        ? 'bg-green-400'
        : ''}"
    >
      <div
        class="bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out {toggleActive
          ? 'translate-x-5'
          : ''}"
      />
    </div>
  </div>
  <div>
    <div>
      <label class="block text-sm font-medium text-gray-700" for="user"
        >Select your user name</label
      >
      <UserSelect items={users} />
    </div>
  </div>
  <div class="mt-4">
    <button class="w-full p-2 bg-blue-800 text-white rounded-xl">Finish</button>
  </div>
</div>
