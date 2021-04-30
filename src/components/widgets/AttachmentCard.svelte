<script>
  import { getMediaPath } from "../../util/appUtil";
  import { getThumbnails } from "video-metadata-thumbnails";

  export let attachment;
  export let id;
  export let isLarge = false;

  let img;

  function getPath() {
    const { fileName, ext } = attachment;
    if (ext === "jpg") {
      return getMediaPath(id, fileName);
    } else if (ext == "mp4") {
      getVideoThumbnail(getMediaPath(id, fileName))
      return "img/loading.jpg";
    } else {
      return "img/loading.jpg";
    }
  }

  async function getVideoThumbnail(path) {
    const thumb = await getThumbnails(path, { quality: 0.6 });
    img.src = URL.createObjectURL(thumb[0].blob)
  }
</script>

<div class="m-1" on:click>
  <div
    class={`rounded-lg overflow-hidden ${isLarge ? "w-44 h-44" : "w-28 h-28"}`}
  >
    <img bind:this={img} src={getPath()} alt={attachment.fileName} class=" w-full h-full" />
  </div>
</div>
