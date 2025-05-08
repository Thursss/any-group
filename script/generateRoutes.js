import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
// import { parse } from "@vue/compiler-sfc";

const config = {
  pagePath: "src/pages",
  routePath: "src/router/routes.ts",
  mark: {
    rc: /^[_~$]/,
    parameter: /^\[(.+)\]\.vue$/,
    parameter2: /\w*\.(\w+)\.vue$/,
    404: /^\[\.{3}404\]\.vue$/,
    meta: /<route\s+lang=("|')json("|')\s*>\s+(\{[\s\S]+\})\s+<\/route\s?>/,
  },
  lazy: true,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "../");

function compilerFile(filePath, baseRoute = "") {
  let routerMetaJson = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // const { descriptor } = parse(fileContent);
    // const routeBlock = descriptor.customBlocks.find(block => block.type === "route");
    // if (routeBlock && routeBlock.content) {
    //   routerMetaJson = JSON.parse(routeBlock.content);
    // }

    const routeBlock = fileContent.match(config.mark.meta);
    if (routeBlock && routeBlock[3]) {
      routerMetaJson = JSON.parse(routeBlock[3]);
    }
  } catch {
    routerMetaJson = {};
  }

  const basename = path.basename(filePath);
  // 404
  if (config.mark[404].test(basename)) {
    Object.assign(routerMetaJson, {
      path: "/:path(.*)*",
    });
  } else if (config.mark.parameter2.test(basename)) {
    const parameter = config.mark.parameter2.exec(basename)[1];
    Object.assign(routerMetaJson, {
      path: `${baseRoute}/:${parameter}`,
    });
  }
  return routerMetaJson;
}

function generateRoutes(dir, baseRoute = "") {
  const files = fs.readdirSync(dir);
  const routes = [];

  files.forEach((file) => {
    if (config.mark.rc.test(file)) {
      return;
    }

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // 如果目录下有vue文件，则生成父级路由
      const hasVue = fs.readdirSync(fullPath).some(file => file.endsWith(".vue"));
      // 如果目录下有index.vue文件，则生成index路由
      const hasIndex = fs.existsSync(path.join(fullPath, "index.vue"));
      if (hasVue) {
        const routerMetaJson = compilerFile(path.join(dir, file, "index.vue"), baseRoute);
        routes.push(Object.assign({
          path: `${baseRoute}/${file}`,
          component: hasIndex ? `@/pages${baseRoute}/${file}/index.vue` : undefined,
          name: file,
          children: generateRoutes(fullPath, `${baseRoute}/${file}`),
        }, routerMetaJson));
      } else {
        routes.push(...generateRoutes(fullPath, `${baseRoute}/${file}`));
      }
    } else if (file.endsWith(".vue")) {
      const routerMetaJson = compilerFile(fullPath, baseRoute);

      const fileName = path.basename(file, ".vue");
      const routePath
        = file === "index.vue"
          ? baseRoute || "/"
          : `${baseRoute}/${fileName}`;

      routes.push(Object.assign({
        path: routePath,
        name: fileName,
        component: `@/pages${baseRoute}/${file}`,
      }, routerMetaJson));
    }
  },
  );

  return routes;
}

function generate() {
  const routes = generateRoutes(path.resolve(__dirname, config.pagePath));
  let content = JSON.stringify(routes, null, 2);
  // 懒加载
  if (config.lazy) {
    content = content.replace(/"(@\/page.+\.vue)"/g, (...args) => {
      return `() => import('${args[1]}')`;
    });
  }
  fs.writeFileSync(
    path.resolve(__dirname, config.routePath),
    `export default ${content}`,
  );
}
generate();
