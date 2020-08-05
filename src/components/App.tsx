import React from 'react';

let a: number[] = [1];

class App extends React.PureComponent {
	render() {
		a = [];
		return (
			<div>
				<h1>Hello Alex! a = {a}</h1>
			</div>
		);
	}
}

export default App;
