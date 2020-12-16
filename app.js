const storageKey = "listPreferences"
const form = document.querySelector('form')
const options = form.querySelectorAll('input[type="checkbox"]')
const listNames = Array.from(options).map(input => {
  return input.name
})

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = new FormData(form)
  const lists = listNames.filter(name => {
    return !!data.get(name)
  })

  saveLists(lists)

  saveForm();
})

const toggleDisabled = (elements, disabled) => {
  elements.forEach(el => {
    el.disabled = disabled ? "disabled" : undefined
  })
}

const showToast = (text, duration = 2000) => {
  const toastId = 'toast'
  const existingToast = document.getElementById(toastId)
  if (existingToast) {
    existingToast.parentElement.removeChild(existingToast)
  }

  const el = document.createElement('div')
  el.classList.add('toast')
  el.innerHTML = text;
  el.id = "toast"
  document.body.appendChild(el)

  setTimeout(() => {
    el.parentElement.removeChild(el)
  }, duration)
}

const saveForm = () => {
  const submitButton = form.querySelector('button[type="submit"]')
  const originalText = submitButton.innerHTML
  submitButton.innerHTML = "Saving..."
  const elsToDisable = [
    submitButton,
    ...options
  ]
  toggleDisabled(elsToDisable, true)

  setTimeout(() => {
    submitButton.innerHTML = originalText
    toggleDisabled(elsToDisable, false)
    showToast('Saved!')
  }, 420);
}

const saveLists = (lists) => {
  localStorage.setItem(storageKey, JSON.stringify(lists))
}

const loadLists = () => {
  const savedLists = localStorage.getItem(storageKey)
  if (savedLists) {
    return JSON.parse(savedLists)
  }

  return listNames
}

const savedLists = loadLists()
options.forEach(option => {
  option.checked = savedLists.indexOf(option.name) >= 0;
})
