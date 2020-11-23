package com.techbank.accounts.services.accountservice.business;

import com.techbank.accounts.services.accountservice.business.exceptions.AccountNotFoundException;
import com.techbank.accounts.services.accountservice.business.exceptions.ParameterRequiredException;
import com.techbank.accounts.services.accountservice.business.impl.AccountsServiceImpl;
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

public class AccountServiceTest {

    @Test
    void givenAValidCustomerId_whenAccountsAreRequested_ThenAListOfCustomerAccountsIsRetrieved() {
        final PersistenceService persistenceService = mock(PersistenceService.class);
        when(persistenceService.getAccountsByCustomer(anyString())).thenReturn(Optional.of(this.buildAccountsList()));

        final AccountsService accountsService = new AccountsServiceImpl(persistenceService);
        try {
            final List<Account> customerAccounts = accountsService.getCustomerAccounts("0001");
            assertNotNull(customerAccounts);
            assertEquals(2, customerAccounts.size());
        } catch (AccountNotFoundException | ParameterRequiredException e) {
            fail("Exception should not have been thrown");
        }
    }

    @Test
    void givenANotValidCustomerId_whenAccountsAreRequested_ThenAnAccountNotFoundExceptionIsThrown() {
        final PersistenceService persistenceService = mock(PersistenceService.class);
        when(persistenceService.getAccountsByCustomer(anyString())).thenReturn(Optional.empty());

        final AccountsService accountsService = new AccountsServiceImpl(persistenceService);
        try {
            accountsService.getCustomerAccounts("0001");
            fail("AccountNotFoundException should have been thrown");
        } catch (AccountNotFoundException e) {
            assertNotNull(e);
        } catch (ParameterRequiredException e) {
            fail("ParameterRequiredException should not have been thrown");
        }
    }

    @Test
    void givenNoCustomerId_whenAccountsAreRequested_ThenAParameterRequiredExceptionIsThrown() {
        final PersistenceService persistenceService = mock(PersistenceService.class);

        final AccountsService accountsService = new AccountsServiceImpl(persistenceService);
        try {
            String emptyCustomerId = "";
            accountsService.getCustomerAccounts(emptyCustomerId);
            fail("ParameterRequiredException should have been thrown");
        } catch (AccountNotFoundException e) {
            fail("AccountNotFoundException should not have been thrown");
        } catch (ParameterRequiredException e) {
            assertNotNull(e);
        }

        try {
            accountsService.getCustomerAccounts(null);
            fail("ParameterRequiredException should have been thrown");
        } catch (AccountNotFoundException e) {
            fail("AccountNotFoundException should not have been thrown");
        } catch (ParameterRequiredException e) {
            assertNotNull(e);
        }
    }

    @Test
    void givenAValidAccountId_whenAccountDetailIsRequested_ThenDetailIsRetrieved() {
        final Account accountExpected = buildAccount(1, "Holder2 Holder2 Holder2", "ES0220385173478718763227", "Account 2", 2000d);
        final PersistenceService persistenceService = mock(PersistenceService.class);
        when(persistenceService.getAccountById(anyInt())).thenReturn(Optional.of(accountExpected));

        final AccountsService accountsService = new AccountsServiceImpl(persistenceService);
        try {
            final Account accountRetrieved = accountsService.getAccountDetail(1);
            assertNotNull(accountRetrieved);
            assertEquals(accountExpected, accountRetrieved);
        } catch (AccountNotFoundException e) {
            fail("Exception (AccountNotFoundException) should not have been thrown");
        }
    }

    @Test
    void givenANotValidAccountId_whenAccountDetailIsRequested_ThenAnAccountNotFoundExceptionIsThrown() {
        final PersistenceService persistenceService = mock(PersistenceService.class);
        when(persistenceService.getAccountById(anyInt())).thenReturn(Optional.empty());

        final AccountsService accountsService = new AccountsServiceImpl(persistenceService);
        try {
            accountsService.getAccountDetail(1);
            fail("Exception (AccountNotFoundException) should have been thrown");
        } catch (AccountNotFoundException e) {
            assertNotNull(e);
        }
    }

    private List<Account> buildAccountsList() {
        final List<Account> accounts = new ArrayList<>();
        accounts.add(buildAccount(1, "Holder1 Holder1 Holder1", "ES0220385173478718763226", "Account 1", 1000d));
        accounts.add(buildAccount(2, "Holder2 Holder2 Holder2", "ES0220385173478718763227", "Account 2", 2000d));

        return accounts;
    }

    private Account buildAccount(int id, String holder, String iban, String name, double balance) {
        return new Account.Builder(id)
                .withBalance(balance)
                .withHolder(holder)
                .withIBAN(iban)
                .withName(name)
                .build();
    }

}
