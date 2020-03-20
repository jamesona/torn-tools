const toolbar = document.createElement('torn-tools')
document.body.appendChild(toolbar)


const e = React.createElement

const toolbarStyle = {
	backgroundColor: 'black',
	display: 'flex',
	left: '10px',
	position: 'fixed',
	top: '10px',
	width: '100%'
}

class Toolbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return `
			<div style={toolbarStyle}>
				Hello World
			</div>
		`
	}
}


ReactDOM.render(e(Toolbar), toolbar)
