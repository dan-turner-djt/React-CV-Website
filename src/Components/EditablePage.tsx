import React, { ReactNode, useContext } from "react";
import { useEffect, useState } from "react";
import Form, { Field } from "./GenericForm";
import { updateOrdering, getFirebaseDocs, setFirebaseDocs, deleteFirebaseDocs, FormattedDoc, DocInfo } from "../utils";
import { WindowContext, WindowContextProps } from "../Contexts/WindowContext";
import { UserContext, UserContextProps } from "../Contexts/UserContext";

export type EditablePageProps = {
  formName: string;
  resourceName: string;
  fields: Field[];
  renderInfoSection: (data: FormattedDoc[], renderEditButtons: (item: FormattedDoc) => ReactNode) => ReactNode;
  localOnly?: boolean;
}

const EditablePage = (props: EditablePageProps) => {
  const resourceName: string = props.resourceName;
  const formName: string = props.formName;
  const fields: Field[] = props.fields;
  const { clientHeight, clientWidth } = useContext<WindowContextProps>(WindowContext);
  const { loggedIn } = useContext<UserContextProps>(UserContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<FormattedDoc>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [data, setData] = useState<FormattedDoc[]>([]);

  let widthToSet: string = clientWidth <= 850 ? "95%" : "700px";

  useEffect(() => {
    if (props.localOnly) {
      setIsLoading(false);
      return;
    }

    getFirebaseDocs(resourceName)
    .then((foundDocs: FormattedDoc[]) => {
      setData(foundDocs);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const handleSavePage = () => {
    setIsPending(true);

    let toDelete: DocInfo[] = [];
    data.forEach((item: FormattedDoc) => {
      if (item.deleted) {
        toDelete.push(item.doc);
      }
    })

    if (props.localOnly) {
      updateAndSaveData(true);
    } else {
      deleteFirebaseDocs(resourceName, toDelete)
      .then(() => {
        updateAndSaveData(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  const updateAndSaveData = (localOnly: boolean) => {
    let updatedData: FormattedDoc[] = [...data];
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].deleted) {
        updatedData.splice(i, 1);
        i--;
      }
    }

    let orderedData: FormattedDoc[] = updateOrdering(updatedData);
    setData(orderedData);

    if (localOnly) {
      setIsPending(false);
      setEditing(false);
      return;
    }

    let toUpdate: DocInfo[] = [];
    orderedData.forEach((item: FormattedDoc) => {
      if (item.edited) {
        toUpdate.push(item.doc);
      }
    })

    setFirebaseDocs(resourceName, toUpdate)
    .then(() => {
      setIsPending(false);
      setEditing(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  const handleSubmitForm = (newData: DocInfo, isNew: boolean) => {
    if (isNew) {
      setData((oldData: FormattedDoc[]) => [...oldData, {doc: newData, edited: true, deleted: false} as FormattedDoc]);
    } else {
      let updatedData: FormattedDoc[] = [...data];
      const index: number = updatedData.indexOf(updatedData.find((item: FormattedDoc) => item.doc.id === newData.id));
      updatedData[index].doc = newData;
      updatedData[index].edited = true;
      setData(updatedData);
      setEditingItem(null);
    }
  }

  const handleDelete = (deletedItem: DocInfo) => {
    let updatedData: FormattedDoc[] = [...data];
    const index: number = updatedData.indexOf(updatedData.find((item: FormattedDoc) => item.doc.id === deletedItem.id));
    updatedData[index].deleted = true;
    updatedData[index].doc.order = -1;
    updatedData = updateOrdering(updatedData);
    setData(updatedData);
  }

  const handleMoveUp = (targetItem: DocInfo) => {
    if (targetItem.order > 0) {
      const previousItemId: string = data[targetItem.order-1].doc.id;

      let updatedData: FormattedDoc[] = [...data];
      let index: number = updatedData.indexOf(updatedData.find((item: FormattedDoc) => item.doc.id === targetItem.id));
      updatedData[index].doc.order--;
      updatedData[index].edited = true;
      index = updatedData.indexOf(updatedData.find((item: FormattedDoc) => item.doc.id === previousItemId));
      updatedData[index].doc.order++;
      updatedData[index].edited = true;
      updatedData = updateOrdering(updatedData);
      setData(updatedData);
    }
  }

  const handleMoveDown = (targetItem: DocInfo) => {
    if (targetItem.order < data.length-1) {
      const nextItemId: string = data[targetItem.order+1].doc.id;

      let updatedData: FormattedDoc[] = [...data];
      let index: number = updatedData.indexOf(updatedData.find((item: FormattedDoc) => item.doc.id === targetItem.id));
      updatedData[index].doc.order++;
      updatedData[index].edited = true;
      index = updatedData.indexOf(updatedData.find((item: FormattedDoc) => item.doc.id === nextItemId));
      updatedData[index].doc.order--;
      updatedData[index].edited = true;
      updatedData = updateOrdering(updatedData);
      setData(updatedData);
    }
  }

  const handleEditButtonClicked = () => {
    if (editing) {
      handleSavePage();
    } else {
      setEditing(true);
    }
  }

  const handleEditItem = (item: FormattedDoc) => {
    setEditingItem(item);
  }

  const renderEditButtons = (item: FormattedDoc) => {
    if (editing) {
      return <span className="edit-buttons">
      <button type="button" onClick={ () => {handleEditItem(item)} }>~</button>
      <button type="button" onClick={ () => {handleMoveUp(item.doc)} }>^</button>
      <button type="button" onClick={ () => {handleMoveDown(item.doc)} }>v</button>
      <button type="button" onClick={ () => {handleDelete(item.doc)} }>X</button>
    </span>
    }
  }

  return (
    <div className="content" style={{width: widthToSet}}>
      {!isLoading && props.renderInfoSection(data, renderEditButtons)}
      {isLoading && !props.localOnly && <p>Loading...</p>}
      {editing && <div className="add-section">
        <Form formName={ formName } submitHandler={ handleSubmitForm } fields={ fields } itemsLength= { data.length } editingItem={ editingItem }/>
      </div>}
      {(loggedIn || props.localOnly) && <button
        type="button" className="button-primary save-page-button" onClick={ handleEditButtonClicked }>{ editing? (isPending? "Saving page..." : "Save Page") : "Edit Page"}</button>}
    </div>
  );
}
 
export default EditablePage;