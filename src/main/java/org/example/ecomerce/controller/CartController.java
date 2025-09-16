package org.example.ecomerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/cart")
public class CartController {

  @PostMapping("/add/{productId}")
  @ResponseBody
  public String addToCart(@PathVariable Long productId) {
    System.out.println("Producto " + productId + " añadido al carrito");
    return "Producto " + productId + " añadido al carrito";
  }
}
