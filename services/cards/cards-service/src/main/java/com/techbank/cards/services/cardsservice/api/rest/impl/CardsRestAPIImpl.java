package com.techbank.cards.services.cardsservice.api.rest.impl;

import com.techbank.cards.services.cardsservice.api.dto.MovementDTO;
import com.techbank.cards.services.cardsservice.api.dto.MovementsDTO;
import com.techbank.cards.services.cardsservice.api.rest.CardsRestAPI;
import com.techbank.cards.services.cardsservice.api.dto.CardDTO;
import com.techbank.cards.services.cardsservice.business.CardsService ;
import com.techbank.cards.services.cardsservice.business.exceptions.CardsNotFoundException;
import com.techbank.cards.services.cardsservice.business.exceptions.ParameterRequiredException;
import com.techbank.cards.services.cardsservice.business.model.Card;
import com.techbank.cards.services.cardsservice.business.model.Movement;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping
public class CardsRestAPIImpl implements CardsRestAPI {
    private CardsService  cardsService ;

    public CardsRestAPIImpl(final CardsService  cardsService ) {
        this.cardsService  = cardsService ;
    }

    @Override
    @GetMapping(path = "/cards", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CardDTO>> getCardss(@RequestParam final String customerId) throws CardsNotFoundException, ParameterRequiredException {
        final List<Card> customerCards = this.cardsService.getCustomerCards(customerId);
        final List<CardDTO> customerCardssDTO = customerCards.stream()
                .map(this::cards2DTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(customerCardssDTO);
    }

    @Override
    @GetMapping(path = "/cardss/{cardsId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CardDTO> getCardsDetail(@PathVariable("cardsId") final Integer cardsId) throws CardsNotFoundException {
        final Card cardsDetail = this.cardsService .getCardsDetail(cardsId);

        return ResponseEntity.ok(this.cards2DTO(cardsDetail));
    }

    private CardDTO cards2DTO(final Card card) {
        final MovementsDTO movementsDTO = new MovementsDTO(card.getMovements().stream().map(this::movementDTO).collect(Collectors.toList()));
        return new CardDTO(card.getId(), card.getType(), card.getNumber(), card.getName(), card.getExpires(), card.getBalance(), movementsDTO);
    }

    private MovementDTO movementDTO(final Movement movement) {
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        return new MovementDTO(movement.getId(), movement.getCardsId(), dateFormat.format(movement.getDate()), movement.getSubject(), movement.getAmount());
    }
}
