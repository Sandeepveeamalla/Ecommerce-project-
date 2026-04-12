package com.example.product_service.service;

import com.example.product_service.dto.CartEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    private final ProductService productService;

    public KafkaConsumerService(ProductService productService) {
        this.productService = productService;
    }

    @KafkaListener(topics = "cart-topic", groupId = "product-service-group")
    public void consumeCartEvent(CartEvent event) {
        System.out.println("Received event from Kafka: " + event);

        if ("ADD".equals(event.getEventType())) {
            productService.reduceStock(event.getProductId().longValue(), event.getQuantity());
            System.out.println("Stock reduced for product: " + event.getProductId());
        } else if ("REMOVE".equals(event.getEventType())) {
            productService.increaseStock(event.getProductId().longValue(), event.getQuantity());
            System.out.println("Stock increased for product: " + event.getProductId());
        }
    }
}