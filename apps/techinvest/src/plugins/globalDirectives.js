/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
  install(Vue) {
    Vue.directive('loadComponent', {
      bind: function (el, binding) {
        console.log(binding.expression);
        console.log(binding.value);
        mfloader(binding.value.url, binding.value.isModule);
      }}
    );
  }
};


const mfloader = (url, isModule) => {
  const script = document.createElement('script');
  if (isModule) {
    script.type = 'module';
  }
  script.src = url;
  document.body.appendChild(script);
};


export default GlobalDirectives;
