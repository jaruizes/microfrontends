package com.techbank.accounts.services.accountservice.api.dto;

import java.io.Serializable;
import java.util.List;

public class MovementsDTO implements Serializable {

    private List<MovementDTO> movements;

    public MovementsDTO(final List<MovementDTO> movements) {
        this.movements = movements;
    }

    public List<MovementDTO> getMovements() {
        return movements;
    }
}
