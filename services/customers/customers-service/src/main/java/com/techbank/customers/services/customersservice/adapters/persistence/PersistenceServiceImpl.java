package com.techbank.customers.services.customersservice.adapters.persistence;

import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.CustomersRepository;
import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.entities.CustomerEntity;
import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.mappers.CustomerMapper;
import com.techbank.customers.services.customersservice.business.model.Customer;
import com.techbank.customers.services.customersservice.business.ports.PersistenceService;

import java.util.Optional;

public class PersistenceServiceImpl implements PersistenceService {

    private CustomersRepository customersRepository;

    public PersistenceServiceImpl(CustomersRepository customersRepository) {
        this.customersRepository = customersRepository;
    }

    @Override
    public Optional<Customer> getCustomerById(final String id) {
        Optional<CustomerEntity> customerEntityOptional = this.customersRepository.findById(id);
        return customerEntityOptional.map(CustomerMapper::customerEntity2Customer);
    }
}
