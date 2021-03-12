<script>
  export let item;
</script>

<div class="list-item flex {item.isOwner ? 'sender' : 'reciever'}">
  <div classname="">
    <p>{item.message}</p>
  </div>
</div>

<style>
</style>
