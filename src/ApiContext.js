import React from 'react';

const ApiContext = React.createContext({
  notes: [],
  folders: [],
  err: null,
  handleDelete: () => {},
  handleAddFolder: () => {},
  handleAddNote: () => {}
});

export default ApiContext;