<script>
  import { onMount } from "svelte";
  import AttachmentList from "../../components/widgets/list/AttachmentList.svelte";
  import { getAllMedia, allMedia } from "../../store/socket-store";
  export let params = {};

  let files = [];

  const unsub = allMedia.subscribe(value => files = value)
  onMount(() => {
    getAllMedia(params.chatId);
  });
</script>

<div>
  <div>
    <span>close</span>
    <h4>Toolbar</h4>
  </div>
  <div class="flex flex-row flex-wrap">
    <AttachmentList {files} id={params.chatId} isLarge={true}/>
  </div>
</div>
