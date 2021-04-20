<script>
  import { activeChat } from "../../store";
import { openFileElectron } from "../../store/socket-store";

  export let attachment;

  function openFile() {
      if(chat !== null) {
          if (chat.doc.config !== null && chat.doc.config !== undefined) {
              const folder = chat.doc.config.folder
              console.log(folder);
              openFileElectron(folder, attachment.fileName)
          }
      }
  }

  let chat = null;
  const unsub = activeChat.subscribe((value) => {
    chat = value;
  });
</script>

<div class="bg-white p-2 rounded-full" on:click={() => openFile()}>
  <span class="text-black">{attachment.fileName}</span>
  <span class="bg-gray-400 text-white rounded-full p-1">Open</span>
</div>
