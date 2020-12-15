package com.techbank.cards.services.cardsservice.adapters.persistence;

import com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.CardsRepository;
import com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.entities.CardEntity;
import com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.mappers.CardMapper;
import com.techbank.cards.services.cardsservice.business.model.Card;
import com.techbank.cards.services.cardsservice.business.ports.PersistenceService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class PersistenceServiceImpl implements PersistenceService {

    private CardsRepository cardsRepository;

    public PersistenceServiceImpl(CardsRepository cardsRepository) {
        this.cardsRepository = cardsRepository;
    }

    @Override
    public Optional<List<Card>> getCardsByCustomer(final String customerId) {
        return this.cardsRepository.findByCustomer(customerId)
                .map(cardsEntities ->
                        cardsEntities.stream().map(CardMapper::cardsEntity2Cards)
                        .collect(Collectors.toList()));
    }

    @Override
    public Optional<Card> getCardsById(final int id) {
        Optional<CardEntity> cardsEntityOptional = this.cardsRepository.findById(id);
        return cardsEntityOptional.map(CardMapper::cardsEntity2Cards);
    }
}
