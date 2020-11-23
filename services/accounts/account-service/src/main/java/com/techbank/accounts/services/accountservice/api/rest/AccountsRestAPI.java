package com.techbank.accounts.services.accountservice.api.rest;

import com.techbank.accounts.services.accountservice.api.dto.AccountDTO;
import com.techbank.accounts.services.accountservice.business.exceptions.AccountNotFoundException;
import com.techbank.accounts.services.accountservice.business.exceptions.ParameterRequiredException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


public interface AccountsRestAPI {
    ResponseEntity<List<AccountDTO>> getAccounts(String customerId) throws AccountNotFoundException, ParameterRequiredException;

    ResponseEntity<AccountDTO> getAccountDetail(Integer accountId) throws AccountNotFoundException;
}
