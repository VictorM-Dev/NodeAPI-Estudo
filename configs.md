# Configurações do projeto — tsconfig.json e package.json

Explicação das mudanças feitas em relação ao padrão (`Ppackage.json` e `Ptsconfig.json`).

---

## package.json

### Padrão (Ppackage.json)

```json
{
  "name": "teste",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "typescript": "^6.0.2"
  }
}
```

### Mudanças feitas

**`"type": "commonjs"` → `"type": "module"`**
- O padrão já vinha com `"type": "commonjs"`, que faz o Node tratar os arquivos como CommonJS (`require`/`module.exports`)
- Foi trocado para `"module"` para habilitar o sistema ESM (`import`/`export`) nativamente no Node.js

**`"dev": "node --loader ts-node/esm src/app.ts"`**
- Padrão: só o script `test`
- Como o projeto usa ESM (`"type": "module"`), o `ts-node` precisa ser carregado com o loader ESM. O comando `ts-node src/app.ts` simples não funciona nesse contexto

**`typescript` movido de `dependencies` para `devDependencies`**
- No padrão, o `typescript` estava em `dependencies` (vai para produção)
- Foi movido para `devDependencies` pois é uma ferramenta de desenvolvimento — não precisa estar no bundle de produção

**Novas dependências adicionadas**
- `express` (dependencies) — framework HTTP da API
- `@types/express` (devDependencies) — tipagens do Express para o TypeScript
- `@types/node` (devDependencies) — tipagens dos módulos nativos do Node (ex: `node:crypto`)
- `ts-node` (devDependencies) — permite executar TypeScript diretamente sem compilar para JavaScript

---

## tsconfig.json

### Padrão (Ptsconfig.json)

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  }
}
```

### Mudanças feitas

**Adicionado bloco `"ts-node": { "esm": true, "transpileOnly": true }`**
- Padrão: não existe
- Configura o `ts-node` para rodar em modo ESM, alinhado com o `"type": "module"` do `package.json`
- O `transpileOnly` desativa a checagem de tipos durante a execução, tornando o start mais rápido

**`"rootDir": "./src"` e `"outDir": "./dist"` descomentados**
- Padrão: estavam comentados
- Define que os arquivos TypeScript ficam em `src/` e o JavaScript compilado vai para `dist/`, mantendo o projeto organizado

**`"types": []` → `"types": ["node"]`**
- Padrão: array vazio, sem nenhuma tipagem global incluída
- Foi preenchido com `"node"` para incluir as tipagens dos módulos nativos do Node.js, necessário para usar coisas como `node:crypto` com tipagem correta

**`"jsx": "react-jsx"` removido**
- Padrão: estava presente
- Foi removido pois o projeto é uma API Node.js — não usa JSX nem React. Manter essa opção seria incorreto para o contexto
