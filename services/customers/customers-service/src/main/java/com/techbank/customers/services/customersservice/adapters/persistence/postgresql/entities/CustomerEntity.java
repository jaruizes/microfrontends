package com.techbank.customers.services.customersservice.adapters.persistence.postgresql.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="customers")
public class CustomerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    private String name;
    @OneToMany
    @JoinColumn(name = "customerId")
    private List<MovementEntity> movements;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public List<MovementEntity> getMovements() {
        return movements;
    }

    public void setMovements(final List<MovementEntity> movements) {
        this.movements = movements;
    }
}
