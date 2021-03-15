<script>
  import api from "../api";
  import Dropzone from "svelte-file-dropzone";

  let files = {
    accepted: [],
    rejected: [],
  };

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
  }

  function upload() {
    let formData = new FormData();
    for (let file of files.accepted) {
      formData.append("files", file);
    }
    console.log(files);
    console.log(formData);
    api
      .post("/upload/files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
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
</main>
