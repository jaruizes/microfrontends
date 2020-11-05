import React from 'react';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { addons } from '@storybook/addons';
import styled from '@emotion/styled'
import {EventsPanel} from './EventsPanel'


export const TokensPanel = () => {
    let idToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const TokensPanelContainer = styled.div(({ theme }) => ({
        border: 'solid 1px black',
        borderCollapse: 'collapse',
        padding: '2em',
        borderSpacing: 0,
        color: '#333333',
        fontSize: '13px',
        lineHeight: '20px',
        textAlign: 'left',
        width: '100%',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0
    }));

    const TokensPanelTable = styled.table(({ theme }) => ({
        marginTop: '2em',
        display: 'table',
        width: '100%',
    }));

    const TokensPanelTableBody = styled.tbody(({ theme }) => ({
        display: 'table-row-group',
        verticalAlign: 'middle'
    }));

    const TokensPanelTableBodyColumn = styled.td(({ theme }) => ({
        boxSizing: 'border-box',
    }));

    const TokensPanelTableBodyLabel = styled.label(({ theme }) => ({
        display: 'flex'
    }));

    const TokensPanelTableBodyTextArea = styled.textarea(({ theme }) => ({
        width: '100%'
    }));

    const handleChange = (e) => {
        idToken = e.target.value;
    };

    const handleSubmit = (event) => {
        sessionStorage.setItem('id_token', idToken);
        addons.getChannel().emit( FORCE_RE_RENDER);

        event.preventDefault();
    };

    return (
        <TokensPanelContainer>
            <form onSubmit={handleSubmit}>
                <h2>ID TOKEN</h2>
                <TokensPanelTable>
                    <TokensPanelTableBody>
                        <tr>
                            <TokensPanelTableBodyColumn>
                                <TokensPanelTableBodyLabel>
                                    <TokensPanelTableBodyTextArea id="idtoken" name="textarea" onChange={handleChange} defaultValue={idToken}/>
                                </TokensPanelTableBodyLabel>
                            </TokensPanelTableBodyColumn>
                        </tr>
                        <tr>
                            <TokensPanelTableBodyColumn>
                                <button>Set</button>
                            </TokensPanelTableBodyColumn>
                        </tr>
                    </TokensPanelTableBody>
                </TokensPanelTable>
            </form>
        </TokensPanelContainer>
    )
};
