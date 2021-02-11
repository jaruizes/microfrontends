package com.techbank.cards.services.cardsservice.api.dto;

import java.io.Serializable;

public class MovementDTO implements Serializable {

    private Integer id;
    private Integer cardsId;
    private String date;
    private String subject;
    private Double amount;

    public MovementDTO(final Integer id, final Integer cardsId, final String date, final String subject, final Double amount) {
        this.id = id;
        this.cardsId = cardsId;
        this.date = date;
        this.subject = subject;
        this.amount = amount;
    }

    public Integer getId() {
        return id;
    }

    public Integer getCardsId() {
        return cardsId;
    }

    public String getDate() {
        return date;
    }

    public String getSubject() {
        return subject;
    }

    public Double getAmount() {
        return amount;
    }
}
