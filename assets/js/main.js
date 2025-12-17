/*=============== DOM READY ===============*/
document.addEventListener('DOMContentLoaded', () => {

  /*=============== ANIME TEXT (SAFE) ===============*/
  if (window.anime && document.querySelector('.home__profession-1')) {
    const { animate, text, stagger } = anime

    const { chars: chars1 } = text.split('.home__profession-1', { chars: true })
    const { chars: chars2 } = text.split('.home__profession-2', { chars: true })

    animate(chars1, {
      y: [{ to: ['100%', '0%'] }, { to: '-100%', delay: 4000 }],
      duration: 900,
      delay: stagger(80),
      loop: true,
    })

    animate(chars2, {
      y: [{ to: ['100%', '0%'] }, { to: '-100%', delay: 4000 }],
      duration: 900,
      delay: stagger(80),
      loop: true,
    })
  }

  /*=============== SWIPER PROJECTS ===============*/
  if (window.Swiper && document.querySelector('.projects__swiper')) {
    new Swiper('.projects__swiper', {
      loop: true,
      spaceBetween: 24,
      slidesPerView: 'auto',
      grabCursor: true,
      speed: 600,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      }
    })
  }

  /*=============== WORK TABS ===============*/
  const tabs = document.querySelectorAll('[data-target]')
  const tabContents = document.querySelectorAll('[data-content]')

  if (tabs.length && tabContents.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)
        if (!target) return

        tabContents.forEach(c => c.classList.remove('work-active'))
        tabs.forEach(t => t.classList.remove('work-active'))

        tab.classList.add('work-active')
        target.classList.add('work-active')
      })
    })
  }

  /*=============== SERVICES ACCORDION ===============*/
  document.querySelectorAll('.services__button').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.services__card')
      const info = card?.querySelector('.services__info')
      if (!card || !info) return

      document.querySelectorAll('.services__card').forEach(c => {
        c.classList.remove('services-open')
        c.classList.add('services-close')
        const i = c.querySelector('.services__info')
        if (i) i.style.height = '0'
      })

      card.classList.add('services-open')
      info.style.height = info.scrollHeight + 'px'
    })
  })

  /*=============== COPY CONTACT (SAFE) ===============*/
  const copyBtn = document.getElementById('contact-btn')
  const emailEl = document.getElementById('contact-email')

  if (copyBtn && emailEl) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailEl.textContent)
    })
  }

  /*=============== FOOTER YEAR ===============*/
  const yearEl = document.getElementById('footer-year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  /*=============== ACTIVE NAV LINK ===============*/
  const sections = document.querySelectorAll('section[id]')
  if (sections.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY
      sections.forEach(section => {
        const link = document.querySelector(`.nav__menu a[href*="${section.id}"]`)
        if (!link) return

        const top = section.offsetTop - 50
        const height = section.offsetHeight
        link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
      })
    })
  }

  /*=============== CUSTOM CURSOR (ALWAYS WORKS) ===============*/
  const cursor = document.querySelector('.cursor')

  if (cursor) {
    let x = 0, y = 0

    const move = () => {
      cursor.style.left = x + 'px'
      cursor.style.top  = y + 'px'
      requestAnimationFrame(move)
    }

    document.addEventListener('mousemove', e => {
      x = e.clientX
      y = e.clientY
    })

    move()

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hide-cursor'))
      el.addEventListener('mouseleave', () => cursor.classList.remove('hide-cursor'))
    })
  }

  /*=============== SCROLL REVEAL ===============*/
  if (window.ScrollReveal) {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2000,
      delay: 300,
    })

    sr.reveal(`
      .home__image,
      .projects__container,
      .work__container,
      .about__data,
      .about__image
    `)
  }

})




import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js"

const firebaseConfig = {
 apiKey: "AIzaSyB3rdUHyZzobsUy_ELpvoQpEyH2oQrhNDc",
  authDomain: "crewlspd-b7e98.firebaseapp.com",
  projectId: "crewlspd-b7e98",
  messagingSenderId: "78627836390",
  appId: "1:78627836390:web:891eae30b3b20e86bec627"
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

// تسجيل Service Worker
const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')

// طلب الإذن
const permission = await Notification.requestPermission()
if (permission !== 'granted') return alert('Notification denied')

// الحصول على Token
const token = await getToken(messaging, {
  vapidKey: 'BBRSLrNiVMea0c-EM5bhCjEUeFlcoDpmMvmCAGj22dyz9GSXYtxo4nj3UINj8yqYDXRJ6jSv_4nBduxc0reT9dE',
  serviceWorkerRegistration: registration
})

console.log('FCM Token:', token)

// إشعار أثناء فتح الموقع
onMessage(messaging, payload => {
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/assets/img/logo.png'
  })
})

