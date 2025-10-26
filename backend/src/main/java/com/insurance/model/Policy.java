package com.insurance.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "policies")
public class Policy {

    @Id
    private String id;

    private String policyNumber;
    private String policyType;           // e.g., Life, Health, Vehicle, Property
    private String coverageAmount;       // Total coverage in ₹ or $
    private String premium;              // Premium amount
    private String premiumFrequency;     // Monthly / Quarterly / Yearly

    private LocalDate startDate;
    private LocalDate endDate;

    // 👤 Policy Holder Info
    private String holderName;
    private LocalDate holderDOB;
    private String mobile;
    private String email;

    // 👨‍👩‍👧 Nominee Details
    private String nomineeName;
    private String nomineeRelation;

    // 📊 Policy Status
    private String status = "Active";

    // 👤 Link to logged-in user
    private String createdByMobile;

    // 🕓 Metadata
    private LocalDate createdAt = LocalDate.now();
    private LocalDate updatedAt = LocalDate.now();

    // --- Getters and Setters ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPolicyNumber() { return policyNumber; }
    public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }

    public String getPolicyType() { return policyType; }
    public void setPolicyType(String policyType) { this.policyType = policyType; }

    public String getCoverageAmount() { return coverageAmount; }
    public void setCoverageAmount(String coverageAmount) { this.coverageAmount = coverageAmount; }

    public String getPremium() { return premium; }
    public void setPremium(String premium) { this.premium = premium; }

    public String getPremiumFrequency() { return premiumFrequency; }
    public void setPremiumFrequency(String premiumFrequency) { this.premiumFrequency = premiumFrequency; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public String getHolderName() { return holderName; }
    public void setHolderName(String holderName) { this.holderName = holderName; }

    public LocalDate getHolderDOB() { return holderDOB; }
    public void setHolderDOB(LocalDate holderDOB) { this.holderDOB = holderDOB; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getNomineeName() { return nomineeName; }
    public void setNomineeName(String nomineeName) { this.nomineeName = nomineeName; }

    public String getNomineeRelation() { return nomineeRelation; }
    public void setNomineeRelation(String nomineeRelation) { this.nomineeRelation = nomineeRelation; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCreatedByMobile() { return createdByMobile; }
    public void setCreatedByMobile(String createdByMobile) { this.createdByMobile = createdByMobile; }

    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }

    public LocalDate getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDate updatedAt) { this.updatedAt = updatedAt; }
}

