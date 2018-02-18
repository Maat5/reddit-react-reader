import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  topicsByUrl: undefined,
  selectedTopicUrls: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOPICS_FETCHED:
      return state.merge({
        topicsByUrl: action.topicsByUrl
      });
    case types.TOPICS_SELECTED:
      return state.merge({
        selectedTopicUrls: action.selectedTopicUrls
      })
    case types.TOPIC_SELECTION_FINALIZED:
      return state.merge({
        selectionFinalized: true
      })
    default:
      return state;
  }
}

export function getTopicsByUrl(state) {
  return state.topics.topicsByUrl;
}

export function getTopicsUrlArray(state) {
  return _.keys(state.topics.topicsByUrl);
}

export function getSelectedTopicUrls(state) {
  return state.topics.selectedTopicUrls;
}

export function getSelectedTopicsByUrl(state) {
  return _.mapValues(_.keyBy(state.topics.selectedTopicUrls), (topicUrl) => state.topics.topicsByUrl[topicUrl]);
}

export function getSelectedTopicUrlsMap(state) {
  return _.keyBy(state.topics.selectedTopicUrls);
}

export function isTopicSelectionValid(state) {
  return state.topics.selectedTopicUrls.length === 3;
}

export function isTopicSelectionFinalized(state) {
  return state.topics.selectionFinalized;
}