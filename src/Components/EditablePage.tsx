import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Form from "./GenericForm";
import { updateOrdering, getFirebaseDocs, setFirebaseDocs, deleteFirebaseDocs } from "../utils";
import { WindowContext } from "../Contexts/WindowContext";
import { UserContext } from "../Contexts/UserContext";

const EditablePage = (props) => {
  const resourceName = props.resourceName;
  const formName = props.formName;
  const fields = props.fields;
  const { clientHeight, clientWidth } = useContext(WindowContext);
  const { loggedIn } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState([]);

  let widthToSet = clientWidth <= 850 ? "95%" : "700px";

  useEffect(() => {
    if (props.localOnly) {
      setIsLoading(false);
      return;
    }

    getFirebaseDocs(resourceName)
    .then((foundDocs: React.SetStateAction<any[]>) => {
      setData(foundDocs);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const handleSavePage = () => {
    setIsPending(true);

    let toDelete = [];
    data.forEach((item) => {
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

  const updateAndSaveData = (localOnly) => {
    let updatedData = [...data];
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].deleted) {
        updatedData.splice(i, 1);
        i--;
      }
    }

    let orderedData = updateOrdering(updatedData);
    setData(orderedData);

    if (localOnly) {
      setIsPending(false);
      setEditing(false);
      return;
    }

    let toUpdate = [];
    orderedData.forEach((item) => {
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
  
  const handleSubmitForm = (newData, isNew) => {
    if (isNew) {
      setData(oldData => [...oldData, {doc: newData, edited: true, deleted: false}]);
    } else {
      let updatedData = [...data];
      updatedData.find((item) => item.doc.id === newData.id).doc = newData;
      updatedData.find((item) => item.doc.id === newData.id).edited = true;
      setData(updatedData);
      setEditingItem(null);
    }
    
  }

  const handleDelete = (deletedItem) => {
    let updatedData = [...data];
    updatedData.find((item) => item.doc.id === deletedItem.id).deleted = true;
    updatedData.find((item) => item.doc.id === deletedItem.id).doc.order = -1;
    updatedData = updateOrdering(updatedData);
    setData(updatedData);
  }

  const handleMoveUp = (targetItem) => {
    if (targetItem.order > 0) {
      const previousItemId = data[targetItem.order-1].doc.id;

      let updateddata = [...data];
      updateddata.find((item) => item.doc.id === targetItem.id).doc.order--;
      updateddata.find((item) => item.doc.id === targetItem.id).edited = true;
      updateddata.find((item) => item.doc.id === previousItemId).doc.order++;
      updateddata.find((item) => item.doc.id === previousItemId).edited = true;
      updateddata = updateOrdering(updateddata);
      setData(updateddata);
    }
  }

  const handleMoveDown = (targetItem) => {
    if (targetItem.order < data.length-1) {
      const nextItemId = data[targetItem.order+1].doc.id;

      let updatedData = [...data];
      updatedData.find((item) => item.doc.id === targetItem.id).doc.order++;
      updatedData.find((item) => item.doc.id === targetItem.id).edited = true;
      updatedData.find((item) => item.doc.id === nextItemId).doc.order--;
      updatedData.find((item) => item.doc.id === nextItemId).edited = true;
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

  const handleEditItem = (item) => {
    setEditingItem(item);
  }

  const renderEditButtons = (item) => {
    if (editing) {
      return <span className="edit-buttons">
      <button onClick={ () => {handleEditItem(item)} }>~</button>
      <button onClick={ () => {handleMoveUp(item.doc)} }>^</button>
      <button onClick={ () => {handleMoveDown(item.doc)} }>v</button>
      <button onClick={ () => {handleDelete(item.doc)} }>X</button>
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
      {(loggedIn || props.localOnly) && <button className="button-primary save-page-button" onClick={ handleEditButtonClicked }>{ editing? (isPending? "Saving page..." : "Save Page") : "Edit Page"}</button>}
    </div>
  );
}
 
export default EditablePage;