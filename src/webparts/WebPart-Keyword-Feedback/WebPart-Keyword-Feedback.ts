import 'reflect-metadata';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'WebPartKeywordFeedbackStrings';
import KeywordFeedback from './components/KeywordFeedback';
import * as Controller from '@mauriora/controller-sharepoint-list';
import { IKeywordFeedbackProps } from './components/IKeywordFeedbackProps';
import { IListInfo } from '@pnp/sp/presets/all';
import { configure } from 'mobx';


/**
 * Mobx Configuration
 */
configure({
  enforceActions: "never"
});

export interface IWebPartKeywordFeedbackProps {
  defaultListId: string;
}

export default class WebPartKeywordFeedback extends BaseClientSideWebPart<IWebPartKeywordFeedbackProps> {

  private localListOptions = new Array<IPropertyPaneDropdownOption>();

  protected onInit = async (): Promise<void> => {
    console.log(`${this.context.manifest.alias} [${this.context.manifest.id}] version=${this.context.manifest.version} onInit`, { context: this.context, properties: this.properties });
    super.onInit();
    await Controller.init(this.context);
  }

  private addPropertyPaneOptions = (listInfos: Array<IListInfo>, array: Array<IPropertyPaneDropdownOption>) => array.push(...
    listInfos.map(listInfo => ({
      key: listInfo.Id,
      text: listInfo.Title
    }))
  )

  public render(): void {
    console.log(`${this.context.manifest.alias} [${this.context.manifest.id}] version=${this.context.manifest.version} render`, { context: this.context, properties: this.properties });
    const element: React.ReactElement<IKeywordFeedbackProps> = React.createElement(
      KeywordFeedback,
      {
        localSiteUrl: this.context.pageContext?.web?.absoluteUrl,
        localListId: this.properties.defaultListId
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private localDropdownDisabled: boolean;

  protected onPropertyPaneConfigurationStart = async (): Promise<void> => {
    this.localDropdownDisabled = this.localListOptions.length === 0;

    if (this.localListOptions.length == 0) {
      this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists');

      const listInfos = await Controller.getLists(this.context.pageContext?.web?.absoluteUrl);
      this.addPropertyPaneOptions(listInfos, this.localListOptions);
      this.localDropdownDisabled = false;
      this.context.propertyPane.refresh();

      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
    }

  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.DefaultGroupName,
              groupFields: [
                PropertyPaneDropdown("defaultListId", {
                  label: strings.ListIdFieldLabel,
                  options: this.localListOptions,
                  disabled: this.localDropdownDisabled
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
