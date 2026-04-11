package com.example.cart_service.service;

import com.example.cart_service.dto.ProductResponse;
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

    public CartItemService(CartItemRepository cartItemRepository, WebClient webClient) {
        this.cartItemRepository = cartItemRepository;
        this.webClient = webClient;
    }

    public CartItem createCartItem(CartItem cartItem) {

        ProductResponse product = webClient.get()
                .uri("http://localhost:8081/products/" + cartItem.getProductId())
                .retrieve()
                .bodyToMono(ProductResponse.class)
                .block();

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        if (product.getStock() < cartItem.getQuantity()) {
            throw new RuntimeException("Not enough stock");
        }

        return cartItemRepository.save(cartItem);
    }
    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }
    public List<CartItem> getCartItemsByCartId(Integer cartId) {
        return cartItemRepository.findByCartId(cartId);
    }
    public Optional<CartItem> getCartItemById(Integer id) {
        return cartItemRepository.findById(id);
    }
}