package com.techbank.customers.services.customersservice.business;

import com.techbank.customers.services.customersservice.business.exceptions.CustomerNotFoundException;
import com.techbank.customers.services.customersservice.business.model.Customer;

public interface CustomersService {

    Customer getCustomerDetail(String customerId) throws CustomerNotFoundException;
}
