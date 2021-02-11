package com.techbank.customers.services.customersservice.api;

import com.techbank.customers.services.customersservice.api.dto.CustomerDTO;
import com.techbank.customers.services.customersservice.api.rest.CustomersRestAPI;
import com.techbank.customers.services.customersservice.api.rest.impl.CustomersRestAPIImpl;
import com.techbank.customers.services.customersservice.business.CustomersService;
import com.techbank.customers.services.customersservice.business.model.Customer;
import com.techbank.customers.services.customersservice.business.model.Summary;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CustomerAPIRestTest {

    @Test
    void givenAValidCustomerId_whenCustomerDetailIsRequested_ThenDetailIsRetrieved() throws com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException {
        final Customer customerExpected = buildCustomer("0001","Pepe");
        final CustomersService customersService = mock(CustomersService.class);
        when(customersService.getCustomerDetail(anyString())).thenReturn(customerExpected);

        final CustomersRestAPI cardsRestAPI = new CustomersRestAPIImpl(customersService);
        final ResponseEntity<com.techbank.customers.services.customersservice.api.dto.CustomerDTO> customerDetailResponse = cardsRestAPI.getCustomerDetail("0001");
        assertNotNull(customerDetailResponse);
        assertNotNull(customerDetailResponse.getBody());
        assertEquals(customerDetailResponse.getStatusCodeValue(), 200);

        final CustomerDTO customerRetrieved = customerDetailResponse.getBody();
        assertEquals(customerExpected.getName(), customerRetrieved.getName());
        assertEquals(customerExpected.getId(), customerRetrieved.getId());
        assertNotNull(customerRetrieved.getSummary());
        assertTrue(customerRetrieved.getSummary().getDates() != null && customerRetrieved.getSummary().getDates().size() == 12);
        assertTrue(customerRetrieved.getSummary().getExpenses() != null && customerRetrieved.getSummary().getExpenses().size() == 12);
        assertTrue(customerRetrieved.getSummary().getIncomes() != null && customerRetrieved.getSummary().getIncomes().size() == 12);
    }

    @Test
    void givenANotValidCustomerId_whenCustomerDetailIsRequested_ThenAnCustomerNotFoundExceptionIsThrown() throws com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException {
        final CustomersService customersService = mock(CustomersService.class);
        when(customersService.getCustomerDetail(anyString())).thenThrow(new com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException());

        final CustomersRestAPI cardsRestAPI = new CustomersRestAPIImpl(customersService);
        try {
            cardsRestAPI.getCustomerDetail("0001");
        } catch (com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException e) {
            assertNotNull(e);
        }
    }

    private Customer buildCustomer(String id, String name) {
        Customer customer = new Customer(id, name);
        customer.setSummary(buildSummary());
        return customer;
    }

    private Summary buildSummary() {
        return new Summary(generateRandomList(), generateRandomList(), buildDates());
    }

    private List<Integer> generateRandomList() {
        List<Integer> randomList = new ArrayList<>(12);
        Random rand = new Random();
        for (int i=0; i<12; i++) {
            randomList.add(rand.nextInt(5000));
        }

        return randomList;
    }

    private List<String> buildDates() {
        LocalDate date = LocalDate.now();

        DateTimeFormatter formatters = DateTimeFormatter.ofPattern("MM/yyyy");
        List<String> dates = new ArrayList<>(12);

        for (int i=0; i<12; i++) {
            date = date.minusMonths(1);
            dates.add(formatters.format(date));
        }

        Collections.reverse(dates);

        return dates;
    }

}
