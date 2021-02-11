package com.techbank.cards.services.cardsservice.business.model;

import java.util.Date;

public class Movement {
    private int id;
    private int cardsId;
    private Date date;
    private String subject;
    private double amount;

    public Movement(final int id, final int cardsId, final Date date, final String subject, final double amount) {
        this.id = id;
        this.cardsId = cardsId;
        this.date = date;
        this.subject = subject;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

    public int getCardsId() {
        return cardsId;
    }

    public Date getDate() {
        return date;
    }

    public String getSubject() {
        return subject;
    }

    public double getAmount() {
        return amount;
    }
}
