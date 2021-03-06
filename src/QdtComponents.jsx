import React from 'react';
import ReactDOM from 'react-dom';
import qApp from './qApp';
import qDoc from './qDoc';
import utility from './utilities/';
import settings from './picasso/settings';
import picassoComponents from './picasso/settings/components';
import picassoInteractions from './picasso/settings/interactions';
import QdtFilter from './components/QdtFilter';
import QdtTable from './components/QdtTable';
import QdtViz from './components/QdtViz';
import QdtSelectionToolbar from './components/QdtSelectionToolbar';
import QdtKpi from './components/QdtKpi';
import QdtButton from './components/QdtButton';
import QdtPicasso from './components/QdtPicasso';
import QdtSearch from './components/QdtSearch';
import QdtCurrentSelections from './components/QdtCurrentSelections';

const components = {
  QdtFilter, QdtTable, QdtViz, QdtSelectionToolbar, QdtKpi, QdtButton, QdtPicasso, QdtSearch, QdtCurrentSelections,
};

const QdtComponents = class {
  static picasso = {
    settings,
    components: picassoComponents,
    interactions: picassoInteractions,
  };

  static unmountQdtComponent = element => ReactDOM.unmountComponentAtNode(element)

  constructor(config = {}, connections = { vizApi: true, engineApi: true, useUniqueSessionID: null }) {
    const myConfig = config;
    myConfig.identity = connections.useUniqueSessionID ? connections.useUniqueSessionID : utility.Uid(16);
    this.qAppPromise = (connections.vizApi) ? qApp(myConfig) : null;
    this.qDocPromise = (connections.engineApi) ? qDoc(myConfig) : null;
  }

  render = async (type, props, element) => new Promise((resolve, reject) => {
    try {
      const { qAppPromise, qDocPromise } = this;
      const Component = components[type];
      ReactDOM.render(
        <Component
          {...props}
          qAppPromise={qAppPromise}
          qDocPromise={qDocPromise}
          ref={node => resolve(node)}
        />,
        element,
      );
    //   console.info(version);
    } catch (error) {
      reject(error);
    }
  });
};

export default QdtComponents;
