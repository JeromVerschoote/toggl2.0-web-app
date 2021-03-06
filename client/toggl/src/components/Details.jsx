import React, {Component} from "react";
import PropTypes from "prop-types";
import {observer} from 'mobx-react';

class Details extends Component {

  constructor(props){
    super(props)

    this.state = {
      isEditing:false
    }
  }

  update = e => {
    e.preventDefault();

    const {update, edit} = this.props.store;

    edit(this.props.project, e.currentTarget.name.name, e.currentTarget.name.value);
    edit(this.props.project, e.currentTarget.client.name, e.currentTarget.client.value);
    update(this.props.project);

    this.toggleState();
  };

  toggleState = () => {
    const {isEditing} = this.state;

    this.setState({
      isEditing:!isEditing
    })
  }

  renderItem = () => {
    const {store, project} = this.props;
    const {timeToDate, remove} = store;
    const {name, client, deadline, download, totalTime, totalEarnings} = project;

    return(
      <div className='project-details'>

        <div className='details-content'>
          <p className='project-details-deadline'>{timeToDate(deadline)}</p>

          <h2 className='project-details-name'>{name}</h2>
          <p className='project-details-client'>{client}</p>
        </div>

        <div className='details-stats'>
          <p className='project-details-time'>{totalTime}</p>
          <p className='project-details-rate'>€ {totalEarnings},-</p>
        </div>

        <div className='details-controls'>
          <button onClick={e => {e.preventDefault(); this.toggleState()}} className='button--secundairy'>Edit</button>
          <button><a href={download} className='button--secundairy'>Files</a></button>
          <button onClick={e => {e.preventDefault(); remove(project, store.projects);}} className='button--secundairy button--delete'>Delete</button>
        </div>
      </div>
    );
  };

  renderForm = () => {
    const {name, client, deadline} = this.props.project;
    return(
      <form onSubmit={this.update} className='project-details'>
        <div className='details-content'>
          <input type="text" ref={value => {this.input = value}} defaultValue={deadline} placeholder={deadline} name='deadline' className='project-details-deadline'/>
          <input type="text" ref={value => {this.input = value}} defaultValue={name} placeholder={name} name='name' className='project-details-name' />
          <input type="text" ref={value => {this.input = value}} defaultValue={client} placeholder={client} name='client' className='project-details-client'/>
        </div>

        <div className='details-controls'>
          <button type="submit" className='button--secundairy'>Save changes</button>
        </div>
      </form>
    )
  };

  render(){
    const {isEditing} = this.state;
    return <React.Fragment>{isEditing ? this.renderForm() :  this.renderItem()}</React.Fragment>;
  }
};

Details.propTypes = {
  store: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}

export default observer(Details);
