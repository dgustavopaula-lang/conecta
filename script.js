/* =========================================================

   GPS.dev — Landing Page

   Interatividade em JavaScript puro

   ========================================================= */



/* ---------------------------------------------------------

   1. CONFIGURAÇÃO — EDITE APENAS ESTE BLOCO

   --------------------------------------------------------- */



// WhatsApp: formato internacional, apenas números.

// Exemplo: "5564999999999" (55 = Brasil, 64 = DDD)

const WHATSAPP_NUMBER = "5564992035821";



// E-mail profissional

const EMAIL = "gustavopaula@gmail.com";



// Link do APK do AgroCore

const APK_URL = "https://github.com/dgustavopaula-lang/agrodigital-mobile/raw/refs/heads/main/downloads/AgroCore.apk";



// Links dos projetos. Deixe "" enquanto o link não existir:

// o botão continua funcionando e avisa que o link será publicado.

const LINKS = {

  gpsdev: "https://gustavopaulasantos.com.br/",

  conecta: "https://conecta.gustavopaulasantos.com.br/#inicio",

  agrocore: "https://agrocore.gustavopaulasantos.com.br/",
  agroDigital: "https://agrodigital.gustavopaulasantos.com.br/",
  sistemaClinica: "https://dgustavopaula-lang.github.io/sistema-clinica-saude/",
  sistemaPostoGasolina: "https://dgustavopaula-lang.github.io/sistema-posto-gasolina/",

  nexoterracoreApi: "https://api.gustavopaulasantos.com.br/",

  healthApi: "https://api.gustavopaulasantos.com.br/api/health",

  nexoterracore: "https://console.gustavopaulasantos.com.br/",

  painel: "https://console.gustavopaulasantos.com.br/painel/area",

  turing: "https://console.gustavopaulasantos.com.br/turing/",

  turingConsole: "https://console.gustavopaulasantos.com.br/turing/",

  turingApi: "https://api.gustavopaulasantos.com.br/api/turing/publico",

  gpsStudio: "https://studio.gustavopaulasantos.com.br/",



  sistemaRaiz: "https://gustavopaulasantos.com.br/",

  edutech: "",

  malanjeAngola: "",

  ntcoins: "https://ntcoins.gustavopaulasantos.com.br/",

  paranagel: "https://paranagel.gustavopaulasantos.com.br/",

  miniMercado: "https://minimercado.gustavopaulasantos.com.br/",
  curralAgil: "https://curral.gustavopaulasantos.com.br/",
  farmaciaFA: "https://farmacia.gustavopaulasantos.com.br/",
  gluzen: "https://gluzen.gustavopaulasantos.com.br/",

  agroia: "",

  energiaSolar: "https://energia.gustavopaulasantos.com.br/",

  microbioma: "https://microbioma.gustavopaulasantos.com.br/#inicio",

  registroRG: "https://registro.gustavopaulasantos.com.br/",

  portfolioCompleto: "https://meuportfoliocompleto.netlify.app/"

};



/* ---------------------------------------------------------

   2. UTILITÁRIOS

   --------------------------------------------------------- */



const $  = (s, ctx = document) => ctx.querySelector(s);

const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];



const aviso = $('#aviso');

let avisoTimer;



function mostrarAviso(texto) {

  aviso.textContent = texto;

  aviso.classList.add('visivel');

  clearTimeout(avisoTimer);

  avisoTimer = setTimeout(() => aviso.classList.remove('visivel'), 3600);

}



const numeroConfigurado = () => /^\d{10,15}$/.test(WHATSAPP_NUMBER);

const emailConfigurado  = () => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(EMAIL);



function abrirWhatsApp(mensagem) {

  if (!numeroConfigurado()) {

    mostrarAviso('WhatsApp ainda não configurado. Defina WHATSAPP_NUMBER no script.js.');

    return;

  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, '_blank', 'noopener');

}



/* ---------------------------------------------------------

   3. HEADER, MENU E NAVEGAÇÃO

   --------------------------------------------------------- */



const topo       = $('#topo');

const menu       = $('#menu');

const hamburguer = $('#hamburguer');

const cortina    = $('#cortina');



function fecharMenu() {

  menu.classList.remove('aberto');

  hamburguer.classList.remove('aberto');

  hamburguer.setAttribute('aria-expanded', 'false');

  hamburguer.setAttribute('aria-label', 'Abrir menu');

  cortina.hidden = true;

  document.body.style.overflow = '';

}



function alternarMenu() {

  const aberto = menu.classList.toggle('aberto');

  hamburguer.classList.toggle('aberto', aberto);

  hamburguer.setAttribute('aria-expanded', String(aberto));

  hamburguer.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');

  cortina.hidden = !aberto;

  document.body.style.overflow = aberto ? 'hidden' : '';

}



