package com.techbank.customers.services.customersservice.platform.api;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix="spring.application")
public class APIProperties {

    private String name = "${appName}";
    private String description;
    private String version = "${version}";
    private APIContactProperties contact;
    private APILicenseProperties license;

    public APIProperties(final APIContactProperties contact, final APILicenseProperties license) {
        this.contact = contact;
        this.license = license;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(final String version) {
        this.version = version;
    }

    public APIContactProperties getContact() {
        return contact;
    }

    public void setContact(final APIContactProperties contact) {
        this.contact = contact;
    }

    public APILicenseProperties getLicense() {
        return license;
    }

    public void setLicense(final APILicenseProperties license) {
        this.license = license;
    }

    @ConfigurationProperties(prefix="spring.application.contact")
    public static class APIContactProperties {

        private String name = "Example";
        private String email = "contact@example.com";
        private String url = "www.example.com";

        public String getName() {
            return name;
        }

        public void setName(final String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(final String email) {
            this.email = email;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(final String url) {
            this.url = url;
        }
    }

    @ConfigurationProperties(prefix="spring.application.license")
    public static class APILicenseProperties {

        private String name = "Apache 2.0";
        private String url = "http://springdoc.org";

        public String getName() {
            return name;
        }

        public void setName(final String name) {
            this.name = name;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(final String url) {
            this.url = url;
        }
    }
}
