package com.insurance.controller;

import com.insurance.model.User;
import com.insurance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ✅ SIGNUP
    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        String name = user.getName() != null ? user.getName().trim() : "";
        String mobile = user.getMobile() != null ? user.getMobile().trim() : "";
        String password = user.getPassword() != null ? user.getPassword().trim() : "";

        if (name.isEmpty() || mobile.isEmpty() || password.isEmpty()) {
            response.put("message", "⚠️ All fields are required!");
            return response;
        }

        // ✅ Prevent duplicate users
        User existingUser = userRepository.findByMobile(mobile).orElse(null);
        if (existingUser != null) {
            response.put("message", "⚠️ User already exists!");
            return response;
        }

        userRepository.save(user);
        response.put("message", "✅ Signup successful!");
        response.put("mobile", user.getMobile());
        response.put("name", user.getName());
        return response;
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        String mobile = user.getMobile() != null ? user.getMobile().trim() : "";
        String password = user.getPassword() != null ? user.getPassword().trim() : "";

        if (mobile.isEmpty() || password.isEmpty()) {
            response.put("message", "⚠️ Mobile and password are required!");
            return response;
        }

        User existingUser = userRepository.findByMobile(mobile).orElse(null);

        if (existingUser == null) {
            response.put("message", "❌ User not found!");
            return response;
        }

        // ✅ Compare passwords (plain text)
        if (existingUser.getPassword().equals(password)) {
            response.put("message", "✅ Login successful!");
            response.put("mobile", existingUser.getMobile());
            response.put("name", existingUser.getName());
            response.put("userId", existingUser.getId());
        } else {
            response.put("message", "❌ Invalid password!");
        }

        return response;
    }
}

