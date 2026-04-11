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
        productService.reduceStock(event.getProductId(), event.getQuantity());
        System.out.println("Stock updated for product: " + event.getProductId());
    }
}