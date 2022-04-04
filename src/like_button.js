'use strict';

const  LikeButton = ({ withUpdate }) => {
	const [state, setState] = React.useState({
		liked: false,
		text: 'Like'
	});

	React.useEffect(() => {
		withUpdate && setState(prev => ({ ...prev, text: Date.now(),}))
	}, [])

	if (state.liked) {
		return 'You liked this.';
	}

	return React.createElement(
		'button',
		{ onClick: () => setState({ liked: true }) },
		state.text
	);

}
