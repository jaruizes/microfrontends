package com.techbank.accounts.services.accountservice.adapters.persistence;

import com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.AccountsRepository;
import com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.entities.AccountEntity;
import com.techbank.accounts.services.accountservice.business.model.Account;
import com.techbank.accounts.services.accountservice.business.ports.PersistenceService;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class AccountPersistenceTest {

    @Test
    void givenAValidCustomerId_whenAccountsAreRequested_ThenAListOfCustomerAccountsIsRetrieved() {
        final AccountsRepository accountsRepository = mock(AccountsRepository.class);
        when(accountsRepository.findByCustomer(anyString())).thenReturn(Optional.of(this.buildAccountsList()));

        final PersistenceService persistenceService = new PersistenceServiceImpl(accountsRepository);
        final Optional<List<Account>> customerAccountsOptional = persistenceService.getAccountsByCustomer("0001");
        assertNotNull(customerAccountsOptional);
        assertTrue(customerAccountsOptional.isPresent());
        assertNotNull(customerAccountsOptional.get());
        assertEquals(2, customerAccountsOptional.get().size());
    }

    @Test
    void givenANotValidCustomerId_whenAccountsAreRequested_ThenNoAccountsAreRetrieved() {
        final AccountsRepository accountsRepository = mock(AccountsRepository.class);
        when(accountsRepository.findByCustomer(anyString())).thenReturn(Optional.empty());

        final PersistenceService persistenceService = new PersistenceServiceImpl(accountsRepository);
        final Optional<List<Account>> customerAccountsOptional = persistenceService.getAccountsByCustomer("0001");
        assertNotNull(customerAccountsOptional);
        assertTrue(customerAccountsOptional.isEmpty());
    }

    @Test
    void givenAValidAccountId_whenAccountDetailIsRequested_ThenDetailIsRetrieved() {
        final AccountEntity accountEntity = buildAccount(1, "Holder1 Holder1 Holder1", "ES0220385173478718763226", "Account 1", 1000d);
        final AccountsRepository accountsRepository = mock(AccountsRepository.class);
        when(accountsRepository.findById(anyInt())).thenReturn(Optional.of(accountEntity));

        final PersistenceService persistenceService = new PersistenceServiceImpl(accountsRepository);
        final Optional<Account> accountOptional = persistenceService.getAccountById(1);
        assertNotNull(accountOptional);
        assertTrue(accountOptional.isPresent());


        final Account account = accountOptional.get();
        assertNotNull(account);
        assertEquals(account.getBalance(), accountEntity.getBalance());
        assertEquals(account.getId(), accountEntity.getId());
        assertEquals(account.getName(), accountEntity.getName());
        assertEquals(account.getHolder(), accountEntity.getHolder());
        assertEquals(account.getIban(), accountEntity.getIban());
    }

    @Test
    void givenANotValidAccountId_whenAccountDetailIsRequested_ThenAnAccountIsNotRetrieved() {
        final AccountsRepository accountsRepository = mock(AccountsRepository.class);
        when(accountsRepository.findById(anyInt())).thenReturn(Optional.empty());

        final PersistenceService persistenceService = new PersistenceServiceImpl(accountsRepository);
        final Optional<Account> accountOptional = persistenceService.getAccountById(1);
        assertNotNull(accountOptional);
        assertTrue(accountOptional.isEmpty());
    }

    private List<AccountEntity> buildAccountsList() {
        final List<AccountEntity> accounts = new ArrayList<>();
        accounts.add(buildAccount(1, "Holder1 Holder1 Holder1", "ES0220385173478718763226", "Account 1", 1000d));
        accounts.add(buildAccount(2, "Holder2 Holder2 Holder2", "ES0220385173478718763227", "Account 2", 2000d));

        return accounts;
    }

    private AccountEntity buildAccount(int id, String holder, String iban, String name, double balance) {
        final AccountEntity accountEntity = new AccountEntity();
        accountEntity.setBalance(balance);
        accountEntity.setCustomer("0001");
        accountEntity.setHolder(holder);
        accountEntity.setIban(iban);
        accountEntity.setId(id);
        accountEntity.setName(name);

        return accountEntity;
    }

}
