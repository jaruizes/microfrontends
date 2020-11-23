package com.techbank.accounts.services.accountservice.business.impl;

import com.techbank.accounts.services.accountservice.business.AccountsService;
import com.techbank.accounts.services.accountservice.business.exceptions.AccountNotFoundException;
import com.techbank.accounts.services.accountservice.business.exceptions.ParameterRequiredException;
import com.techbank.accounts.services.accountservice.business.model.Account;
import com.techbank.accounts.services.accountservice.business.ports.PersistenceService;
import com.techbank.accounts.services.accountservice.business.validators.AccountsServiceValidator;

import java.util.List;

public class AccountsServiceImpl implements AccountsService {

    private PersistenceService persistenceService;

    public AccountsServiceImpl(PersistenceService persistenceService) {
        this.persistenceService = persistenceService;
    }

    @Override
    public List<Account> getCustomerAccounts(final String customerId) throws AccountNotFoundException, ParameterRequiredException {
        AccountsServiceValidator.getCustomerAccountsValidate(customerId);

        return this.persistenceService.getAccountsByCustomer(customerId)
                .orElseThrow(AccountNotFoundException::new);
    }

    @Override
    public Account getAccountDetail(final int accountId) throws AccountNotFoundException {
        return this.persistenceService.getAccountById(accountId)
                .orElseThrow(AccountNotFoundException::new);
    }
}
