<script>
  import api from "../../api";
  import Dropzone from "svelte-file-dropzone";
  import { uploadProgress, sendImportDetails } from "../../store/socket-store";
  import ImportCompleteCard from "./ImportCompleteCard.svelte";
  import ImportFileOptionsCard from "./ImportFileOptionsCard.svelte";

  let files = {
    accepted: [],
    rejected: [],
  };
  let uploadStats = {
    uploading: false,
    percentage: 0,
    title: "Uploading files.",
  };
  $: step = 0;
  let users = [];

  uploadProgress.subscribe((value) => {
    if (value) {
      uploadStats.title = value.status;
      if (value.status === "finished") {
        users = value.names;
        step = 2;
        uploadStats.id = value.id;
      }
    }
    console.log(value);
  });
  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
    console.log(files);
    step = 1;
  }

  function upload() {
    uploadStats.uploading = true;
    let formData = new FormData();
    for (let file of files.accepted) {
      formData.append("files", file);
    }
    api
      .post(
        "/upload/files",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            uploadStats.percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          },
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function finishImport({ detail }) {
    const data = { ...detail, id: uploadStats.id };
    console.log(data);
    sendImportDetails(data)
  }
</script>

<main>
  <div class="text-center container p-8 bg-blue-100 m-auto rounded-3xl">
    <div>
      <h1>Upload the backup files</h1>
      <p>These are either .json (messages only) or .zip (messages and media)</p>
    </div>

    <div class="w-8/12 relative m-auto top-16">
      <div class="p-5 bg-white rounded-lg shadow-lg">
        {#if step == 0}
          <Dropzone
            containerClasses="drop-zone"
            on:drop={handleFilesSelect}
            accept={["text/plain", "application/zip", ".zip"]}
          >
            <p class="border-2 border-dashed p-6">
              Drag & Drop files here to upload <br /> Browse
            </p>
          </Dropzone>
        {:else if step == 1}
          <ImportFileOptionsCard
            files={files.accepted}
            percentage={uploadStats.percentage}
            title={uploadStats.title}
            {upload}
          />
        {:else}
          <ImportCompleteCard {users} on:completed={finishImport} />
        {/if}
      </div>
    </div>
  </div>
</main>

<style>
  :global(.drop-zone) {
    background-color: transparent !important;
    padding: 0px;
    display: block !important;
    border-style: none !important;
    cursor: pointer;
  }
</style>
