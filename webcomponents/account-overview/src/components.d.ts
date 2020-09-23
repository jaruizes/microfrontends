/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AccountOverview {
        /**
          * Account amount
         */
        "amount": number;
        /**
          * Account last movement
         */
        "lastmovement": string;
        /**
          * Account name
         */
        "name": string;
        /**
          * Account new movements
         */
        "newmovements": number;
        /**
          * Account number
         */
        "number": string;
    }
}
declare global {
    interface HTMLAccountOverviewElement extends Components.AccountOverview, HTMLStencilElement {
    }
    var HTMLAccountOverviewElement: {
        prototype: HTMLAccountOverviewElement;
        new (): HTMLAccountOverviewElement;
    };
    interface HTMLElementTagNameMap {
        "account-overview": HTMLAccountOverviewElement;
    }
}
declare namespace LocalJSX {
    interface AccountOverview {
        /**
          * Account amount
         */
        "amount"?: number;
        /**
          * Account last movement
         */
        "lastmovement"?: string;
        /**
          * Account name
         */
        "name"?: string;
        /**
          * Account new movements
         */
        "newmovements"?: number;
        /**
          * Account number
         */
        "number"?: string;
    }
    interface IntrinsicElements {
        "account-overview": AccountOverview;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "account-overview": LocalJSX.AccountOverview & JSXBase.HTMLAttributes<HTMLAccountOverviewElement>;
        }
    }
}
