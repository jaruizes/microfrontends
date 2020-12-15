package com.techbank.cards.services.cardsservice.business.exceptions;

import java.util.ArrayList;
import java.util.List;

public class ParameterRequiredException extends Exception {

    private static final String FOLLOWING_PARAMETERS_ARE_REQUIRED = "The following parameters are required: ";
    private List<String> requiredParameters;

    public ParameterRequiredException(String requiredParameter) {
        super(FOLLOWING_PARAMETERS_ARE_REQUIRED + requiredParameter);
        this.requiredParameters = new ArrayList<>();
        this.requiredParameters.add(requiredParameter);
    }

    public ParameterRequiredException(final List<String> requiredParameters) {
        super(FOLLOWING_PARAMETERS_ARE_REQUIRED + requiredParameters.toString());
        this.requiredParameters = requiredParameters;
    }

    public List<String> getRequiredParameters() {
        return requiredParameters;
    }
}
