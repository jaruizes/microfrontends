package com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.mappers;

import com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.entities.CardEntity;
import com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.entities.MovementEntity;
import com.techbank.cards.services.cardsservice.business.model.Card;
import com.techbank.cards.services.cardsservice.business.model.Movement;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

public class CardMapper {

    public static Card cardsEntity2Cards(final CardEntity cardsEntity) {
        return new Card.Builder(cardsEntity.getId())
                .withName(cardsEntity.getName())
                .withNumber(cardsEntity.getNumber())
                .withBalance(cardsEntity.getBalance())
                .withExpires(cardsEntity.getExpires())
                .withType(cardsEntity.getType())
                .withMovements(Optional.ofNullable(cardsEntity.getMovements()).orElse(new ArrayList<>()).stream()
                        .map(CardMapper::movementEntity2Movement)
                        .collect(Collectors.toList()))
                .build();
    }

    public static Movement movementEntity2Movement(final MovementEntity movementEntity) {
        return new Movement(movementEntity.getId(),
                movementEntity.getCardId(), movementEntity.getDate(), movementEntity.getSubject(), movementEntity.getAmount());
    }
}
