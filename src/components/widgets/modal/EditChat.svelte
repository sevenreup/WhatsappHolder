<script>
  import {
    FormField,
    Modal,
    Switch,
    TextField,
    FileDropzone,
    Dialog,
    Button,
  } from "attractions";
  export let open = false;

  let chat = {
    name: null,
    desc: null,
    img: "img/placeholder.jpg",
    isGroup: false,
  };
</script>

<Modal bind:open let:closeCallback noClickaway>
  <Dialog {closeCallback} title="Edit Chat">
    <div class="p-3">
      <div>
        <h5>Image</h5>
        <img src={chat.img} alt="chat profile" class=" m-auto" width="200" />
        <FileDropzone accept="image/*" max={1} />
      </div>
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
    <Button filled class="w-full text-center inline-block btn">Save</Button>
  </Dialog>
</Modal>

<style global>
  .btn {
    display: inline-block !important;
  }
</style>
