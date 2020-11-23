package com.techbank.accounts.services.accountservice.api.rest.impl;

import com.techbank.accounts.services.accountservice.api.rest.AccountsRestAPI;
import com.techbank.accounts.services.accountservice.api.dto.AccountDTO;
import com.techbank.accounts.services.accountservice.business.AccountsService;
import com.techbank.accounts.services.accountservice.business.exceptions.AccountNotFoundException;
import com.techbank.accounts.services.accountservice.business.exceptions.ParameterRequiredException;
import com.techbank.accounts.services.accountservice.business.model.Account;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping
public class AccountsRestAPIImpl implements AccountsRestAPI {
    private AccountsService accountsService;

    public AccountsRestAPIImpl(final AccountsService accountsService) {
        this.accountsService = accountsService;
    }

    @Override
    @GetMapping(path = "/accounts", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<AccountDTO>> getAccounts(@RequestParam final String customerId) throws AccountNotFoundException, ParameterRequiredException {
        final List<Account> customerAccounts = this.accountsService.getCustomerAccounts(customerId);
        final List<AccountDTO> customerAccountsDTO = customerAccounts.stream()
                .map(this::account2DTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(customerAccountsDTO);
    }

    @Override
    @GetMapping(path = "/accounts/{accountId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AccountDTO> getAccountDetail(@PathVariable("accountId") final Integer accountId) throws AccountNotFoundException {
        final Account accountDetail = this.accountsService.getAccountDetail(accountId);

        return ResponseEntity.ok(this.account2DTO(accountDetail));
    }

    private AccountDTO account2DTO(final Account account) {
        return new AccountDTO.Builder(account.getId())
                .withBalance(account.getBalance())
                .withHolder(account.getHolder())
                .withName(account.getName())
                .withIBAN(account.getIban())
                .build();
    }
}
