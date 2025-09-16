package org.example.ecomerce.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
public class CssTestController {

    @GetMapping("/debug-css")
    @ResponseBody
    public ResponseEntity<String> debugCss() throws IOException {
        ClassPathResource resource = new ClassPathResource("static/css/order-styles.css");

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String content = new String(resource.getInputStream().readAllBytes());
        return ResponseEntity.ok()
                .header("Content-Type", "text/css")
                .body(content);
    }
}
