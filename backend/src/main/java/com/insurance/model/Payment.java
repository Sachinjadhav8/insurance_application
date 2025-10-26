package com.insurance.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "payments")
public class Payment {

    @Id
    private String id;

    private String policyId;      // Reference to the policy
    private Double amount;
    private String method;        // e.g., UPI, Credit Card, Bank Transfer
    private String status;        // e.g., SUCCESS, PENDING, FAILED

    private String transactionId; // ✅ NEW FIELD

    // 👤 Link to the user who made the payment
    private String createdByMobile;

    // 🕓 Metadata
    private LocalDate paymentDate = LocalDate.now();
    private LocalDate createdAt = LocalDate.now();
    private LocalDate updatedAt = LocalDate.now();

    // --- Getters & Setters ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPolicyId() { return policyId; }
    public void setPolicyId(String policyId) { this.policyId = policyId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTransactionId() { return transactionId; }          // ✅ Getter
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; } // ✅ Setter

    public String getCreatedByMobile() { return createdByMobile; }
    public void setCreatedByMobile(String createdByMobile) { this.createdByMobile = createdByMobile; }

    public LocalDate getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }

    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }

    public LocalDate getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDate updatedAt) { this.updatedAt = updatedAt; }
}

