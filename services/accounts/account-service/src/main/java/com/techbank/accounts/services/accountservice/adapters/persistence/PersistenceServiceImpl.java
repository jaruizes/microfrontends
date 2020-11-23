package com.techbank.accounts.services.accountservice.adapters.persistence;

import com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.AccountsRepository;
import com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.entities.AccountEntity;
import com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.mappers.AccountMapper;
import com.techbank.accounts.services.accountservice.business.model.Account;
import com.techbank.accounts.services.accountservice.business.ports.PersistenceService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class PersistenceServiceImpl implements PersistenceService {

    private AccountsRepository accountsRepository;

    public PersistenceServiceImpl(AccountsRepository accountsRepository) {
        this.accountsRepository = accountsRepository;
    }

    @Override
    public Optional<List<Account>> getAccountsByCustomer(final String customerId) {
        return this.accountsRepository.findByCustomer(customerId)
                .map(accountEntities ->
                        accountEntities.stream().map(AccountMapper::accountEntity2Account)
                        .collect(Collectors.toList()));
    }

    @Override
    public Optional<Account> getAccountById(final int id) {
        Optional<AccountEntity> accountEntityOptional = this.accountsRepository.findById(id);
        return accountEntityOptional.map(AccountMapper::accountEntity2Account);
    }
}
