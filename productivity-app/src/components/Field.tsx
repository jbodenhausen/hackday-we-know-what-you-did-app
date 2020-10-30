import React, { useEffect } from 'react';
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import { Paragraph } from '@contentful/forma-36-react-components';
// import { AlexMarkdownEditor } from './AlexMarkdownEditor';

interface FieldProps {
    sdk: FieldExtensionSDK;
}

const Field = (props: FieldProps) => {
    // useEffect(() => {
    //   props.sdk.window.startAutoResizer();
    // }, []);
  
    return <Paragraph>Hello Entry Editor Component</Paragraph>;
    // return <AlexMarkdownEditor sdk={props.sdk} />;
};

export default Field;
