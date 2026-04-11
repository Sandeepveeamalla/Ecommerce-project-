package com.example.product_service.service;

import com.example.product_service.dto.CartEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductKafkaConsumer {

    private final ProductService productService;

    @KafkaListener(topics = "cart-topic", groupId = "product-service-group")
    public void consume(CartEvent event) {

        System.out.println("🔥 Received event: " + event);

        productService.reduceStock(
                event.getProductId(),
                event.getQuantity()
        );
    }
}