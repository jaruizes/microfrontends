import React from 'react';
import { addons, types } from '@storybook/addons';
import {MicrofrontendsPanel} from "./components/MicrofrontendsPanel";
import {AddonPanel} from "@storybook/components";

const ADDON_ID = 'microfrontends';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
    addons.add(PANEL_ID, {
        title: 'Microfrontends',
        type: types.PANEL,
        render: ({ active, key }) => (
            <AddonPanel active={active} key={key}>
                <MicrofrontendsPanel />
            </AddonPanel>
        )
    });
});
