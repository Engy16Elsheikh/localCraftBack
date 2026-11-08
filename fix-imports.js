const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    return e.name.endsWith('.ts') ? [full] : [];
  });
}

for (const file of walk(srcDir)) {
  const text = fs.readFileSync(file, 'utf8');
  const out = text.replace(
    /(from\s+|import\s*\(\s*|require\(\s*)(['"])src\/([^'"]+)\2/g,
    (m, pre, q, p) => {
      let rel = path
        .relative(path.dirname(file), path.join(srcDir, p))
        .split(path.sep)
        .join('/');
      if (!rel.startsWith('.')) rel = './' + rel;
      return `${pre}${q}${rel}${q}`;
    },
  );
  if (out !== text) {
    fs.writeFileSync(file, out);
    console.log('fixed', path.relative(__dirname, file));
  }
}