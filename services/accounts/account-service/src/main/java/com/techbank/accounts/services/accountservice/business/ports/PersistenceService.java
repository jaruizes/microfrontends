package com.techbank.accounts.services.accountservice.business.ports;

import com.techbank.accounts.services.accountservice.business.model.Account;

import java.util.List;
import java.util.Optional;

public interface PersistenceService {

    Optional<List<Account>> getAccountsByCustomer(String customerId);
    Optional<Account> getAccountById(int id);
}
