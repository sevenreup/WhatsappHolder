import {
    writable
} from 'svelte/store';
const BASEURL = writable('');
const activeChat = writable({
    doc: {
        messages: [],
        users: {}
    }
});
const lastChatURL = writable('/chat');

export {
    activeChat,
    lastChatURL
}