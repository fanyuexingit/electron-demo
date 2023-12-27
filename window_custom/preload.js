const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    xxx: () => ipcRenderer.send('set-ignore-mouse-events')
  })

