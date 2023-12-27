const el = document.getElementById('clickThroughElement')

el.addEventListener('mouseenter', () => {
window.electronAPI.xxx('set-ignore-mouse-events', true, { forward: true })
})
el.addEventListener('mouseleave', () => {
    window.electronAPI.xxx('set-ignore-mouse-events', false)
})