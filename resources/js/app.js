'use strict'

const btn = document.getElementById('btn')
const hello = () => {
  alert('Hello World!!')
}
btn.addEventListener('click', hello, false)
