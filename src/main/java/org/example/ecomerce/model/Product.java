package org.example.ecomerce.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "product")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 120)
  private String name;

  @Column(length = 255)
  private String description;

  @Column(nullable = false, precision = 12, scale = 2)
  private BigDecimal price;

  @Column(nullable = false)
  private Integer stock;

  @CreationTimestamp
  @Column(nullable = false, updatable = false)
  private Instant createdAt = Instant.now();

  // Getters & Setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }

  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }

  public BigDecimal getPrice() { return price; }
  public void setPrice(BigDecimal price) { this.price = price; }

  public Integer getStock() { return stock; }
  public void setStock(Integer stock) { this.stock = stock; }

  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
