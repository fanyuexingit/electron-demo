const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // frame: false,
    // titleBarStyle: 'hidden',
    // titleBarOverlay: true,
    // titleBarOverlay: {
    //     color: '#2f3241',
    //     symbolColor: '#74b1be',
    //     height: 60
    
    // },
    // transparent: true

    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  })

  // win.setIgnoreMouseEvents(true)
  
  win.loadFile('index.html')
}



ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win.setIgnoreMouseEvents(ignore, options)
  })



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