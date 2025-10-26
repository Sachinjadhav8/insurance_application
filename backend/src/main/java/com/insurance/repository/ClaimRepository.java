package com.insurance.repository;

import com.insurance.model.Claim;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClaimRepository extends MongoRepository<Claim, String> {

    // 🔗 Fetch all claims for a specific policy
    List<Claim> findByPolicyId(String policyId);

    // 🧩 Fetch claims by account holder (optional / legacy)
    List<Claim> findByAccountHolderName(String accountHolderName);

    // ✅ Fetch claims created by a specific user (used in ClaimController)
    List<Claim> findByCreatedByMobile(String createdByMobile);
}

