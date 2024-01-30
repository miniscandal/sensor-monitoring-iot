import './style.css';

function Paragraph({ text = 'Paragraph', color = 'prefers-scheme', size = 'regular' }) {

	return (
		<p class="paragraph" data-color={color} data-size={size}>{text}</p>
	);
}


export { Paragraph }
