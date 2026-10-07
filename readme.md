# gpsdev-landing

Landing page institucional da GPS.dev — HTML5, CSS3 e JavaScript puro, sem build e sem dependências.

## Estrutura

```
gpsdev-landing/
├── index.html
├── styles.css
├── script.js
└── assets/        (imagens, quando houver)
```

## 1. Configuração obrigatória

Abra `script.js`. Só o primeiro bloco precisa ser editado:

```js
const WHATSAPP_NUMBER = "COLOCAR_NUMERO_AQUI";  // ex.: "5564999999999"
const EMAIL           = "COLOCAR_EMAIL_AQUI";   // ex.: "contato@gps.dev"
const APK_URL         = "https://github.com/.../AgroCore.apk";
const LINKS = {
  agrocore:    "",
  agrodigital: "",
  sistemaRaiz: "",
  paranagel:   "",
  agroia:      "",
  outros:      ""
};
```

Regras de comportamento já implementadas:

- **WhatsApp**: enquanto o número não estiver preenchido, os botões avisam na tela em vez de abrir um link quebrado.
- **E-mail**: mesmo comportamento.
- **LINKS**: cada projeto com string vazia mostra "Link em breve". Ao preencher a URL, o botão passa a abrir em nova aba automaticamente. Nenhuma URL foi inventada.
- **APK**: o link do AgroCore já está configurado e abre em nova aba.

## 2. Teste local

```bash
cd gpsdev-landing
python3 -m http.server 5500
```

Abra `http://localhost:5500`.

## 3. Deploy no GitHub Pages

```bash
git init
git add .
git commit -m "landing page gps.dev"
git branch -M main
git remote add origin git@github.com:dgustavopaula-lang/gpsdev-landing.git
git push -u origin main
```

Depois: **Settings → Pages → Source: main / (root)**.

## 4. O que está implementado

| Item | Estado |
|---|---|
| Header fixo com âncoras | ok |
| Menu hambúrguer mobile + cortina + Esc | ok |
| Scroll suave e link ativo por seção | ok |
| Painel do ecossistema no hero (clicável) | ok |
| Painel AgroCore com 10 módulos clicáveis | ok |
| Gráfico animado por módulo | ok |
| Demonstração do AgroIA com digitação | ok |
| FAQ accordion | ok |
| Etapas do método clicáveis | ok |
| Botão flutuante + painel WhatsApp | ok |
| Download do APK | ok |
| Animações de entrada (IntersectionObserver) | ok |
| Responsivo 390px → 1440px, sem scroll horizontal | ok |
| `prefers-reduced-motion` respeitado | ok |
| Foco visível para teclado | ok |

## 5. Aviso sobre dados

Todos os números dos painéis (receita, custos, rebanho, preços) são **ilustrativos** e estão marcados como demonstração na interface. Substituir por dados reais apenas quando houver autorização do cliente.

## 6. Próximos ajustes sugeridos

1. Preencher `WHATSAPP_NUMBER` e `EMAIL`.
2. Publicar as páginas de AgroCore, AgroDigital, Sistema Raiz e Paranagel e preencher `LINKS`.
3. Adicionar favicon e imagem de compartilhamento (`assets/og.jpg` + `<meta property="og:image">`).
4. Definir domínio próprio e ativar HTTPS.
