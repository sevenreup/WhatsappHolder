const PORT = 8069;
require('../src/electron/server').http.listen(PORT,() => {
    console.log("Server is up");
})