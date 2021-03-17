<script>
  import api from "../api";
  import Dropzone from "svelte-file-dropzone";
  import ProgressBar from "../components/widgets/ProgressBar.svelte";
  import { uploadProgress } from "../store/socket-store";

  let files = {
    accepted: [],
    rejected: [],
  };

  let uploadStats = {
    uploading: false,
    percentage: 0,
    title: "Uploading files.",
  };
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
  <Dropzone
    on:drop={handleFilesSelect}
    accept={["text/plain", "application/zip", ".zip"]}
  />
  <button on:click={upload}>upload</button>

  <ProgressBar
    set={uploadStats.percentage}
    undetermined={true}
    title={uploadStats.title}
  />
</main>
