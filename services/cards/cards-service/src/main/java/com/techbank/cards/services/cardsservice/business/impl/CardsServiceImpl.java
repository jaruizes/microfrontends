package com.techbank.cards.services.cardsservice.business.impl;

import com.techbank.cards.services.cardsservice.business.CardsService;
import com.techbank.cards.services.cardsservice.business.exceptions.CardsNotFoundException;
import com.techbank.cards.services.cardsservice.business.exceptions.ParameterRequiredException;
import com.techbank.cards.services.cardsservice.business.model.Card;
import com.techbank.cards.services.cardsservice.business.ports.PersistenceService;
import com.techbank.cards.services.cardsservice.business.validators.CardsServiceValidator;

import java.util.List;

public class CardsServiceImpl implements CardsService {

    private PersistenceService persistenceService;

    public CardsServiceImpl(PersistenceService persistenceService) {
        this.persistenceService = persistenceService;
    }

    @Override
    public List<Card> getCustomerCards(final String customerId) throws CardsNotFoundException, ParameterRequiredException {
        CardsServiceValidator.getCustomerCardsValidate(customerId);

        return this.persistenceService.getCardsByCustomer(customerId)
                .orElseThrow(CardsNotFoundException::new);
    }

    @Override
    public Card getCardsDetail(final int cardsId) throws CardsNotFoundException {
        return this.persistenceService.getCardsById(cardsId)
                .orElseThrow(CardsNotFoundException::new);
    }
}
