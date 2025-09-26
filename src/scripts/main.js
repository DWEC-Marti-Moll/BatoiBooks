import '../styles/style.css'
import batoiLogo from '/logoBatoi.png'


document.querySelector('#app').innerHTML = `
  <div>
      <img src="${batoiLogo}" class="logo" alt="Batoi logo" />
    <h1>BatoiBooks</h1>
    <p class="texto">
      Abre la consola para ver el resultado
    </p>
  </div>
`
