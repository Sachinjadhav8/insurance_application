package com.insurance.controller;

import com.insurance.model.Claim;
import com.insurance.model.Policy;
import com.insurance.repository.ClaimRepository;
import com.insurance.repository.PolicyRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*")
public class ClaimController {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private PolicyRepository policyRepository;

    // ✅ Create a new claim (linked to the logged-in user)
    @PostMapping
    public Map<String, Object> createClaim(
            @RequestHeader(value = "user-mobile", required = false) String userMobile,
            @RequestBody Claim claim) {

        Map<String, Object> response = new LinkedHashMap<>();

        try {
            if (userMobile == null || userMobile.isBlank()) {
                response.put("message", "⚠️ Missing user-mobile header.");
                return response;
            }

            String input = claim.getPolicyId();
            if (input == null || input.trim().isEmpty()) {
                response.put("message", "❌ Policy ID or Policy Number is required.");
                return response;
            }

            // 🔍 Try fetching policy by ID or number
            Policy policy = findPolicy(input);
            if (policy == null) {
                response.put("message", "❌ Invalid Policy ID or Policy Number.");
                return response;
            }

            // 🧩 Validate claim amount
            if (claim.getClaimAmount() <= 0) {
                response.put("message", "⚠️ Claim amount must be greater than 0.");
                return response;
            }

            // ✅ Populate claim fields
            claim.setPolicyId(policy.getId());
            claim.setPolicyNumber(policy.getPolicyNumber());
            claim.setClaimDate(LocalDate.now());
            claim.setStatus("Under Review");
            claim.setCreatedByMobile(userMobile); // user tracking

            // 💾 Save to MongoDB
            Claim saved = claimRepository.save(claim);

            // 🟢 Success response
            response.put("message", "✅ Claim created successfully!");
            response.put("claimId", saved.getId());
            response.put("status", saved.getStatus());
            response.put("policyNumber", saved.getPolicyNumber());
            response.put("claimDate", saved.getClaimDate().toString());
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "❌ Server error while creating claim: " + e.getMessage());
            return response;
        }
    }

    // ✅ Get all claims (filtered by user)
    @GetMapping
    public List<Claim> getAllClaims(@RequestHeader(value = "user-mobile", required = false) String userMobile) {
        if (userMobile == null || userMobile.isBlank()) {
            return List.of(); // Empty list if no header
        }
        return claimRepository.findByCreatedByMobile(userMobile);
    }

    // ✅ Helper: Find policy by either ObjectId or PolicyNumber
    private Policy findPolicy(String input) {
        Policy policy = null;

        // Try by ObjectId
        if (ObjectId.isValid(input)) {
            policy = policyRepository.findById(input).orElse(null);
            if (policy != null) {
                System.out.println("🟢 Found policy by ObjectId: " + input);
                return policy;
            }
        }

        // Fallback by policy number
        policy = policyRepository.findByPolicyNumber(input);
        if (policy != null) {
            System.out.println("🟢 Found policy by PolicyNumber: " + input);
        } else {
            System.out.println("❌ Policy not found for: " + input);
        }

        return policy;
    }
}

