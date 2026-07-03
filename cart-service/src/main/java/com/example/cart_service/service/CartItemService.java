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
        ProductDto product;
        try {
            product = webClient.get()
                    .uri("http://localhost:8081/products/" + cartItem.getProductId())
                    .retrieve()
                    .bodyToMono(ProductDto.class)
                    .block();
        } catch (Exception ex) {
            throw new RuntimeException("Product not found");
        }

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        Optional<CartItem> existingItem =
                cartItemRepository.findByCartIdAndProductId(cartItem.getCartId(), cartItem.getProductId());

        int requestedQuantity = cartItem.getQuantity();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            int newQuantity = item.getQuantity() + requestedQuantity;

            if (product.getStock() < newQuantity) {
                throw new RuntimeException("Not enough stock");
            }

            item.setQuantity(newQuantity);
            CartItem updatedItem = cartItemRepository.save(item);

            CartEvent event = new CartEvent(
                    "ADD",
                    updatedItem.getCartId(),
                    updatedItem.getProductId(),
                    requestedQuantity
            );

            kafkaProducerService.sendCartEvent(event);

            return updatedItem;
        }

        if (product.getStock() < requestedQuantity) {
            throw new RuntimeException("Not enough stock");
        }

        CartItem savedItem = cartItemRepository.save(cartItem);

        CartEvent event = new CartEvent(
                "ADD",
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

    public CartItem increaseQuantity(Integer id) {
        CartItem item = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + id));

        item.setQuantity(item.getQuantity() + 1);
        return cartItemRepository.save(item);
    }

    public CartItem decreaseQuantity(Integer id) {
        CartItem item = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + id));

        if (item.getQuantity() > 1) {
            item.setQuantity(item.getQuantity() - 1);
        }

        return cartItemRepository.save(item);
    }
}