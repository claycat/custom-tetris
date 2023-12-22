/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type ReactElement, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp, { type Client } from "webstomp-client";

const TetrisGame = (): ReactElement => {
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        const socket = new SockJS(`http://localhost:8080/ws`);
        const client = Stomp.over(socket);

        client.connect({}, (frame) => {
            console.log("Connected: ");
            setStompClient(client);

            client.subscribe("/topic/messages", (message) => {
                console.log("Received: " + message.body);
            });
        });

        return () => {
            if (client?.connected) {
                client.disconnect();
            }
        };
    }, []);

    const sendMessage = (msg: unknown): void => {
        if (stompClient?.connected) {
            stompClient.send("/app/send-message", JSON.stringify(msg));
        } else {
            console.log("Connection not established.");
        }
    };

    // Example of how to use sendMessage
    // You can call this function on some event like button click
    const handleSendMessage = (): void => {
        sendMessage({ text: "Hello, World!" });
    };

    return (
        <div>
            {/* Your game rendering logic */}
            <button onClick={handleSendMessage}>Send Message</button>
        </div>
    );
};

export default TetrisGame;
