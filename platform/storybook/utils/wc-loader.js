export const wcloader = (url, isModule) => {
  let script = document.createElement('script');
  if (isModule) {
    script.setAttribute('type', 'module');
  }

  script.setAttribute('src',url);

  document.head.appendChild(script);
};
