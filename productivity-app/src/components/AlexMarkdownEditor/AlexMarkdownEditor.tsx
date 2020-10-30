import React, { useState, useEffect } from 'react';
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import 'codemirror/lib/codemirror.css';
import '@contentful/forma-36-react-components/dist/styles.css';
import { MarkdownEditor } from '@contentful/field-editor-markdown';
import { List, ListItem, Note } from '@contentful/forma-36-react-components';
import { messages } from 'vfile';
import alex from 'alex';

interface Props {
  sdk: FieldExtensionSDK;
}

export function AlexMarkdownEditor({ sdk }: Props) {
  const [warnings, setWarnings] = useState<typeof messages>([]);

  useEffect(() => {
    const unsubscribe = sdk.field.onValueChanged((value) => {
      setWarnings(alex.markdown(value/*, sdk.parameters.installation*/).messages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '0.5em' }}>
        {warnings.length ? (
          <Note
            noteType="warning"
            title="There are potential issues in your Markdown"
          >
            <List>
              {warnings.map(({ line, message, name, ruleId }) => (
                <ListItem key={name}>
                  <strong>Line: {line}, Rule Id: {ruleId}</strong>: {message}
                </ListItem>
              ))}
            </List>
          </Note>
        ) : (
          <Note noteType="positive" title="All great!"> </Note>
        )}
      </div>

      <MarkdownEditor sdk={sdk} isInitiallyDisabled={false} />
    </div>
  );
}