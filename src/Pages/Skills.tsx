import React from "react";
import EditablePage from "../Components/EditablePage";

const Skills = () => {
  const resourceName = "skills";
  const pageTitle = "Skills/Technologies"
  const formName = "Skill";

  const fields = [
    {id: 0, name: 'name', title: 'Name', type: 'Input', data: '', required: {required: true}}
  ]

  const renderInfoSection = (data, renderEditButtons) => {
    if (data) {
      return <div className="list-section">
        {data.map((item) => (
          !item.deleted && <div className="list-item" key={ item.doc.id }>
              <li>{ item.doc.name }</li>
              { renderEditButtons(item) }
          </div>
        ))}
      </div> 
    }
  }

  return (
    <div className="skills-page">
      <h2 className="page-title">{ pageTitle }</h2>
      <EditablePage resourceName={ resourceName } formName={ formName } fields={ fields } renderInfoSection={renderInfoSection}/>
    </div>
  );
}
 
export default Skills;