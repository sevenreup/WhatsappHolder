<script>
  import { onMount } from "svelte";
  import AttachmentList from "../../components/widgets/list/AttachmentList.svelte";
  import { getAllMedia, allMedia } from "../../store/socket-store";
  import IoIosArrowRoundBack from 'svelte-icons/io/IoIosArrowRoundBack.svelte'
  import { pop } from "svelte-spa-router";
  export let params = {};

  let files = [];

  const unsub = allMedia.subscribe((value) => (files = value));
  onMount(() => {
    getAllMedia(params.chatId);
  });
</script>

<div>
  <div class="w-full p-2">
    <button class="icon bg-white rounded-full" on:click={() => pop()}>
      <IoIosArrowRoundBack />
    </button>
  </div>
  <div class="flex flex-row flex-wrap">
    <AttachmentList {files} id={params.chatId} isLarge={true} />
  </div>
</div>
