package com.techbank.customers.services.customersservice.api.rest.impl;

import com.techbank.customers.services.customersservice.api.dto.CustomerDTO;
import com.techbank.customers.services.customersservice.api.dto.SummaryDTO;
import com.techbank.customers.services.customersservice.api.rest.CustomersRestAPI;
import com.techbank.customers.services.customersservice.business.CustomersService;
import com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException;
import com.techbank.customers.services.customersservice.business.model.Customer;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class CustomersRestAPIImpl implements CustomersRestAPI {
    private CustomersService customersService;

    public CustomersRestAPIImpl(final CustomersService customersService) {
        this.customersService = customersService;
    }

    @Override
    @GetMapping(path = "/customers/{customerId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CustomerDTO> getCustomerDetail(@PathVariable("customerId") final String customerId) throws CustomerNotFoundException {
        final Customer customer = this.customersService.getCustomerDetail(customerId);

        return ResponseEntity.ok(this.customer2DTO(customer));
    }

    private CustomerDTO customer2DTO(final Customer customer) {
        return new CustomerDTO(customer.getId(), customer.getName(), new SummaryDTO(customer.getSummary().getIncomes(), customer.getSummary().getExpenses(), customer.getSummary().getDates()));
    }
}
