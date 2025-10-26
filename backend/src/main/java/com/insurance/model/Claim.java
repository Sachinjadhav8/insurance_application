package com.insurance.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "claims")
public class Claim {

    @Id
    private String id;

    // 🔗 Reference fields
    private String policyId;       // MongoDB ObjectId (as string)
    private String policyNumber;   // Human-readable policy reference

    // 📄 Claim details
    private String claimType;
    private double claimAmount;
    private String description;
    private LocalDate claimDate;
    private String status;

    // 🏦 Bank account details (for payout processing)        
    private String accountHolderName;
    private String bankName;
    private String bankAccountNumber;
    private String ifscCode;

    // 👤 Link to the user who created this claim
    private String createdByMobile;

    // 🕓 Metadata
    private LocalDate createdAt = LocalDate.now();
    private LocalDate updatedAt = LocalDate.now();

    // --- Getters & Setters ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPolicyId() { return policyId; }
    public void setPolicyId(String policyId) { this.policyId = policyId; }

    public String getPolicyNumber() { return policyNumber; }  
    public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }

    public String getClaimType() { return claimType; }        
    public void setClaimType(String claimType) { this.claimType = claimType; }

    public double getClaimAmount() { return claimAmount; }    
    public void setClaimAmount(double claimAmount) { this.claimAmount = claimAmount; }

    public String getDescription() { return description; }    
    public void setDescription(String description) { this.description = description; }

    public LocalDate getClaimDate() { return claimDate; }     
    public void setClaimDate(LocalDate claimDate) { this.claimDate = claimDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAccountHolderName() { return accountHolderName; }
    public void setAccountHolderName(String accountHolderName) { this.accountHolderName = accountHolderName; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getBankAccountNumber() { return bankAccountNumber; }
    public void setBankAccountNumber(String bankAccountNumber) { this.bankAccountNumber = bankAccountNumber; }

    public String getIfscCode() { return ifscCode; }
    public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }

    public String getCreatedByMobile() { return createdByMobile; }
    public void setCreatedByMobile(String createdByMobile) { this.createdByMobile = createdByMobile; }

    public LocalDate getCreatedAt() { return createdAt; }     
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }

    public LocalDate getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDate updatedAt) { this.updatedAt = updatedAt; }
}

