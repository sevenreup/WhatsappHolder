const PORT = 8069;
require('../src/electron/server').app.listen(PORT,() => {
    console.log("Server is up");
})