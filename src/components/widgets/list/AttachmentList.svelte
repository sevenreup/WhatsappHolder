<script>
  import { getContext } from "svelte";
  import AttachmentCard from "../AttachmentCard.svelte";
  import CloseButton from "../modal/CloseButton.svelte";
  import MediaModal from "../modal/MediaModal.svelte";
  export let files = [];
  export let id;
  export let isLarge = false;

  const { open } = getContext("simple-modal");

  function openModal(file) {
    open(
      MediaModal,
      { attachment: file.attachment, path: id },
      {
        closeButton: CloseButton,
        styleWindow: {
          background: "transparent",
        },
      }
    );
  }
</script>

{#each files as file}
  <AttachmentCard
    attachment={file.attachment}
    {id}
    {isLarge}
    on:click={() => openModal(file)}
  />
{/each}
