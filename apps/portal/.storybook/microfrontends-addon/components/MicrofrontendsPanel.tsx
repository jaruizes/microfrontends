import React from 'react';
import styled from '@emotion/styled'
import {EventsPanel} from './EventsPanel'
import {TokensPanel} from './TokensPanel'


export const MicrofrontendsPanel = () => {
   const MicrofrontendsContainer = styled.div(({ theme }) => ({
        padding: '1em',
        width: '100%'
    }));

    return (
        <div>
            <MicrofrontendsContainer>
                <TokensPanel></TokensPanel>
            </MicrofrontendsContainer>
            <MicrofrontendsContainer>
                <EventsPanel></EventsPanel>
            </MicrofrontendsContainer>
        </div>
    )
};
