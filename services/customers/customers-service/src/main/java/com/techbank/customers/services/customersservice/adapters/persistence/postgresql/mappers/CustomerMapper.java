package com.techbank.customers.services.customersservice.adapters.persistence.postgresql.mappers;

import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.entities.CustomerEntity;
import com.techbank.customers.services.customersservice.business.model.Customer;

public class CustomerMapper {

    public static Customer customerEntity2Customer(final CustomerEntity customerEntity) {
        return new Customer(customerEntity.getId(), customerEntity.getName());
    }
}
