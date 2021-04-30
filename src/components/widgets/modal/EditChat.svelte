<script>
  import {
    FormField,
    Modal,
    Switch,
    TextField,
    FileDropzone,
    Dialog,
    Button,
    Card,
  } from "attractions";
  import api from "../../../api";
  import { saveChatEdits } from "../../../store/socket-store";
  import { getApiPath } from "../../../util/appUtil";
  export let open = false;

  export let chat = {
    name: null,
    desc: null,
    img: "img/placeholder.jpg",
    isGroup: false,
  };

  export let originalImg;

  let files = [];

  $: if (files.length > 0) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      chat.img = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    chat.img = getApiPath(originalImg);
  }

  function upload() {
    if (files.length > 0) {
      let formData = new FormData();
      for (let file of files) {
        formData.append("files", file);
      }
      api
        .post("/upload/profile/" + chat._id, formData)
        .then((res) => {
          uploadData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      uploadData();
    }
  }

  function uploadData() {
    const data = {
      name: chat.name,
      desc: chat.desc,
      isGroup: chat.name,
    };
    saveChatEdits({ data, id: chat._id });
  }
</script>

<Modal bind:open let:closeCallback noClickaway>
  <Dialog {closeCallback} title="Edit Chat">
    <div class="p-3">
      <Card outline>
        <h5>Image</h5>
        <img src={chat.img} alt="chat profile" class=" m-auto" width="100" />
        <FileDropzone accept="image/*" max={1} bind:files />
      </Card>
      <div class="p-2 mt-2">
        <FormField name="Chatname" required>
          <TextField bind:value={chat.name} />
        </FormField>
        <FormField name="Description">
          <TextField multiline bind:value={chat.desc} />
        </FormField>
        <FormField name="Is group chat">
          <Switch bind:value={chat.isGroup} />
        </FormField>
      </div>
    </div>
    <Button
      filled
      class="w-full text-center inline-block btn"
      on:click={() => {
        upload();
      }}>Save</Button
    >
  </Dialog>
</Modal>

<style global>
  .btn {
    display: inline-block !important;
  }
</style>
