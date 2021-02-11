package com.techbank.customers.services.customersservice.business;

import com.techbank.customers.services.customersservice.business.impl.CustomersServiceImpl;
import com.techbank.customers.services.customersservice.business.model.Customer;
import com.techbank.customers.services.customersservice.business.ports.PersistenceService;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CustomersServiceTest {

    @Test
    void givenAValidCustomerId_whenCardsDetailIsRequested_ThenDetailIsRetrieved() {
        final Customer customerExpected = buildCustomer("0001", "Pepe");
        final PersistenceService persistenceService = mock(PersistenceService.class);
        when(persistenceService.getCustomerById(anyString())).thenReturn(Optional.of(customerExpected));

        final CustomersService cardssService = new CustomersServiceImpl(persistenceService);
        try {
            final Customer cardsRetrieved = cardssService.getCustomerDetail("0001");
            assertNotNull(cardsRetrieved);
            assertEquals(customerExpected, cardsRetrieved);
        } catch (com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException e) {
            fail("Exception (CardsNotFoundException) should not have been thrown");
        }
    }

    @Test
    void givenANotValidCustomerId_whenCardsDetailIsRequested_ThenAnCardsNotFoundExceptionIsThrown() {
        final PersistenceService persistenceService = mock(PersistenceService.class);
        when(persistenceService.getCustomerById(anyString())).thenReturn(Optional.empty());

        final CustomersService cardssService = new CustomersServiceImpl(persistenceService);
        try {
            cardssService.getCustomerDetail("0001");
            fail("Exception (CardsNotFoundException) should have been thrown");
        } catch (com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException e) {
            assertNotNull(e);
        }
    }

    private Customer buildCustomer(String id, String name) {
        return new Customer(id, name);
    }

}
