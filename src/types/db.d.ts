interface User {
    id: string;
    email: string;
    name: string;
    image: string;
}

interface Chat {
    id: string;
    mesaages: Message[]
}

interface FriendRequest {
    id: string;
    senderID: string;
    recieverID: string;
}