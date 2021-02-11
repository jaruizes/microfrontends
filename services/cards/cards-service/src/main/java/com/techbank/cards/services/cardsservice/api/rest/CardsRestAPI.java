package com.techbank.cards.services.cardsservice.api.rest;

import com.techbank.cards.services.cardsservice.api.dto.CardDTO;
import com.techbank.cards.services.cardsservice.business.exceptions.CardsNotFoundException;
import com.techbank.cards.services.cardsservice.business.exceptions.ParameterRequiredException;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface CardsRestAPI {
    ResponseEntity<List<CardDTO>> getCardss(String customerId) throws CardsNotFoundException, ParameterRequiredException;

    ResponseEntity<CardDTO> getCardsDetail(Integer cardsId) throws CardsNotFoundException;
}
