package com.example.cart_service.service;

import com.example.cart_service.dto.CartEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CartKafkaConsumer {

    @KafkaListener(topics = "cart-topic", groupId = "product-service-group")
    public void consume(CartEvent event) {
        log.info("Received Cart Event: {}", event);

        // Example handling
        switch (event.getEventType()) {
            case "ADD":
                log.info("Add item to cart: {}", event);
                break;
            case "REMOVE":
                log.info("Remove item from cart: {}", event);
                break;
            default:
                log.warn("Unknown event type");
        }
    }
}