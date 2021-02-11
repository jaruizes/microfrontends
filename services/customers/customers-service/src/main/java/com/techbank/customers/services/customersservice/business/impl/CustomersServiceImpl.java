package com.techbank.customers.services.customersservice.business.impl;

import com.techbank.customers.services.customersservice.business.CustomersService;
import com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException;
import com.techbank.customers.services.customersservice.business.model.Customer;
import com.techbank.customers.services.customersservice.business.model.Summary;
import com.techbank.customers.services.customersservice.business.ports.PersistenceService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

public class CustomersServiceImpl implements CustomersService {

    private PersistenceService persistenceService;

    public CustomersServiceImpl(PersistenceService persistenceService) {
        this.persistenceService = persistenceService;
    }

    @Override
    public List<Customer> getCustomers() {
        final List<Customer> customers = this.persistenceService.getCustomers();
        customers.forEach(customer -> customer.setSummary(buildSummary()));

        return customers;
    }

    @Override
    public Customer getCustomerDetail(final String customerId) throws CustomerNotFoundException {
        Customer customer = this.persistenceService.getCustomerById(customerId).orElseThrow(CustomerNotFoundException::new);
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
