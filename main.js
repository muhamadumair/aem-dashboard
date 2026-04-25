const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load the index.html from your Angular build folder
  // Note: After running 'ng build', your files will be in dist/aem-dashboard/
  win.loadFile(path.join(__dirname, `dist/aem-dashboard/index.html`));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});