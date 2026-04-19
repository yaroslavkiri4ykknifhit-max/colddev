import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <canvas class="network" aria-hidden="true"></canvas>

  <div class="preloader" id="preloader">
    <div class="preloader__frame">
      <video id="loaderVideo" class="preloader__video" autoplay muted playsinline>
        <source src="/loader.mp4" type="video/mp4" />
      </video>
      <div class="preloader__bar"><span id="loaderBar"></span></div>
    </div>
  </div>

  <header class="header">
    <div class="container header__inner">
      <a class="brand" href="#hero">colddev</a>
      <nav class="nav">
        <a href="#projects">Проекты</a>
        <a href="#advantages">Преимущества</a>
        <a href="#order">Заказать</a>
        <a href="https://t.me/CODEandprofit" target="_blank" rel="noreferrer">Канал</a>
      </nav>
      <button class="music-toggle" id="musicToggle" type="button">
        Music
      </button>
      <audio id="bgAudio" preload="none">
        <source src="/track.mp3" type="audio/mpeg" />
      </audio>
    </div>
  </header>

  <main>
    <section class="hero container" id="hero">
      <div class="hero__meta">creator · private tools · premium execution</div>
      <h1>colddev</h1>
      <p class="hero__lead">Создатель ботов, скриптов и сайтов под ключ.</p>
      <p class="hero__sub">Делаю инструменты, которые экономят время, автоматизируют рутину и дают доступ к нужной информации быстрее других.</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#projects">Смотреть проекты</a>
        <a class="btn" href="#order">Заказать бота</a>
      </div>
      <div class="hero__code" aria-hidden="true">
        <span class="hero__code-line">print(</span><span id="typedCode"></span><span class="hero__code-line">)</span>
      </div>
    </section>

    <section class="section container" id="projects">
      <div class="section__head">
        <span class="section__eyebrow">Проекты</span>
        <h2>Kufar Sniper Bot</h2>
      </div>
      <div class="project">
        <div class="project__main">
          <p class="project__text">Присылает объявления в ту же секунду после публикации. Не нужно сидеть и вручную обновлять страницы Kufar.</p>
          <p class="project__text">Поддерживает несколько разных позиций сразу и использует обходы по API для быстрой и стабильной работы.</p>
          <a class="btn btn--primary" href="https://t.me/+2M5vA5hPntAxNTVi" target="_blank" rel="noreferrer">Получить доступ</a>
        </div>
        <div class="project__side" id="advantages">
          <h3>Преимущества</h3>
          <ul>
            <li>Мгновенные уведомления</li>
            <li>Несколько поисков одновременно</li>
            <li>Без ручного обновления страниц</li>
            <li>Закрытая логика и приватность</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section container cases">
      <div class="section__head">
        <span class="section__eyebrow">Кейсы</span>
        <h2>Результаты и примеры</h2>
      </div>
      <p class="cases__text">Два кейса доступны в отдельном канале. Там показаны результаты, сценарии использования и формат работы.</p>
      <a class="btn" href="https://t.me/c0lddevcases" target="_blank" rel="noreferrer">Смотреть кейсы</a>
    </section>

    <section class="section container order" id="order">
      <div class="section__head">
        <span class="section__eyebrow">Заказать</span>
        <h2>Нужен бот, сайт или скрипт?</h2>
      </div>
      <p class="order__text">Напишу под задачу: Telegram-бота, автоматизацию, парсер, внутренний инструмент или сайт под ключ.</p>
      <div class="order__actions">
        <a class="btn btn--primary" href="https://t.me/CODEandprofit" target="_blank" rel="noreferrer">Заказать бота</a>
        <a class="btn" href="https://t.me/c0lddevcases" target="_blank" rel="noreferrer">Посмотреть кейсы</a>
      </div>
    </section>
  </main>
`

const preloader = document.getElementById('preloader') as HTMLDivElement
const loaderBar = document.getElementById('loaderBar') as HTMLSpanElement
const loaderVideo = document.getElementById('loaderVideo') as HTMLVideoElement

let progress = 0
const interval = window.setInterval(() => {
  progress += 100 / 30
  loaderBar.style.width = `${Math.min(progress, 100)}%`
}, 100)

window.setTimeout(() => {
  preloader.classList.add('is-hidden')
  window.clearInterval(interval)
  loaderVideo.pause()
}, 3000)

const typedNode = document.getElementById('typedCode') as HTMLSpanElement
const codeText = `'Привет!'`
let idx = 0
const type = () => {
  if (idx <= codeText.length) {
    typedNode.textContent = codeText.slice(0, idx)
    idx += 1
    window.setTimeout(type, 120)
  }
}
window.setTimeout(type, 900)

const audio = document.getElementById('bgAudio') as HTMLAudioElement
const musicToggle = document.getElementById('musicToggle') as HTMLButtonElement
let isPlaying = false
musicToggle.addEventListener('click', async () => {
  try {
    if (!isPlaying) {
      await audio.play()
      isPlaying = true
      musicToggle.classList.add('is-active')
      musicToggle.textContent = 'Stop'
    } else {
      audio.pause()
      audio.currentTime = 0
      isPlaying = false
      musicToggle.classList.remove('is-active')
      musicToggle.textContent = 'Music'
    }
  } catch {
    musicToggle.textContent = 'No audio'
  }
})

audio.addEventListener('ended', () => {
  isPlaying = false
  musicToggle.classList.remove('is-active')
  musicToggle.textContent = 'Music'
})

const canvas = document.querySelector('.network') as HTMLCanvasElement
const ctx = canvas.getContext('2d')!

const resize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resize()
window.addEventListener('resize', resize)

type Node = { x: number; y: number; vx: number; vy: number }
const nodes: Node[] = Array.from({ length: 34 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35,
}))

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (const node of nodes) {
    node.x += node.vx
    node.y += node.vy
    if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1
    if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1

    ctx.beginPath()
    ctx.arc(node.x, node.y, 1.4, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(220, 226, 232, 0.55)'
    ctx.fill()
  }

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150) {
        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.strokeStyle = `rgba(160, 170, 184, ${0.16 - dist / 1000})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }

  requestAnimationFrame(draw)
}

draw()
