package com.techbank.cards.services.cardsservice.business;

import com.techbank.cards.services.cardsservice.business.exceptions.CardsNotFoundException;
import com.techbank.cards.services.cardsservice.business.exceptions.ParameterRequiredException;
import com.techbank.cards.services.cardsservice.business.model.Card;

import java.util.List;

public interface CardsService {

    List<Card> getCustomerCards(String customerId) throws CardsNotFoundException, ParameterRequiredException;
    Card getCardsDetail(int cardsId) throws CardsNotFoundException;
}
