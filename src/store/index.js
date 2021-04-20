import {
    writable
} from 'svelte/store';
const BASEURL = writable('');
const activeChat = writable({
    doc: {
        config: {},
        messages: [],
        users: {}
    }
});
const lastChatURL = writable('/chat');

export {
    activeChat,
    lastChatURL
}