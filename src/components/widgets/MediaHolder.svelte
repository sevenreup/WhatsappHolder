<script>
  import AudioPlayer from "./AudioPlayer.svelte";
  import VideoPlayer from "svelte-video-player";
  import FileHolder from "./FileHolder.svelte";
  import { getMediaPath } from "../../util/appUtil";
  import { onMount } from "svelte";
  import { getThumbnails } from "video-metadata-thumbnails";

  export let attachment;
  export let path;

  let poster = "";

  function getPath() {
    return getMediaPath(path, attachment.fileName);
  }

  onMount(() => {
    if (attachment.ext == "mp4")
      getThumbnails(getPath())
        .then((value) => {
          poster = URL.createObjectURL(value[0].blob);
        })
        .catch((err) => {
          console.log(err);
        });
  });
</script>

{#if attachment.ext == "mp3" || attachment.ext == "mp4"}
  {#if attachment.ext == "mp3"}
    <AudioPlayer src={getPath()} />
  {:else}
    <div class="player">
      <VideoPlayer width="500" height="500" {poster} source={getPath()} />
    </div>
  {/if}
{:else if attachment.ext == "jpg"}
  <img src={getPath()} alt={attachment.fileName} />
{:else}
  <FileHolder {attachment} />
{/if}

<style>
  .player {
    width: 500px;
  }
</style>
