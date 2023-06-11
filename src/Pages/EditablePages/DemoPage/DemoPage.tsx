import './DemoPage.scss'
import React, { ReactNode } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import EditablePage from "../../../Components/EditablePage/EditablePage";
import { Field } from "../../../Components/GenericForm/GenericForm";
import { FormattedDoc } from "../../../utils";

export type DemoPageDocInfo = {
  id: string,
  name: string,
  body: string,
  order: number
}

const DemoPage = () => {
  const resourceName: string = "demo";
  const pageTitle: string = "Demo Page"
  const formName: string = "Demo Item";

  const fields: Field[] = [
    {id: 0, name: 'name', title: 'Name', type: 'Input', data: '', required: {required: true}},
    {id: 1, name: 'body', title: 'Body', type: 'TextArea', data: ''}
  ]

  const renderInfoSection = (data: FormattedDoc[], renderEditButtons: (item: FormattedDoc) => ReactNode) => {
    if (data) {
      return <div className="list-section">
        {data.map((item: {doc: DemoPageDocInfo, edited: boolean, deleted: boolean}) => (
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
    <div className="demo-page">
      <h2 className="page-title">{ pageTitle }</h2>
      <div className="page-info">
        <p>This page is for users to demo the editable page functionality without requiring authentication.</p>
        <p>Note that for security purposes data will not be sent to the server, so local changes will not be saved.</p>
      </div>
      <EditablePage localOnly={ true } resourceName={ resourceName } formName={ formName } fields={ fields } renderInfoSection={renderInfoSection}/>
    </div>
  );
}
 
export default DemoPage;