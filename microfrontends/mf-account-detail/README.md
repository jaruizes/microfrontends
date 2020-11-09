# Account Detail

## Description

This component provides the **account detail**, in addition to listing its movements

<br />
<br />

## Props

| Name    | Description                                                  | Required | Default |
| ------- | ------------------------------------------------------------ | -------- | ------- |
| locale  | This is the lang used by the component                       | Not      | "en"    |
| account | Account id.                                                  | Yes      |         |
| channel | This is the channel (DOM) used to exchange messages with its parent | Not      |         |

<br />

## Events

### Input events

| Type         | Description                                                  | Payload       |
| ------------ | ------------------------------------------------------------ | ------------- |
| changeLocale | This event is listened and when it's received, the lang of the component is changed |  |



### Output events

This component doesn't fire any event

<br />

## How can I use it?

### Load

This microfrontend is located in the URI '**/microfrontends/account-detail-mf/v1/main.js**'

### Usage

```jsx
<mf-account-detail 
  locale="en" 
  channel="global-position"
  account="12345">
</mf-account-detail>
```


