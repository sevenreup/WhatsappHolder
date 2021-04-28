<nav class="toolbar flex bg-gray-400">
  <div class="drag-region" />
  <!-- svelte-ignore a11y-missing-attribute -->
  <!-- svelte-ignore a11y-missing-content -->
  <a class="window-appicon" style="-webkit-app-region: no-drag;" />
  <span class="m-auto">WhatsHolder</span>
</nav>

<style>
  .toolbar {
    grid-column-start: 1;
    grid-column-end: span 2;
    height: 30px;
    width: 100%;
    z-index: 10000000000;
    position: absolute;
  }
  .drag-region {
    top: 0;
    left: 0;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-app-region: drag;
  }
  .window-appicon {
    width: 35px;
    height: 100%;
    position: relative;
    z-index: 3000;
    flex-shrink: 0;
    background-image: url("/img/chat.svg");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 16px;
  }
</style>
