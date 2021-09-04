declare interface IWebPartKeywordFeedbackStrings {
  PleaseConfigureWebPart: string;
  PropertyPaneDescription: string;
  DefaultGroupName: string;
  IsolatedGroupName: string;

  NewFormHeading: string;
  AgendaHeading: string;
  BriefAwarenessHeading: string;
  DeliverySuccessHeading: string;
  ListIdFieldLabel: string;
  SiteURLFieldLabel: string;
  YesText: string;
  NoText: string;

  ErrorCreateLocal: string;
  ErrorCreateRemote: string;

  SaveButtonText: string;
  CancelButtonText: string;
  DeleteButtonText: string;

  TaxonmyFieldError: string;
}

declare module 'WebPartKeywordFeedbackStrings' {
  const strings: IWebPartKeywordFeedbackStrings;
  export = strings;
}
