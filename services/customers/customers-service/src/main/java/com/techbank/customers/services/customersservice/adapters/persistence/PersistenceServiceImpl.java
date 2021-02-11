package com.techbank.customers.services.customersservice.adapters.persistence;

import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.CustomersRepository;
import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.entities.CustomerEntity;
import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.mappers.CustomerMapper;
import com.techbank.customers.services.customersservice.business.model.Customer;
import com.techbank.customers.services.customersservice.business.ports.PersistenceService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class PersistenceServiceImpl implements PersistenceService {

    private CustomersRepository customersRepository;

    public PersistenceServiceImpl(CustomersRepository customersRepository) {
        this.customersRepository = customersRepository;
    }

    @Override
    public List<Customer> getCustomers() {
        return customersRepository.findAll().stream().map(CustomerMapper::customerEntity2Customer).collect(Collectors.toList());
    }

    @Override
    public Optional<Customer> getCustomerById(final String id) {
        Optional<CustomerEntity> customerEntityOptional = this.customersRepository.findById(id);
        return customerEntityOptional.map(CustomerMapper::customerEntity2Customer);
    }
}
