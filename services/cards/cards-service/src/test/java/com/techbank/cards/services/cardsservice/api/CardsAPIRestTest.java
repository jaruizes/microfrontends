package com.techbank.cards.services.cardsservice.api;

import com.techbank.cards.services.cardsservice.api.dto.CardDTO;
import com.techbank.cards.services.cardsservice.api.rest.CardsRestAPI;
import com.techbank.cards.services.cardsservice.api.rest.impl.CardsRestAPIImpl;
import com.techbank.cards.services.cardsservice.business.CardsService;
import com.techbank.cards.services.cardsservice.business.exceptions.CardsNotFoundException;
import com.techbank.cards.services.cardsservice.business.exceptions.ParameterRequiredException;
import com.techbank.cards.services.cardsservice.business.model.Card;
import com.techbank.cards.services.cardsservice.business.model.Movement;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CardsAPIRestTest {

    @Test
    void givenAValidCustomerId_whenCardssAreRequested_ThenAListOfCustomerCardssIsRetrieved() throws CardsNotFoundException, ParameterRequiredException {
        final List<Card> cardsExpected = buildCardsList();
        final CardsService cardsService = mock(CardsService.class);
        when(cardsService.getCustomerCards(anyString())).thenReturn(cardsExpected);

        final CardsRestAPI cardsRestAPI = new CardsRestAPIImpl(cardsService);
        final ResponseEntity<List<CardDTO>> customerCardssResponse = cardsRestAPI.getCardss("0001");
        assertNotNull(customerCardssResponse);
        assertEquals(customerCardssResponse.getStatusCodeValue(), 200);

        final List<CardDTO> cardssRetrieved = customerCardssResponse.getBody();
        assertNotNull(cardssRetrieved);
        assertEquals(cardssRetrieved.size(), cardsExpected.size());
        cardssRetrieved.forEach((cardDTO) -> {
            final Card cardExpected = cardsExpected.stream()
                    .filter(cards -> cards.getId() == cardDTO.getId())
                    .collect(Collectors.toList()).get(0);

            assertEquals(cardExpected.getBalance(), cardDTO.getBalance().doubleValue());
            assertEquals(cardExpected.getExpires(), cardDTO.getExpires());
            assertEquals(cardExpected.getName(), cardDTO.getName());
            assertEquals(cardExpected.getNumber(), cardDTO.getNumber());
            assertEquals(cardExpected.getExpires(), cardDTO.getExpires());
            assertNotNull(cardDTO.getMovements());
            assertEquals(1, cardDTO.getMovements().getMovements().size());
        });
    }

    @Test
    void givenANotExistingCustomerId_whenCardssAreRequested_ThenAnEmptyListIsRetrieved() throws CardsNotFoundException, ParameterRequiredException {
        final CardsService cardsService = mock(CardsService.class);
        when(cardsService.getCustomerCards(anyString())).thenReturn(new ArrayList<>());

        final CardsRestAPI cardsRestAPI = new CardsRestAPIImpl(cardsService);
        final ResponseEntity<List<CardDTO>> customerCardsResponse = cardsRestAPI.getCardss("0001");
        assertNotNull(customerCardsResponse);
        assertEquals(customerCardsResponse.getStatusCodeValue(), 200);

        final List<CardDTO> cardssRetrieved = customerCardsResponse.getBody();
        assertNotNull(cardssRetrieved);
        assertEquals(0, cardssRetrieved.size());
    }

    @Test
    void givenAEmptyCustomerId_whenCardssAreRequested_ThenABadRequestCodeIsRetrieved() throws CardsNotFoundException, ParameterRequiredException {
        final CardsService cardsService = mock(CardsService.class);
        when(cardsService.getCustomerCards(anyString())).thenThrow(new ParameterRequiredException("customer"));

        final CardsRestAPI cardsRestAPI = new CardsRestAPIImpl(cardsService);
        try {
            cardsRestAPI.getCardss("");
        } catch (ParameterRequiredException e) {
            assertNotNull(e);
        }

        try {
            cardsRestAPI.getCardss(null);
        } catch (ResponseStatusException e) {
            assertNotNull(e);
        }
    }

    @Test
    void givenAValidCardsId_whenCardsDetailIsRequested_ThenDetailIsRetrieved() throws CardsNotFoundException {
        final Card cardsExpected = buildCard(1, "10/24", "0", "5173478718763226", "Cards 1", 1000d);
        final CardsService cardsService = mock(CardsService.class);
        when(cardsService.getCardsDetail(anyInt())).thenReturn(cardsExpected);

        final CardsRestAPI cardsRestAPI = new CardsRestAPIImpl(cardsService);
        final ResponseEntity<CardDTO> cardsDetailResponse = cardsRestAPI.getCardsDetail(2);
        assertNotNull(cardsDetailResponse);
        assertNotNull(cardsDetailResponse.getBody());
        assertEquals(cardsDetailResponse.getStatusCodeValue(), 200);

        final CardDTO cardsRetrieved = cardsDetailResponse.getBody();
        assertEquals(cardsExpected.getBalance(), cardsRetrieved.getBalance().doubleValue());
        assertEquals(cardsExpected.getExpires(), cardsRetrieved.getExpires());
        assertEquals(cardsExpected.getName(), cardsRetrieved.getName());
        assertEquals(cardsExpected.getNumber(), cardsRetrieved.getNumber());
        assertEquals(cardsExpected.getType(), cardsRetrieved.getType());
        assertEquals(cardsExpected.getId(), cardsRetrieved.getId());
        assertNotNull(cardsRetrieved.getMovements());
        assertEquals(1, cardsRetrieved.getMovements().getMovements().size());
    }

    @Test
    void givenANotValidCardsId_whenCardsDetailIsRequested_ThenAnCardsNotFoundExceptionIsThrown() throws CardsNotFoundException {
        final CardsService cardsService = mock(CardsService.class);
        when(cardsService.getCardsDetail(anyInt())).thenThrow(new CardsNotFoundException());

        final CardsRestAPI cardsRestAPI = new CardsRestAPIImpl(cardsService);
        try {
            cardsRestAPI.getCardsDetail(2);
        } catch (CardsNotFoundException e) {
            assertNotNull(e);
        }
    }

    private List<Card> buildCardsList() {
        final List<Card> cards = new ArrayList<>();
        cards.add(buildCard(1, "10/24", "0", "5173478718763226", "Cards 1", 1000d));
        cards.add(buildCard(2, "10/24", "0", "5173478718763226", "Cards w", 1000d));

        return cards;
    }

    private Card buildCard(int id, String expires, String type, String number, String name, double balance) {
        List<Movement> movements = new ArrayList<>();
        movements.add(new Movement(1,1, new Date(), "Subject", 3000d));
        return new Card.Builder(id)
                .withBalance(balance)
                .withExpires(expires)
                .withNumber(number)
                .withType(type)
                .withName(name)
                .withMovements(movements)
                .build();
    }

}
