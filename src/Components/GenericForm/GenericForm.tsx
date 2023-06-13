import './GenericForm.scss'
import React, { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { DocInfo, FormattedDoc } from "../../utils";

export type Field = {
  id: number,
  name: string,
  title: string,
  type: string,
  data: string,
  required?: {required: boolean}
};

export type FormProps = {
  formName: string;
  editingItem: FormattedDoc;
  fields: Field[];
  itemsLength: number;
  submitHandler: (newData: DocInfo, isNew: boolean) => void;
}

const Form = (props: FormProps) => {
  const formName: string = props.formName;
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement)[]>([]);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (props.editingItem) {
      setEditing(true);
      fillFormFields(props.editingItem);
    } else {
      setEditing(false);
    }
  }, [props.editingItem])

  const fillFormFields = (item: FormattedDoc) => {
    inputRefs.current.forEach((inputRef: HTMLInputElement) => {
      inputRef.value = String(item.doc[inputRef.name as keyof DocInfo]);
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data: {name: string, value: number | string}[] = [];
    inputRefs.current.forEach((inputRef) => {
      data.push({name: inputRef.name, value: inputRef.value});
      inputRef.value = '';
    });

    if (editing) {
      data.push({name: 'order', value: props.editingItem.doc.order});
      data.push({name: 'id', value: props.editingItem.doc.id});

      const toSend: DocInfo = 
        data.reduce((obj, item: {name: string, value: string | number}) => ({...obj, [item.name]: item.value}),
        {} as DocInfo);
      props.submitHandler(toSend, false);
    } else {
      data.push({name: 'order', value: props.itemsLength});
      data.push({name: 'id', value: String(Math.random())});

      const toSend: DocInfo =
        data.reduce((obj, item: {name: string, value: string | number}) => ({...obj, [item.name]: item.value}),
        {} as DocInfo);
      props.submitHandler(toSend, true);
    }
  }

  const renderField = (field: Field) => {
    switch(field.type) {
      case 'TextArea':
        return <textarea
        ref={(ref) => {inputRefs.current[field.id] = ref}}
        data-cy={String(field.name)+"-text-area"}
        id={ String(field.id) }
        name={ field.name }
        { ...field.required }>
        </textarea>;
      case 'Input':
        return <input
        ref={(ref) => {inputRefs.current[field.id] = ref}}
        data-cy={String(field.name)+"-input"}
        id={ String(field.id) }
        name={ field.name }
        type="text"
        { ...field.required }>
        </input>;
      default:
        console.log("Unknown type");
        return;
    }
  }

  return (
    <form className="form" onSubmit={ handleSubmit }>
      <fieldset>
        <legend data-cy="form-legend">{editing? 'Edit' : 'New'} { formName }</legend>
        {props.fields.map((field: Field) => (
          <div key={ field.id }>
            <label htmlFor={ String(field.id) }>{ field.title }</label>
            { renderField(field) }
          </div>
        ))}
        <div className="form-button">
          <button data-cy="submit-edit-form-button" type="submit" className="button-primary">{editing? 'Save' : 'Add'} { formName }</button>
        </div>
      </fieldset>
    </form>
  );
}
 
export default Form;