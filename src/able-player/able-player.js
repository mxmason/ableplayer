// @ts-check
import { createElement, createControlButton } from '../utils';
import './index.css';

export class AblePlayer extends HTMLElement {
	/** @type {?HTMLVideoElement} */
	videoEl;

	initControls() {
		const videoEl = /** @type {HTMLVideoElement} */ (this.videoEl);
		videoEl.removeAttribute('controls');

		const playpauseButton = createControlButton('playpause');

		const controls = createElement('div', {
			class: 'able-player-controls',
			children: [playpauseButton],
		});

		controls.addEventListener(
			'click',
			(evt) => {
				const target = /** @type {Element} */ (evt.target);
				const action = target.getAttribute('data-ableplayer-action');
				if (action === 'play') {
					videoEl.play();
				} else if (action === 'pause') {
					videoEl.pause();
				}
			},
			true,
		);

		controls.addEventListener(
			'keydown',
			(evt) => {
				if (evt.key === 'Enter' || evt.key === ' ') {
					const target = /** @type {HTMLElement} */ (evt.target);
					evt.preventDefault();
					target.click();
				}
			},
			true,
		);

		this.append(controls);
	}

	connectedCallback() {
		this.videoEl = this.querySelector('video');
		this.initControls();
	}

	static get tagName() {
		return 'able-player';
	}

	static register() {
		if (!customElements.get(AblePlayer.tagName)) {
			customElements.define(AblePlayer.tagName, AblePlayer);
		}
	}
}
