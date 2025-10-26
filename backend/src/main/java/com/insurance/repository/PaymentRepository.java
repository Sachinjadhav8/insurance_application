package com.insurance.repository;

import com.insurance.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository interface for managing Payment documents in MongoDB.
 * Provides query methods for policy-based and user-based filtering.
 */
@Repository
public interface PaymentRepository extends MongoRepository<Payment, String> {

    /**
     * Finds all payments for a specific policy.
     * @param policyId the ID of the policy
     * @return list of payments associated with the policy
     */
    List<Payment> findByPolicyId(String policyId);

    /**
     * Finds all payments made by a specific user (mobile number).
     * Used to display payment history on the user dashboard.
     * @param createdByMobile the mobile number of the user
     * @return list of user-specific payments
     */
    List<Payment> findByCreatedByMobile(String createdByMobile);
}

