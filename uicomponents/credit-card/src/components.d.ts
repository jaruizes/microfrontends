/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CreditCard {
        /**
          * Card entity
         */
        "entity": string;
        /**
          * Card expiration
         */
        "expiration": string;
        /**
          * lang
         */
        "locale": string;
        /**
          * Card logo
         */
        "logo": string;
        /**
          * Card onwer's name
         */
        "name": string;
        /**
          * Card number
         */
        "number": string;
        /**
          * Card expiration
         */
        "type": number;
    }
}
declare global {
    interface HTMLCreditCardElement extends Components.CreditCard, HTMLStencilElement {
    }
    var HTMLCreditCardElement: {
        prototype: HTMLCreditCardElement;
        new (): HTMLCreditCardElement;
    };
    interface HTMLElementTagNameMap {
        "credit-card": HTMLCreditCardElement;
    }
}
declare namespace LocalJSX {
    interface CreditCard {
        /**
          * Card entity
         */
        "entity"?: string;
        /**
          * Card expiration
         */
        "expiration"?: string;
        /**
          * lang
         */
        "locale"?: string;
        /**
          * Card logo
         */
        "logo"?: string;
        /**
          * Card onwer's name
         */
        "name"?: string;
        /**
          * Card number
         */
        "number"?: string;
        /**
          * Card expiration
         */
        "type"?: number;
    }
    interface IntrinsicElements {
        "credit-card": CreditCard;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "credit-card": LocalJSX.CreditCard & JSXBase.HTMLAttributes<HTMLCreditCardElement>;
        }
    }
}
