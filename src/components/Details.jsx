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

    //const {parentArray} = this.props;
    const {/*editItem, findProjectIndexFromId,*/ update, edit} = this.props.store;

    // this.props.probject, field, value
    // id &
    edit(this.props.project, e.currentTarget.name.name, e.currentTarget.name.value);
    edit(this.props.project, e.currentTarget.client.name, e.currentTarget.client.value);
    update(this.props.project);
    //editItem(findProjectIndexFromId(this.props.project.id), parentArray, e.currentTarget.name.name, e.currentTarget.name.value);
    //editItem(findProjectIndexFromId(this.props.project.id), parentArray, e.currentTarget.client.name, e.currentTarget.client.value);
    //editItem(findProjectIndexFromId(this.props.project.id), parentArray, e.currentTarget.deadline.name, e.currentTarget.deadline.value);
    this.toggleState();
  };

  toggleState = () => {
    const {isEditing} = this.state;

    this.setState({
      isEditing:!isEditing
    })
  }

  renderItem = () => {
    const {/*id,*/ name, client, /*deadline,*/ download, totalTime, totalEarnings} = this.props.project;
    const {/*deleteItem, findProjectIndexFromId, timeToDate,*/ remove} = this.props.store;
    //const {parentArray} = this.props;

    return(
      <div className='project-details'>

        <div className='details-content'>
          {
            // <p className='project-details-deadline'>{timeToDate(deadline)}</p>
          }

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
          <button onClick={e => {e.preventDefault(); remove(this.props.project, this.props.store.projects);}} className='button--secundairy button--delete'>Delete</button>
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
  project: PropTypes.object.isRequired,
  parentArray: PropTypes.object.isRequired
}

export default observer(Details);
