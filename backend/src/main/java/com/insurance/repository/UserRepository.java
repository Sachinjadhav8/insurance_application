package com.insurance.repository;

import com.insurance.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

/**
 * Repository interface for managing User documents in MongoDB.
 * Provides methods to retrieve users by unique identifiers.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    /**
     * Finds a user by their mobile number.
     * @param mobile user's registered mobile number
     * @return Optional<User> — user details if found
     */
    Optional<User> findByMobile(String mobile);

    /**
     * Finds a user by their name.
     * Useful for admin lookups or analytics (non-unique).
     * @param name the user's name
     * @return list of users with the given name
     */
    List<User> findByNameIgnoreCase(String name);

    /**
     * Checks if a user already exists by mobile.
     * Used for signup validation.
     * @param mobile user's registered mobile number
     * @return true if exists, otherwise false
     */
    boolean existsByMobile(String mobile);
}