hamburguer.addEventListener('click', alternarMenu);

cortina.addEventListener('click', fecharMenu);

$$('.menu-link').forEach(l => l.addEventListener('click', fecharMenu));



document.addEventListener('keydown', e => {

  if (e.key !== 'Escape') return;

  fecharMenu();

  fecharZap();

});



// Sombra do header ao rolar

window.addEventListener('scroll', () => {

  topo.classList.toggle('rolado', window.scrollY > 20);

}, { passive: true });



// Link ativo conforme a seção visível

const secoes = $$('main section[id]');

const observadorNav = new IntersectionObserver(entradas => {

  entradas.forEach(en => {

    if (!en.isIntersecting) return;

    $$('.menu-link').forEach(l => {

      l.classList.toggle('ativo', l.getAttribute('href') === `#${en.target.id}`);

    });

  });

}, { rootMargin: '-45% 0px -50% 0px' });

secoes.forEach(s => observadorNav.observe(s));



// Cards do console do hero

$$('[data-ir]').forEach(el => {

  el.addEventListener('click', () => {

    const alvo = $(el.dataset.ir);

    if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });

  });

});



/* ---------------------------------------------------------

   4. LINKS DE PROJETO E DOWNLOAD

   --------------------------------------------------------- */



$$('[data-link]').forEach(el => {

  const chave = el.dataset.link;

  const destino = LINKS[chave];

  if (destino) {

    el.setAttribute('href', destino);

    el.setAttribute('target', '_blank');

    el.setAttribute('rel', 'noopener');

  } else {

    el.addEventListener('click', e => {

      e.preventDefault();

      mostrarAviso('Link em breve. Configure este projeto em LINKS, no script.js.');

    });

  }

});



const btnApk = $('#btn-apk');

btnApk.setAttribute('href', APK_URL);



/* ---------------------------------------------------------

   5. E-MAIL

   --------------------------------------------------------- */



$$('#btn-email, #rodape-email').forEach(el => {

  if (emailConfigurado()) {

    el.setAttribute('href', `mailto:${EMAIL}?subject=${encodeURIComponent('Projeto — GPS.dev')}`);

  } else {

    el.addEventListener('click', e => {

      e.preventDefault();

      mostrarAviso('E-mail ainda não configurado. Defina EMAIL no script.js.');

    });

  }

});



/* ---------------------------------------------------------

   6. PAINEL DO AGROCORE

   --------------------------------------------------------- */



