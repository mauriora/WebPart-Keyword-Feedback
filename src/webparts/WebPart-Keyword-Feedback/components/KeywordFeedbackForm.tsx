import * as React from 'react';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { create as createController, ListItem, SharePointModel } from '@mauriora/controller-sharepoint-list';
import { Spinner, Stack } from '@fluentui/react';
import { EmptyGuid, ErrorBoundary, TaxonmyField, useAsyncError, IPickerTerms } from '@mauriora/utils-spfx-controls-react';
import * as strings from 'WebPartKeywordFeedbackStrings';
import { autorun } from 'mobx';

export interface KeywordFeedbackProps {
    listId: string;
    siteUrl: string;
}

export const KeywordFeedbackForm: FunctionComponent<KeywordFeedbackProps> = ({ listId, siteUrl }) => {
    const [item, setItem] = useState<ListItem>();
    const [model, setModel] = useState<SharePointModel<ListItem>>(undefined);
    const throwError = useAsyncError();

    console.log(`KeywordFeedback`, { model, listId, siteUrl, item });

    const getController = useCallback(
        async () => {
            if (listId && siteUrl) {
                try {
                    const newController = await createController(listId, siteUrl);
                    await newController.init();
                    
                    const newModel = await newController.addModel(ListItem, '');
                    setModel(newModel);
                    setItem(newModel.newRecord);
                } catch (controllerError) {
                    throwError(controllerError);
                }
            }
        },
        [listId, siteUrl]
    );

    const onGetErrorMessage = useCallback(
        (terms: IPickerTerms) => {
            if(terms[0].key === EmptyGuid) {
                // Show error to hit enter for new keywords
                return strings.TaxonmyFieldError + (terms ? terms.map(term => term.name).join() : '');
            }
            return '';
        },
        []
    );

    useEffect(
        () => autorun(
            async () => {
                if (item?.taxKeyword?.length && undefined === item?.title) {
                    item.title = Date().toString() + ' ' + item.taxKeyword[0].label;
                    await model.submit(item);
                    setItem(model.newRecord);
                } else {
                    console.log(`KeywordFeedbackForm.autorun skip ${item?.title}`, { item, model });
                }
            }
        ),
        [item]
    );

    useEffect(() => { getController(); }, [listId, siteUrl]);

    return model && item ?
        <Stack>
            <ErrorBoundary>
                <TaxonmyField
                    model={model}
                    item={item}
                    property={'taxKeyword'}
                    info={model.propertyFields.get('taxKeyword')}
                    onGetErrorMessage={onGetErrorMessage}
                />
            </ErrorBoundary>
        </Stack> :
        <Spinner />;
};