const template = document.createElement('template');
template.innerHTML = `
  <style>
    .user-card {
      display: flex;
      background: #f9f9f9;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      width: 500px;
      margin: 15px auto;
      font-family: Arial, sans-serif;
      overflow: hidden;
    }

    .details {
      padding: 15px 20px;
      flex: 1;
    }

    h2 {
      margin: 0 0 5px 0;
      color: #4b0082;
    }

   
    .info {
      margin-bottom: 10px;
      font-size: 14px;
      color: #333;
    }

    .info p {
      margin: 4px 0;
    }

    button {
      padding: 6px 12px;
      background: #6a0dad;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }

    button:hover {
      background: #4b0082;
    }
  </style>

  <div class="user-card">
    <img class="avatar" />
    <div class="details">
      <h2></h2>
      <h4></h4>
      <div class="info">
        <p><slot name="data"></slot></p>
        <p><slot name="office"></slot></p>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();
    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector('h2').innerText = this.getAttribute('name') || 'No Name';

    this.info = this.shadowRoot.querySelector('.info');
    this.toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    this.toggleInfo = this.toggleInfo.bind(this);
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
    this.info.style.display = this.showInfo ? 'block' : 'none';
    this.toggleBtn.innerText = this.showInfo ? 'Hide Info' : 'Show Info';
  }

  connectedCallback() {
    this.toggleBtn.addEventListener('click', this.toggleInfo);
  }

  disconnectedCallback() {
    this.toggleBtn.removeEventListener('click', this.toggleInfo);
  }
}

window.customElements.define('user-card', UserCard);
