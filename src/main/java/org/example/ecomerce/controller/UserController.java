package org.example.ecomerce.controller;

import org.example.ecomerce.model.User;
import org.example.ecomerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Listar todos los usuarios
    @GetMapping
    public String listUsers(Model model) {
        List<User> users = userService.findAll();
        model.addAttribute("users", users);
        return "users/list";
    }

    // Formulario para crear usuario
    @GetMapping("/create")
    public String showCreateForm(Model model) {
        model.addAttribute("user", new User());
        return "users/create";
    }

    // Crear usuario
    @PostMapping("/create")
    public String createUser(@ModelAttribute User user) {
        userService.save(user);
        return "redirect:/users";
    }

    // Ver detalles de usuario
    @GetMapping("/{id}")
    public String viewUser(@PathVariable Long id, Model model) {
        userService.findById(id).ifPresent(user -> model.addAttribute("user", user));
        return "users/view";
    }

    // Formulario para editar usuario
    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Long id, Model model) {
        userService.findById(id).ifPresent(user -> model.addAttribute("user", user));
        return "users/edit";
    }

    // Actualizar usuario
    @PostMapping("/{id}/edit")
    public String updateUser(@PathVariable Long id, @ModelAttribute User user) {
        user.setId(id);
        userService.save(user);
        return "redirect:/users";
    }

    // Eliminar usuario
    @GetMapping("/{id}/delete")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return "redirect:/users";
    }
}
