import React, { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

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
  editingItem: any;
  fields: Field[];
  itemsLength: number;
  submitHandler: (newData: any, isNew: boolean) => void;
}

const Form = (props: FormProps) => {
  const formName = props.formName;
  const inputRefs = useRef([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (props.editingItem) {
      setEditing(true);
      fillFormFields(props.editingItem);
    } else {
      setEditing(false);
    }
  }, [props.editingItem])

  const fillFormFields = (item: any) => {
    inputRefs.current.forEach((inputRef) => {
      inputRef.value = item.doc[inputRef.name];
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data = [];
    inputRefs.current.forEach((inputRef) => {
      data.push({name: inputRef.name, value: inputRef.value});
      inputRef.value = '';
    });

    if (editing) {
      data.push({name: 'order', value: props.editingItem.doc.order});
      data.push({name: 'id', value: props.editingItem.doc.id});

      const toSend = data.reduce((obj, item) => Object.assign(obj, {[item.name]: item.value}), {});
      props.submitHandler(toSend, false);
    } else {
      data.push({name: 'order', value: props.itemsLength});
      data.push({name: 'id', value: String(Math.random())});

      const toSend = data.reduce((obj, item) => Object.assign(obj, {[item.name]: item.value}), {});
      props.submitHandler(toSend, true);
    }
  }

  const renderField = (field: Field) => {
    switch(field.type) {
      case 'TextArea':
        return <textarea
        ref={(ref) => {inputRefs.current[field.id] = ref}}
        name={ field.name }
        { ...field.required }>
        </textarea>;
      case 'Input':
        return <input
        ref={(ref) => {inputRefs.current[field.id] = ref}}
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
        <legend>{editing? 'Edit' : 'New'} { formName }</legend>
        {props.fields.map((field: Field) => (
          <div key={ field.id }>
            <label>{ field.title }</label>
            { renderField(field) }
          </div>
        ))}
        <div className="form-button">
          <button className="button-primary">{editing? 'Save' : 'Add'} { formName }</button>
        </div>
      </fieldset>
    </form>
  );
}
 
export default Form;