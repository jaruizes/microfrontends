package com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="movements")
public class MovementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int cardId;
    private Date date;
    private String subject;
    private double amount;

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(final int cardsId) {
        this.cardId = cardsId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(final Date date) {
        this.date = date;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(final String subject) {
        this.subject = subject;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(final double amount) {
        this.amount = amount;
    }
}
