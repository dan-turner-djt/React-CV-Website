import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import EditablePage from "../Components/EditablePage";

const WorkHistory = () => {
  const resourceName = "careerSummary";
  const pageTitle = "Career Summary"
  const formName = "Career Item";

  const fields = [
    {id: 0, name: 'jobTitle', title: 'Job Title', type: 'Input', data: '', required: {required: true}},
    {id: 1, name: 'company', title: 'Company', type: 'Input', data: '', required: {required: true}},
    {id: 2, name: 'startDate', title: 'Start Date', type: 'Input', data: '', required: {required: true}},
    {id: 3, name: 'endDate', title: 'End Date', type: 'Input', data: '', required: {required: true}},
    {id: 4, name: 'location', title: 'Location', type: 'Input', data: '', required: {required: true}},
    {id: 5, name: 'info', title: 'Info', type: 'TextArea', data: ''}
  ]

  const renderInfoSection = (data, renderEditButtons) => {
    if (data) {
      return <div className="list-section">
        {data.map((item) => (
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