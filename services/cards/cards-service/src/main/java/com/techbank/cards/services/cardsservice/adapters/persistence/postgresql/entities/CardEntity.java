package com.techbank.cards.services.cardsservice.adapters.persistence.postgresql.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="cards")
public class CardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String type;
    private String number;
    private String name;
    private String expires;
    private double balance;
    private String customer;

    @OneToMany
    @JoinColumn(name = "cardId")
    private List<MovementEntity> movements;

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(final String number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getExpires() {
        return expires;
    }

    public void setExpires(final String expires) {
        this.expires = expires;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(final double balance) {
        this.balance = balance;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(final String customer) {
        this.customer = customer;
    }

    public List<MovementEntity> getMovements() {
        return movements;
    }

    public void setMovements(final List<MovementEntity> movements) {
        this.movements = movements;
    }
}
