package com.techbank.cards.services.cardsservice.api.dto;

import java.io.Serializable;
import java.util.List;

public class CardDTO implements Serializable {

    private Integer id;
    private String type;
    private String number;
    private String name;
    private String expires;
    private Double balance;
    private MovementsDTO movements;

    public CardDTO(final Integer id, final String type, final String number, final String name, final String expires, final Double balance, final MovementsDTO movements) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.number = number;
        this.expires = expires;
        this.balance = balance;
        this.movements = movements;
    }

    public Integer getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getNumber() {
        return number;
    }

    public String getName() {
        return name;
    }

    public String getExpires() {
        return expires;
    }

    public Double getBalance() {
        return balance;
    }

    public MovementsDTO getMovements() {
        return movements;
    }


}