const MODULOS = {

  geral: {

    nome: 'Visão geral',

    barras: [42, 55, 48, 70, 63, 86],

    kpis: [

      { rot: 'Receita',   val: 'R$ 184.500', var: '+12,4%' },

      { rot: 'Custos',    val: 'R$ 96.200',  var: '-3,1%', baixa: true },

      { rot: 'Resultado', val: 'R$ 88.300',  var: '+18,9%' },

      { rot: 'Talhões',   val: '14 ativos',  var: '2.180 ha' }

    ]

  },

  producao: {

    nome: 'Produção',

    barras: [38, 47, 52, 61, 74, 82],

    kpis: [

      { rot: 'Colhido',       val: '18.400 sc', var: '+9,2%' },

      { rot: 'Produtividade', val: '62 sc/ha',  var: '+4,1%' },

      { rot: 'Área colhida',  val: '1.640 ha',  var: '75% do total' },

      { rot: 'Perdas',        val: '1,8%',      var: '-0,4%', baixa: true }

    ]

  },

  financeiro: {

    nome: 'Financeiro',

    barras: [58, 44, 66, 51, 78, 69],

    kpis: [

      { rot: 'A receber',  val: 'R$ 142.700', var: '8 títulos' },

      { rot: 'A pagar',    val: 'R$ 63.900',  var: '5 títulos', baixa: true },

      { rot: 'Margem',     val: '47,8%',      var: '+2,6%' },

      { rot: 'Caixa',      val: 'R$ 78.800',  var: 'saldo atual' }

    ]

  },

  rebanho: {

    nome: 'Rebanho',

    barras: [50, 53, 57, 60, 66, 71],

    kpis: [

      { rot: 'Cabeças',     val: '1.240',    var: '+38 no mês' },

      { rot: 'Ganho médio', val: '0,72 kg/d', var: '+0,05' },

      { rot: 'Lotes',       val: '9 ativos',  var: 'em 4 pastos' },

      { rot: 'Mortalidade', val: '0,6%',      var: '-0,2%', baixa: true }

    ]

  },

  talhoes: {

    nome: 'Talhões',

    barras: [45, 62, 58, 71, 64, 79],

    kpis: [

      { rot: 'Talhões',     val: '14',       var: '2.180 ha' },

      { rot: 'Em cultivo',  val: '11',       var: '1.720 ha' },

      { rot: 'Em descanso', val: '3',        var: '460 ha' },

      { rot: 'Melhor área', val: '68 sc/ha', var: 'Talhão 07' }

    ]

  },

  maquinas: {

    nome: 'Máquinas',

    barras: [66, 58, 72, 49, 61, 55],

    kpis: [

      { rot: 'Frota',       val: '12 itens',  var: '10 operando' },

      { rot: 'Horas/mês',   val: '1.480 h',   var: '+6,3%' },

      { rot: 'Manutenção',  val: 'R$ 14.300', var: '-8,1%', baixa: true },

      { rot: 'Combustível', val: '9.700 L',   var: 'no período' }

    ]

  },

  safras: {

    nome: 'Safras',

    barras: [40, 52, 61, 68, 75, 84],

    kpis: [

      { rot: 'Safra atual', val: '2025/26',  var: 'em andamento' },

      { rot: 'Plantio',     val: '100%',     var: 'concluído' },

      { rot: 'Colheita',    val: '75%',      var: '+12% na semana' },

      { rot: 'Ciclos',      val: '3',        var: 'registrados' }

    ]

  },

  estoque: {

    nome: 'Estoque',

    barras: [72, 64, 58, 51, 47, 43],

    kpis: [

      { rot: 'Insumos',      val: 'R$ 212.000', var: 'em estoque' },

      { rot: 'Fertilizante', val: '184 t',      var: '-22% no mês', baixa: true },

      { rot: 'Defensivos',   val: '96 un',      var: '3 em alerta' },

      { rot: 'Grãos',        val: '6.400 sc',   var: 'armazenados' }

    ]

  },

  mercado: {

    nome: 'Mercado',

    barras: [54, 61, 57, 73, 68, 81],

    kpis: [

      { rot: 'Soja',      val: 'R$ 132/sc',  var: '+2,8%' },

      { rot: 'Milho',     val: 'R$ 68/sc',   var: '-1,4%', baixa: true },

      { rot: 'Boi gordo', val: 'R$ 318/@',   var: '+3,5%' },

      { rot: 'Vendido',   val: '12.000 sc',  var: 'no período' }

    ]

  },

  agroia: {

    nome: 'AgroIA',

    barras: [48, 59, 64, 70, 77, 88],

    kpis: [

      { rot: 'Perguntas',   val: '186',      var: 'no mês' },

      { rot: 'Alertas',     val: '7',        var: 'gerados' },

      { rot: 'Custo/ha',    val: 'R$ 4.180', var: 'acima da média', baixa: true },

      { rot: 'Oportunidade',val: 'R$ 11.400',var: 'estimada' }

    ]

  }

};



const elIndicadores = $('#indicadores');

const elBarras      = $('#barras');

const elModuloNome  = $('#painel-modulo');



function renderPainel(chave) {

  const dado = MODULOS[chave];

  if (!dado) return;



  elModuloNome.textContent = dado.nome;



  elIndicadores.innerHTML = dado.kpis.map((k, i) => `

    <div class="indicador" style="animation-delay:${i * 60}ms">

      <span>${k.rot}</span>

      <strong>${k.val}</strong>

      <b class="${k.baixa ? 'baixa' : ''}">${k.var}</b>

    </div>`).join('');



  if (!elBarras.children.length) {

    elBarras.innerHTML = dado.barras.map(() => '<i style="height:0"></i>').join('');

  }

  const barras = [...elBarras.children];

  requestAnimationFrame(() => {

    dado.barras.forEach((h, i) => { if (barras[i]) barras[i].style.height = h + '%'; });

  });

}



$$('.modulo').forEach(btn => {

  btn.addEventListener('click', () => {

    $$('.modulo').forEach(b => {

      b.classList.remove('ativo');

      b.setAttribute('aria-selected', 'false');

    });

    btn.classList.add('ativo');

    btn.setAttribute('aria-selected', 'true');

    renderPainel(btn.dataset.modulo);

  });

});



renderPainel('geral');



/* ---------------------------------------------------------

   7. DEMONSTRAÇÃO DO AGROIA

   --------------------------------------------------------- */



const DIALOGO = [

  { autor: 'produtor', texto: 'Qual fazenda teve o melhor resultado este mês?' },

  {

    autor: 'agroia',

    texto: 'A Fazenda Central apresentou o maior resultado no período analisado.',

    valor: 'R$ 184.500',

    legenda: 'Resultado do período'

  },

  { autor: 'produtor', texto: 'Onde posso melhorar?' },

  {

    autor: 'agroia',

    texto: 'A análise aponta oportunidades principalmente em custos operacionais e produtividade.'

  }

];



const corpoConversa = $('#conversa-corpo');

let conversaIniciada = false;



