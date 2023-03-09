import Ads from './Ads';
import IFrame, { DEFAULT_URL } from './IFrame';
import { communicate } from './lib/messages';
import { waitForOverwolf } from './lib/overwolf';
import { closeWindow, getCurrentWindow, WINDOWS } from './lib/windows';

waitForOverwolf().then(async () => {
  console.log('Init main');

  const currentWindow = await getCurrentWindow();

  const header = document.querySelector<HTMLElement>('.app-header')!;
  header.onmousedown = () => overwolf.windows.dragMove(currentWindow.id);
  const version = document.querySelector<HTMLElement>('.version')!;
  overwolf.extensions.current.getManifest((manifest) => {
    version.innerText += ` v${manifest.meta.version}`;
  });

  const discord = document.querySelector<HTMLButtonElement>('#discord')!;
  discord.onclick = () => window.open('https://discord.com/invite/NTZu8Px');
  const minimize = document.querySelector<HTMLButtonElement>('#minimize')!;
  minimize.onclick = () => overwolf.windows.minimize(currentWindow.id);
  const maximize = document.querySelector<HTMLButtonElement>('#maximize')!;
  maximize.onclick = async () => {
    const currentWindow = await getCurrentWindow();
    if (currentWindow.stateEx === 'maximized') {
      overwolf.windows.restore(currentWindow.id);
      maximize.classList.remove('toggled');
    } else {
      overwolf.windows.maximize(currentWindow.id);
      maximize.classList.add('toggled');
    }
  };
  const close = document.querySelector<HTMLButtonElement>('#close')!;
  close.onclick = async () => {
    closeWindow(WINDOWS.CONTROLLER);
  };
  const loading = document.querySelector<HTMLElement>('.loading')!;
  const logo = document.querySelector<HTMLImageElement>('#logo')!;
  logo.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(0.95)' },
      { transform: 'scale(1)' },
    ],
    {
      duration: 2000,
      iterations: Infinity,
      easing: 'ease-in-out',
    },
  );

  const iframe = IFrame();
  const error = document.querySelector<HTMLElement>('.error')!;

  const timeoutId = setTimeout(() => {
    error.style.display = 'block';
    iframe.src = DEFAULT_URL;
  }, 5000);

  communicate(iframe, () => {
    clearTimeout(timeoutId);
    loading.remove();
    error.style.display = 'none';
    const ads = Ads();
    document.body.append(ads);
  });
});
