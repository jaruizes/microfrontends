package com.techbank.customers.services.customersservice.adapters.persistence.postgresql.mappers;

import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.entities.CustomerEntity;
import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.entities.MovementEntity;
import com.techbank.customers.services.customersservice.business.model.Customer;
import com.techbank.customers.services.customersservice.business.model.Movement;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

public class CustomerMapper {

    public static Customer customerEntity2Customer(final CustomerEntity customerEntity) {
        return new Customer(customerEntity.getId(), customerEntity.getName(),
                Optional.ofNullable(customerEntity.getMovements())
                        .orElse(new ArrayList<>())
                        .stream()
                        .map(CustomerMapper::movementEntity2Movement).collect(Collectors.toList()));
    }

    public static Movement movementEntity2Movement(final MovementEntity movementEntity) {
        return new Movement(movementEntity.getId(),
                movementEntity.getCustomerId(), movementEntity.getDate(), movementEntity.getSubject(), movementEntity.getAmount());
    }
}
