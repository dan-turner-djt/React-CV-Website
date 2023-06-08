import React, { ReactNode } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import EditablePage from "../Components/EditablePage";
import { Field } from "../Components/GenericForm";
import { FormattedDoc } from "../utils";

export type EducationDocInfo = {
  id: string,
  name: string,
  startDate: string,
  endDate: string,
  place: string,
  grades: string,
  info: string,
  order: number
}

const Education = () => {
  const resourceName: string = "education";
  const pageTitle: string = "Education"
  const formName: string = "Education Item";

  const fields: Field[] = [
    {id: 0, name: 'name', title: 'Name', type: 'Input', data: '', required: {required: true}},
    {id: 1, name: 'place', title: 'Place', type: 'Input', data: ''},
    {id: 2, name: 'grades', title: 'Grades', type: 'Input', data: '', required: {required: true}},
    {id: 3, name: 'startDate', title: 'Start Date', type: 'Input', data: ''},
    {id: 4, name: 'endDate', title: 'End Date', type: 'Input', data: ''},
    {id: 5, name: 'info', title: 'Info', type: 'TextArea', data: ''}
  ]

  const renderInfoSection = (data: FormattedDoc[], renderEditButtons: (item: FormattedDoc) => ReactNode) => {
    if (data) {
      return <div className="list-section">
        {data.map((item: {doc: EducationDocInfo, edited: boolean, deleted: boolean}) => (
          !item.deleted && <div className="list-item" key={ item.doc.id }>
            {item.doc.startDate && <h4>{ item.doc.startDate } - { item.doc.endDate }:</h4>}
            <h3>{ item.doc.name }{item.doc.place ? ', '+item.doc.place : ''}</h3>
            <h4 className="grades-heading">{ item.doc.grades }</h4>
            <ReactMarkdown>{ item.doc.info }</ReactMarkdown>
            { renderEditButtons(item) }
          </div>
        ))}
      </div> 
    }
  }

  return (
    <div className="education-page">
      <h2 className="page-title">{ pageTitle }</h2>
      <EditablePage resourceName={ resourceName } formName={ formName } fields={ fields } renderInfoSection={renderInfoSection}/>
    </div>
  );
}
 
export default Education;