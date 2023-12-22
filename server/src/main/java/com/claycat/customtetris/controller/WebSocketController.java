package com.claycat.customtetris.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @MessageMapping("/send-message")
    @SendTo("/topic/messages")
    public String processMessageFromClient(String message) throws Exception {
        System.out.println("message = " + message);
        return "Processed message from server " + message;
    }
}
