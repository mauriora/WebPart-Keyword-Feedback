import * as React from 'react';
import { IKeywordFeedbackProps } from './IKeywordFeedbackProps';
import KeywordFeedbackContainer from './KeywordFeedbackContainer';
import * as strings from 'WebPartKeywordFeedbackStrings';
import { Label } from '@fluentui/react';

export default class KeywordFeedback extends React.Component<IKeywordFeedbackProps, unknown> {
  public render(): React.ReactElement<IKeywordFeedbackProps> {
    const configured = (this.props.localListId) && (this.props.localSiteUrl);

    if (configured) {
      return (
          <KeywordFeedbackContainer 
            localSiteUrl={this.props.localSiteUrl}
            localListId={this.props.localListId}
          />
      );
    } else {
      return (
        <Label>{strings.PleaseConfigureWebPart}</Label>
      );
    }
  }
}
