# Configurações do projeto — tsconfig.json e package.json

Explicação das mudanças feitas em relação ao padrão gerado pelo `npm init -y` e `tsc --init`.

---

## package.json

### Padrão gerado pelo `npm init -y`

```json
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### Mudanças feitas

**`"type": "module"`**
- Padrão: não existe (Node trata os arquivos como CommonJS por padrão)
- Motivo: habilita o sistema de módulos ESM (ECMAScript Modules) no Node.js, permitindo usar `import`/`export` nativamente em vez de `require`/`module.exports`

**`"dev": "node --loader ts-node/esm src/app.ts"`**
- Padrão: só o script `test`
- Motivo: como o projeto usa ESM (`"type": "module"`), o `ts-node` precisa ser carregado com o loader ESM. O comando `ts-node src/app.ts` simples não funciona nesse contexto

**`dependencies` e `devDependencies`**
- Padrão: não existem
- Adicionados:
  - `express` — framework HTTP
  - `@types/express` — tipagens do Express para o TypeScript
  - `@types/node` — tipagens dos módulos nativos do Node (ex: `node:crypto`)
  - `ts-node` — permite executar TypeScript diretamente sem compilar para JavaScript
  - `typescript` — compilador TypeScript

---

## tsconfig.json

### Padrão gerado pelo `tsc --init`

O `tsc --init` gera um arquivo com quase tudo comentado, com apenas algumas opções ativas por padrão:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Mudanças feitas

**`"ts-node": { "esm": true, "transpileOnly": true }`**
- Padrão: não existe
- Motivo: configura o `ts-node` para rodar em modo ESM, alinhado com o `"type": "module"` do `package.json`. O `transpileOnly` desativa a checagem de tipos durante a execução, tornando o start mais rápido

**`"rootDir": "./src"` e `"outDir": "./dist"`**
- Padrão: comentados
- Motivo: define que os arquivos TypeScript ficam em `src/` e o JavaScript compilado vai para `dist/`, mantendo o projeto organizado

**`"module": "nodenext"`**
- Padrão: `"commonjs"`
- Motivo: alinhado com o `"type": "module"` do `package.json`. O `nodenext` faz o TypeScript entender e validar imports no estilo ESM, incluindo a obrigatoriedade de usar extensão `.js` nos imports

**`"target": "esnext"`**
- Padrão: `"es2016"`
- Motivo: compila para a versão mais recente do JavaScript, aproveitando todos os recursos modernos disponíveis no Node.js atual

**`"types": ["node"]`**
- Padrão: não existe
- Motivo: inclui explicitamente as tipagens do Node.js, necessário para usar módulos nativos como `node:crypto` com tipagem correta

**`"sourceMap": true`, `"declaration": true`, `"declarationMap": true`**
- Padrão: comentados
- Motivo:
  - `sourceMap` — gera mapas de origem para facilitar o debug (erros apontam para o `.ts` em vez do `.js` compilado)
  - `declaration` — gera arquivos `.d.ts` com as tipagens, útil se o projeto for publicado como biblioteca
  - `declarationMap` — gera mapas para os arquivos `.d.ts`, facilitando a navegação no editor

**`"noUncheckedIndexedAccess": true`**
- Padrão: não existe
- Motivo: ao acessar um array por índice (ex: `arr[0]`), o TypeScript passa a considerar que o valor pode ser `undefined`, forçando verificações e evitando erros em runtime

**`"exactOptionalPropertyTypes": true`**
- Padrão: não existe
- Motivo: impede que propriedades opcionais (`name?: string`) recebam `undefined` explicitamente — só podem ser omitidas. Torna a tipagem mais precisa

**`"verbatimModuleSyntax": true`**
- Padrão: não existe
- Motivo: força o uso de `import type` para importações que são apenas tipos, garantindo que o compilador não emita código desnecessário para imports que não existem em runtime

**`"isolatedModules": true`**
- Padrão: não existe
- Motivo: garante que cada arquivo pode ser transpilado de forma independente, compatível com ferramentas como `esbuild` e `babel`

**`"noUncheckedSideEffectImports": true`**
- Padrão: não existe
- Motivo: impede imports de side-effect sem verificação (ex: `import "./arquivo"`), evitando importações acidentais que podem causar efeitos colaterais inesperados

**`"moduleDetection": "force"`**
- Padrão: não existe
- Motivo: força o TypeScript a tratar todos os arquivos como módulos, mesmo que não tenham `import`/`export`. Evita conflitos de escopo global entre arquivos

**`"skipLibCheck": true`**
- Padrão: ativo no `tsc --init`
- Motivo: pula a verificação de tipos nos arquivos `.d.ts` das dependências, acelerando a compilação e evitando erros em bibliotecas de terceiros
