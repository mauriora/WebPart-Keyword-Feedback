import * as React from 'react';
import { FunctionComponent } from 'react';
import { IKeywordFeedbackProps } from './IKeywordFeedbackProps';
import { Stack } from '@fluentui/react';
import { ErrorBoundary } from '@mauriora/utils-spfx-controls-react';
import { KeywordFeedbackForm } from './KeywordFeedbackForm';


const KeywordFeedbackContainer: FunctionComponent<IKeywordFeedbackProps> = ({ localListId, localSiteUrl }) => {
    console.log(`KeywordFeedbackContainer`, { localListId, localSiteUrl });

    return <Stack>
        <ErrorBoundary>
            <KeywordFeedbackForm
                siteUrl={localSiteUrl}
                listId={localListId}
            />
        </ErrorBoundary>
    </Stack>;
};

export default KeywordFeedbackContainer;