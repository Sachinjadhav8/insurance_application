package com.insurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.insurance.model.User;
import com.insurance.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ✅ Register new user
    public User registerUser(User user) {
        Optional<User> existingUser = userRepository.findByMobile(user.getMobile());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Mobile number already registered");
        }
        return userRepository.save(user);
    }

    // ✅ Login user
    public User loginUser(String mobile, String password) {
        Optional<User> userOpt = userRepository.findByMobile(mobile);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password)) {
                return user;
            } else {
                throw new RuntimeException("Invalid password");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }
}

