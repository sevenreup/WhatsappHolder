
# WhatsApp Holder
So this project just started because I have some random backups of my messages from WhatsApp chilling in my PC and I thought it would be cool if I could view them. So I created an electron app like any sane human out there.

The process to get this to work is relatively simple. Export your WhatsApp chat inside the app with or without the media, then import it into the app. This is probably for people who want to keep their important messages and still have a clean chat (😑😑 No idea why you'd want that).
All messages are kept localy and will be converted to a format the app can use. So you can move those around.
## Dev Stuff
This project is using Svelte for the UI and its running in Electron. You get all the cross platform goodness of Electron.
### Setup

 - clone the repo
 - `yarn` ( you can use `npm install` )
 - `yarn run start` (to launch the electron with hot reload)
 - `yarn run package` (to build the binaries for your system)

## Future plans (all lies)

- pin chats
- import contacts to associate with chats
- import chats from other messengers

## Problems 

- I cant seem to make pouchdb-browser work with svelte (probably a problem with my rollup config) **Temp fix** - Just use sockets for the communication to electron
> 
