import React, { ReactNode } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import EditablePage from "../Components/EditablePage";
import { Field } from "../Components/GenericForm";
import { FormattedDoc } from "../utils";

export type WorkHistoryDocInfo = {
  id: string,
  jobTitle: string,
  company: string,
  startDate: string,
  endDate: string,
  location: string,
  info: string,
  order: number
}

const WorkHistory = () => {
  const resourceName: string = "careerSummary";
  const pageTitle: string = "Career Summary"
  const formName: string = "Career Item";

  const fields: Field[] = [
    {id: 0, name: 'jobTitle', title: 'Job Title', type: 'Input', data: '', required: {required: true}},
    {id: 1, name: 'company', title: 'Company', type: 'Input', data: '', required: {required: true}},
    {id: 2, name: 'startDate', title: 'Start Date', type: 'Input', data: '', required: {required: true}},
    {id: 3, name: 'endDate', title: 'End Date', type: 'Input', data: '', required: {required: true}},
    {id: 4, name: 'location', title: 'Location', type: 'Input', data: '', required: {required: true}},
    {id: 5, name: 'info', title: 'Info', type: 'TextArea', data: ''}
  ]

  const renderInfoSection = (data: FormattedDoc[], renderEditButtons: (item: FormattedDoc) => ReactNode) => {
    if (data) {
      return <div className="list-section">
        {data.map((item: {doc: WorkHistoryDocInfo, edited: boolean, deleted: boolean}) => (
          !item.deleted && <div className="list-item" key={ item.doc.id }>
            <h4>{ item.doc.startDate } - { item.doc.endDate }:</h4>
            <h3>{ item.doc.jobTitle } - { item.doc.company}, { item.doc.location }</h3>
            <ReactMarkdown>{ item.doc.info }</ReactMarkdown>
            { renderEditButtons(item) }
          </div>
        ))}
      </div> 
    }
  }

  return (
    <div className="work-history-page">
      <h2 className="page-title">{ pageTitle }</h2>
      <EditablePage resourceName={ resourceName } formName={ formName } fields={ fields } renderInfoSection={renderInfoSection}/>
    </div>
  );
}
 
export default WorkHistory;