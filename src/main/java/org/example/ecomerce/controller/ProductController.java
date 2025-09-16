package org.example.ecomerce.controller;

import org.springframework.ui.Model;
import org.example.ecomerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping("/products")
  public String listar(Model model) {
    model.addAttribute("productos", productService.findAll());
    return "products";
  }
}
