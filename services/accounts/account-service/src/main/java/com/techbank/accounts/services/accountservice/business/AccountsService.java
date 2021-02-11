package com.techbank.accounts.services.accountservice.business;

import com.techbank.accounts.services.accountservice.business.exceptions.AccountNotFoundException;
import com.techbank.accounts.services.accountservice.business.exceptions.ParameterRequiredException;
import com.techbank.accounts.services.accountservice.business.model.Account;

import java.util.List;

public interface AccountsService {

    List<Account> getCustomerAccounts(String customerId) throws AccountNotFoundException, ParameterRequiredException;
    Account getAccountDetail(int accountId) throws AccountNotFoundException;
}
