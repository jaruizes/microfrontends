package com.techbank.accounts.services.accountservice.config;

import com.techbank.accounts.services.accountservice.adapters.persistence.PersistenceServiceImpl;
import com.techbank.accounts.services.accountservice.adapters.persistence.postgresql.AccountsRepository;
import com.techbank.accounts.services.accountservice.business.AccountsService;
import com.techbank.accounts.services.accountservice.business.impl.AccountsServiceImpl;
import com.techbank.accounts.services.accountservice.business.ports.PersistenceService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AccountServiceConfiguration {

    @Bean
    public PersistenceService persistenceService(AccountsRepository accountsRepository) {
        return new PersistenceServiceImpl(accountsRepository);
    }

    @Bean
    public AccountsService accountsService(PersistenceService persistenceService) {
        return new AccountsServiceImpl(persistenceService);
    }
}
