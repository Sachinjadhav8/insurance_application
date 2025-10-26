package com.insurance.controller;

import com.insurance.model.Policy;
import com.insurance.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "*")
public class PolicyController {

    @Autowired
    private PolicyRepository policyRepository;

    // ✅ Create a new policy linked to a specific user
    @PostMapping
    public Map<String, Object> createPolicy(
            @RequestHeader(value = "user-mobile", required = false) String userMobile,
            @RequestBody Policy policy) {

        Map<String, Object> response = new LinkedHashMap<>();

        try {
            if (userMobile == null || userMobile.isEmpty()) {
                response.put("message", "⚠️ Missing user-mobile header.");
                return response;
            }

            // Generate unique policy number
            String policyNumber = "POL-" + LocalDate.now().getYear() + "-" +
                    UUID.randomUUID().toString().substring(0, 6).toUpperCase();

            policy.setPolicyNumber(policyNumber);
            policy.setCreatedAt(LocalDate.now());
            policy.setUpdatedAt(LocalDate.now());
            policy.setStatus("Active");
            policy.setCreatedByMobile(userMobile); // 👤 link to current user

            Policy savedPolicy = policyRepository.save(policy);

            response.put("message", "✅ Policy created successfully!");
            response.put("policyId", savedPolicy.getId());
            response.put("policyNumber", savedPolicy.getPolicyNumber());
            response.put("holderName", savedPolicy.getHolderName());
            response.put("mobile", savedPolicy.getMobile());
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "❌ Server error while creating policy: " + e.getMessage());
            return response;
        }
    }

    // ✅ Get policies for the logged-in user
    @GetMapping
    public Iterable<Policy> getAllPolicies(
            @RequestHeader(value = "user-mobile", required = false) String userMobile) {

        if (userMobile == null || userMobile.isEmpty()) {
            return List.of(); // return empty if header not provided
        }

        return policyRepository.findByCreatedByMobile(userMobile);
    }
}

