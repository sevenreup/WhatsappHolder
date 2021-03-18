<script>
  import ChatIcon from "../../components/icons/ChatIcon.svelte";
  import ImportIcon from "../../components/icons/ImportIcon.svelte";
  import ProgressBar from "../../components/widgets/ProgressBar.svelte";

  export let files = [];
  export let percentage;
  export let title;
  export let upload;
</script>

<div class="flex">
  {#each files as file}
    <div class="flex p-4 bg-gray-100 m-2 rounded-3xl">
      {#if file.type == "text/plain"}
        <ImportIcon classList="h-8 w-8" />
      {:else}
        <ChatIcon classList="h-8 w-8" />
      {/if}
      <p class="ml-2"><span>{file.name}</span></p>
    </div>
  {/each}
</div>
<ProgressBar set={percentage} undetermined={true} {title} />
<div>
  <button on:click={upload} class="w-full p-2 rounded-lg bg-blue-800 text-white"
    >upload</button
  >
</div>
