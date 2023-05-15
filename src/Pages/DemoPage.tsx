import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import EditablePage from "../Components/EditablePage";

const DemoPage = () => {
  const resourceName = "demo";
  const pageTitle = "Demo Page"
  const formName = "Demo Item";

  const fields = [
    {id: 0, name: 'name', title: 'Name', type: 'Input', data: '', required: {required: true}},
    {id: 1, name: 'body', title: 'Body', type: 'TextArea', data: ''}
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