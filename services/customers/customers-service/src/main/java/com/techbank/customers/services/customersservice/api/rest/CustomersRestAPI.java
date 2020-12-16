package com.techbank.customers.services.customersservice.api.rest;


import com.techbank.customers.services.customersservice.api.dto.CustomerDTO;
import com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException;
import org.springframework.http.ResponseEntity;


public interface CustomersRestAPI {
    ResponseEntity<CustomerDTO> getCustomerDetail(String customerId) throws CustomerNotFoundException;
}
