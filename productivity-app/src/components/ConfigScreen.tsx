import React, { Component } from 'react';
import { AppExtensionSDK } from 'contentful-ui-extensions-sdk';
import {
    Heading,
    Form,
    Workbench,
    Paragraph,
    TextInput,
    List,
    ListItem,
    Button,
} from '@contentful/forma-36-react-components';
import { css } from 'emotion';

export interface AppInstallationParameters {
    allow: string[];
}

export interface AppInstallationParameters {}

interface ConfigProps {
    sdk: AppExtensionSDK;
}

interface ConfigState {
    parameters: AppInstallationParameters;
    newEntry: string;
}

export default class Config extends Component<ConfigProps, ConfigState> {
    constructor(props: ConfigProps) {
        super(props);
        this.state = {
            parameters: {
                allow: [],
            },
            newEntry: '',
        };

        // `onConfigure` allows to configure a callback to be
        // invoked when a user attempts to install the app or update
        // its configuration.
        props.sdk.app.onConfigure(() => this.onConfigure());
    }

    async componentDidMount() {
        // Get current parameters of the app.
        // If the app is not installed yet, `parameters` will be `null`.
        const parameters: AppInstallationParameters | null = await this.props.sdk.app.getParameters();

        this.setState(
            parameters ? { ...this.state, parameters } : this.state,
            () => {
                // Once preparation has finished, call `setReady` to hide
                // the loading screen and present the app to a user.
                this.props.sdk.app.setReady();
            }
        );
    }

    onConfigure = async () => {
        // This method will be called when a user clicks on "Install"
        // or "Save" in the configuration screen.
        // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

        // Get current the state of EditorInterface and other entities
        // related to this app installation
        const currentState = await this.props.sdk.app.getCurrentState();

        return {
            // Parameters to be persisted as the app configuration.
            parameters: this.state.parameters,
            // In case you don't want to submit any update to app
            // locations, you can just pass the currentState as is
            targetState: currentState,
        };
    };

    updateNewEntry = (value: string) => {
        this.setState({ newEntry: value });
    };

    addNewEntry = () => {
        this.setState({
            newEntry: '',
            parameters: {
                ...this.state.parameters,
                allow: this.state.parameters.allow.concat([
                    this.state.newEntry,
                ]),
            },
        });
    };

    render() {
        return (
            <Workbench className={css({ margin: '80px' })}>
                <Form>
                    <Heading>Productivity App Config</Heading>
                    <Paragraph>
                        Select Content Types to Exclude from Productivity Analysis
                    </Paragraph>
                     <List>
                        {this.state.parameters.allow.map((word) => (
                            <ListItem key={word}>{word} is excluded</ListItem>
                        ))}
                    </List>
                    <TextInput
                        value={this.state.newEntry}
                        onChange={(e) => this.updateNewEntry(e.target.value)}
                    />
                    <Button
                        buttonType="positive"
                        onClick={() => this.addNewEntry()}
                    >
                        Exclude
                    </Button> 
                </Form>
            </Workbench>
        );
    }
}
