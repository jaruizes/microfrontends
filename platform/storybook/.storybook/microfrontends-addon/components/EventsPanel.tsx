import React from 'react';
import styled from '@emotion/styled'
import { useArgs } from '@storybook/api';


export const EventsPanel = () => {

    const componentArgs = useArgs()[0];

    let state = {
        sendingChannel: {
            value: 'microfrontends'
        },
        listeningChannel: {
            value: (componentArgs && componentArgs['channel']) ? componentArgs['channel'] : ''
        },
        sendingEvent: {
            value: '{ "cmd": "changeLocale", "payload": { "locale": "' + componentArgs['locale'] + '" }}'
        },
        showError: {
            value: 'hidden'
        }
    };

    const EventsPanelContainer = styled.div(({ theme }) => ({
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

    let listenningChannel;

    const initChannel = () => {
        listenningChannel = new BroadcastChannel(state.listeningChannel.value);
        listenningChannel.onmessage = function (e) {
            console.log('message received');
            const pEL = document.createElement('p');
            pEL.innerText = JSON.stringify(e.data);
            document.getElementById('messages-received').appendChild(pEL);
        };
    };

    const handleChangeSendingChannel = (e) => {
        state.sendingChannel.value = e.target.value;
    };

    const handleChangeListeningChannel = (e) => {
        state.listeningChannel.value = e.target.value;
        //initChannel();
    };

    const handleChangeSendingEvent = (e) => {
        state.sendingEvent.value = e.target.value;
    };

    const handleSubmit = (event) => {
        console.log(state.sendingEvent.value);
        const channel = new BroadcastChannel("microfrontends");
        channel.postMessage(JSON.parse(state.sendingEvent.value));

        event.preventDefault();
    };

    const handleSubmitFormListening = (event) => {
        initChannel();
        event.preventDefault();
    };

    if (componentArgs && componentArgs['channel']) {
        //initChannel();
    }

    return (
        <EventsPanelContainer>
            <h2>Events</h2>
            <div style={{ display: 'table', tableLayout: 'auto', width: '100%', marginTop: '2em'}}>
                <div style={{ display: 'table-row', width: '100%'}}>
                    <div style={{ display: 'table-cell', width: '48%', border: 'solid 1px lightgray', padding: '2em'}}>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'table', tableLayout: 'auto', width: '100%'}}>
                                <div style={{ display: 'table-row', width: '100%'}}>
                                    <div style={{ display: 'table-cell', width: '50%'}}>
                                        <label htmlFor="channel" style={{fontWeight: 'bold'}}>Channel (send):</label>
                                        <input type="text" id="channel" name="channel" defaultValue={state.sendingChannel.value} onChange={handleChangeSendingChannel} />
                                    </div>
                                </div>
                                <div style={{ display: 'table-row', width: '100%'}}>
                                    <div style={{ display: 'table-cell', width: '50%', paddingTop: '2em'}}>
                                        <div>
                                            <label htmlFor="message" style={{fontWeight: 'bold'}}>Message:</label>
                                        </div>
                                        <div style={{width: '100%', paddingTop: '1em'}}>
                                            <textarea id="message" name="message" rows="4" cols="100" style={{border: '1px solid lightgray'}} onChange={handleChangeSendingEvent} defaultValue={state.sendingEvent.value}/>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'table-row', width: '100%'}}>
                                    <div style={{ display: 'table-cell', width: '50%', paddingTop: '2em'}}>
                                        <button>Send</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div style={{ display: 'table-cell', width: '3%'}}>
                    </div>
                    <div style={{ display: 'table-cell', width: '48%', border: 'solid 1px lightgray', padding: '2em', margin: '1px'}}>
                        <form onSubmit={handleSubmitFormListening}>
                            <div style={{ display: 'flex', alignItems: 'left'}}>
                                <label htmlFor="channel" style={{fontWeight: 'bold'}} >Channel (listen):</label>
                                <input type="text" id="channel" name="channel" defaultValue={state.listeningChannel.value} onChange={handleChangeListeningChannel}/>
                                <button>Set Channel</button>
                            </div>
                            <p style={{fontWeight: 'bold'}}>Messages</p>
                            <div style={{ padding: '2em', border: '1px solid lightgray'}} id="messages-received">
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </EventsPanelContainer>
    )
};
