package com.techbank.cards.services.cardsservice.api.dto;

import java.io.Serializable;
import java.util.List;

public class CardDTO implements Serializable {

    private Integer id;
    private String type;
    private String number;
    private String name;
    private String expires;
    private Double amount;
    private Integer limit;
    private List<MovementDTO> movements;

    public CardDTO(final Integer id, final String type, final String number, final String name, final String expires, final Double amount, final List<MovementDTO> movements) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.number = number;
        this.expires = expires;
        this.amount = amount;
        this.movements = movements;
        this.limit = 3000;
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

    public Double getAmount() {
        return amount;
    }

    // TODO: Fix apps in order to unify API
    public Double getBalance() {
        return amount;
    }

    public Integer getLimit() {
        return limit;
    }

    public List<MovementDTO> getMovements() {
        return movements;
    }


}
