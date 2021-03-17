<script>
  import { tweened } from "svelte/motion";

  import { cubicOut } from "svelte/easing";

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  export let set = 0;
  export let undetermined = true;
  export let title = "";

  $: progress.set(set);
</script>

<div class="relative pt-1">
  <div class="flex mb-2 items-center justify-between">
    <div>
      <span
        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200"
      >
        Task: {title}
      </span>
    </div>
    <div class="text-right">
      <span class="text-xs font-semibold inline-block text-pink-600">
        {undetermined ? "" : `${$progress}%`}
      </span>
    </div>
  </div>
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
    <div
      style={!undetermined ? `width: ${$progress}%;` : ""}
      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500 {undetermined
        ? 'undetermined'
        : ''}"
    />
  </div>
</div>

<style>
  .undetermined {
    animation: undetermined 5s infinite;
  }
  @keyframes undetermined {
    0% {
      width: 0%;
    }
    50% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
</style>
