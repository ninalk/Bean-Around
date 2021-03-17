window.addEventListener(
  'load',
  function load()
  {
      window.removeEventListener('load', load, false);
      document.body.classList.remove('preload');
  },
  false);