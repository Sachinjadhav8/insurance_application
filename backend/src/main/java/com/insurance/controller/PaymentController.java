package com.insurance.controller;

import com.insurance.model.Payment;
import com.insurance.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentRepository repo;

    // ✅ Get all payments for the logged-in user
    @GetMapping
    public List<Payment> getAll(@RequestHeader(value = "user-mobile", required = false) String userMobile) {
        if (userMobile == null || userMobile.isBlank()) {
            return List.of(); // No user header = no payments
        }
        return repo.findByCreatedByMobile(userMobile);
    }

    // ✅ Create a new payment (linked to logged-in user)
    @PostMapping
    public Map<String, Object> create(
            @RequestHeader(value = "user-mobile", required = false) String userMobile,
            @RequestBody Payment payment
    ) {
        Map<String, Object> response = new LinkedHashMap<>();

        if (userMobile == null || userMobile.isBlank()) {
            response.put("message", "⚠️ Missing user-mobile header.");
            return response;
        }

        // 🧩 Generate unique transaction ID
        String transactionId = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        // 🧾 Attach metadata
        payment.setTransactionId(transactionId);
        payment.setStatus("SUCCESS");
        payment.setPaymentDate(LocalDate.now());
        payment.setCreatedByMobile(userMobile);

        // 💾 Save payment in MongoDB
        Payment savedPayment = repo.save(payment);

        // ✅ Return clear JSON response
        response.put("message", "✅ Payment successful!");
        response.put("transactionId", savedPayment.getTransactionId());
        response.put("amount", savedPayment.getAmount());
        response.put("paymentMethod", savedPayment.getMethod());
        response.put("status", savedPayment.getStatus());
        response.put("policyId", savedPayment.getPolicyId());
        response.put("createdByMobile", savedPayment.getCreatedByMobile());
        response.put("paymentDate", savedPayment.getPaymentDate());

        return response;
    }
}

