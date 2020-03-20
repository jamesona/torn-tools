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

const Toolbar = () => (
	<div style={toolbarStyle}>
		Hello World
	</div>
)

ReactDOM.render(e(Toolbar), toolbar)
