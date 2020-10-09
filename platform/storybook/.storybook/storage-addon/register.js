import React from 'react';
import { addons, types } from '@storybook/addons';
import {TokensPanel} from "./components/TokensPanel";
import {AddonPanel} from "@storybook/components";

const ADDON_ID = 'storage';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
    addons.add(PANEL_ID, {
        title: 'Storage',
        type: types.PANEL,
        render: ({ active, key }) => (
            <AddonPanel active={active} key={key}>
                <TokensPanel />
            </AddonPanel>
        )
    });
});
