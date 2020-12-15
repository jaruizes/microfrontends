package com.techbank.cards.services.cardsservice.adapters.persistence.postgresql;

import com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.entities.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardsRepository extends JpaRepository<CardEntity, Integer> {
    Optional<List<CardEntity>> findByCustomer(String customer);
}
