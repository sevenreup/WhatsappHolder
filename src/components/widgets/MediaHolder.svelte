<script>
  import AudioPlayer from "./AudioPlayer.svelte";
  import VideoPlayer from "svelte-video-player";
  import FileHolder from "./FileHolder.svelte";

  export let attachment;
  export let path;

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
  <FileHolder {attachment} />
{/if}

<style>
  .player {
    width: 500px;
  }
</style>
