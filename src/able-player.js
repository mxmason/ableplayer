export class AblePlayer extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.innerHTML = 'Hello, world!';
	}
}
