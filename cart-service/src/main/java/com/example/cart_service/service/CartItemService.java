package com.example.cart_service.service;

import com.example.cart_service.dto.CartEvent;
import com.example.cart_service.dto.ProductDto;
import com.example.cart_service.model.CartItem;
import com.example.cart_service.repository.CartItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final WebClient webClient;
    private final KafkaProducerService kafkaProducerService;

    public CartItemService(CartItemRepository cartItemRepository,
                           WebClient webClient,
                           KafkaProducerService kafkaProducerService) {
        this.cartItemRepository = cartItemRepository;
        this.webClient = webClient;
        this.kafkaProducerService = kafkaProducerService;
    }

    public CartItem createCartItem(CartItem cartItem) {
        ProductDto product = webClient.get()
                .uri("http://localhost:8081/products/" + cartItem.getProductId())
                .retrieve()
                .bodyToMono(ProductDto.class)
                .block();

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        if (product.getStock() < cartItem.getQuantity()) {
            throw new RuntimeException("Not enough stock");
        }

        CartItem savedItem = cartItemRepository.save(cartItem);

        CartEvent event = new CartEvent(
                savedItem.getCartId(),
                savedItem.getProductId(),
                savedItem.getQuantity()
        );

        kafkaProducerService.sendCartEvent(event);

        return savedItem;
    }

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public Optional<CartItem> getCartItemById(Integer id) {
        return cartItemRepository.findById(id);
    }

    public List<CartItem> getCartItemsByCartId(Integer cartId) {
        return cartItemRepository.findByCartId(cartId);
    }
}