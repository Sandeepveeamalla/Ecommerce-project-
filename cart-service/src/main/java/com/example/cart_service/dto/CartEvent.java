package com.example.cart_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartEvent {
    private Integer cartId;
    private Integer productId;
    private Integer quantity;
}