package com.techbank.customers.services.customersservice.business.ports;

import com.techbank.customers.services.customersservice.business.model.Customer;

import java.util.List;
import java.util.Optional;

public interface PersistenceService {
    List<Customer> getCustomers();
    Optional<Customer> getCustomerById(String id);
}
