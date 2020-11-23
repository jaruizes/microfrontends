package com.techbank.accounts.services.accountservice.business.validators;

import com.techbank.accounts.services.accountservice.business.exceptions.ParameterRequiredException;

public class AccountsServiceValidator {

    public static void getCustomerAccountsValidate(final String customerId) throws ParameterRequiredException {
        if (customerId == null || customerId.isBlank()) {
            throw new ParameterRequiredException("customer");
        }
    }
}
