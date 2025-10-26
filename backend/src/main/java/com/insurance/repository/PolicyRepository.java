package com.insurance.repository;

import com.insurance.model.Policy;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository interface for managing Policy documents in MongoDB.
 * Provides custom query methods for user-based and policy-based lookups.
 */
@Repository
public interface PolicyRepository extends MongoRepository<Policy, String> {

    /**
     * Finds a policy by its unique policy number.
     * @param policyNumber the policy number (e.g., POL-2025-XXXXXX)
     * @return the Policy object, or null if not found
     */
    Policy findByPolicyNumber(String policyNumber);

    /**
     * Finds all policies for a given holder name (case-insensitive).
     * @param holderName the name of the policy holder
     * @return list of policies for that holder
     */
    List<Policy> findByHolderNameIgnoreCase(String holderName);

    /**
     * Finds all policies linked to a given mobile number.
     * @param mobile the policy holder's mobile number
     * @return list of matching policies
     */
    List<Policy> findByMobile(String mobile);

    /**
     * Finds all policies created by a specific user.
     * Used to show user-specific dashboards.
     * @param createdByMobile the mobile number of the user who created the policy
     * @return list of policies created by that user
     */
    List<Policy> findByCreatedByMobile(String createdByMobile);
}

