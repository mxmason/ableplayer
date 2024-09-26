import { queries } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { AblePlayer } from './able-player.js';

function renderExampleDom() {
	const tmpl = document.createElement('template');
	tmpl.innerHTML = `
	<able-player>
			<video
				height="360"
				poster="./media/wwa.jpg"
				preload="auto"
				width="480"
				controls
				playsinline
			>
				<source type="video/mp4" src="./media/wwa.mp4" />
				<source type="video/webm" src="./media/wwa.webm" />
				<track
					kind="captions"
					label="English captions"
					src="./media/wwa_captions_en.vtt"
					srclang="en"
				/>
			</video>
		</able-player>
	`;
	document.body.appendChild(tmpl.content);
}

describe('AblePlayer', () => {
	beforeEach(() => {
		AblePlayer.register();
	});

	it('should render a play button', async () => {
		const user = userEvent.setup();
		renderExampleDom();

		const player = document.querySelector('able-player');
		const playButton = queries.getByRole(player, 'button', { name: /play/i });

		expect(playButton).not.toBeNull();
		expect(playButton).toHaveAttribute('aria-label', 'play');
		await user.click(playButton);
		expect(playButton).toHaveAttribute('aria-label', 'pause');
	});
});
