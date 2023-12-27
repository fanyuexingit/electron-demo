const { app, BrowserWindow, nativeImage } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.setThumbarButtons([
    {
      tooltip: 'button1',
      icon: nativeImage.createFromPath(path.join(__dirname, 'button1.png')),
      click () { console.log('button1 clicked') }
    }, {
      tooltip: 'button2',
      icon: nativeImage.createFromPath(path.join(__dirname, 'button2.png')),
      flags: ['enabled', 'dismissonclick'],
      click () { console.log('button2 clicked.') }
    }
  ])

  win.setOverlayIcon(nativeImage.createFromPath('path/to/overlay.png'), 'Description for overlay')

  win.once('focus', () => win.flashFrame(false))
  win.flashFrame(true)
  
  win.loadFile('index.html')
}

app.setUserTasks([
    {
      program: process.execPath,
      arguments: '--new-window',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'New Window',
      description: 'Create a new window'
    }
  ])

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})