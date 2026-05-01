import React from 'react';
import { createRoot } from 'react-dom/client';

// Catch errors that happen BEFORE React mounts (module init errors)
// These are invisible to ErrorBoundary so we trap them here
window.onerror = function(msg, src, line, col, err) {
  document.getElementById('root').innerHTML =
    '<div style="background:#1a0000;color:#f87171;padding:32px;font-family:monospace;font-size:13px">' +
    '<b style="font-size:16px">Window Error (pre-React):</b><br/><br/>' +
    msg + '<br/><br/>' +
    (err ? err.stack : '') +
    '</div>';
};

window.onunhandledrejection = function(e) {
  document.getElementById('root').innerHTML =
    '<div style="background:#1a0000;color:#f87171;padding:32px;font-family:monospace;font-size:13px">' +
    '<b style="font-size:16px">Unhandled Promise Rejection:</b><br/><br/>' +
    e.reason +
    '</div>';
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }
  static getDerivedStateFromError(e) { return { err: e }; }
  render() {
    if (this.state.err) {
      return React.createElement('div', {
        style: { background:'#1a0000', color:'#f87171', padding:32, fontFamily:'monospace', fontSize:13 }
      },
        React.createElement('b', { style: { fontSize:16 } }, 'React Error:'),
        React.createElement('br'),
        React.createElement('pre', { style: { whiteSpace:'pre-wrap', marginTop:16 } },
          this.state.err.toString() + '\n\n' + this.state.err.stack
        )
      );
    }
    return this.props.children;
  }
}

// Dynamically require App so any import error is catchable
let App;
try {
  App = require('./App').default;
} catch(e) {
  document.getElementById('root').innerHTML =
    '<div style="background:#1a0000;color:#f87171;padding:32px;font-family:monospace;font-size:13px">' +
    '<b style="font-size:16px">App import failed:</b><br/><br/>' +
    '<pre style="white-space:pre-wrap">' + e.stack + '</pre>' +
    '</div>';
  throw e;
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  React.createElement(ErrorBoundary, null,
    React.createElement(App)
  )
);
