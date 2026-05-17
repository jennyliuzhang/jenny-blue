class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="footer">
        <p>&#0169; Jenny World LLC.</p>
      </div>
    `
  }
}

customElements.define('site-footer', SiteFooter)
