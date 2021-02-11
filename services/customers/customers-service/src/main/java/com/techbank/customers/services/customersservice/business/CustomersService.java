package com.techbank.customers.services.customersservice.business;

import com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException;
import com.techbank.customers.services.customersservice.business.model.Customer;

import java.util.List;

public interface CustomersService {

    List<Customer> getCustomers();
    Customer getCustomerDetail(String customerId) throws CustomerNotFoundException;
}
