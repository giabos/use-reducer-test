import React, { useCallback, useState, useContext, useState, useReducer } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'

import reactToWebComponent from "react-to-webcomponent";


// https://swizec.com/blog/usereducer-usecontext-for-easy-global-state-without-libraries/swizec/9182
// SHARED STATE via Context & reducer

const appStateContext = React.createContext();

function reducer (state, action) {
	return ({...state, count: state.count+action.data});
}

const actions = (dispatch, state) => ({
  incr: useCallback(x => dispatch({type: 'INCR', data: x || 1})),
});


const AppStateProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {count: 0});
    return <appStateContext.Provider displayName="TEST app" value={[state, actions(dispatch, state)]}>
				{children}
			</appStateContext.Provider>;
};

const useAppState = () => useContext(appStateContext);


// ----------------------------------


const Counter1 = ({ title }) => {
   const [{count}, {incr}] = useAppState();
   return <>
			<span>{title}</span>
			<button onClick={() => incr(1)}>{count}</button>
		</>;
};

const Counter2 = ({ title }) => {
   const [state, actions] = useAppState();
   return <>
			<span>{title}</span>
			<button onClick={() => actions.incr(2)}>{state.count}</button>
		</>;
};


// ----------------------------------


function App ({title})  {
    return <AppStateProvider>
		<h1>{title}</h1>
		<Counter1 title="count1"/>
		<Counter2 title="count2" />
    </AppStateProvider>
}

App.propTypes = {
  title: PropTypes.string.isRequired
};

/*
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/
customElements.define("my-counters", reactToWebComponent(App, React, ReactDOM, { shadow: true }));
