package com.example.cart_service.repository;

import com.example.cart_service.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    List<CartItem> findByCartId(Integer cartId);
    Optional<CartItem> findByCartIdAndProductId(Integer cartId, Integer productId);
}