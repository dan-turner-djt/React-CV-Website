import './Projects.scss'
import React, { ReactNode } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import EditablePage from "../../../Components/EditablePage/EditablePage";
import { Field } from "../../../Components/GenericForm/GenericForm";
import { FormattedDoc } from "../../../utils";

export type ProjectsDocInfo = {
  id: string,
  name: string,
  body: string,
  order: number
}

const Projects = () => {
  const resourceName: string = "projects";
  const pageTitle: string = "Projects"
  const formName: string = "Project";

  const fields: Field[] = [
    {id: 0, name: 'name', title: 'Name', type: 'Input', data: '', required: {required: true}},
    {id: 1, name: 'body', title: 'Body', type: 'TextArea', data: '', required: {required: true}}
  ]

  const renderInfoSection = (data: FormattedDoc[], renderEditButtons: (item: FormattedDoc) => ReactNode) => {
    if (data) {
      return <div className="list-section">
        {data.map((item: {doc: ProjectsDocInfo, edited: boolean, deleted: boolean}) => (
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
    <div className="projects-page">
      <h2 className="page-title">{ pageTitle }</h2>
      <p className="page-info">Source code for most of my projects is available for viewing <a href="https://github.com/dan-turner-djt">here</a>.</p>
      <EditablePage resourceName={ resourceName } formName={ formName } fields={ fields } renderInfoSection={renderInfoSection}/>
    </div>
  );
}
 
export default Projects;