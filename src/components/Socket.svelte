<script>
    import io from 'socket.io-client';

    const socket = io('http://localhost:8069')

    socket.on('uploading', () => {

    })
</script>