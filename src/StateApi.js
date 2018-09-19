import pickBy from 'lodash.pickby';

export default class StateApi {
  constructor(rawData) {
    this.data = {
      articles: this.mapIntoObject(rawData.articles),
      authors: this.mapIntoObject(rawData.authors),
      searchTerm: '',
      timestamp: new Date(),
    };
    this.subscriptions = {};
    this.lastSubscriptionsId = 0;
  }
  mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }
  getState = () => {
    return this.data;
  }
  lookupAuthor = (authorId) => {
    return this.data.authors[authorId];
  }
  getAuthorIdByName = (authorName) => {
    let author = pickBy(this.data.authors, (value) => {
      let authorNameRE = new RegExp(authorName, 'i');
      return value.firstName.match(authorNameRE) || value.lastName.match(authorNameRE);
    });
    if (Object.keys(author).length > 0) {
      return author[Object.keys(author)[0]].id;
    }
    return false;
  }
  setSearchTerm = (searchTerm) => {
    this.mergeWithState({searchTerm});
  }
  subscribe = (cb) => {
    this.lastSubscriptionsId++;
    this.subscriptions[this.lastSubscriptionsId] = cb;
    return this.lastSubscriptionsId;
  }
  unsubscribe = (subscriptionId) => {
    delete this.subscriptions[subscriptionId];
  }
  notifySubscribers = () => {
    Object.values(this.subscriptions).forEach((cb) => cb());
  }
  mergeWithState = (stateChange) => {
    this.data = {
      ...this.data,
      ...stateChange,
    };
    this.notifySubscribers();
  }
  startClock = () => {
    setInterval(() => {
      this.mergeWithState({
        timestamp: new Date(),
      });
    }, 1000);
  }
}
