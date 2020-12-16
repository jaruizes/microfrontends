package com.techbank.customers.services.customersservice.business.ports;

import com.techbank.customers.services.customersservice.business.model.Customer;

import java.util.Optional;

public interface PersistenceService {

    Optional<Customer> getCustomerById(String id);
}
