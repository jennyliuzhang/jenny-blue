class SiteNav extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <img src="/img/nav-open.png" class="nav-toggle" alt="toggle nav">
        <ul class="nav">
          <li><a href="/" class="index">Home</a></li>
          <li><a href="/updates" class="index">Updates</a></li>
          <li><a href="/fun-bio">Fun Bio</a></li>
          <li><a href="/bio">Full Bio</a></li>
          <li><a href="/cv">CV</a></li>
          
          <li><a class="social" href="https://jennyliuzhang.tumblr.com" target="_blank" rel="noopener noreferrer">Tumblr</a></li>
          <li><a class="social" href="https://instagram.com/22ndcentury_girl" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      `
      // inject sidebar panel background (shared with footer)
      if (!document.querySelector('.sidebar-panel')) {
        const panel = document.createElement('div')
        panel.className = 'sidebar-panel'
        document.body.prepend(panel)
      }

      if (!document.querySelector('.nav-overlay')) {
        const overlay = document.createElement('div')
        overlay.className = 'nav-overlay nav-hidden'
        document.body.prepend(overlay)
      }

      // toggle nav open/closed
      const toggle = this.querySelector('.nav-toggle')
      const navList = this.querySelector('ul.nav')
      const panel = document.querySelector('.sidebar-panel')
      const overlay = document.querySelector('.nav-overlay')

      const setOpen = (open) => {
        if (open) {
          navList.classList.remove('nav-hidden')
          panel.classList.remove('nav-hidden')
          overlay.classList.remove('nav-hidden')
        } else {
          navList.classList.add('nav-hidden')
          panel.classList.add('nav-hidden')
          overlay.classList.add('nav-hidden')
        }
      }

      ;['/img/nav-to-open.gif', '/img/nav-to-close.gif', '/img/nav-default.png'].forEach(src => { new Image().src = src })

      const mq = window.matchMedia('(min-width: 920px)')
      let isOpen = mq.matches
      if (!isOpen) {
        setOpen(false)
        toggle.src = '/img/nav-default.png'
      } else {
        panel.classList.add('nav-hidden')
      }

      mq.addEventListener('change', (e) => {
        isOpen = e.matches
        navList.classList.add('nav-no-transition')
        setOpen(isOpen)
        if (e.matches) panel.classList.add('nav-hidden')
        toggle.src = isOpen ? '/img/nav-open.png' : '/img/nav-default.png'
        requestAnimationFrame(() => requestAnimationFrame(() => navList.classList.remove('nav-no-transition')))
      })

      overlay.addEventListener('click', () => {
        if (!isOpen) return
        toggle.src = '/img/nav-to-close.gif'
        setTimeout(() => { toggle.src = '/img/nav-default.png' }, 1000)
        setOpen(false)
        isOpen = false
      })

      toggle.addEventListener('click', () => {
        if (isOpen) {
          toggle.src = '/img/nav-to-close.gif'
          setTimeout(() => { toggle.src = '/img/nav-default.png' }, 1000)
          setOpen(false)
        } else {
          toggle.src = '/img/nav-to-open.gif'
          setTimeout(() => { toggle.src = '/img/nav-open.png' }, 1000)
          setOpen(true)
        }
        isOpen = !isOpen
      })

      // auto-active logic
      this.querySelectorAll('a').forEach(link => {
        const linkUrl = new URL(link.href)
        if (linkUrl.hostname !== window.location.hostname) return
        const linkPath = linkUrl.pathname
        const currentPath = window.location.pathname
        if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
          link.classList.add('active')
        } else if (linkPath === currentPath) {
          link.classList.add('active')
        }
      })
    }
  }
  
  customElements.define('site-nav', SiteNav)

const _a = document.createElement('script')
_a.defer = true
_a.src = 'https://cloud.umami.is/script.js'
_a.dataset.websiteId = '3556f1e4-4751-434f-8a8a-3a699c89d2f3'
_a.dataset.domains = 'jenny.world,www.jenny.world'
document.head.appendChild(_a)