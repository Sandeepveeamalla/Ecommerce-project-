package com.example.cart_service.controller;

import com.example.cart_service.model.Cart;
import com.example.cart_service.model.CartItem;
import com.example.cart_service.service.CartItemService;
import com.example.cart_service.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/cart-items")
public class CartController {

    private final CartService cartService;
    private final CartItemService cartItemService;

    public CartController(CartService cartService, CartItemService cartItemService) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
    }

    @PostMapping
    public CartItem createCartItem(@Valid @RequestBody CartItem cartItem) {
        return cartItemService.createCartItem(cartItem);
    }

    @GetMapping
    public List<CartItem> getAllCartItems() {
        return cartItemService.getAllCartItems();
    }

    @PutMapping("/{id}/increase")
    public CartItem increaseQuantity(@PathVariable Integer id) {
        return cartItemService.increaseQuantity(id);
    }

    @PutMapping("/{id}/decrease")
    public CartItem decreaseQuantity(@PathVariable Integer id) {
        return cartItemService.decreaseQuantity(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Integer id) {
        return cartItemService.getCartItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}