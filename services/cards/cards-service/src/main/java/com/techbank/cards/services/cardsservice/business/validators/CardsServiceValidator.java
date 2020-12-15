package com.techbank.cards.services.cardsservice.business.validators;

import com.techbank.cards.services.cardsservice.business.exceptions.ParameterRequiredException;

public class CardsServiceValidator {

    public static void getCustomerCardsValidate(final String customerId) throws ParameterRequiredException {
        if (customerId == null || customerId.isBlank()) {
            throw new ParameterRequiredException("customer");
        }
    }
}
