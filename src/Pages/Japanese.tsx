import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import EditablePage from "../Components/EditablePage";
import { Field } from "../Components/GenericForm";

const Japanese = () => {
  const resourceName: string = "japanese";
  const pageTitle: string = "Japanese"
  const formName: string = "Japanese Item";

  const fields: Field[] = [
    {id: 0, name: 'name', title: 'Name', type: 'Input', data: '', required: {required: true}},
    {id: 1, name: 'body', title: 'Body', type: 'TextArea', data: '', required: {required: true}}
  ]

  const renderInfoSection = (data, renderEditButtons) => {
    if (data) {
      return <div className="list-section">
        {data.map((item) => (
          !item.deleted && <div className="list-item" key={ item.doc.id }>
            <h3>{ item.doc.name }</h3>
            <ReactMarkdown>{ item.doc.body }</ReactMarkdown>
            { renderEditButtons(item) }
          </div>
        ))}
      </div> 
    }
  }

  return (
    <div className="japanese-page">
      <h2 className="page-title">{ pageTitle }</h2>
      <EditablePage resourceName={ resourceName } formName={ formName } fields={ fields } renderInfoSection={renderInfoSection}/>
    </div>
  );
}
 
export default Japanese;