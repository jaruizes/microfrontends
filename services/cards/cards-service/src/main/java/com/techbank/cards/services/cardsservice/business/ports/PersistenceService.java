package com.techbank.cards.services.cardsservice.business.ports;

import com.techbank.cards.services.cardsservice.business.model.Card;

import java.util.List;
import java.util.Optional;

public interface PersistenceService {

    Optional<List<Card>> getCardsByCustomer(String customerId);
    Optional<Card> getCardsById(int id);
}
