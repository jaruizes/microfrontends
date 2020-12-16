package com.techbank.customers.services.customersservice.adapters.persistence;

import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.CustomersRepository;
import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.entities.CustomerEntity;
import com.techbank.customers.services.customersservice.business.model.Customer;
import com.techbank.customers.services.customersservice.business.ports.PersistenceService;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CustomersPersistenceTest {

    @Test
    void givenAValidCustomerId_whenCustomerDetailIsRequested_ThenDetailIsRetrieved() {
        final CustomerEntity customerEntity = buildCustomer("0001", "Pepe");
        final CustomersRepository customersRepository = mock(CustomersRepository.class);
        when(customersRepository.findById(anyString())).thenReturn(Optional.of(customerEntity));

        final PersistenceService persistenceService = new PersistenceServiceImpl(customersRepository);
        final Optional<Customer> customerOptional = persistenceService.getCustomerById("0001");
        assertNotNull(customerOptional);
        assertTrue(customerOptional.isPresent());


        final Customer customer = customerOptional.get();
        assertNotNull(customer);
        assertEquals(customer.getId(), customerEntity.getId());
        assertEquals(customer.getName(), customerEntity.getName());
    }

    @Test
    void givenANotValidCustomerId_whenCustomerDetailIsRequested_ThenAnCustomerIsNotRetrieved() {
        final CustomersRepository cardssRepository = mock(CustomersRepository.class);
        when(cardssRepository.findById(anyString())).thenReturn(Optional.empty());

        final PersistenceService persistenceService = new PersistenceServiceImpl(cardssRepository);
        final Optional<Customer> customerOptional = persistenceService.getCustomerById("0001");
        assertNotNull(customerOptional);
        assertTrue(customerOptional.isEmpty());
    }

    private CustomerEntity buildCustomer(String id, String name) {
        final CustomerEntity customerEntity = new CustomerEntity();
        customerEntity.setId(id);
        customerEntity.setName(name);

        return customerEntity;
    }

}
