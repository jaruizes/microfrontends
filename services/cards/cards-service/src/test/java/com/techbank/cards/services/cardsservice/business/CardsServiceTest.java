package com.techbank.cards.services.cardsservice.business;

import com.techbank.cards.services.cardsservice.business.exceptions.CardsNotFoundException;
import com.techbank.cards.services.cardsservice.business.exceptions.ParameterRequiredException;
import com.techbank.cards.services.cardsservice.business.impl.CardsServiceImpl;
import com.techbank.cards.services.cardsservice.business.model.Card;
import com.techbank.cards.services.cardsservice.business.model.Movement;
import com.techbank.cards.services.cardsservice.business.ports.PersistenceService;
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CardsServiceTest {

    @Test
    void givenAValidCustomerId_whenCardssAreRequested_ThenAListOfCustomerCardssIsRetrieved() {
        final PersistenceService persistenceService = mock(PersistenceService.class);
        when(persistenceService.getCardsByCustomer(anyString())).thenReturn(Optional.of(this.buildCardssList()));

        final CardsService cardssService = new CardsServiceImpl(persistenceService);
        try {
            final List<Card> customerCards = cardssService.getCustomerCards("0001");
            assertNotNull(customerCards);
            assertEquals(2, customerCards.size());
        } catch (CardsNotFoundException | ParameterRequiredException e) {
            fail("Exception should not have been thrown");
        }
    }

    @Test
    void givenANotValidCustomerId_whenCardssAreRequested_ThenAnCardsNotFoundExceptionIsThrown() {
        final PersistenceService persistenceService = mock(PersistenceService.class);
        when(persistenceService.getCardsByCustomer(anyString())).thenReturn(Optional.empty());

        final CardsService cardssService = new CardsServiceImpl(persistenceService);
        try {
            cardssService.getCustomerCards("0001");
            fail("CardsNotFoundException should have been thrown");
        } catch (CardsNotFoundException e) {
            assertNotNull(e);
        } catch (ParameterRequiredException e) {
            fail("ParameterRequiredException should not have been thrown");
        }
    }

    @Test
    void givenNoCustomerId_whenCardssAreRequested_ThenAParameterRequiredExceptionIsThrown() {
        final PersistenceService persistenceService = mock(PersistenceService.class);

        final CardsService cardssService = new CardsServiceImpl(persistenceService);
        try {
            String emptyCustomerId = "";
            cardssService.getCustomerCards(emptyCustomerId);
            fail("ParameterRequiredException should have been thrown");
        } catch (CardsNotFoundException e) {
            fail("CardsNotFoundException should not have been thrown");
        } catch (ParameterRequiredException e) {
            assertNotNull(e);
        }

        try {
            cardssService.getCustomerCards(null);
            fail("ParameterRequiredException should have been thrown");
        } catch (CardsNotFoundException e) {
            fail("CardsNotFoundException should not have been thrown");
        } catch (ParameterRequiredException e) {
            assertNotNull(e);
        }
    }

    @Test
    void givenAValidCardsId_whenCardsDetailIsRequested_ThenDetailIsRetrieved() {
        final Card cardExpected = buildCard(1, "10/24", "0", "5173478718763226", "Cards 1", 1000d);
        final PersistenceService persistenceService = mock(PersistenceService.class);
        when(persistenceService.getCardsById(anyInt())).thenReturn(Optional.of(cardExpected));

        final CardsService cardssService = new CardsServiceImpl(persistenceService);
        try {
            final Card cardsRetrieved = cardssService.getCardsDetail(1);
            assertNotNull(cardsRetrieved);
            assertEquals(cardExpected, cardsRetrieved);
        } catch (CardsNotFoundException e) {
            fail("Exception (CardsNotFoundException) should not have been thrown");
        }
    }

    @Test
    void givenANotValidCardsId_whenCardsDetailIsRequested_ThenAnCardsNotFoundExceptionIsThrown() {
        final PersistenceService persistenceService = mock(PersistenceService.class);
        when(persistenceService.getCardsById(anyInt())).thenReturn(Optional.empty());

        final CardsService cardssService = new CardsServiceImpl(persistenceService);
        try {
            cardssService.getCardsDetail(1);
            fail("Exception (CardsNotFoundException) should have been thrown");
        } catch (CardsNotFoundException e) {
            assertNotNull(e);
        }
    }

    private List<Card> buildCardssList() {
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
