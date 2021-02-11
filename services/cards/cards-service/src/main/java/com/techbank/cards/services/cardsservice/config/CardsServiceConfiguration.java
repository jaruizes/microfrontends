package com.techbank.cards.services.cardsservice.config;

import com.techbank.cards.services.cardsservice.adapters.persistence.PersistenceServiceImpl;
import com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.CardsRepository;
import com.techbank.cards.services.cardsservice.business.CardsService;
import com.techbank.cards.services.cardsservice.business.impl.CardsServiceImpl;
import com.techbank.cards.services.cardsservice.business.ports.PersistenceService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CardsServiceConfiguration {

    @Bean
    public PersistenceService persistenceService(CardsRepository cardsRepository) {
        return new PersistenceServiceImpl(cardsRepository);
    }

    @Bean
    public CardsService cardssService(PersistenceService persistenceService) {
        return new CardsServiceImpl(persistenceService);
    }
}
