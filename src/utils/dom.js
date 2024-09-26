/**
 * @typedef {{[x: string]: string, children?: Element[]}} AttributesWithChildren
 */

import playSvg from '../icons/play.svg';
import pauseSvg from '../icons/pause.svg';

import { EMPTY_OBJECT } from './constants.js';

/**
 * @param {Element} element
 * @param {AttributesWithChildren} attributes
 */
export function setAttributes(element, attributes = EMPTY_OBJECT) {
	for (const attrName in attributes) {
		if (attrName === 'children') continue;
		element.setAttribute(attrName, attributes[attrName]);
	}
}

/**
 * @param {string} tag
 * @param {Record<string, unknown>} attributes
 */
export function createElement(tag, { children, ...attributes } = EMPTY_OBJECT) {
	const element = document.createElement(tag);
	setAttributes(element, attributes);
	if (children) {
		for (const child of children) {
			element.append(child);
		}
	}
	return element;
}

const ICON_SVGS_BY_NAME =
	/** @type {Record<string, { actions: [string, string?], icons: [string, string?]}>} */ ({
		playpause: {
			actions: ['play', 'pause'],
			icons: [playSvg, pauseSvg],
		},
	});

/**
 * @param {keyof IMG_PATHS_BY_NAME} iconName
 */
export function createControlButton(iconName) {
	const { actions, icons } = ICON_SVGS_BY_NAME[iconName];
	let [initialIcon, alternateIcon] = icons;
	initialIcon = createElement('img', {
		alt: '',
		src: initialIcon,
	});
	alternateIcon =
		alternateIcon &&
		createElement('img', {
			alt: '',
			src: alternateIcon,
		});

	for (const iconEl of [initialIcon, alternateIcon]) {
		if (!iconEl) continue;
		iconEl.style.pointerEvents = 'none';
	}

	const [initialAction, alternateAction] = actions;

	const button = createElement('div', {
		'aria-label': initialAction,
		'data-ableplayer-action': initialAction,
		children: [initialIcon],
		role: 'button',
		tabIndex: 0,
	});

	if (alternateAction && alternateIcon) {
		button.addEventListener('click', (evt) => {
			const target = /** @type {Element} */ (evt.target);
			const currentAction = target.getAttribute('data-ableplayer-action');
			if (currentAction === initialAction) {
				target.setAttribute('aria-label', alternateAction);
				target.setAttribute('data-ableplayer-action', alternateAction);
				target.replaceChild(alternateIcon, initialIcon);
			} else if (currentAction === alternateAction) {
				target.setAttribute('aria-label', initialAction);
				target.setAttribute('data-ableplayer-action', initialAction);
				target.replaceChild(initialIcon, alternateIcon);
			}
		});
	}

	return button;
}
