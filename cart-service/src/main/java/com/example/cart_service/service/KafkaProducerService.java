package com.example.cart_service.service;

import com.example.cart_service.dto.CartEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, CartEvent> kafkaTemplate;

    @Value("${app.kafka.topic.cart}")
    private String cartTopic;

    public KafkaProducerService(KafkaTemplate<String, CartEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendCartEvent(CartEvent event) {
        kafkaTemplate.send(cartTopic, event);
    }
}