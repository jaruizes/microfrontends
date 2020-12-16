package com.techbank.customers.services.customersservice.config;

import com.techbank.customers.services.customersservice.adapters.persistence.PersistenceServiceImpl;
import com.techbank.customers.services.customersservice.adapters.persistence.postgresql.CustomersRepository;
import com.techbank.customers.services.customersservice.business.CustomersService;
import com.techbank.customers.services.customersservice.business.impl.CustomersServiceImpl;
import com.techbank.customers.services.customersservice.business.ports.PersistenceService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomersServiceConfiguration {

    @Bean
    public PersistenceService persistenceService(CustomersRepository customersRepository) {
        return new PersistenceServiceImpl(customersRepository);
    }

    @Bean
    public CustomersService cardssService(PersistenceService persistenceService) {
        return new CustomersServiceImpl(persistenceService);
    }
}
