package com.techbank.cards.services.cardsservice.adapters.persistence;

import com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.CardsRepository;
import com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.entities.CardEntity;
import com.techbank.cards.services.cardsservice.business.model.Card;
import com.techbank.cards.services.cardsservice.business.ports.PersistenceService;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CardsPersistenceTest {

    @Test
    void givenAValidCustomerId_whenCardssAreRequested_ThenAListOfCustomerCardssIsRetrieved() {
        final CardsRepository cardsRepository = mock(CardsRepository.class);
        when(cardsRepository.findByCustomer(anyString())).thenReturn(Optional.of(this.buildCardsList()));

        final PersistenceService persistenceService = new PersistenceServiceImpl(cardsRepository);
        final Optional<List<Card>> customerCardssOptional = persistenceService.getCardsByCustomer("0001");
        assertNotNull(customerCardssOptional);
        assertTrue(customerCardssOptional.isPresent());
        assertNotNull(customerCardssOptional.get());
        assertEquals(2, customerCardssOptional.get().size());
    }

    @Test
    void givenANotValidCustomerId_whenCardssAreRequested_ThenNoCardssAreRetrieved() {
        final CardsRepository cardssRepository = mock(CardsRepository.class);
        when(cardssRepository.findByCustomer(anyString())).thenReturn(Optional.empty());

        final PersistenceService persistenceService = new PersistenceServiceImpl(cardssRepository);
        final Optional<List<Card>> customerCardssOptional = persistenceService.getCardsByCustomer("0001");
        assertNotNull(customerCardssOptional);
        assertTrue(customerCardssOptional.isEmpty());
    }

    @Test
    void givenAValidCardsId_whenCardsDetailIsRequested_ThenDetailIsRetrieved() {
        final CardEntity cardsEntity = buildCards(1, "10/24", "0", "5173478718763226", "Cards 1", 1000d);
        final CardsRepository cardssRepository = mock(CardsRepository.class);
        when(cardssRepository.findById(anyInt())).thenReturn(Optional.of(cardsEntity));

        final PersistenceService persistenceService = new PersistenceServiceImpl(cardssRepository);
        final Optional<Card> cardsOptional = persistenceService.getCardsById(1);
        assertNotNull(cardsOptional);
        assertTrue(cardsOptional.isPresent());


        final Card card = cardsOptional.get();
        assertNotNull(card);
        assertEquals(card.getBalance(), cardsEntity.getBalance());
        assertEquals(card.getId(), cardsEntity.getId());
        assertEquals(card.getName(), cardsEntity.getName());
        assertEquals(card.getType(), cardsEntity.getType());
        assertEquals(card.getNumber(), cardsEntity.getNumber());
        assertEquals(card.getExpires(), cardsEntity.getExpires());
    }

    @Test
    void givenANotValidCardsId_whenCardsDetailIsRequested_ThenAnCardsIsNotRetrieved() {
        final CardsRepository cardssRepository = mock(CardsRepository.class);
        when(cardssRepository.findById(anyInt())).thenReturn(Optional.empty());

        final PersistenceService persistenceService = new PersistenceServiceImpl(cardssRepository);
        final Optional<Card> cardsOptional = persistenceService.getCardsById(1);
        assertNotNull(cardsOptional);
        assertTrue(cardsOptional.isEmpty());
    }

    private List<CardEntity> buildCardsList() {
        final List<CardEntity> cards = new ArrayList<>();
        cards.add(buildCards(1, "10/24", "0", "5173478718763226", "Cards 1", 1000d));
        cards.add(buildCards(2, "10/25", "1", "5173478718763227", "Cards 2", 2000d));

        return cards;
    }

    private CardEntity buildCards(int id, String expires, String type, String number, String name, double balance) {
        final CardEntity cardsEntity = new CardEntity();
        cardsEntity.setBalance(balance);
        cardsEntity.setCustomer("0001");
        cardsEntity.setExpires(expires);
        cardsEntity.setType(type);
        cardsEntity.setNumber(number);
        cardsEntity.setId(id);
        cardsEntity.setName(name);

        return cardsEntity;
    }

}