function baloes(item) {

  const div = document.createElement('div');

  const ia = item.autor === 'agroia';

  div.className = `balao ${ia ? 'balao-ia' : 'balao-produtor'}`;

  div.innerHTML = `

    <span class="balao-autor">${ia ? 'AgroIA' : 'Produtor'}</span>

    ${item.texto}

    ${item.valor ? `<span class="balao-valor">${item.valor}<small>${item.legenda}</small></span>` : ''}`;

  corpoConversa.appendChild(div);

}



function digitando() {

  const div = document.createElement('div');

  div.className = 'digitando';

  div.innerHTML = '<i></i><i></i><i></i>';

  corpoConversa.appendChild(div);

  return div;

}



function tocarConversa() {

  if (conversaIniciada) return;

  conversaIniciada = true;

  corpoConversa.innerHTML = '';



  const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduzido) { DIALOGO.forEach(baloes); return; }



  let atraso = 300;

  DIALOGO.forEach(item => {

    if (item.autor === 'agroia') {

      setTimeout(() => {

        const p = digitando();

        setTimeout(() => { p.remove(); baloes(item); }, 1100);

      }, atraso);

      atraso += 2000;

    } else {

      setTimeout(() => baloes(item), atraso);

      atraso += 900;

    }

  });

}



new IntersectionObserver((ent, obs) => {

  ent.forEach(e => {

    if (e.isIntersecting) { tocarConversa(); obs.disconnect(); }

  });

}, { threshold: .35 }).observe($('#conversa'));



/* ---------------------------------------------------------

   8. ETAPAS DO MÉTODO

   --------------------------------------------------------- */



const saidaEtapa = $('#etapa-saida');

$$('.etapa').forEach(etapa => {

  etapa.addEventListener('click', () => {

    const jaAtiva = etapa.classList.contains('ativa');

    $$('.etapa').forEach(e => e.classList.remove('ativa'));

    if (jaAtiva) {

      saidaEtapa.textContent = 'Toque em uma etapa para ver o que acontece nela.';

      return;

    }

    etapa.classList.add('ativa');

    saidaEtapa.textContent = etapa.dataset.detalhe;

  });

});



/* ---------------------------------------------------------

   9. FAQ (ACCORDION)

   --------------------------------------------------------- */



$$('.faq-pergunta').forEach(btn => {

  btn.addEventListener('click', () => {

    const item = btn.closest('.faq-item');

    const resposta = $('.faq-resposta', item);

    const aberto = item.classList.contains('aberto');



    $$('.faq-item').forEach(i => {

      i.classList.remove('aberto');

      $('.faq-resposta', i).style.maxHeight = null;

      $('.faq-pergunta', i).setAttribute('aria-expanded', 'false');

    });



    if (!aberto) {

      item.classList.add('aberto');

      resposta.style.maxHeight = resposta.scrollHeight + 'px';

      btn.setAttribute('aria-expanded', 'true');

    }

  });

});



/* ---------------------------------------------------------

   10. WHATSAPP (BOTÃO FLUTUANTE E PAINEL)

   --------------------------------------------------------- */



const zapBotao  = $('#zap-botao');

const zapPainel = $('#zap-painel');



function fecharZap() {

  zapPainel.hidden = true;

  zapBotao.setAttribute('aria-expanded', 'false');

}



zapBotao.addEventListener('click', () => {

  const aberto = zapPainel.hidden;

  zapPainel.hidden = !aberto;

  zapBotao.setAttribute('aria-expanded', String(aberto));

});



$('#zap-fechar').addEventListener('click', fecharZap);



document.addEventListener('click', e => {

  if (!zapPainel.hidden && !e.target.closest('.zap-area')) fecharZap();

});



// Todos os botões e links com data-zap abrem o WhatsApp

$$('[data-zap]').forEach(el => {

  el.addEventListener('click', e => {

    e.preventDefault();

    abrirWhatsApp(el.dataset.zap);

    fecharZap();

    fecharMenu();

  });

});



/* ---------------------------------------------------------

   11. ANIMAÇÃO DE ENTRADA

   --------------------------------------------------------- */



const observadorRevelar = new IntersectionObserver(entradas => {

  entradas.forEach((en, i) => {

    if (!en.isIntersecting) return;

    setTimeout(() => en.target.classList.add('visivel'), i * 70);

    observadorRevelar.unobserve(en.target);

  });

}, { threshold: .12, rootMargin: '0px 0px -60px 0px' });



$$('.revelar').forEach(el => observadorRevelar.observe(el));



/* ---------------------------------------------------------

   12. CHECAGEM DE CONFIGURAÇÃO (console)

   --------------------------------------------------------- */



if (!numeroConfigurado() || !emailConfigurado()) {

  console.warn(

    '[GPS.dev] Pendente em script.js:',

    !numeroConfigurado() ? 'WHATSAPP_NUMBER' : '',

    !emailConfigurado()  ? 'EMAIL' : ''

  );

}