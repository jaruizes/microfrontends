import { addons } from '@storybook/addons';
import microfrontendsTheme from './microfrontends-theme';

addons.setConfig({
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'bottom',
    sidebarAnimations: true,
    enableShortcuts: true,
    isToolshown: true,
    theme: microfrontendsTheme,
    selectedPanel: undefined,
    initialActive: 'sidebar',
    showRoots: false,
});
