import React from 'react';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { addons } from '@storybook/addons';
import styled from '@emotion/styled'


export const TokensPanel = () => {
    const idToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const TokensPanelContainer = styled.div(({ theme }) => ({
        borderCollapse: 'collapse',
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
        display: 'table',
        width: '100%',
    }));

    const TokensPanelTableHeader = styled.thead(({ theme }) => ({
        display: 'table-header-group',
        verticalAlign: 'middle',
        width: '100%'
    }));

    const TokensPanelTableHeaderColumn = styled.th(({ theme }) => ({
        padding: '10px 10px 10px 15px',
        verticalAlign: 'middle',
        boxSizing: 'border-box',
        borderBottom: '1px solid lightgrey'
    }));

    const TokensPanelTableBody = styled.tbody(({ theme }) => ({
        display: 'table-row-group',
        verticalAlign: 'middle'
    }));

    const TokensPanelTableBodyFirstColumn = styled.td(({ theme }) => ({
        width: '25%',
        padding: '10px 10px 10px 15px',
        fontWeight: 'bold',
        boxSizing: 'border-box',
        borderBottom: '1px solid lightgrey'
    }));

    const TokensPanelTableBodySecondColumn = styled.td(({ theme }) => ({
        padding: '10px 10px 10px 15px',
        boxSizing: 'border-box',
        borderBottom: '1px solid lightgrey'
    }));

    const TokensPanelTableBodyLabel = styled.label(({ theme }) => ({
        display: 'flex'
    }));

    const TokensPanelTableBodyTextArea = styled.textarea(({ theme }) => ({
        width: '100%'
    }));

    const handleChange = (e) => {
        sessionStorage.setItem('id_token', e.target.value);
        addons.getChannel().emit( FORCE_RE_RENDER);
    };

    return (
        <TokensPanelContainer>
            <TokensPanelTable>
                <TokensPanelTableHeader>
                    <tr>
                        <TokensPanelTableHeaderColumn>Token</TokensPanelTableHeaderColumn>
                        <TokensPanelTableHeaderColumn>Value</TokensPanelTableHeaderColumn>
                    </tr>
                </TokensPanelTableHeader>
                <TokensPanelTableBody>
                    <tr>
                        <TokensPanelTableBodyFirstColumn>
                            <span className="css-in3yi3">Id Token</span>
                        </TokensPanelTableBodyFirstColumn>
                        <TokensPanelTableBodySecondColumn>
                            <TokensPanelTableBodyLabel>
                                <TokensPanelTableBodyTextArea id="idtoken" name="textarea" onChange={handleChange} defaultValue={idToken}/>
                            </TokensPanelTableBodyLabel>
                        </TokensPanelTableBodySecondColumn>
                    </tr>
                </TokensPanelTableBody>
            </TokensPanelTable>
        </TokensPanelContainer>
    )
};
