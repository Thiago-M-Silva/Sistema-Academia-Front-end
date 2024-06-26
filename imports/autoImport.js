// Função para importar CSS
function importCSS(url) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

// Função para importar JavaScript
function importJS(url) {
  var script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}

// Importações específicas para esta página
document.addEventListener('DOMContentLoaded', function() {
  // Importar CSS
  importCSS('/imports/estilo/tailwind.css');

  // Importar JavaScript
  importJS('/imports/lib/jquery.min.js');
  importJS('/imports/lib/sweetalert2.all.min.js');
  importJS('/imports/lib/rxjs.umd.min.js');
});
