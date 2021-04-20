<script>
  import AudioPlayer from "./AudioPlayer.svelte";
  import VideoPlayer from "svelte-video-player";

  export let attachment;
  export let path;

  console.log(attachment);
  function getPath(file) {
    return "http://localhost:8069/" + path + "/" + file;
  }
</script>

{#if attachment.ext == "mp3" || attachment.ext == "mp4"}
  {#if attachment.ext == "mp3"}
    <AudioPlayer src={getPath(attachment.fileName)} />
  {:else}
    <div class="player">
      <VideoPlayer
        width="500"
        height="500"
        source={getPath(attachment.fileName)}
      />
    </div>
  {/if}
{:else if attachment.ext == "jpg"}
  <img src={getPath(attachment.fileName)} alt={attachment.fileName} />
{:else}
<div class="bg-gray-200">
   doc or file
</div>
 
{/if}

<style>
  .player {
    width: 500px;
  }
</style>
