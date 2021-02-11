package com.techbank.cards.services.cardsservice.platform.api;


import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({APIProperties.class, APIProperties.APIContactProperties.class, APIProperties.APILicenseProperties.class})
public class APIConfiguration {

    private static final String OPENAPI_VERSION = "3.0.0";
    private APIProperties apiProperties;

    public APIConfiguration(final APIProperties apiProperties) {
        this.apiProperties = apiProperties;
    }

    @Bean
    public OpenAPI customOpenAPI() {
        final OpenAPI customOpenApi = new OpenAPI().components(new Components());
        customOpenApi.setOpenapi(OPENAPI_VERSION);

        // General info
        final Info info = new Info().title(getProperties().getName())
                .version(getProperties().getVersion())
                .description(getProperties().getDescription());

        // Adding contact information if exists
        if (getProperties().getContact() != null) {
            info.contact(new Contact()
                    .name(getProperties().getContact().getName())
                    .email(getProperties().getContact().getEmail())
                    .url(getProperties().getContact().getUrl()));
        }

        // Adding license information if exists
        if (getProperties().getLicense() != null) {
            info.license(new License()
                    .name(getProperties().getLicense().getName())
                    .url(getProperties().getLicense().getUrl()));
        }
        customOpenApi.info(info);
        return customOpenApi;
    }

    private APIProperties getProperties() {
        return apiProperties;
    }
}