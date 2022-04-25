const { io } = require("socket.io-client");

class MySocket {

    socket = io('http://localhost:3000');
    static instance = null;
    static createInstance() {
        const object = new MySocket();
        return object;
    }

    static getInstance() {
        if (!MySocket.instance) {
            MySocket.instance = MySocket.createInstance();
        }
        return MySocket.instance;
    }
}

export default MySocket;