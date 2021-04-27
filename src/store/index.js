import {
    writable
} from 'svelte/store';
const BASEURL = writable('');
const activeChat = writable({
    users: []
});
const lastChatURL = writable('/chat');

export {
    activeChat,
    lastChatURL
}