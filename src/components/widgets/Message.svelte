<script>
  export let item;
</script>

<div
  class="list-item  justify-items-end relative {item.isOwner
    ? 'sender flex justify-end'
    : 'reciever inline-flex justify-start'}"
>
  <div class={item.isOwner ? "ml-2 order-1" : "mr-2"}>
    <img
      src="https://placeimg.com/80/80/animals"
      alt="profile"
      class="rounded-full w-12 h-12 m-auto"
    />
  </div>
  <div class="max-w-3xl relative {item.isOwner ? 'justify-end items-end' : ''}">
    <p
      class="rounded-t-3xl p-2 text-white {item.isOwner
        ? 'bg-indigo-400  rounded-bl-3xl'
        : 'bg-blue-400 rounded-br-3xl'}"
    >
      {item.message}
    </p>
    <div class={item.isOwner ? "text-right" : "text-left"}>
      <time>{!item.isOwner ? item.author : ""} 9: 00</time>
    </div>
  </div>
</div>

<style>
</style>
