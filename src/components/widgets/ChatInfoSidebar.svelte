<script>
  export let open = false;

  let width;
</script>

<main
  class="h-full fixed right-0 transition duration-500 ease-in-out"
  bind:clientWidth={width}
  style="width: 300px; {!open ? 'transform: translateX(300px)' : ''}"
>
  <div>
    <img
      src="https://placeimg.com/100/100/animals"
      alt="profile"
      class="rounded-full w-28 h-28 m-auto"
    />
  </div>
</main>
