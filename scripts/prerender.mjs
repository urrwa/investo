import {spawnSync} from 'node:child_process';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createServer} from 'vite';

const root=fileURLToPath(new URL('../',import.meta.url));
const args=process.argv.slice(2);
// Forward npm's build arguments to Vite without shell quoting (including on Windows).
const build=spawnSync(process.execPath,[path.join(root,'node_modules/vite/bin/vite.js'),'build',...args],{cwd:root,stdio:'inherit'});
if(build.error)throw build.error;
if(build.status!==0)process.exit(build.status??1);

const outDirOption=args.findIndex(argument=>argument==='--outDir');
const outDir=outDirOption>=0?args[outDirOption+1]:args.find(argument=>argument.startsWith('--outDir='))?.slice('--outDir='.length)||'dist';
const dist=path.resolve(root,outDir);
const indexFile=path.join(dist,'index.html');
const template=await readFile(indexFile,'utf8');
const rootPlaceholder=/<div\s+id=["']root["']\s*>\s*<\/div>/;
if(!rootPlaceholder.test(template))throw Error('Prerender requires one empty #root in the Vite HTML template.');

// This server only transforms the build-time React entry; no application API is started.
// Loading the project config is unnecessary here and avoids config-bundling filesystem restrictions.
const server=await createServer({
  root,
  configFile:false,
  // The React development plugin forces dependency optimization; Vite's TSX
  // transformer is sufficient for this server-only render and avoids that scan.
  esbuild:{jsx:'automatic',jsxDev:false},
  optimizeDeps:{noDiscovery:true,include:[]},
  ssr:{optimizeDeps:{noDiscovery:true,include:[]}},
  server:{middlewareMode:true,hmr:false,watch:null},
  appType:'custom',
  logLevel:'warn',
});
try{
  const {renderHomepage}=await server.ssrLoadModule('/src/prerender.tsx');
  const markup=renderHomepage();
  if(typeof markup!=='string'||!markup.includes('id="hero-wrapper"'))throw Error('The prerendered homepage is missing its hero content.');
  // The homepage needs only ~16 KB of compressed CSS. Inline it in the initial
  // response to remove a render-blocking request; other routes keep cached CSS.
  let homepageTemplate=template;
  for(const match of template.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)){
    if(!match[1].startsWith('/assets/')||!match[1].endsWith('.css'))continue;
    const stylesheet=await readFile(path.join(dist,match[1].slice(1)),'utf8');
    homepageTemplate=homepageTemplate.replace(match[0],()=>`<style data-prerender-css>${stylesheet}</style>`);
  }
  const rendered=homepageTemplate.replace(rootPlaceholder,()=>`<div id="root" data-prerendered="true" data-language="de">${markup}</div>`);
  // Preserve the original empty client shell for legal routes and browser-verified receipts.
  await writeFile(path.join(dist,'client.html'),template,'utf8');
  // Physical route entries also work with Vite preview and generic static servers.
  for(const route of ['impressum','datenschutz','danke']){
    const routeDirectory=path.join(dist,route);
    await mkdir(routeDirectory,{recursive:true});
    await writeFile(path.join(routeDirectory,'index.html'),template,'utf8');
  }
  await writeFile(indexFile,rendered,'utf8');
  console.log(`Prerendered German homepage (${Buffer.byteLength(markup).toLocaleString('en-US')} bytes); client routes retain client.html.`);
}finally{
  await server.close();
}
