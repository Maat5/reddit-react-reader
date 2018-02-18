import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as topicsActions from '../../store/topics/actions';
import * as topicsSelectors from '../../store/topics/reducer';
import ListView from '../../components/ListView';
import ListRow from '../../components/ListRow';

import './TopicsScreen.css';

class TopicScreen extends Component {

  componentDidMount() {
    this.props.dispatch(topicsActions.fetchTopics())
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();

    return (
      <div className="TopicsScreen">
        <ListView
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow.bind(this)} />

        {!this.props.canFinalizeSelection ? false :
          <button className="NextScreen" onClick={this.onNextScreenClick.bind(this)}> 
           Continue 
          </button>
        }
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(row ) {
    const selected = this.props.selectedIdsMap[row.url];
    return (
      <ListRow
        rowId={row.url}
        onClick={this.onRowClick.bind(this)}
        selected={selected}>
        {
          !row.icon ? false : <img src={row.icon} alt={row.title} />
        }
        <div className="content-wrapper">
          <h3>{row.title}</h3>
          <p>{row.description}</p>  
        </div>
      </ListRow>
    )
  }

  onRowClick(rowId) {
    this.props.dispatch(topicsActions.selectTopic(rowId));
  }

  onNextScreenClick() {
    this.props.dispatch(topicsActions.finalizeTopicSelection());
  }

}

function mapStateToProps(state) {
  return {
    rowsById: topicsSelectors.getTopicsByUrl(state),
    rowsIdArray: topicsSelectors.getTopicsUrlArray(state),
    selectedIdsMap: topicsSelectors.getSelectedTopicUrlsMap(state),
    canFinalizeSelection: topicsSelectors.isTopicSelectionValid(state)
  };
}

export default connect(mapStateToProps)(TopicScreen);