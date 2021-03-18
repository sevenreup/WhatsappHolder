<script>
  import api from "../api";
  import Dropzone from "svelte-file-dropzone";
  import ProgressBar from "../components/widgets/ProgressBar.svelte";
  import { uploadProgress } from "../store/socket-store";
  import ImportIcon from "../components/icons/ImportIcon.svelte";
  import ChatIcon from "../components/icons/ChatIcon.svelte";
  import ImportCompleteCard from "../components/import/ImportCompleteCard.svelte";

  let files = {
    accepted: [
      {
        type: "application/x-zip-compressed",
        name: "whatsapp-chat-parser-example.5e7bb875.zip",
      },
      { name: "OPEN_SOURCE_SOFTWARE_NOTICE.txt", type: "text/plain" },
    ],
    rejected: [],
  };
  let uploadStats = {
    uploading: false,
    percentage: 0,
    title: "Uploading files.",
  };
  let step = 2;
  let users = [{ name: "s" }, { name: "ss" }, { name: "sd" }, { name: "sg" }];
  uploadProgress.subscribe((value) => {
    if (value) {
      uploadStats.title = value.status;
    }
    console.log(value);
  });
  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
    console.log(acceptedFiles);
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
          <div class="flex">
            {#each files.accepted as file}
              <div class="flex p-4 bg-gray-100 m-2 rounded-3xl">
                {#if file.type == "text/plain"}
                  <ImportIcon classList="h-8 w-8" />
                {:else}
                  <ChatIcon classList="h-8 w-8" />
                {/if}
                <p class="ml-2"><span>{file.name}</span></p>
              </div>
              <ProgressBar
                set={uploadStats.percentage}
                undetermined={true}
                title={uploadStats.title}
              />
            {/each}
          </div>
          <div class="mt-4">
            <button class="w-full">Upload</button>
          </div>
        {:else}
          <ImportCompleteCard {users} />
        {/if}
      </div>
    </div>
  </div>
  <button on:click={upload}>upload</button>
</main>

<style>
  :global(.drop-zone) {
    background-color: white !important;
    padding: 20px;
    display: block !important;
    border-style: none !important;
    border-radius: 20px !important;
    cursor: pointer;
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
</style>
