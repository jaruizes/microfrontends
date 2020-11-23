package com.techbank.accounts.services.accountservice.api;

import com.techbank.accounts.services.accountservice.api.dto.AccountDTO;
import com.techbank.accounts.services.accountservice.api.rest.AccountsRestAPI;
import com.techbank.accounts.services.accountservice.api.rest.impl.AccountsRestAPIImpl;
import com.techbank.accounts.services.accountservice.business.AccountsService;
import com.techbank.accounts.services.accountservice.business.exceptions.AccountNotFoundException;
import com.techbank.accounts.services.accountservice.business.exceptions.ParameterRequiredException;
import com.techbank.accounts.services.accountservice.business.impl.AccountsServiceImpl;
import com.techbank.accounts.services.accountservice.business.model.Account;
import com.techbank.accounts.services.accountservice.business.ports.PersistenceService;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class AccountsAPIRestTest {

    @Test
    void givenAValidCustomerId_whenAccountsAreRequested_ThenAListOfCustomerAccountsIsRetrieved() throws AccountNotFoundException, ParameterRequiredException {
        final List<Account> accountsExpected = buildAccountsList();
        final AccountsService accountsService = mock(AccountsService.class);
        when(accountsService.getCustomerAccounts(anyString())).thenReturn(accountsExpected);

        final AccountsRestAPI accountsRestAPI = new AccountsRestAPIImpl(accountsService);
        final ResponseEntity<List<AccountDTO>> customerAccountsResponse = accountsRestAPI.getAccounts("0001");
        assertNotNull(customerAccountsResponse);
        assertEquals(customerAccountsResponse.getStatusCodeValue(), 200);

        final List<AccountDTO> accountsRetrieved = customerAccountsResponse.getBody();
        assertNotNull(accountsRetrieved);
        assertEquals(accountsRetrieved.size(), accountsExpected.size());
        accountsRetrieved.forEach((accountDTO) -> {
            final Account accountExpected = accountsExpected.stream()
                    .filter(account -> account.getId() == accountDTO.getId())
                    .collect(Collectors.toList()).get(0);

            assertEquals(accountExpected.getBalance(), accountDTO.getBalance().doubleValue());
            assertEquals(accountExpected.getHolder(), accountDTO.getHolder());
            assertEquals(accountExpected.getName(), accountDTO.getName());
            assertEquals(accountExpected.getIban(), accountDTO.getIban());
        });
    }

    @Test
    void givenANotExistingCustomerId_whenAccountsAreRequested_ThenAnEmptyListIsRetrieved() throws AccountNotFoundException, ParameterRequiredException {
        final AccountsService accountsService = mock(AccountsService.class);
        when(accountsService.getCustomerAccounts(anyString())).thenReturn(new ArrayList<>());

        final AccountsRestAPI accountsRestAPI = new AccountsRestAPIImpl(accountsService);
        final ResponseEntity<List<AccountDTO>> customerAccountsResponse = accountsRestAPI.getAccounts("0001");
        assertNotNull(customerAccountsResponse);
        assertEquals(customerAccountsResponse.getStatusCodeValue(), 200);

        final List<AccountDTO> accountsRetrieved = customerAccountsResponse.getBody();
        assertNotNull(accountsRetrieved);
        assertEquals(0, accountsRetrieved.size());
    }

    @Test
    void givenAEmptyCustomerId_whenAccountsAreRequested_ThenABadRequestCodeIsRetrieved() throws AccountNotFoundException, ParameterRequiredException {
        final AccountsService accountsService = mock(AccountsService.class);
        when(accountsService.getCustomerAccounts(anyString())).thenThrow(new ParameterRequiredException("customer"));

        final AccountsRestAPI accountsRestAPI = new AccountsRestAPIImpl(accountsService);
        try {
            accountsRestAPI.getAccounts("");
        } catch (ParameterRequiredException e) {
            assertNotNull(e);
        }

        try {
            accountsRestAPI.getAccounts(null);
        } catch (ResponseStatusException e) {
            assertNotNull(e);
        }
    }

    @Test
    void givenAValidAccountId_whenAccountDetailIsRequested_ThenDetailIsRetrieved() throws AccountNotFoundException {
        final Account accountExpected = buildAccount(2, "Holder2 Holder2 Holder2", "ES0220385173478718763227", "Account 2", 2000d);
        final AccountsService accountsService = mock(AccountsService.class);
        when(accountsService.getAccountDetail(anyInt())).thenReturn(accountExpected);

        final AccountsRestAPI accountsRestAPI = new AccountsRestAPIImpl(accountsService);
        final ResponseEntity<AccountDTO> accountDetailResponse = accountsRestAPI.getAccountDetail(2);
        assertNotNull(accountDetailResponse);
        assertNotNull(accountDetailResponse.getBody());
        assertEquals(accountDetailResponse.getStatusCodeValue(), 200);

        final AccountDTO accountRetrieved = accountDetailResponse.getBody();
        assertEquals(accountExpected.getBalance(), accountRetrieved.getBalance().doubleValue());
        assertEquals(accountExpected.getHolder(), accountRetrieved.getHolder());
        assertEquals(accountExpected.getName(), accountRetrieved.getName());
        assertEquals(accountExpected.getIban(), accountRetrieved.getIban());
        assertEquals(accountExpected.getId(), accountRetrieved.getId());
    }

    @Test
    void givenANotValidAccountId_whenAccountDetailIsRequested_ThenAnAccountNotFoundExceptionIsThrown() throws AccountNotFoundException {
        final AccountsService accountsService = mock(AccountsService.class);
        when(accountsService.getAccountDetail(anyInt())).thenThrow(new AccountNotFoundException());

        final AccountsRestAPI accountsRestAPI = new AccountsRestAPIImpl(accountsService);
        try {
            accountsRestAPI.getAccountDetail(2);
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
