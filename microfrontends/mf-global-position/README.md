# Global Position

## Description

This Micro Frontend provides the global position for a given customer. It has two different views depending on the "mode" parameter (customer vs backoffice) containing information about:

**Customer Mode:**

- **Accounts**: lists the two principals accounts of the customer
- **Cards**: lists the two principals cards of the customer
- **Summary**: shows incomes versus expenses during the last twelve months
- Shortcuts: shows customer shortcuts
- **Notifications**: show the main notification for a customer
- **Last Movements**: shows the recent movements from the all accounts of the customers



**Backoffice Mode:**

- **Accounts**: lists the two principals accounts of the customer
- **Cards**: lists the two principals cards of the customer
- **Summary**: shows incomes versus expenses during the last twelve months

<br />

## Props

| Name     | Description                                                  | Required | Default |
| -------- | ------------------------------------------------------------ | -------- | ------- |
| locale   | This is the lang used by the component                       | Not      | "en"    |
| mode     | Mode in which the component works. The possbible values are<br />- 0: customer mode<br />- 1: backoffice mode | Not      | 0       |
| customer | Customer id. This parameter is required in "backoffice mode" but in "customer mode", the customer id is retrieved from the id token. | Not      |         |
| channel  | This is the channel (DOM) used to exchange messages with its parent | Not      |         |

<br />

## Events

### Input events

| Type         | Description                                                  | Payload |
| ------------ | ------------------------------------------------------------ | ------- |
| changeLocale | This event is listened and when it's received, the lang of the component is changed | Not     |



### Output events

| Type         | Description                                    | Payload           |
| ------------ | ---------------------------------------------- | ----------------- |
| accountClick | This event is fired when an account is clicked | {id: <accountId>} |
| cardClick    | This event is fired when an account is clicked | {id: <cardId>}    |

<br />

## How can I use it?

### Load

This microfrontend is located in the URI '**/microfrontends/global-position-mf/v1/main.js**'

### Usage

This component has two different usages:

#### Customer mode

```jsx
<mf-global-position locale="en" channel="global-position"></mf-global-position>
```

In this mode, customer id is retrieved from the id token storaged in session storage, so it's necessary that the customer must be logged and the JWT tokens (access_token & id_token) have been storaged

#### Backoffice mode

```jsx
<mf-global-position locale="en" 
  customer="0001" 
  channel="global-position"
  mode="1">
</mf-global-position>
```

In this mode, customer id is retrieved from the id token storaged in session storage, so it's necessary that the customer must be logged and the JWT tokens (access_token & id_token) have been storaged
