import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import EditablePage from "../Components/EditablePage";

const Education = () => {
  const resourceName = "education";
  const pageTitle = "Education"
  const formName = "Education Item";

  const fields = [
    {id: 0, name: 'name', title: 'Name', type: 'Input', data: '', required: {required: true}},
    {id: 1, name: 'place', title: 'Place', type: 'Input', data: ''},
    {id: 2, name: 'grades', title: 'Grades', type: 'Input', data: '', required: {required: true}},
    {id: 3, name: 'startDate', title: 'Start Date', type: 'Input', data: ''},
    {id: 4, name: 'endDate', title: 'End Date', type: 'Input', data: ''},
    {id: 5, name: 'info', title: 'Info', type: 'TextArea', data: ''}
  ]

  const renderInfoSection = (data, renderEditButtons) => {
    if (data) {
      return <div className="list-section">
        {data.map((item) => (
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