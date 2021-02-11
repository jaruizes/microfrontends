package com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.mappers;

import com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.entities.AccountEntity;
import com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.entities.MovementEntity;
import com.techbank.accounts.services.accountservice.business.model.Account;
import com.techbank.accounts.services.accountservice.business.model.Movement;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

public class AccountMapper {

    public static Account accountEntity2Account(final AccountEntity accountEntity) {
        return new Account.Builder(accountEntity.getId())
                .withName(accountEntity.getName())
                .withIBAN(accountEntity.getIban())
                .withBalance(accountEntity.getBalance())
                .withHolder(accountEntity.getHolder())
                .withMovements(Optional.ofNullable(accountEntity.getMovements()).orElse(new ArrayList<>()).stream()
                        .map(AccountMapper::movementEntity2Movement)
                        .collect(Collectors.toList()))
                .build();
    }

    public static Movement movementEntity2Movement(final MovementEntity movementEntity) {
        return new Movement(movementEntity.getId(),
                movementEntity.getAccountId(), movementEntity.getDate(), movementEntity.getSubject(), movementEntity.getAmount());
    }
}
