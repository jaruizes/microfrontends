package com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.mappers;

import com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.entities.AccountEntity;
import com.techbank.accounts.services.accountservice.business.model.Account;

public class AccountMapper {

    public static Account accountEntity2Account(final AccountEntity accountEntity) {
        return new Account.Builder(accountEntity.getId())
                .withName(accountEntity.getName())
                .withIBAN(accountEntity.getIban())
                .withBalance(accountEntity.getBalance())
                .withHolder(accountEntity.getHolder())
                .build();
    }
}
