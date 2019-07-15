import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NoteContext from '../NoteContext.js'
import ValidateForm from '../ValidateForm/ValidateForm'
import './AddFolder.css'

export default class AddFolder extends Component {
  constructor(props){
    super(props);
    this.state = {
      nameValid: false,
      name: '',
      validationMessages: {
        name: '',
      }
    }
  }
  static defaultProps = {
    history: {
      push: () => {}
    }
}
static contextType = NoteContext;

validateName(fieldValue){
  const fieldErrors = {...this.state.validationMessages};
  let hasError = false;

  fieldValue = fieldValue.trim();
  if(fieldValue.length === 0){
    fieldErrors.name = 'Name is required';
    hasError = true;
  }
  this.setState({
    validationMessages: fieldErrors,
    nameValid: !hasError
  }, this.formValid);
}
formValid(){
  this.setState({
    formValid: this.state.nameValid
  });
}
updateName(name){
  this.setState({name}, ()=>{this.validateName(name)});
}

handleSubmit= e => {
  e.preventDefault()
  const folder = {
    folder_name: e.target['folder-name'].value,
  }
  fetch(`https://intense-atoll-21251.herokuapp.com/api/folders/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(folder)
  })
  .then(res => {
    if (!res.ok)
      return res.json().then(e => Promise.reject(e))
    return res.json()
  })
  .then(folder => {
    console.log('ts', this.context)
    this.context.addFolder(folder)
    this.props.history.push(`/folder/${folder.id}`)
  })
  .catch(error => {
    console.error('add folder ',{ error })
  })
}

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name' onChange={e => this.updateName(e.target.value)}/>
            <ValidateForm className="validateionError" hasError={!this.state.name} message={this.state.validationMessages.name}></ValidateForm>
          </div>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.formValid}>
              Add new folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}