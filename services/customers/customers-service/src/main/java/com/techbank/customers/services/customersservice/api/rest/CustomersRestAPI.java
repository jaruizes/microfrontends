package com.techbank.customers.services.customersservice.api.rest;


import com.techbank.customers.services.customersservice.api.dto.CustomerDTO;
import com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface CustomersRestAPI {
    ResponseEntity<List<CustomerDTO>> getCustomers();
    ResponseEntity<CustomerDTO> getCustomerDetail(String customerId) throws CustomerNotFoundException;
}
