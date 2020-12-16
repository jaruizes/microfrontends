package com.techbank.customers.services.customersservice.adapters.persistence.postgresql;

import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.entities.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomersRepository extends JpaRepository<CustomerEntity, String> {
    Optional<CustomerEntity> findById(String customer);
}
