import './Skills.scss'
import React, { ReactNode } from "react";
import EditablePage from "../../../Components/EditablePage/EditablePage";
import { Field } from "../../../Components/GenericForm/GenericForm";
import { FormattedDoc } from "../../../utils";

export type SkillsDocInfo = {
  id: string,
  name: string,
  order: number
}

const Skills = () => {
  const resourceName: string = "skills";
  const pageTitle: string = "Skills/Technologies"
  const formName: string = "Skill";

  const fields: Field[] = [
    {id: 0, name: 'name', title: 'Name', type: 'Input', data: '', required: {required: true}}
  ]

  const renderInfoSection = (data: FormattedDoc[], renderEditButtons: (item: FormattedDoc) => ReactNode) => {
    if (data) {
      return <div className="list-section">
        {data.map((item: {doc: SkillsDocInfo, edited: boolean, deleted: boolean}) => (
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